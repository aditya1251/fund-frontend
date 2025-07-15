"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import {
  useGetLoanTemplatesQuery,
  useGetLoanTemplateByIdQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  useDeleteLoanTemplateMutation,
  useCreateLoanFormSubmissionMutation,
} from '@/lib/adminApi';

interface TemplateField {
  label: string
  type: string
  required?: boolean
  options?: string[]
}

interface LoanFormTemplate {
  _id?: string
  name: string
  loanType?: string
  fields: TemplateField[]
  createdBy: string
}

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "textarea", label: "Textarea" },
]

export default function LoanFormBuilder() {
  const [templates, setTemplates] = useState<LoanFormTemplate[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")
  const [template, setTemplate] = useState<LoanFormTemplate>({ name: "", loanType: "", fields: [], createdBy: "superadmin" })
  const [fieldDraft, setFieldDraft] = useState<TemplateField>({ label: "", type: "text", required: false })
  const [isEditingField, setIsEditingField] = useState<number | null>(null)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [message, setMessage] = useState<string>("")
  const { data: session } = useSession();

  const { data: templatesData, refetch: refetchTemplates } = useGetLoanTemplatesQuery();
  const { data: selectedTemplateData } = useGetLoanTemplateByIdQuery(selectedTemplateId, { skip: !selectedTemplateId });
  const [createLoanTemplate] = useCreateLoanTemplateMutation();
  const [updateLoanTemplate] = useUpdateLoanTemplateMutation();
  const [deleteLoanTemplate] = useDeleteLoanTemplateMutation();
  const [createLoanFormSubmission] = useCreateLoanFormSubmissionMutation();

  // Sync templates from API
  useEffect(() => {
    if (templatesData) setTemplates(templatesData);
  }, [templatesData]);

  // Load selected template from API
  useEffect(() => {
    if (selectedTemplateId && selectedTemplateData) {
      setTemplate(selectedTemplateData);
      setFormValues({});
    } else if (!selectedTemplateId) {
      setTemplate({ name: "", loanType: "", fields: [], createdBy: "superadmin" });
      setFormValues({});
    }
  }, [selectedTemplateId, selectedTemplateData]);

  // Field builder handlers
  const handleFieldChange = (key: keyof TemplateField, value: any) => {
    setFieldDraft(prev => ({ ...prev, [key]: value }))
  }
  const addField = () => {
    if (!fieldDraft.label) return
    setTemplate(prev => ({ ...prev, fields: [...prev.fields, fieldDraft] }))
    setFieldDraft({ label: "", type: "text", required: false })
    setIsEditingField(null)
  }
  const editField = (idx: number) => {
    setFieldDraft(template.fields[idx])
    setIsEditingField(idx)
  }
  const updateField = () => {
    if (isEditingField === null) return
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields.map((f, i) => (i === isEditingField ? fieldDraft : f)),
    }))
    setFieldDraft({ label: "", type: "text", required: false })
    setIsEditingField(null)
  }
  const removeField = (idx: number) => {
    setTemplate(prev => ({ ...prev, fields: prev.fields.filter((_, i) => i !== idx) }))
  }

  // Template save/update
  const saveTemplate = async () => {
    setMessage("");
    try {
      if (template._id) {
        await updateLoanTemplate({ id: template._id, data: template }).unwrap();
        setMessage("Template updated!");
      } else {
        await createLoanTemplate(template).unwrap();
        setMessage("Template created!");
      }
      refetchTemplates();
    } catch (err) {
      setMessage("Error saving template");
    }
  };

  // Form preview handlers
  const handleFormValueChange = (label: string, value: any) => {
    setFormValues(prev => ({ ...prev, [label]: value }))
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!template._id) {
      setMessage("Please select a template to submit.");
      return;
    }
    for (const field of template.fields) {
      if (field.required && !formValues[field.label]) {
        setMessage(`Please fill required field: ${field.label}`);
        return;
      }
    }
    const submittedBy = session?.user?.email || session?.user?.name || "anonymous";
    try {
      await createLoanFormSubmission({ templateId: template._id, values: formValues, submittedBy }).unwrap();
      setMessage("Form submitted successfully!");
      setFormValues({});
    } catch (err) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 shadow-sm border-0">
          <CardHeader>
            <h1 className="text-lg font-semibold text-[#2d2c2c]">Loan Form Template Builder</h1>
          </CardHeader>
        </Card>
        <Card className="mb-6 bg-white shadow-sm border-0">
          <CardContent>
            <div className="mb-4">
              <Label>Select Template</Label>
              <Select value={selectedTemplateId} onValueChange={setSelectedTemplateId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a template or create new" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">New Template</SelectItem>
                  {templates.map(t => (
                    <SelectItem key={t._id} value={t._id!}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label>Template Name</Label>
              <Input value={template.name} onChange={e => setTemplate({ ...template, name: e.target.value })} />
            </div>
            <div className="mb-4">
              <Label>Loan Type (optional)</Label>
              <Input value={template.loanType || ""} onChange={e => setTemplate({ ...template, loanType: e.target.value })} />
            </div>
            <div className="mb-4 text-black">
              <Label>Fields</Label>
              <div className="space-y-2">
                {template.fields.map((field, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <span className="font-medium">{field.label}</span>
                    <span className="text-xs text-gray-500">({field.type})</span>
                    {field.required && <Badge className="bg-yellow-400 text-black">Required</Badge>}
                    <Button size="sm" variant="outline" onClick={() => editField(idx)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => removeField(idx)}>Remove</Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4 text-black p-4 bg-gray-50 rounded">
              <h4 className="font-semibold mb-2">{isEditingField !== null ? "Edit Field" : "Add Field"}</h4>
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <Input
                  placeholder="Label"
                  value={fieldDraft.label}
                  onChange={e => handleFieldChange("label", e.target.value)}
                  className="w-40"
                />
                <Select value={fieldDraft.type} onValueChange={v => handleFieldChange("type", v)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_TYPES.map(ft => (
                      <SelectItem key={ft.value} value={ft.value}>{ft.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Checkbox
                  checked={!!fieldDraft.required}
                  onCheckedChange={checked => handleFieldChange("required", !!checked)}
                  className="ml-2"
                />
                <span className="text-xs">Required</span>
                {fieldDraft.type === "select" && (
                  <Input
                    placeholder="Comma separated options"
                    value={fieldDraft.options?.join(",") || ""}
                    onChange={e => handleFieldChange("options", e.target.value.split(",").map(s => s.trim()))}
                    className="w-64"
                  />
                )}
                {isEditingField !== null ? (
                  <Button size="sm" className="bg-white border border-black" onClick={updateField}>Update</Button>
                ) : (
                  <Button size="sm" className="bg-white border border-black" onClick={addField}>Add</Button>
                )}
              </div>
            </div>
            <Button className="bg-yellow-400 text-black font-medium px-8 py-3 h-12" onClick={saveTemplate}>
              {template._id ? "Update Template" : "Save Template"}
            </Button>
            {message && <div className="mt-2 text-green-600 font-medium">{message}</div>}
          </CardContent>
        </Card>
        {/* Form Preview */}
        <Card className="shadow-sm border-0 bg-white text-black">
          <CardHeader>
            <h2 className="text-lg font-semibold text-[#2d2c2c]">Form Preview</h2>
          </CardHeader>
          <CardContent>
            {template.fields.length === 0 && <div className="text-gray-500">No fields defined.</div>}
            <form className="space-y-4" onSubmit={submitForm}>
              {template.fields.map((field, idx) => {
                switch (field.type) {
                  case "text":
                  case "number":
                  case "date":
                    return (
                      <div key={idx}>
                        <Label>{field.label}{field.required && " *"}</Label>
                        <Input
                          type={field.type}
                          required={field.required}
                          value={formValues[field.label] || ""}
                          onChange={e => handleFormValueChange(field.label, e.target.value)}
                        />
                      </div>
                    )
                  case "select":
                    return (
                      <div key={idx}>
                        <Label>{field.label}{field.required && " *"}</Label>
                        <Select value={formValues[field.label] || ""} onValueChange={v => handleFormValueChange(field.label, v)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map(opt => (
                              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )
                  case "checkbox":
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <Checkbox
                          checked={!!formValues[field.label]}
                          onCheckedChange={checked => handleFormValueChange(field.label, !!checked)}
                        />
                        <Label>{field.label}{field.required && " *"}</Label>
                      </div>
                    )
                  case "textarea":
                    return (
                      <div key={idx}>
                        <Label>{field.label}{field.required && " *"}</Label>
                        <Textarea
                          required={field.required}
                          value={formValues[field.label] || ""}
                          onChange={e => handleFormValueChange(field.label, e.target.value)}
                        />
                      </div>
                    )
                  default:
                    return null
                }
              })}
              {template.fields.length > 0 && (
                <Button type="submit" className="bg-green-500 text-white font-medium px-8 py-3 h-12">Submit Form</Button>
              )}
            </form>
            {message && <div className="mt-2 text-green-600 font-medium">{message}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
