"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import {
  useGetLoanTemplateByNameQuery,
  useCreateLoanMutation,
} from '@/redux/adminApi';
import { useSearchParams } from 'next/navigation';

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

export default function LoanForm() {
  // Remove: const [template, setTemplate] = useState<LoanFormTemplate | null>(null)
  const [formValues, setFormValues] = useState<Record<string, any>>({})
  const [message, setMessage] = useState<string>("")
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const subtype = searchParams.get('subtype')?.toLowerCase() || '';
  const { data: templateData, isLoading } = useGetLoanTemplateByNameQuery(subtype, { skip: !subtype });
  const [createLoanFormSubmission] = useCreateLoanMutation();

  // Form preview handlers
  const handleFormValueChange = (label: string, value: any) => {
    setFormValues(prev => ({ ...prev, [label]: value }))
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!templateData?._id) {
      setMessage("No template found for this loan type.");
      return;
    }
    for (const field of templateData.fields) {
      if (field.required && !formValues[field.label]) {
        setMessage(`Please fill required field: ${field.label}`);
        return;
      }
    }
    const applicant = session?.user?.email;
    try {
      await createLoanFormSubmission({ values: formValues, applicant, loanSubType: templateData.name, loanType: templateData.loanType }).unwrap();
      setMessage("Form submitted successfully!");
      setFormValues({});
    } catch (err) {
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] p-4">
      <Card className="shadow-sm max-w-4xl mx-auto border-0 bg-white text-black">
        <CardHeader>
          <h2 className="text-lg font-semibold text-[#2d2c2c]">Form Preview</h2>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-gray-500">Loading template...</div>
          ) : !templateData ? (
            <div className="text-gray-500">No template found for this loan type.</div>
          ) : templateData.fields.length === 0 ? (
            <div className="text-gray-500">No fields defined in this template.</div>
          ) : (
            <form className="space-y-4" onSubmit={submitForm}>
              {templateData.fields.map((field: any, idx: number) => {
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
                            {field.options?.map((opt: any) => (
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
              <Button type="submit" className="bg-yellow-400 text-black font-medium px-8 py-3 h-12">Submit Form</Button>
            </form>
          )}
          {message && <div className="mt-2 text-green-600 font-medium">{message}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
