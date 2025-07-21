"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  useGetLoanTemplatesQuery,
  useGetLoanTemplateByIdQuery,
  useCreateLoanTemplateMutation,
  useUpdateLoanTemplateMutation,
  useDeleteLoanTemplateMutation,
} from '@/redux/services/loanTemplateApi';
import { loanFormTemplateSchema, LoanFormTemplate, TemplateField } from '@/lib/validation/loanTemplateSchema';

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select" },
  { value: "checkbox", label: "Checkbox" },
  { value: "textarea", label: "Textarea" },
  { value: "document", label: "Document" },
]

export default function LoanTemplateBuilder() {
  const [templates, setTemplates] = useState<LoanFormTemplate[]>([])
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")
  const [template, setTemplate] = useState<LoanFormTemplate>({ name: "", loanType: "", fields: [], createdBy: "superadmin" })
  const [fieldDraft, setFieldDraft] = useState<TemplateField>({ 
    label: "", 
    type: "text", 
    required: false,
    acceptedTypes: ["pdf", "jpg", "jpeg", "png"],
    maxSize: 5
  })
  const [isEditingField, setIsEditingField] = useState<number | null>(null)
  const [message, setMessage] = useState<string>("")

  const { data: templatesData, refetch: refetchTemplates } = useGetLoanTemplatesQuery();
  const { data: selectedTemplateData } = useGetLoanTemplateByIdQuery(selectedTemplateId, { skip: !selectedTemplateId });
  const [createLoanTemplate] = useCreateLoanTemplateMutation();
  const [updateLoanTemplate] = useUpdateLoanTemplateMutation();
  const [deleteLoanTemplate] = useDeleteLoanTemplateMutation();

  useEffect(() => {
    if (templatesData) setTemplates(templatesData);
  }, [templatesData]);

  useEffect(() => {
    if (selectedTemplateId && selectedTemplateData) {
      setTemplate(selectedTemplateData);
    } else if (!selectedTemplateId) {
      setTemplate({ name: "", loanType: "", fields: [], createdBy: "superadmin" });
    }
  }, [selectedTemplateId, selectedTemplateData]);

  // Field builder handlers
  const handleFieldChange = (key: keyof TemplateField, value: any) => {
    setFieldDraft(prev => ({ ...prev, [key]: value }))
  }
  const addField = () => {
    if (!fieldDraft.label) return
    setTemplate(prev => ({ ...prev, fields: [...prev.fields, fieldDraft] }))
    setFieldDraft({ 
      label: "", 
      type: "text", 
      required: false,
      acceptedTypes: ["pdf", "jpg", "jpeg", "png"],
      maxSize: 5
    })
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
    setFieldDraft({ 
      label: "", 
      type: "text", 
      required: false,
      acceptedTypes: ["pdf", "jpg", "jpeg", "png"],
      maxSize: 5
    })
    setIsEditingField(null)
  }
  const removeField = (idx: number) => {
    setTemplate(prev => ({ ...prev, fields: prev.fields.filter((_, i) => i !== idx) }))
  }

  // Template save/update
  const saveTemplate = async () => {
    setMessage("");
    try {
      loanFormTemplateSchema.parse(template);
      if (template._id) {
        await updateLoanTemplate({ id: template._id, data: template }).unwrap();
        setMessage("Template updated!");
      } else {
        await createLoanTemplate(template).unwrap();
        setMessage("Template created!");
      }
      refetchTemplates();
    } catch (err: any) {
      if (err.errors) {
        setMessage(err.errors.map((e: any) => e.message).join(', '));
      } else {
        setMessage("Error saving template");
      }
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    setMessage("");
    try {
      await deleteLoanTemplate(id).unwrap();
      setMessage("Template deleted!");
      setSelectedTemplateId("");
      refetchTemplates();
    } catch (err) {
      setMessage("Error deleting template");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 shadow-sm border-0">
          <CardHeader>
            <h1 className="text-lg font-semibold text-[#2d2c2c]">Loan Template Builder (Superadmin)</h1>
          </CardHeader>
        </Card>
        <Card className="mb-6 shadow-sm border-0">
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
              <Label>Template Name (Loan Sub Type)</Label>
              <Input value={template.name} onChange={e => setTemplate({ ...template, name: e.target.value })} />
            </div>
            <div className="mb-4">
              <Label>Loan Type</Label>
              <Input value={template.loanType || ""} onChange={e => setTemplate({ ...template, loanType: e.target.value })} />
            </div>
            <div className="mb-4">
              <Label>Fields</Label>
              <div className="space-y-2">
                {template.fields.map((field, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium w-6/8">{field.label}</span>
                        <span className="text-xs w-1/8 text-gray-500 ml-2">({field.type})</span>
                        {field.required && <Badge className="bg-yellow-400 text-black ml-2">Required</Badge>}
                      </div>
                      {field.type === "document" && (
                        <div className="text-xs text-gray-600 mt-1">
                          <span>Types: {field.acceptedTypes?.join(", ") || "pdf, jpg, jpeg, png"}</span>
                          <span className="ml-2">Max: {field.maxSize || 5}MB</span>
                        </div>
                      )}
                      {field.type === "select" && field.options && (
                        <div className="text-xs text-gray-600 mt-1">
                          Options: {field.options.join(", ")}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-2">
                      <Button size="sm" variant="outline" onClick={() => editField(idx)}>Edit</Button>
                      <Button size="sm" variant="outline" onClick={() => removeField(idx)}>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4 p-4 bg-gray-50 rounded">
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
                {fieldDraft.type === "document" && (
                  <div className="flex flex-col gap-2 w-64">
                    <Input
                      placeholder="Accepted file types (comma separated)"
                      value={fieldDraft.acceptedTypes?.join(",") || ""}
                      onChange={e => handleFieldChange("acceptedTypes", e.target.value.split(",").map(s => s.trim()))}
                    />
                    <Input
                      type="number"
                      placeholder="Max file size (MB)"
                      value={fieldDraft.maxSize || 5}
                      onChange={e => handleFieldChange("maxSize", parseInt(e.target.value) || 5)}
                    />
                  </div>
                )}
                {isEditingField !== null ? (
                  <Button size="sm" onClick={updateField}>Update</Button>
                ) : (
                  <Button size="sm" onClick={addField}>Add</Button>
                )}
              </div>
            </div>
            <Button className="bg-yellow-400 text-black font-medium px-8 py-3 h-12" onClick={saveTemplate}>
              {template._id ? "Update Template" : "Save Template"}
            </Button>
            {template._id && (
              <Button className="ml-4 bg-red-500 text-white font-medium px-8 py-3 h-12" onClick={() => handleDeleteTemplate(template._id!)}>
                Delete Template
              </Button>
            )}
            {message && <div className="mt-2 text-green-600 font-medium">{message}</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 