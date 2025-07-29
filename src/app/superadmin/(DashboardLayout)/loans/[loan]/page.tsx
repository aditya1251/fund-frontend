"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetLoanTemplateByIdQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  useDeleteLoanTemplateMutation,
} from "@/redux/services/loanTemplateApi";
import LoanHeader from "./loanheader";
import { Button } from "@/components/ui/button";
import { Trash2, Save, Plus, ArrowUp, ArrowDown, ChevronDown, ChevronRight, Eye, X } from "lucide-react";
import { toast } from "sonner";

interface Field {
  label: string;
  type: string;
  required: boolean;
  fixed: boolean;
  placeholder: string;
  defaultValue: string;
  options: string[];
}

interface Page {
  title: string;
  description: string;
  fixed: boolean;
  pageNumber: number;
  fields: Field[];
}

interface Template {
  _id?: string;
  name: string;
  loanType: string;
  icon: string;
  description: string;
  createdBy: string;
  pages: Page[];
}

interface FieldDraft extends Field {
  optionDraft?: string;
}

export default function LoanTemplateBuilder() {
  const params = useParams();
  const loan = params.loan as string;

  const [selected, setSelected] = useState<string | null>(null);
  const [template, setTemplate] = useState<Template>({
    name: "",
    loanType: "",
    icon: "",
    description: "",
    createdBy: "superadmin",
    pages: [],
  });
  const [pageDraft, setPageDraft] = useState<Partial<Page>>({
    title: "",
    description: "",
    fixed: false,
  });
  const [fieldDrafts, setFieldDrafts] = useState<Record<number, FieldDraft>>(
    {}
  );
  const [collapsedPages, setCollapsedPages] = useState<Record<number, boolean>>(
    {}
  );
  const [showPreview, setShowPreview] = useState(false);
  const [previewCurrentPage, setPreviewCurrentPage] = useState(0);
  const router = useRouter();

  const { data: selectedTemplateData, refetch: refetchTemplates } = useGetLoanTemplateByIdQuery(
    selected!,
    { skip: !selected }
  );
  const [createLoanTemplate, { isLoading: isCreating }] = useCreateLoanTemplateMutation();
  const [updateLoanTemplate, { isLoading: isUpdating }] = useUpdateLoanTemplateMutation();
  const [deleteLoanTemplate, { isLoading: isDeleting }] = useDeleteLoanTemplateMutation();

  useEffect(() => {
    if (selected && selectedTemplateData) {
      setTemplate(selectedTemplateData);
    } else if (!selected) {
      setTemplate({
        name: "",
        loanType: "",
        icon: "",
        description: "",
        createdBy: "superadmin",
        pages: [],
      });
    }
  }, [selected, selectedTemplateData]);

  const handleInputChange = (e: any, key: string) => {
    const val = e.target.value;
    setTemplate({ ...template, [key]: val });
  };

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

  const renderFieldPreview = (field: Field) => {
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
    if (!pageDraft.title?.trim()) {
      toast.warning("⚠️ Page title is required.");
      return;
    }

    const newPage: Page = {
      title: pageDraft.title.trim(),
      description: pageDraft.description?.trim() || "",
      fixed: pageDraft.fixed || false,
      pageNumber: template.pages.length + 1,
      fields: [],
    };
    setTemplate((prev) => ({ ...prev, pages: [...prev.pages, newPage] }));
    setPageDraft({ title: "", description: "", fixed: false });
  };

  const movePage = (index: number, dir: "up" | "down") => {
    if (index === 0) {
      toast.warning("⚠️ Page 1 cannot be moved.");
      return;
    }

    const pages = [...template.pages];
    const swap = dir === "up" ? index - 1 : index + 1;

    if (swap <= 0 || swap >= pages.length) {
      toast.warning("⚠️ Cannot move page further.");
      return;
    }

    [pages[index], pages[swap]] = [pages[swap], pages[index]];
    pages.forEach((p, i) => (p.pageNumber = i + 1));
    setTemplate({ ...template, pages });
  };

  const removePage = (i: number) => {
    const pages = template.pages.filter((_, idx) => idx !== i);
    pages.forEach((p, i2) => (p.pageNumber = i2 + 1));
    setTemplate({ ...template, pages });
    const newDrafts = { ...fieldDrafts };
    delete newDrafts[i];
    setFieldDrafts(newDrafts);
    toast.success("🗑️ Page removed!");
    router.refresh();
  };

  const addFieldToPage = (i: number) => {
    const fieldDraft = fieldDrafts[i];
    if (!fieldDraft || !fieldDraft.label.trim()) {
      toast.warning("⚠️ Field label is required.");
      return;
    }

    const { optionDraft, ...fieldToAdd } = fieldDraft;

    const newPages = template.pages.map((page, index) => {
      if (index === i) {
        return {
          ...page,
          fields: [...page.fields, fieldToAdd],
        };
      }
      return page;
    });

    setTemplate((prev) => ({
      ...prev,
      pages: newPages,
    }));

    setFieldDrafts((prev) => ({
      ...prev,
      [i]: {
        label: "",
        type: "text",
        required: false,
        fixed: false,
        placeholder: "",
        defaultValue: "",
        options: [],
      },
    }));
  };

  const removeFieldFromPage = (pi: number, fi: number) => {
    const pages = [...template.pages];
    pages[pi].fields.splice(fi, 1);
    setTemplate({ ...template, pages });
  };

  const saveTemplate = async () => {
    try {
      if (template._id) {
        await updateLoanTemplate({ id: template._id, data: template }).unwrap();
        toast.success("✅ Template updated!");
      } else {
        await createLoanTemplate(template).unwrap();
        toast.success("✅ Template created!");
        setSelected(null);
      }
      refetchTemplates();
    } catch (error: any) {
      toast.error(
        `❌ Error saving template: ${error.message || "Unknown error"}`
      );
    }
  };

  const handleDeleteTemplate = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this template? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      if (template._id) {
        await deleteLoanTemplate(template._id).unwrap();
        toast.success("🗑️ Template deleted!");
        setSelected(null);
        refetchTemplates();
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(
        `❌ Error deleting template: ${error.message || "Unknown error"}`
      );
    }
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <LoanHeader loan={loan} selected={selected} setSelected={setSelected} />

        {selected && (
          <div className="bg-white rounded-xl shadow-[6px_6px_0_0_#000] p-8 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Loan Name</label>
                <input
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  value={template.name}
                  onChange={(e) => handleInputChange(e, "name")}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Description</label>
              <textarea
                className="w-full border border-gray-300 px-3 py-2 rounded"
                value={template.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </div>

            {/* Add New Page */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Add New Page</h3>
              <div className="flex flex-wrap gap-2">
                <input
                  className="flex-1 border border-gray-300 px-3 py-2 rounded hover:ring-1 ring-black focus:outline-none focus:ring-1"
                  placeholder="Title"
                  value={pageDraft.title || ""}
                  onChange={(e) =>
                    setPageDraft({ ...pageDraft, title: e.target.value })
                  }
                />
                <input
                  className="flex-1 border border-gray-300 px-3 py-2 rounded hover:ring-1 ring-black focus:outline-none focus:ring-1"
                  placeholder="Description"
                  value={pageDraft.description || ""}
                  onChange={(e) =>
                    setPageDraft({ ...pageDraft, description: e.target.value })
                  }
                />
                <Button
                  onClick={addPage}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 shadow hover:bg-gray-800 cursor-pointer">
                  <Plus className="w-4 h-4" /> Add Page
                </Button>
              </div>
            </div>

            {/* Pages & Fields */}
            <div className="space-y-4">
              {template.pages.map((page, pi) => (
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
                          className="hover:bg-gray-100 cursor-pointer">
                          <ArrowUp />
                        </Button>
                        <Button
                          onClick={() => movePage(pi, "down")}
                          variant="ghost"
                          className="hover:bg-gray-100 cursor-pointer">
                          <ArrowDown />
                        </Button>
                        <Button
                          onClick={() => removePage(pi)}
                          variant="ghost"
                          className="text-red-600 hover:bg-gray-100 cursor-pointer">
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
                        onChange={(e) =>
                          updateFieldDraft(pi, "type", e.target.value)
                        }>
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
                          className="cursor-pointer"
                          type="checkbox"
                          checked={fieldDrafts[pi]?.required || false}
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
                                const val = (
                                  e.currentTarget.value || ""
                                ).trim();
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
                            {fieldDrafts[pi].options.map((option, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 bg-black text-white text-sm px-2 py-1 rounded-full shadow">
                                {option}
                                <button
                                  onClick={() => {
                                    const updated = fieldDrafts[
                                      pi
                                    ].options.filter((_, i) => i !== idx);
                                    updateFieldDraft(pi, "options", updated);
                                  }}
                                  className="text-xs hover:text-red-400 cursor-pointer">
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}

                    <Button
                      onClick={() => addFieldToPage(pi)}
                      className="flex items-center gap-2 bg-black text-white px-3 py-1 shadow hover:bg-gray-800 cursor-pointer">
                      <Plus className="w-4 h-4" /> Add Field
                    </Button>
                  </div>

                  {/* Existing Fields */}
                  {page.fields.map((field, fi) => (
                    <div
                      key={fi}
                      className="flex justify-between items-center bg-white px-3 py-2 rounded shadow-sm mb-1">
                      <span>
                        {field.label} ({field.type})
                        {field.required && (
                          <span className="ml-2 text-sm text-red-600">
                            *required
                          </span>
                        )}
                      </span>
                      {!field.fixed && (
                        <Button
                          onClick={() => removeFieldFromPage(pi, fi)}
                          variant="ghost"
                          className="text-red-600 hover:bg-gray-100 cursor-pointer">
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

            {/* Save/Delete */}
            <div className="flex items-center gap-4 pt-6 border-t">
              <Button
                onClick={() => {
                  setPreviewCurrentPage(0); // Reset to first page when opening preview
                  setShowPreview(true);
                }}
                className="flex items-center gap-2 bg-black text-white px-6 py-2 shadow hover:bg-gray-800 cursor-pointer">
                <Eye className="w-4 h-4" />
                Preview Template
              </Button>
              <Button
                onClick={saveTemplate}
                disabled={isCreating || isUpdating}
                className={`flex items-center gap-2 px-6 py-2 shadow ${
                  isCreating || isUpdating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ffd439] hover:bg-yellow-300 cursor-pointer"
                } text-black`}>
                {isCreating || isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    {template._id ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {template._id ? "Update Template" : "Save Template"}
                  </>
                )}
              </Button>
              {template._id && (
                <Button
                  onClick={handleDeleteTemplate}
                  disabled={isDeleting}
                  className={`flex items-center gap-2 px-6 py-2 shadow ${
                    isDeleting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 cursor-pointer"
                  } text-white`}>
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" /> Delete Template
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-[8px_8px_0_0_#000] border-2 border-black w-full md:max-w-2xl 2xl:max-w-3xl max-h-[90vh] overflow-hidden">
              {/* Preview Header */}
              <div className="flex items-center justify-between p-6">
                <div>

                              <h2 className="text-lg font-semibold text-[#2d2c2c]">
                                {template.name || "Loan Application"}
                              </h2>
                              {template.description && (
                                <p className="text-sm text-gray-600">
                                  {template.description}
                                </p>
                              )}
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
                {template.pages.length > 0 ? (
                  <div className="space-y-6">
                    {/* Step indicator with circles */}
                    <div className="mb-6">
                      <div className="text-sm font-medium mb-2">
                        Step {previewCurrentPage + 1} / {template.pages.length}
                      </div>
                      <div className="flex items-center justify-center w-full">
                        {Array.from({ length: template.pages.length }, (_, index) => (
                          <div key={index} className="flex items-center">
                            {/* Step circle */}
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                index <= previewCurrentPage
                                  ? "bg-yellow-400 text-black"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {index + 1}
                            </div>

                            {/* Connector line between circles */}
                            {index < template.pages.length - 1 && (
                              <div
                                className={`h-1 w-16 mx-1 ${
                                  index < previewCurrentPage
                                    ? "bg-yellow-400"
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Current page heading */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold">
                        {template.pages[previewCurrentPage]?.title}
                      </h3>
                      {template.pages[previewCurrentPage]?.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {template.pages[previewCurrentPage]?.description}
                        </p>
                      )}
                    </div>

                    {/* Current page fields */}
                    <div className="space-y-4">
                      {template.pages[previewCurrentPage]?.fields.map((field: Field, idx: number) => (
                        <div key={idx} className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {renderFieldPreview(field)}
                        </div>
                      ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between py-6">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={() => setPreviewCurrentPage(Math.max(0, previewCurrentPage - 1))}
                          className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-6 py-2 flex items-center gap-2 cursor-pointer"
                          disabled={previewCurrentPage === 0}
                        >
                          <ArrowUp className="h-4 w-4 rotate-[-90deg]" /> Previous
                        </Button>
                      </div>

                      {previewCurrentPage < template.pages.length - 1 ? (
                        <Button
                          type="button"
                          onClick={() => setPreviewCurrentPage(Math.min(template.pages.length - 1, previewCurrentPage + 1))}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 flex items-center gap-2 cursor-pointer"
                        >
                          Next <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="bg-yellow-400 text-black font-medium px-8 py-2 flex items-center gap-2 cursor-not-allowed"
                          disabled
                        >
                          Submit Application <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    No pages added to this template yet.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
