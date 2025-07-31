"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useGetLoanTemplateByIdQuery,
  useUpdateLoanTemplateMutation,
} from "@/redux/services/loanTemplateApi";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Save,
  Plus,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
  Eye,
  X,
} from "lucide-react";
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
  name: string;
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
  const [updateLoanTemplate, { isLoading: isUpdating }] =
    useUpdateLoanTemplateMutation();

  const [template, setTemplate] = useState(templateData);
  const [pageDraft, setPageDraft] = useState({
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

  useEffect(() => {
    if (templateData) setTemplate(templateData);
  }, [templateData]);

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
    setCollapsedPages((prev) => ({
      ...prev,
      [pageIndex]: !prev[pageIndex],
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
            className="w-full border border-gray-300 px-2 py-1.5 rounded bg-gray-50 text-sm"
            disabled
          />
        );
      case "number":
        return (
          <input
            type="number"
            placeholder={field.placeholder || field.label}
            defaultValue={field.defaultValue}
            className="w-full border border-gray-300 px-2 py-1.5 rounded bg-gray-50 text-sm"
            disabled
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder || field.label}
            defaultValue={field.defaultValue}
            className="w-full border border-gray-300 px-2 py-1.5 rounded bg-gray-50 h-20 text-sm"
            disabled
          />
        );
      case "select":
        return (
          <select
            className="w-full border border-gray-300 px-2 py-1.5 rounded bg-gray-50 text-sm"
            disabled
          >
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
            className="w-full border border-gray-300 px-2 py-1.5 rounded bg-gray-50 text-sm"
            disabled
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              defaultChecked={field.defaultValue === "true"}
              className="rounded"
              disabled
            />
            <span className="text-gray-600">
              {field.placeholder || field.label}
            </span>
          </div>
        );
      case "document":
        return (
          <div className="w-full border border-gray-300 px-2 py-1.5 rounded bg-gray-50 flex items-center gap-2 text-sm">
            <span className="text-gray-500">Choose file...</span>
            <button
              className="px-2 py-0.5 bg-gray-200 rounded text-xs"
              disabled
            >
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
            className="w-full border border-gray-300 px-2 py-1.5 rounded bg-gray-50 text-sm"
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
      toast.error(`❌ Error: ${err.message || "Unknown"}`);
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
    newPages.forEach(
      (p: TemplatePage, idx: number) => (p.pageNumber = idx + 1)
    );
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

  if (!template) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto py-4 px-2 space-y-4 md:py-8 md:px-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold">
        Edit {templateType} Template
      </h2>

      <div className="bg-white rounded-xl shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] p-4 md:p-8 space-y-4 md:space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 md:mb-2 font-medium text-sm md:text-base">
              Loan Name
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded text-sm md:text-base"
              value={template.name}
              onChange={(e) => handleInputChange(e, "name")}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 md:mb-2 font-medium text-sm md:text-base">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm md:text-base"
            value={template.description}
            onChange={(e) => handleInputChange(e, "description")}
          />
        </div>

        {/* Add Page */}
        <div className="border-t pt-4 md:pt-6 space-y-3 md:space-y-4">
          <h3 className="text-base md:text-lg font-semibold">Add New Page</h3>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <input
              className="flex-1 border border-gray-300 px-3 py-2 rounded text-sm hover:ring-1 ring-black focus:outline-none focus:ring-1"
              placeholder="Page Title"
              value={pageDraft.title}
              onChange={(e) =>
                setPageDraft({ ...pageDraft, title: e.target.value })
              }
            />
            <input
              className="flex-1 border border-gray-300 px-3 py-2 rounded text-sm hover:ring-1 ring-black focus:outline-none focus:ring-1"
              placeholder="Description"
              value={pageDraft.description}
              onChange={(e) =>
                setPageDraft({ ...pageDraft, description: e.target.value })
              }
            />
            <Button
              onClick={addPage}
              className="bg-black text-white hover:bg-gray-700 cursor-pointer text-sm"
            >
              <Plus className="w-4 h-4" /> Add Page
            </Button>
          </div>
        </div>

        {/* Pages */}
        <div className="space-y-3 md:space-y-4">
          {template.pages.map((page: TemplatePage, pi: number) => (
            <div key={pi} className="bg-[#f9f9f9] rounded p-3 md:p-4 shadow-sm">
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
                  <h4 className="font-semibold text-sm md:text-base">
                    Page {page.pageNumber}: {page.title}
                  </h4>
                  <span className="text-xs md:text-sm text-gray-500">
                    ({page.fields.length} field
                    {page.fields.length !== 1 ? "s" : ""})
                  </span>
                </div>
                {!page.fixed && (
                  <div className="flex items-center gap-2 md:gap-3">
                    <Button
                      onClick={() => movePage(pi, "up")}
                      variant="ghost"
                      className="hover:bg-gray-100 p-1.5 cursor-pointer"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => movePage(pi, "down")}
                      variant="ghost"
                      className="hover:bg-gray-100 p-1.5 cursor-pointer"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => removePage(pi)}
                      variant="ghost"
                      className="text-red-600 hover:bg-gray-100 p-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {!collapsedPages[pi] && (
                <>
                  {/* Field Inputs */}
                  <div className="flex flex-col gap-2 mb-2">
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      <input
                        className="border border-gray-300 px-2 py-1 rounded flex-1 text-sm hover:ring-1 ring-black focus:outline-none focus:ring-1"
                        placeholder="Field Label"
                        value={fieldDrafts[pi]?.label || ""}
                        onChange={(e) =>
                          updateFieldDraft(pi, "label", e.target.value)
                        }
                      />
                      <select
                        className="border border-gray-300 px-2 py-1 rounded w-full sm:w-32 text-sm cursor-pointer hover:ring-1 ring-black focus:outline-none focus:ring-1"
                        value={fieldDrafts[pi]?.type || "text"}
                        onChange={(e) =>
                          updateFieldDraft(pi, "type", e.target.value)
                        }
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
                      <label className="flex items-center gap-1 text-sm">
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
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      <input
                        className="border border-gray-300 px-2 py-1 rounded flex-1 text-sm hover:ring-1 ring-black focus:outline-none focus:ring-1"
                        placeholder="Placeholder"
                        value={fieldDrafts[pi]?.placeholder || ""}
                        onChange={(e) =>
                          updateFieldDraft(pi, "placeholder", e.target.value)
                        }
                      />
                      <input
                        className="border border-gray-300 px-2 py-1 rounded flex-1 text-sm hover:ring-1 ring-black focus:outline-none focus:ring-1"
                        placeholder="Default Value"
                        value={fieldDrafts[pi]?.defaultValue || ""}
                        onChange={(e) =>
                          updateFieldDraft(pi, "defaultValue", e.target.value)
                        }
                      />
                    </div>
                    {fieldDrafts[pi]?.type === "select" && (
                      <>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                          <input
                            className="border border-gray-300 px-2 py-1 rounded flex-1 text-sm hover:ring-1 ring-black focus:outline-none focus:ring-1"
                            placeholder="Options (comma separated)"
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
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {fieldDrafts[pi].options.map((option, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1 bg-black text-white text-xs px-2 py-0.5 rounded-full shadow"
                              >
                                {option}
                                <button
                                  onClick={() => {
                                    const updated = fieldDrafts[
                                      pi
                                    ].options.filter((_, i) => i !== idx);
                                    updateFieldDraft(pi, "options", updated);
                                  }}
                                  className="text-xs hover:text-red-400 cursor-pointer"
                                >
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
                      className="flex items-center gap-2 bg-black text-white px-3 py-1 text-sm shadow hover:bg-gray-800 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Add Field
                    </Button>
                  </div>

                  {/* Existing Fields */}
                  {page.fields.map((field: TemplateField, fi: number) => (
                    <div
                      key={fi}
                      className="flex justify-between items-center bg-white px-2 py-1.5 rounded shadow-sm mb-1 text-sm"
                    >
                      <span>
                        {field.label} ({field.type})
                        {field.required && (
                          <span className="ml-2 text-xs text-red-600">
                            *required
                          </span>
                        )}
                      </span>
                      {!field.fixed && (
                        <Button
                          onClick={() => removeFieldFromPage(pi, fi)}
                          variant="ghost"
                          className="text-red-600 hover:bg-gray-100 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Save / Preview */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4 md:pt-6 border-t">
          <Button
            onClick={() => {
              setPreviewCurrentPage(0);
              setShowPreview(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 text-sm shadow hover:bg-gray-800 cursor-pointer"
          >
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button
            onClick={saveTemplate}
            disabled={isUpdating}
            className={`flex items-center gap-2 px-4 py-2 text-sm shadow ${
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
                <Save className="w-4 h-4" /> Save {templateType}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-2">
          <div className="bg-white rounded-xl shadow-[6px_6px_0_0_#000] md:shadow-[8px_8px_0_0_#000] border-2 border-black w-full max-w-full md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6">
              <div>
                <h2 className="text-base md:text-lg font-semibold text-[#2d2c2c]">
                  {templateType} Application
                </h2>
                <p className="text-xs md:text-sm text-gray-600">
                  {templateType} Template
                </p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {template.pages.length > 0 ? (
                <div className="space-y-4 md:space-y-6">
                  {/* Steps */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-xs md:text-sm font-medium mb-2">
                      Step {previewCurrentPage + 1} / {template.pages.length}
                    </div>
                    <div className="flex items-center justify-center w-full">
                      {Array.from(
                        { length: template.pages.length },
                        (_, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-xs md:text-sm font-medium ${
                                index <= previewCurrentPage
                                  ? "bg-yellow-400 text-black"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {index + 1}
                            </div>
                            {index < template.pages.length - 1 && (
                              <div
                                className={`h-1 w-12 md:w-16 mx-1 ${
                                  index < previewCurrentPage
                                    ? "bg-yellow-400"
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Page heading */}
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-semibold">
                      {template.pages[previewCurrentPage]?.title}
                    </h3>
                    {template.pages[previewCurrentPage]?.description && (
                      <p className="text-xs md:text-sm text-gray-600 mt-1">
                        {template.pages[previewCurrentPage]?.description}
                      </p>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="space-y-3 md:space-y-4">
                    {template.pages[previewCurrentPage]?.fields.map(
                      (field: TemplateField, idx: number) => (
                        <div key={idx} className="space-y-1.5">
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>
                          {renderFieldPreview(field)}
                        </div>
                      )
                    )}
                  </div>

                  {/* Nav buttons */}
                  <div className="flex justify-between py-4 md:py-6">
                    <Button
                      type="button"
                      onClick={() =>
                        setPreviewCurrentPage(
                          Math.max(0, previewCurrentPage - 1)
                        )
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
                      disabled={previewCurrentPage === 0}
                    >
                      <ArrowUp className="h-4 w-4 rotate-[-90deg]" /> Prev
                    </Button>
                    {previewCurrentPage < template.pages.length - 1 ? (
                      <Button
                        type="button"
                        onClick={() =>
                          setPreviewCurrentPage(
                            Math.min(
                              template.pages.length - 1,
                              previewCurrentPage + 1
                            )
                          )
                        }
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
                      >
                        Next <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className="bg-yellow-400 text-black font-medium px-6 py-2 text-sm flex items-center gap-2 cursor-not-allowed"
                        disabled
                      >
                        Submit <Eye className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 text-sm">
                  No pages added to this template yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
