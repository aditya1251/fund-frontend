"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	useGetLoanTemplateByIdQuery,
	useUpdateLoanTemplateMutation,
	useDeleteLoanTemplateMutation,
} from "@/redux/services/loanTemplateApi";
import { Button } from "@/components/ui/button";
import { Trash2, Save, Plus, ArrowUp, ArrowDown } from "lucide-react";
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
	const [updateLoanTemplate] = useUpdateLoanTemplateMutation();
	const [deleteLoanTemplate] = useDeleteLoanTemplateMutation();

	const [template, setTemplate] = useState(templateData);
	const [pageDraft, setPageDraft] = useState({
		title: "",
		description: "",
		fixed: false,
	});
	const [fieldDrafts, setFieldDrafts] = useState<Record<number, any>>({});

	useEffect(() => {
		if (templateData) setTemplate(templateData);
	}, [templateData]);

	const updateFieldDraft = (pi: number, key: string, value: any) => {
		const current = fieldDrafts[pi] || {
			label: "",
			type: "text",
			required: false,
			fixed: false,
			placeholder: "",
			defaultValue: "",
			options: [],
		};
		setFieldDrafts({ ...fieldDrafts, [pi]: { ...current, [key]: value } });
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
		const draft = fieldDrafts[i];
		if (!draft || !draft.label.trim()) {
			toast.warning("⚠️ Field label is required.");
			return;
		}

		const { optionDraft, ...field } = draft;
		const updatedPages = template.pages.map((p: TemplatePage, idx: number) =>
			idx === i ? { ...p, fields: [...p.fields, field] } : p
		);

		setTemplate({ ...template, pages: updatedPages });
		setFieldDrafts({
			...fieldDrafts,
			[i]: { ...field, label: "", options: [] },
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

	const handleDeleteTemplate = async () => {
		if (!window.confirm("Are you sure you want to delete this template?"))
			return;

		try {
			await deleteLoanTemplate(template._id).unwrap();
			toast.success("🗑️ Template deleted!");
			router.refresh();
		} catch (err: any) {
			toast.error(
				`❌ Error deleting template: ${err.message || "Unknown error"}`
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
						className="flex-1 border border-gray-300 px-3 py-2 rounded"
						placeholder="Page Title"
						value={pageDraft.title}
						onChange={(e) =>
							setPageDraft({ ...pageDraft, title: e.target.value })
						}
					/>
					<input
						className="flex-1 border border-gray-300 px-3 py-2 rounded"
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
							<h4 className="font-semibold">
								Page {page.pageNumber}: {page.title}
							</h4>
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

						{/* Field Inputs */}
						<div className="flex flex-col gap-2 mb-2">
							<div className="flex flex-wrap gap-2">
								<input
									className="border border-gray-300 px-2 py-1 rounded flex-1"
									placeholder="Field Label"
									value={fieldDrafts[pi]?.label || ""}
									onChange={(e) =>
										updateFieldDraft(pi, "label", e.target.value)
									}
								/>
								<select
									className="border border-gray-300 px-2 py-1 rounded w-32 cursor-pointer"
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
									className="border border-gray-300 px-2 py-1 rounded flex-1"
									placeholder="Placeholder"
									value={fieldDrafts[pi]?.placeholder || ""}
									onChange={(e) =>
										updateFieldDraft(pi, "placeholder", e.target.value)
									}
								/>
								<input
									className="border border-gray-300 px-2 py-1 rounded flex-1"
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
											className="border border-gray-300 px-2 py-1 rounded flex-1"
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
					</div>
				))}
			</div>

			{/* Save/Delete */}
			<div className="flex gap-4 border-t pt-6">
				<Button
					onClick={saveTemplate}
					className="bg-[#ffd439] text-black cursor-pointer flex items-center gap-2 hover:bg-[#fbb700]"
				>
					<Save className="w-4 h-4" /> Save {templateType}
				</Button>
			</div>
		</div>
	);
}
