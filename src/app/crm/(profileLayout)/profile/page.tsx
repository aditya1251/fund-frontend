"use client";
import React, { useState, useEffect } from "react";
import { Pencil, Save, X } from "lucide-react";
import { useSession } from "next-auth/react";
import {
	useGetDsaDetailsQuery,
	useUpdateDsaDetailsMutation,
} from "@/redux/services/dsaApi";

export default function Page() {
	const [isEditMode, setIsEditMode] = useState(false);
	const { data: session, update: updateSession } = useSession();
	const userId = session?.user.id;
	const { data: dsaData, isLoading } = useGetDsaDetailsQuery(userId!);
	const [updateDsaDetails] = useUpdateDsaDetailsMutation();
	const [successMessage, setSuccessMessage] = useState("");

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		age: "",
		dsaCode: "",
		accountHolderName: "",
		accountNumber: "",
		ifsc: "",
		branchName: "",
		bankName: "",
	});

	const updateFormData = () => {
		setFormData({
			name: dsaData.name || "",
			email: dsaData.email || "",
			phone: dsaData.phone || "",
			age: dsaData.age || "",
			dsaCode: dsaData.dsaCode || "",
			accountHolderName: dsaData.accountHolderName || "",
			accountNumber: dsaData.accountNumber || "",
			ifsc: dsaData.ifsc || "",
			branchName: dsaData.branchName || "",
			bankName: dsaData.bankName || "",
		});
	};

	// Update form data when DSA data is loaded
	useEffect(() => {
		if (dsaData) {
			updateFormData();
		}
	}, [dsaData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSave = async () => {
		try {
			// Update DSA details in the database
			const updatedData = await updateDsaDetails({
				id: userId!,
				data: formData,
			}).unwrap();

			// Update session with new user data
			await updateSession({
				...session,
				user: {
					...session?.user,
					name: formData.name,
					email: formData.email,
				},
			});
			await updateSession();

			setIsEditMode(false);
			setSuccessMessage("Profile updated successfully!");

			// Clear success message after 5 seconds
			setTimeout(() => {
				setSuccessMessage("");
			}, 5000);
		} catch (error) {
			console.error("Failed to update DSA details:", error);
		}
	};

	const handleCancel = () => {
		if (dsaData) {
			updateFormData();
		}
		setIsEditMode(false);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[300px]">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
			</div>
		);
	}

	return (
		<>
			<div className="mx-auto py-8 rounded-md">
				{successMessage && (
					<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 relative">
						<span className="block sm:inline">{successMessage}</span>
					</div>
				)}
				<div className="flex justify-between items-center mb-6">
					<h4 className="text-xl font-semibold text-black">Basic Details</h4>
					<button
						onClick={() => setIsEditMode(true)}
						className="text-[#29a073] flex items-center gap-1 hover:underline cursor-pointer"
					>
						<Pencil size={16} />
						Edit
					</button>
				</div>

				{/* Basic Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<InputField
						label="Full Name"
						name="name"
						value={formData.name}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Email"
						name="email"
						value={formData.email}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Phone No."
						name="phone"
						value={formData.phone}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Age"
						name="age"
						value={formData.age}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="DSA Code"
						name="dsaCode"
						value={formData.dsaCode}
						editable={false} // DSA Code should not be editable
						onChange={handleChange}
					/>
				</div>

				<h4 className="text-xl font-semibold mb-4 text-black">Bank Details</h4>

				{/* Bank Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<InputField
						label="Account Holder Name"
						name="accountHolderName"
						value={formData.accountHolderName}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Account Number"
						name="accountNumber"
						value={formData.accountNumber}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="IFSC Code"
						name="ifsc"
						value={formData.ifsc}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Branch Name"
						name="branchName"
						value={formData.branchName}
						editable={isEditMode}
						onChange={handleChange}
					/>
					<InputField
						label="Bank Name"
						name="bankName"
						value={formData.bankName}
						editable={isEditMode}
						onChange={handleChange}
					/>

					{isEditMode && (
						<div className="flex gap-4 mt-6">
							<button
								onClick={handleSave}
								className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
							>
								<Save size={16} />
								Save
							</button>
							<button
								onClick={handleCancel}
								className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700"
							>
								<X size={16} />
								Cancel
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

type InputProps = {
	label: string;
	name: string;
	value: string;
	editable: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
};

const InputField = ({
	label,
	name,
	value,
	editable,
	onChange,
	type = "text",
}: InputProps) => (
	<div className="flex flex-col">
		<label className="text-sm text-gray-700 mb-1">{label}</label>
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			disabled={!editable}
			className={`px-3 py-2 border rounded ${
				editable
					? "border-gray-400 text-gray-600"
					: "border-black bg-gray-100 text-gray-600"
			}`}
		/>
	</div>
);
