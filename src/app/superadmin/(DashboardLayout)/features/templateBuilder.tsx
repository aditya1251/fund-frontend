"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	useGetLoanTemplateByIdQuery,
	useUpdateLoanTemplateMutation,
} from "@/redux/services/loanTemplateApi";
import { Button } from "@/components/ui/button";
import { Trash2, Save, Plus, ArrowUp, ArrowDown, ChevronDown, ChevronRight, Eye, X } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/Loading";

interface TemplateField {
	label: string;
	type: string;
	required: boolean;
	fixed: boolean;
	placeholder: string;
	defaultValue: string;
	options: string[];
}

interface TemplatePage {
	title: string;
	description: string;
	fixed: boolean;
	pageNumber: number;
	fields: TemplateField[];
}

interface Template {
	_id: string;
	pages: TemplatePage[];
}

interface FieldDraft extends TemplateField {
	optionDraft?: string;
}

export default function TemplateBuilder({
	fixedTemplateId,
	templateType,
}: {
	fixedTemplateId: string;
	templateType: string;
}) {
	const router = useRouter();
	const { data: templateData, refetch } =
		useGetLoanTemplateByIdQuery(fixedTemplateId);
	const [updateLoanTemplate, { isLoading: isUpdating }] = useUpdateLoanTemplateMutation();

	const [template, setTemplate] = useState(templateData);
	const [pageDraft, setPageDraft] = useState({
		title: "",
		description: "",
		fixed: false,
	});
	const [fieldDrafts, setFieldDrafts] = useState<Record<number, FieldDraft>>({});
	const [collapsedPages, setCollapsedPages] = useState<Record<number, boolean>>({});
	const [showPreview, setShowPreview] = useState(false);

	useEffect(() => {
		if (templateData) setTemplate(templateData);
	}, [templateData]);

	const updateFieldDraft = (pi: number, key: keyof FieldDraft, value: any) => {
		const currentDraft = fieldDrafts[pi] || {
			label: "",
			type: "text",
			required: false,
			fixed: false,
			placeholder: "",
			defaultValue: "",
			options: [],
		};
		const updatedDraft = { ...currentDraft, [key]: value };
		setFieldDrafts({ ...fieldDrafts, [pi]: updatedDraft });
	};

	const togglePageCollapse = (pageIndex: number) => {
		setCollapsedPages(prev => ({
			...prev,
			[pageIndex]: !prev[pageIndex]
		}));
	};

	const renderFieldPreview = (field: TemplateField) => {
		switch (field.type) {
			case "text":
			case "email":
				return (
					<input
						type={field.type}
						placeholder={field.placeholder || field.label}
						defaultValue={field.defaultValue}
						className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50"
						disabled
					/>
				);
			case "number":
				return (
					<input
						type="number"
						placeholder={field.placeholder || field.label}
						defaultValue={field.defaultValue}
						className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50"
						disabled
					/>
				);
			case "textarea":
				return (
					<textarea
						placeholder={field.placeholder || field.label}
						defaultValue={field.defaultValue}
						className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50 h-20"
						disabled
					/>
				);
			case "select":
				return (
					<select className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50" disabled>
						<option>{field.placeholder || "Select an option"}</option>
						{field.options?.map((option, idx) => (
							<option key={idx} value={option}>
								{option}
							</option>
						))}
					</select>
				);
			case "date":
				return (
					<input
						type="date"
						defaultValue={field.defaultValue}
						className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50"
						disabled
					/>
				);
			case "checkbox":
				return (
					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							defaultChecked={field.defaultValue === "true"}
							className="rounded"
							disabled
						/>
						<span className="text-sm text-gray-600">
							{field.placeholder || field.label}
						</span>
					</div>
				);
			case "document":
				return (
					<div className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50 flex items-center gap-2">
						<span className="text-gray-500">Choose file...</span>
						<button className="px-3 py-1 bg-gray-200 rounded text-sm" disabled>
							Browse
						</button>
					</div>
				);
			default:
				return (
					<input
						type="text"
						placeholder={field.placeholder || field.label}
						defaultValue={field.defaultValue}
						className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-50"
						disabled
					/>
				);
		}
	};

	const addPage = () => {
		if (!pageDraft.title.trim()) {
			toast.warning("⚠️ Page title is required.");
			return;
		}

		const newPage = {
			...pageDraft,
			title: pageDraft.title.trim(),
			description: pageDraft.description.trim() || "",
			pageNumber: template.pages.length + 1,
			fields: [],
		};

		setTemplate({ ...template, pages: [...template.pages, newPage] });
		setPageDraft({ title: "", description: "", fixed: false });
	};

	const addFieldToPage = (i: number) => {
		const fieldDraft = fieldDrafts[i];
		if (!fieldDraft || !fieldDraft.label.trim()) {
			toast.warning("⚠️ Field label is required.");
			return;
		}

		const { optionDraft, ...fieldToAdd } = fieldDraft;
		const updatedPages = template.pages.map((p: TemplatePage, idx: number) =>
			idx === i ? { ...p, fields: [...p.fields, fieldToAdd] } : p
		);

		setTemplate({ ...template, pages: updatedPages });
		setFieldDrafts({
			...fieldDrafts,
			[i]: {
				label: "",
				type: "text",
				required: false,
				fixed: false,
				placeholder: "",
				defaultValue: "",
				options: [],
			},
		});
	};

	const saveTemplate = async () => {
		try {
			await updateLoanTemplate({ id: template._id, data: template }).unwrap();
			toast.success("✅ Template updated!");
			refetch();
		} catch (err: any) {
			toast.error(
				`❌ Error saving template: ${err.message || "Unknown error"}`
			);
		}
	};

	const movePage = (i: number, dir: "up" | "down") => {
		const swap = dir === "up" ? i - 1 : i + 1;
		if (swap < 0 || swap >= template.pages.length) {
			toast.warning("⚠️ Cannot move page further.");
			return;
		}

		const newPages = [...template.pages];
		[newPages[i], newPages[swap]] = [newPages[swap], newPages[i]];
		newPages.forEach((p, idx) => (p.pageNumber = idx + 1));
		setTemplate({ ...template, pages: newPages });
	};

	const removePage = (i: number) => {
		const newPages = template.pages.filter(
			(_: TemplatePage, idx: number) => idx !== i
		);
		newPages.forEach(
			(p: TemplatePage, idx: number) => (p.pageNumber = idx + 1)
		);
		setTemplate({ ...template, pages: newPages });

		const drafts = { ...fieldDrafts };
		delete drafts[i];
		setFieldDrafts(drafts);
		toast.success("🗑️ Page removed!");
	};

	const removeFieldFromPage = (pi: number, fi: number) => {
		const pages = [...template.pages];
		pages[pi].fields.splice(fi, 1);
		setTemplate({ ...template, pages });
	};

	if (!template) return <Loading/>;

	return (
		<div className="max-w-5xl mx-auto py-8 px-2 space-y-6">
			<h2 className="text-2xl font-bold">Edit {templateType} Template</h2>

			{/* Add Page */}
			<div className="border-t pt-6 space-y-4">
				<h3 className="text-lg font-semibold">Add New Page</h3>
				<div className="flex flex-wrap gap-2">
					<input
						className="flex-1 border border-gray-300 px-3 py-2 rounded hover:ring-1 ring-black focus:ring-1"
						placeholder="Page Title"
						value={pageDraft.title}
						onChange={(e) =>
							setPageDraft({ ...pageDraft, title: e.target.value })
						}
					/>
					<input
						className="flex-1 border border-gray-300 px-3 py-2 rounded hover:ring-1 ring-black focus:ring-1"
						placeholder="Description"
						value={pageDraft.description}
						onChange={(e) =>
							setPageDraft({ ...pageDraft, description: e.target.value })
						}
					/>
					<Button
						onClick={addPage}
						className="bg-black text-white hover:bg-gray-700 cursor-pointer"
					>
						<Plus className="w-4 h-4" /> Add Page
					</Button>
				</div>
			</div>

			{/* Pages */}
			<div className="space-y-4">
				{template.pages.map((page: TemplatePage, pi: number) => (
					<div key={pi} className="bg-[#f9f9f9] rounded p-4 shadow-sm">
						<div className="flex items-center justify-between mb-2">
							<div className="flex items-center gap-2">
								<button
									onClick={() => togglePageCollapse(pi)}
									className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
								>
									{collapsedPages[pi] ? (
										<ChevronRight className="w-4 h-4" />
									) : (
										<ChevronDown className="w-4 h-4" />
									)}
								</button>
								<h4 className="font-semibold">
									Page {page.pageNumber}: {page.title}
								</h4>
								<span className="text-sm text-gray-500">
									({page.fields.length} field{page.fields.length !== 1 ? 's' : ''})
								</span>
							</div>
							{!page.fixed && (
								<div className="flex items-center gap-3">
									<Button
										onClick={() => movePage(pi, "up")}
										variant="ghost"
										className="hover:bg-gray-100 cursor-pointer"
									>
										<ArrowUp />
									</Button>
									<Button
										onClick={() => movePage(pi, "down")}
										variant="ghost"
										className="hover:bg-gray-100 cursor-pointer"
									>
										<ArrowDown />
									</Button>
									<Button
										onClick={() => removePage(pi)}
										variant="ghost"
										className="text-red-600 hover:bg-gray-100 cursor-pointer"
									>
										<Trash2 />
									</Button>
								</div>
							)}
						</div>

						{!collapsedPages[pi] && (
							<>
								{/* Field Inputs */}
								<div className="flex flex-col gap-2 mb-2">
									<div className="flex flex-wrap gap-2">
										<input
											className="border border-gray-300 px-2 py-1 rounded flex-1 hover:ring-1 ring-black focus:outline-none focus:ring-1"
											placeholder="Field Label"
											value={fieldDrafts[pi]?.label || ""}
											onChange={(e) =>
												updateFieldDraft(pi, "label", e.target.value)
											}
										/>
										<select
											className="border border-gray-300 px-2 py-1 rounded w-32 cursor-pointer hover:ring-1 ring-black focus:outline-none focus:ring-1"
											value={fieldDrafts[pi]?.type || "text"}
											onChange={(e) => updateFieldDraft(pi, "type", e.target.value)}
										>
											{[
												"text",
												"number",
												"select",
												"date",
												"checkbox",
												"textarea",
												"document",
											].map((t) => (
												<option key={t} value={t}>
													{t}
												</option>
											))}
										</select>
										<label className="flex items-center gap-1">
											<input
												type="checkbox"
												checked={fieldDrafts[pi]?.required || false}
												className="cursor-pointer"
												onChange={(e) =>
													updateFieldDraft(pi, "required", e.target.checked)
												}
											/>
											Required
										</label>
									</div>
									<div className="flex flex-wrap gap-2">
										<input
											className="border border-gray-300 px-2 py-1 rounded flex-1 hover:ring-1 ring-black focus:outline-none focus:ring-1"
											placeholder="Placeholder"
											value={fieldDrafts[pi]?.placeholder || ""}
											onChange={(e) =>
												updateFieldDraft(pi, "placeholder", e.target.value)
											}
										/>
										<input
											className="border border-gray-300 px-2 py-1 rounded flex-1 hover:ring-1 ring-black focus:outline-none focus:ring-1"
											placeholder="Default Value"
											value={fieldDrafts[pi]?.defaultValue || ""}
											onChange={(e) =>
												updateFieldDraft(pi, "defaultValue", e.target.value)
											}
										/>
									</div>
									{fieldDrafts[pi]?.type === "select" && (
										<>
											<div className="flex flex-wrap gap-2">
												<input
													className="border border-gray-300 px-2 py-1 rounded flex-1 hover:ring-1 ring-black focus:outline-none focus:ring-1"
													placeholder="Type options separated by commas"
													onKeyDown={(e) => {
														if (e.key === "Enter" || e.key === ",") {
															e.preventDefault();
															const val = (e.currentTarget.value || "").trim();
															if (val) {
																const newOpts = val
																	.split(",")
																	.map((opt) => opt.trim())
																	.filter((opt) => opt !== "");
																updateFieldDraft(pi, "options", [
																	...(fieldDrafts[pi]?.options || []),
																	...newOpts,
																]);
																e.currentTarget.value = "";
															}
														}
													}}
													onBlur={(e) => {
														const val = (e.currentTarget.value || "").trim();
														if (val) {
															const newOpts = val
																.split(",")
																.map((opt) => opt.trim())
																.filter((opt) => opt !== "");
															updateFieldDraft(pi, "options", [
																...(fieldDrafts[pi]?.options || []),
																...newOpts,
															]);
															e.currentTarget.value = "";
														}
													}}
												/>
											</div>

											{fieldDrafts[pi]?.options?.length > 0 && (
												<div className="flex flex-wrap gap-2 mt-2">
													{fieldDrafts[pi].options.map(
														(option: string, idx: number) => (
															<div
																key={idx}
																className="flex items-center gap-2 bg-black text-white text-sm px-2 py-1 rounded-full shadow"
															>
																{option}
																<button
																	onClick={() => {
																		const updated = fieldDrafts[pi].options.filter(
																			(_: string, i: number) => i !== idx
																		);
																		updateFieldDraft(pi, "options", updated);
																	}}
																	className="text-xs hover:text-red-400 cursor-pointer"
																>
																	✕
																</button>
															</div>
														)
													)}
												</div>
											)}
										</>
									)}

									<Button
										onClick={() => addFieldToPage(pi)}
										className="flex items-center gap-2 bg-black text-white px-3 py-1 shadow hover:bg-gray-800 cursor-pointer"
									>
										<Plus className="w-4 h-4" /> Add Field
									</Button>
								</div>

								{/* Existing Fields */}
								{page.fields.map((field, fi) => (
									<div
										key={fi}
										className="flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm mb-1"
									>
										<span>
											{field.label} ({field.type})
											{field.required && (
												<span className="ml-2 text-sm text-red-600">*required</span>
											)}
										</span>
										{!field.fixed && (
											<Button
												onClick={() => removeFieldFromPage(pi, fi)}
												variant="ghost"
												className="text-red-600 hover:bg-gray-100 cursor-pointer"
											>
												<Trash2 />
											</Button>
										)}
									</div>
								))}
							</>
						)}
					</div>
				))}
			</div>

			{/* Save/Preview */}
			<div className="flex items-center gap-4 pt-6 border-t">
				<Button
					onClick={() => setShowPreview(true)}
					className="flex items-center gap-2 bg-black text-white px-6 py-2 shadow hover:bg-gray-800 cursor-pointer"
				>
					<Eye className="w-4 h-4" />
					Preview Template
				</Button>
				<Button
					onClick={saveTemplate}
					disabled={isUpdating}
					className={`flex items-center gap-2 px-6 py-2 shadow ${
						isUpdating
							? "bg-gray-400 cursor-not-allowed"
							: "bg-[#ffd439] hover:bg-yellow-300 cursor-pointer"
					} text-black`}
				>
					{isUpdating ? (
						<>
							<div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
							Updating...
						</>
					) : (
						<>
							<Save className="w-4 h-4" />
							Save {templateType}
						</>
					)}
				</Button>
			</div>

			{/* Preview Modal */}
			{showPreview && (
				<div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
					<div className="bg-white rounded-xl shadow-[8px_8px_0_0_#000] border-2 border-black w-full md:max-w-2xl 2xl:max-w-3xl max-h-[90vh] overflow-hidden">
						{/* Preview Header */}
						<div className="flex items-center justify-between p-6 border-b border-gray-200">
							<div>
								<h2 className="text-2xl font-bold text-black">Template Preview</h2>
								<p className="text-gray-600 mt-1">{templateType} Template</p>
							</div>
							<button
								onClick={() => setShowPreview(false)}
								className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Preview Content */}
						<div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
							<div className="space-y-8">
								{template.pages.map((page: TemplatePage, pageIndex: number) => (
									<div key={pageIndex} className="bg-gray-50 rounded-lg p-6">
										<div className="mb-6">
											<h3 className="text-xl font-semibold text-black mb-2">
												{page.title}
											</h3>
											{page.description && (
												<p className="text-gray-600 text-sm">{page.description}</p>
											)}
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{page.fields.map((field, fieldIndex) => (
												<div key={fieldIndex} className="space-y-2">
													<label className="block text-sm font-medium text-gray-700">
														{field.label}
														{field.required && (
															<span className="text-red-500 ml-1">*</span>
														)}
													</label>
													{renderFieldPreview(field)}
												</div>
											))}
										</div>

										{pageIndex < template.pages.length - 1 && (
											<div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-300">
												<div className="text-sm text-gray-500">
													Page {page.pageNumber} of {template.pages.length}
												</div>
												<div className="flex gap-2">
													<button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100" disabled>
														Previous
													</button>
													<button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800" disabled>
														Next
													</button>
												</div>
											</div>
										)}

										{pageIndex === template.pages.length - 1 && (
											<div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-300">
												<div className="text-sm text-gray-500">
													Final Page ({template.pages.length} of {template.pages.length})
												</div>
												<button className="px-6 py-2 bg-yellow-500 text-white cursor-not-allowed rounded hover:bg-yellow-600" disabled>
													Submit Application
												</button>
											</div>
										)}
									</div>
								))}
								
								{template.pages.length === 0 && (
									<div className="text-center py-10 text-gray-500">
										No pages added to this template yet.
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
