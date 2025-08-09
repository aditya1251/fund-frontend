"use client";

import React, { useState } from "react";
import {
	AlertTriangle,
	Bug,
	HelpCircle,
	Zap,
	Send,
	CheckCircle,
	Upload,
	X,
	FileText,
	Trash2,
	AlertCircle,
	Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { useCreateIssueMutation } from "@/redux/services/issueApi";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/utils/fileUploadService";

interface IssueForm {
	title: string;
	description: string;
	priority: "low" | "medium" | "high" | "critical";
	category: "bug" | "feature" | "support" | "other";
	screenshots: string[];
}

const Page = () => {
	const [formData, setFormData] = useState<IssueForm>({
		title: "",
		description: "",
		priority: "medium",
		category: "bug",
		screenshots: [],
	});
	const { data: session } = useSession();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [uploading, setUploading] = useState<Record<string, boolean>>({});
	const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
	const [uploadedFiles, setUploadedFiles] = useState<
		Record<string, { originalName: string; filename: string }>
	>({});
	const [createIssue] = useCreateIssueMutation();

	const priorityOptions = [
		{ value: "low", label: "Low", color: "text-green-600", bg: "bg-green-50" },
		{
			value: "medium",
			label: "Medium",
			color: "text-yellow-600",
			bg: "bg-yellow-50",
		},
		{
			value: "high",
			label: "High",
			color: "text-orange-600",
			bg: "bg-orange-50",
		},
		{
			value: "critical",
			label: "Critical",
			color: "text-red-600",
			bg: "bg-red-50",
		},
	];

	const categoryOptions = [
		{ value: "bug", label: "Bug Report", icon: Bug },
		{ value: "feature", label: "Feature Request", icon: Zap },
		{ value: "support", label: "Support", icon: HelpCircle },
		{ value: "other", label: "Other", icon: AlertTriangle },
	];

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileUpload = async (file: File) => {
		const fileKey = `screenshot_${Date.now()}`;

		try {
			setUploading((prev) => ({ ...prev, [fileKey]: true }));

			// Check file size (5MB limit)
			const maxSizeMB = 5;
			const maxSizeBytes = maxSizeMB * 1024 * 1024;
			if (file.size > maxSizeBytes) {
				setUploadErrors((prev) => ({
					...prev,
					[fileKey]: `File size exceeds ${maxSizeMB}MB limit`,
				}));
				toast.error(`File size must be less than ${maxSizeMB}MB`);
				setUploading((prev) => ({ ...prev, [fileKey]: false }));
				return;
			}

			// Check file type (images only)
			const acceptedTypes = ["jpg", "jpeg", "png", "gif", "webp"];
			const fileExtension = file.name.split(".").pop()?.toLowerCase();
			if (fileExtension && !acceptedTypes.includes(fileExtension)) {
				setUploadErrors((prev) => ({
					...prev,
					[fileKey]: `Invalid file type. Accepted: ${acceptedTypes.join(", ")}`,
				}));
				toast.error(`Only ${acceptedTypes.join(", ")} files are allowed`);
				setUploading((prev) => ({ ...prev, [fileKey]: false }));
				return;
			}

			// Check maximum number of files (5 files limit)
			if (formData.screenshots.length >= 5) {
				toast.error("Maximum 5 screenshots allowed");
				setUploading((prev) => ({ ...prev, [fileKey]: false }));
				return;
			}

			const uploadResult = await uploadFile(file);

			// Store the filename from S3 in the form data
			setFormData((prev) => ({
				...prev,
				screenshots: [...prev.screenshots, uploadResult.filename],
			}));

			// Store file info for display
			setUploadedFiles((prev) => ({
				...prev,
				[uploadResult.filename]: {
					originalName: file.name,
					filename: uploadResult.filename,
				},
			}));

			// Clear any previous errors
			setUploadErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[fileKey];
				return newErrors;
			});

			toast.success("Screenshot uploaded successfully");
		} catch (error: any) {
			setUploadErrors((prev) => ({
				...prev,
				[fileKey]: `Upload failed: ${error.message}`,
			}));
			toast.error(`File upload failed: ${error.message}`);
		} finally {
			setUploading((prev) => ({ ...prev, [fileKey]: false }));
		}
	};

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		files.forEach((file) => handleFileUpload(file));
		// Clear the input so the same file can be uploaded again if needed
		e.target.value = "";
	};

	const handleFileDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget.classList.remove("border-yellow-400", "bg-yellow-50");

		const files = Array.from(e.dataTransfer.files || []);
		files.forEach((file) => handleFileUpload(file));
	};

	const removeScreenshot = (filename: string) => {
		setFormData((prev) => ({
			...prev,
			screenshots: prev.screenshots.filter((f) => f !== filename),
		}));

		// Remove from uploaded files tracking
		setUploadedFiles((prev) => {
			const newFiles = { ...prev };
			delete newFiles[filename];
			return newFiles;
		});

		// Clear any errors for this file
		setUploadErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[filename];
			return newErrors;
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.title.trim() || !formData.description.trim()) {
			toast.error("Please fill in all required fields");
			return;
		}

		// Check if any files are still uploading
		if (Object.values(uploading).some((status) => status === true)) {
			toast.error(
				"Please wait for all file uploads to complete before submitting."
			);
			return;
		}

		// Check for any upload errors
		if (Object.keys(uploadErrors).length > 0) {
			toast.error("Please fix file upload errors before submitting.");
			return;
		}

		setIsSubmitting(true);

		try {
			const userId = session?.user?.id;
			if (!userId) {
				toast.error("You must be logged in to report an issue.");
				return;
			}

			const issueData = {
				...formData,
				userId,
				screenshots: formData.screenshots, // Now contains S3 filenames
			};

			await createIssue(issueData).unwrap();

			setIsSubmitted(true);
			toast.success("Issue reported successfully!");

			// Reset form after successful submission
			setTimeout(() => {
				setFormData({
					title: "",
					description: "",
					priority: "medium",
					category: "bug",
					screenshots: [],
				});
				setUploadedFiles({});
				setUploadErrors({});
				setIsSubmitted(false);
			}, 3000);
		} catch (error) {
			toast.error("Failed to submit issue. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<div className="max-w-2xl mx-auto px-4 py-8">
				<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
					<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-yellow-800 mb-2">
						Issue Reported Successfully!
					</h2>
					<p className="text-yellow-700 mb-4">
						Thank you for reporting the issue. Our team will review it and get
						back to you soon.
					</p>
					<p className="text-sm text-yellow-600">
						You'll receive an email confirmation with your ticket number
						shortly.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-6">
			<div className="mb-8">
				<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
					Report an Issue
				</h2>
				<p className="text-gray-600">
					Help us improve by reporting bugs, requesting features, or getting
					support.
				</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					{/* Issue Category */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Issue Category <span className="text-red-500">*</span>
						</label>
						<div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
							{categoryOptions.map((option) => {
								const IconComponent = option.icon;
								return (
									<label
										key={option.value}
										className={`relative flex justify-center items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
											formData.category === option.value
												? "border-yellow-400 bg-yellow-100 text-neutral-900"
												: "border-gray-200 hover:border-gray-300 text-neutral-500 hover:text-neutral-700"
										}`}
									>
										<input
											type="radio"
											name="category"
											value={option.value}
											checked={formData.category === option.value}
											onChange={handleInputChange}
											className="sr-only"
										/>
										<IconComponent className="w-6 h-6" />
										<span className="text-sm font-medium text-center">
											{option.label}
										</span>
									</label>
								);
							})}
						</div>
					</div>

					{/* Issue Title */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Issue Title <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							placeholder="Brief description of the issue"
							className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
							required
						/>
					</div>

					{/* Priority */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-3">
							Priority Level
						</label>
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
							{priorityOptions.map((option) => (
								<label
									key={option.value}
									className={`relative flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
										formData.priority === option.value
											? "border-yellow-400 bg-yellow-50"
											: "border-gray-200 hover:border-gray-300"
									}`}
								>
									<input
										type="radio"
										name="priority"
										value={option.value}
										checked={formData.priority === option.value}
										onChange={handleInputChange}
										className="sr-only"
									/>
									<span className={`text-sm font-medium ${option.color}`}>
										{option.label}
									</span>
								</label>
							))}
						</div>
					</div>

					{/* Description */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Detailed Description <span className="text-red-500">*</span>
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Please provide a detailed description of the issue, including steps to reproduce if applicable..."
							rows={4}
							className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-vertical"
							required
						/>
					</div>

					{/* Screenshots Upload */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Screenshots (Optional)
						</label>
						<p className="text-sm text-gray-500 mb-3">
							Upload up to 5 screenshots to help us understand the issue better.
							(Images only, max 5MB each)
						</p>

						<div
							className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors"
							onDragOver={(e) => {
								e.preventDefault();
								e.stopPropagation();
								e.currentTarget.classList.add(
									"border-yellow-400",
									"bg-yellow-50"
								);
							}}
							onDragLeave={(e) => {
								e.preventDefault();
								e.stopPropagation();
								e.currentTarget.classList.remove(
									"border-yellow-400",
									"bg-yellow-50"
								);
							}}
							onDrop={handleFileDrop}
						>
							<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
							<input
								type="file"
								id="screenshots"
								multiple
								accept="image/*"
								onChange={handleFileInput}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
							/>
							<label
								htmlFor="screenshots"
								className="cursor-pointer text-yellow-600 hover:text-yellow-700 font-medium"
							>
								Click to upload screenshots or drag and drop
							</label>
							<p className="text-sm text-gray-500 mt-1">
								Accepted Types: png, jpg, jpeg, gif, webp | Max Size: 5MB each
							</p>
						</div>

						{/* Display upload errors */}
						{Object.entries(uploadErrors).map(([key, error]) => (
							<div
								key={key}
								className="flex items-start gap-2 mt-2 text-red-500 text-sm"
							>
								<AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
								<span>{error}</span>
							</div>
						))}

						{/* Display uploading status */}
						{Object.values(uploading).some((status) => status) && (
							<div className="flex items-center gap-2 mt-2 text-yellow-500 text-sm">
								<Loader2 className="h-4 w-4 animate-spin" />
								<span>Uploading screenshots...</span>
							</div>
						)}

						{/* Display uploaded screenshots */}
						{formData.screenshots.length > 0 && (
							<div className="mt-4 space-y-2">
								{formData.screenshots.map((filename, index) => (
									<div
										key={filename}
										className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-lg bg-gray-50"
									>
										<div className="bg-blue-100 p-2 rounded flex-shrink-0">
											<FileText className="h-5 w-5 text-blue-600" />
										</div>
										<div className="flex-grow min-w-0 mb-2 sm:mb-0">
											<div className="font-medium text-sm truncate text-neutral-700">
												{uploadedFiles[filename]?.originalName || filename}
											</div>
											<div className="text-xs text-gray-500 mt-0.5">
												Successfully uploaded
											</div>
										</div>
										<button
											type="button"
											onClick={() => removeScreenshot(filename)}
											className="flex-shrink-0 h-8 px-2 text-xs border border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 rounded w-full sm:w-auto flex items-center justify-center gap-1"
										>
											<Trash2 className="h-3 w-3" />
											Remove
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Submit Button */}
					<div className="flex justify-end">
						<button
							type="submit"
							disabled={
								isSubmitting ||
								Object.values(uploading).some((status) => status)
							}
							className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
								isSubmitting ||
								Object.values(uploading).some((status) => status)
									? "bg-gray-400 cursor-not-allowed"
									: "bg-yellow-400 hover:bg-yellow-500 text-black"
							}`}
						>
							{isSubmitting ? (
								<>
									<div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
									Submitting...
								</>
							) : Object.values(uploading).some((status) => status) ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin" />
									Uploading...
								</>
							) : (
								<>
									<Send className="w-4 h-4" />
									Submit Issue
								</>
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Page;
