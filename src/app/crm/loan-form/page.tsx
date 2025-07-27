"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  History,
  Trash2,
  Upload,
  FileText,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { uploadFile } from "@/utils/fileUploadService";
import { useCreateLoanMutation } from "@/redux/services/loanApi";
import { useGetLoanTemplateByIdQuery } from "@/redux/services/loanTemplateApi";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import { RequireFeature } from "@/components/RequireFeature";
import { useNotifySuperAdminMutation } from "@/redux/services/notificationApi"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText as DialogDescription,
  DialogActions as DialogHeader,
} from "@mui/material";

export default function LoanForm() {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [message, setMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [showDraftModal, setShowDraftModal] = useState<boolean>(false);
  const [savedDrafts, setSavedDrafts] = useState<any[]>([]);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id") || "";
  const draftId = searchParams.get("draft") || "";

  // Get template data by ID or name
  const { data: templateData, isLoading } = useGetLoanTemplateByIdQuery(id, {
    skip: !id,
  });

  const [createLoanFormSubmission] = useCreateLoanMutation();
  const [notifySuperAdmin] = useNotifySuperAdminMutation();

  // Load saved drafts from local storage
  useEffect(() => {
    const loadDrafts = () => {
      try {
        const storedDrafts = localStorage.getItem("loanFormDrafts");
        if (storedDrafts) {
          const parsedDrafts = JSON.parse(storedDrafts);
          setSavedDrafts(parsedDrafts);
        }
      } catch (error) {
        console.error("Error loading drafts:", error);
      }
    };

    loadDrafts();
  }, []);

  // Form handlers
  const handleFormValueChange = (label: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [label]: value }));
  };

  // Handle document file uploads
  const handleFileUpload = async (
    label: string,
    file: File,
    fieldConfig: any
  ) => {
    try {
      setUploading((prev) => ({ ...prev, [label]: true }));

      // Check file size
      const maxSizeMB = fieldConfig.maxSize || 5;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        setMessage(`File size must be less than ${maxSizeMB}MB`);
        setUploading((prev) => ({ ...prev, [label]: false }));
        setUploadErrors((prev) => ({
          ...prev,
          [label]: `File size exceeds ${maxSizeMB}MB limit`,
        }));
        return;
      }

      // Check file type
      const acceptedTypes = fieldConfig.acceptedTypes || [
        "pdf",
        "jpg",
        "jpeg",
        "png",
      ];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension && !acceptedTypes.includes(fileExtension)) {
        setMessage(`Only ${acceptedTypes.join(", ")} files are allowed`);
        setUploading((prev) => ({ ...prev, [label]: false }));
        setUploadErrors((prev) => ({
          ...prev,
          [label]: `Invalid file type. Accepted: ${acceptedTypes.join(", ")}`,
        }));
        return;
      }

      // Upload file
      const uploadResult = await uploadFile(file)

      // Store the filename from S3 in the form values
      setFormValues((prev) => ({
        ...prev,
        [label]: uploadResult.filename,
      }));
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setUploadErrors((prev) => ({
        ...prev,
        [label]: `Upload failed: ${error.message}`,
      }));
      setMessage(`File upload failed: ${error.message}`);
    } finally {
      setUploading((prev) => ({ ...prev, [label]: false }));
    }
  };

  // Get current page fields
  const currentPageData = templateData?.pages?.[currentPage] || { fields: [] };
  const totalPages = templateData?.pages?.length || 0;

  // Load draft if draftId is provided in URL
  useEffect(() => {
    if (draftId && templateData) {
      try {
        const storedDrafts = localStorage.getItem("loanFormDrafts");
        if (storedDrafts) {
          const parsedDrafts = JSON.parse(storedDrafts);
          const selectedDraft = parsedDrafts.find(
            (draft: any) => draft.id === draftId
          );

          if (selectedDraft && selectedDraft.templateId === id) {
            // Load saved form values including document references
            setFormValues(selectedDraft.formData);
            setCurrentPage(selectedDraft.currentPage || 0);
            setMessage("Draft loaded successfully");
            setTimeout(() => setMessage(""), 3000);
          }
        }
      } catch (error) {
        console.error("Error loading specific draft:", error);
      }
    }
  }, [draftId, templateData, id]);

  // Auto-save form values every 10 seconds if there are changes and form isn't submitted
  useEffect(() => {
    if (!templateData || formSubmitted || Object.keys(formValues).length === 0)
      return;

    const autoSaveInterval = setInterval(() => {
      saveDraft();
    }, 10000); // Save every 10 seconds

    return () => clearInterval(autoSaveInterval);
  }, [formValues, formSubmitted, templateData]);

  // Function to save current form state as draft
  const saveDraft = () => {
    if (!templateData || formSubmitted) return;

    try {
      const storedDrafts = localStorage.getItem("loanFormDrafts");
      let drafts = storedDrafts ? JSON.parse(storedDrafts) : [];
      
      // Use the draft ID from URL if it exists
      const urlDraftId = searchParams.get("draft");
      
      // Check if a draft for this template already exists
      let existingDraftIndex = -1;
      
      if (urlDraftId) {
        // If we have a draft ID in the URL, find that specific draft
        existingDraftIndex = drafts.findIndex(
          (draft: any) => draft.id === urlDraftId
        );
      } else {
        // Otherwise, check if we already have a draft for this template
        existingDraftIndex = drafts.findIndex(
          (draft: any) => draft.templateId === id
        );
      }
      
      // Generate draft ID - either use existing one or create new
      const draftId = urlDraftId || 
                      (existingDraftIndex >= 0 ? drafts[existingDraftIndex].id : `draft_${Date.now()}`);
      

      const newDraft = {
        id: draftId,
        templateId: id,
        templateName: templateData.name,
        formData: formValues,
        currentPage: currentPage,
        timestamp: new Date().toISOString(),
        loanType: templateData.loanType,
      };

      if (existingDraftIndex >= 0) {
        // Update existing draft
        drafts[existingDraftIndex] = newDraft;
      } else {
        // Add new draft
        drafts.push(newDraft);
      }

      // Keep only the latest 10 drafts
      if (drafts.length > 10) {
        drafts = drafts
          .sort(
            (a: any, b: any) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .slice(0, 10);
      }

      localStorage.setItem("loanFormDrafts", JSON.stringify(drafts));
      setSavedDrafts(drafts);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  // Navigate pages
  const nextPage = () => {
    // Validate current page fields first
    const missingFields = [];
    for (const field of currentPageData.fields) {
      if (field.required && !formValues[field.label]) {
        missingFields.push(field.label);
      }
    }

    if (missingFields.length > 0) {
      setMessage(`Please fill required fields: ${missingFields.join(", ")}`);
      return;
    }

    setMessage("");
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    setMessage("");
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!templateData?._id) {
      setMessage("No template found for this loan type.");
      return;
    }

    // Check if any files are still uploading
    if (Object.values(uploading).some((status) => status === true)) {
      setMessage(
        "Please wait for all file uploads to complete before submitting."
      );
      return;
    }

    // Validate all required fields
    const missingFields = [];
    for (const page of templateData.pages) {
      for (const field of page.fields) {
        if (field.required && !formValues[field.label]) {
          missingFields.push(field.label);
        }
      }
    }

    if (missingFields.length > 0) {
      setMessage(
        `Please fill all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    // Check for any upload errors
    if (Object.keys(uploadErrors).length > 0) {
      setMessage("Please fix file upload errors before submitting.");
      return;
    }

    const subscriber = session?.user?.email;
    const dsaId = session?.user?.id;
    const rmId = session?.user?.rmId;

    try {
      // Form submission with uploaded document filenames and user info
      await createLoanFormSubmission({
        formData: formValues,
        subscriber,
        dsaId,
        rmId,
        loanSubType: templateData.name,
        loanType: templateData.loanType,
        templateId: templateData._id,
      }).unwrap();
      await notifySuperAdmin({
        title: `New Form Submission - ${templateData.name}`,
        message: `A new form has been submitted for ${templateData.name} by ${subscriber}.`
      }).unwrap();

      setFormSubmitted(true);
      setMessage("Form submitted successfully!");

      // Remove the draft from local storage if it was a draft
      if (draftId) {
        try {
          const storedDrafts = localStorage.getItem("loanFormDrafts");
          if (storedDrafts) {
            const parsedDrafts = JSON.parse(storedDrafts);
            const updatedDrafts = parsedDrafts.filter(
              (draft: any) => draft.id !== draftId
            );
            localStorage.setItem(
              "loanFormDrafts",
              JSON.stringify(updatedDrafts)
            );
            setSavedDrafts(updatedDrafts);
          }
        } catch (error) {
          console.error("Error removing submitted draft:", error);
        }
      }

      // Reset form after submission
      setTimeout(() => {
        redirect(`/crm/loans`);
      }, 500);
    } catch (err) {
      setMessage("Error submitting form");
    }
  };

  // Function to handle loading a draft
  const loadDraft = (draftId: string) => {
      router.push(`/crm/loan-form?id=${id}&draft=${draftId}`);
      setShowDraftModal(false);
    };
    
    // Function to deduplicate drafts by templateId
    const deduplicateDrafts = (drafts: any[]): any[] => {
      const uniqueDrafts: Record<string, any> = {};
      
      // Group drafts by templateId and keep only the latest one for each template
      drafts.forEach(draft => {
        const key = draft.templateId;
        if (!uniqueDrafts[key] || new Date(draft.timestamp) > new Date(uniqueDrafts[key].timestamp)) {
          uniqueDrafts[key] = draft;
        }
      });
      
      // Convert back to array
      return Object.values(uniqueDrafts);
    };
  
    // Function to delete a draft
    const deleteDraft = (draftId: string) => {
    try {
      const storedDrafts = localStorage.getItem("loanFormDrafts");
      if (storedDrafts) {
        const parsedDrafts = JSON.parse(storedDrafts);
        const updatedDrafts = parsedDrafts.filter(
          (draft: any) => draft.id !== draftId
        );
        localStorage.setItem("loanFormDrafts", JSON.stringify(updatedDrafts));
        setSavedDrafts(updatedDrafts);
      }
    } catch (error) {
      console.error("Error deleting draft:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <RequireFeature feature="Loans">
      <div className="min-h-screen bg-[#f3f3f3] p-4">
        <Card className="shadow-sm max-w-4xl mx-auto border-0 bg-white text-black">
          {/* Drafts Modal */}
          <Dialog
            open={showDraftModal}
            onClose={() => setShowDraftModal(false)}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Saved Draft Applications</DialogTitle>
                <DialogDescription>
                  Your unsubmitted applications are automatically saved. Click
                  on any draft to continue working on it.
                </DialogDescription>
              </DialogHeader>

              {savedDrafts.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No saved drafts found
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[60vh]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-3 text-left">Loan Type</th>
                        <th className="py-2 px-3 text-left">Date</th>
                        <th className="py-2 px-3 text-left">Progress</th>
                        <th className="py-2 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedDrafts
                        .filter((draft) => draft.templateId === id)
                        .map((draft) => (
                          <tr
                            key={draft.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-3">{draft.templateName}</td>
                            <td className="py-3 px-3">
                              {formatDate(draft.timestamp)}
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <span>Page {draft.currentPage + 1}</span>
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-2 bg-yellow-400 rounded-full"
                                    style={{
                                      width: `${
                                        ((draft.currentPage + 1) /
                                          (templateData?.pages?.length || 1)) *
                                        100
                                      }%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 px-2 text-xs"
                                  onClick={() => loadDraft(draft.id)}
                                >
                                  Continue
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => deleteDraft(draft.id)}
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </DialogContent>
          </Dialog>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-[#2d2c2c]">
                  {templateData?.name || "Loan Application"}
                </h2>
                {templateData?.description && (
                  <p className="text-sm text-gray-600">
                    {templateData.description}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-1 text-sm"
                onClick={() => {
                  // Refresh drafts list before showing modal
                  try {
                    const storedDrafts = localStorage.getItem('loanFormDrafts');
                    if (storedDrafts) {
                      const parsedDrafts = JSON.parse(storedDrafts);
                      
                      // Use our deduplicate function to clean up drafts
                      const uniqueDrafts = deduplicateDrafts(parsedDrafts);
                      
                      // Save the deduplicated drafts back to localStorage
                      localStorage.setItem('loanFormDrafts', JSON.stringify(uniqueDrafts));
                      setSavedDrafts(uniqueDrafts);
                    }
                  } catch (error) {
                    console.error('Error refreshing drafts:', error);
                  }
                  
                  setShowDraftModal(true);
                }}
              >
                <History className="w-4 h-4" /> Saved Drafts
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-gray-500">Loading template...</div>
            ) : !templateData ? (
              <div className="text-gray-500">
                No template found for this loan type.
              </div>
            ) : totalPages === 0 ? (
              <div className="text-gray-500">
                No pages defined in this template.
              </div>
            ) : formSubmitted ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  Form Submitted Successfully!
                </h3>
                <p className="text-gray-600">
                  Thank you for your submission. We'll process your request
                  shortly.
                </p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Step indicator with circles */}
                <div className="mb-6">
                  <div className="text-sm font-medium mb-2">
                    Step {currentPage + 1} / {totalPages}
                  </div>
                  <div className="flex items-center justify-center w-full">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <div key={index} className="flex items-center">
                        {/* Step circle */}
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                            index <= currentPage
                              ? "bg-yellow-400 text-black"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Connector line between circles */}
                        {index < totalPages - 1 && (
                          <div
                            className={`h-1 w-16 mx-1 ${
                              index < currentPage
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
                    {currentPageData.title}
                  </h3>
                  {currentPageData.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {currentPageData.description}
                    </p>
                  )}
                </div>

                {/* Current page fields */}
                <div className="space-y-4">
                  {currentPageData.fields.map((field: any, idx: number) => {
                    switch (field.type) {
                      case "text":
                      case "number":
                        return (
                          <div key={idx}>
                            <Label>
                              {field.label}
                              {field.required && " *"}
                            </Label>
                            <Input
                              type={field.type}
                              required={field.required}
                              placeholder={field.placeholder || ""}
                              value={
                                formValues[field.label] ||
                                field.defaultValue ||
                                ""
                              }
                              onChange={(e) =>
                                handleFormValueChange(
                                  field.label,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        );
                      case "date":
                        return (
                          <div key={idx}>
                            <Label>
                              {field.label}
                              {field.required && " *"}
                            </Label>
                            <DatePicker
                              date={
                                formValues[field.label]
                                  ? new Date(formValues[field.label])
                                  : undefined
                              }
                              setDate={(date) =>
                                handleFormValueChange(
                                  field.label,
                                  date ? date.toISOString().split("T")[0] : ""
                                )
                              }
                              className="cursor-pointer"
                            />
                          </div>
                        );
                      case "select":
                        return (
                          <div key={idx}>
                            <Label>
                              {field.label}
                              {field.required && " *"}
                            </Label>
                            <Select
                              value={
                                formValues[field.label] ||
                                field.defaultValue ||
                                ""
                              }
                              onValueChange={(v) =>
                                handleFormValueChange(field.label, v)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    field.placeholder || "Select option"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options?.map((opt: any) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        );
                      case "checkbox":
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <Checkbox
                              checked={
                                !!formValues[field.label] ||
                                !!field.defaultValue
                              }
                              onCheckedChange={(checked) =>
                                handleFormValueChange(field.label, !!checked)
                              }
                            />
                            <Label>
                              {field.label}
                              {field.required && " *"}
                            </Label>
                          </div>
                        );
                      case "textarea":
                        return (
                          <div key={idx}>
                            <Label>
                              {field.label}
                              {field.required && " *"}
                            </Label>
                            <Textarea
                              required={field.required}
                              placeholder={field.placeholder || ""}
                              value={
                                formValues[field.label] ||
                                field.defaultValue ||
                                ""
                              }
                              onChange={(e) =>
                                handleFormValueChange(
                                  field.label,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        );
                      case "document":
                        return (
                          <div key={idx}>
                            <Label>
                              {field.label}
                              {field.required && " *"}
                            </Label>
                            <div className="space-y-3">
                              {!formValues[field.label] ? (
                                <div>
                                  <div
                                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors"
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
                                    onDrop={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      e.currentTarget.classList.remove(
                                        "border-yellow-400",
                                        "bg-yellow-50"
                                      );

                                      if (
                                        e.dataTransfer.files &&
                                        e.dataTransfer.files[0]
                                      ) {
                                        handleFileUpload(
                                          field.label,
                                          e.dataTransfer.files[0],
                                          field
                                        );
                                      }
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center text-center">
                                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                      <p className="text-sm font-medium text-gray-700">
                                        {uploading[field.label] ? (
                                          <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Uploading...
                                          </span>
                                        ) : (
                                          <span>
                                            Click to upload or drag and drop
                                          </span>
                                        )}
                                      </p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        Accepted types:{" "}
                                        {field.acceptedTypes?.join(", ") ||
                                          "pdf, jpg, jpeg, png"}{" "}
                                        | Max size: {field.maxSize || 5}MB
                                      </p>
                                      <Input
                                        type="file"
                                        accept={
                                          field.acceptedTypes
                                            ?.map((type: string) => `.${type}`)
                                            .join(",") || ".pdf,.jpg,.jpeg,.png"
                                        }
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            handleFileUpload(
                                              field.label,
                                              file,
                                              field
                                            );
                                          }
                                        }}
                                        disabled={uploading[field.label]}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                      />
                                    </div>
                                  </div>

                                  {uploadErrors[field.label] && (
                                    <div className="flex items-start gap-2 mt-2 text-red-500 text-sm">
                                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                      <span>{uploadErrors[field.label]}</span>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
                                  <div className="bg-blue-100 p-2 rounded">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <div className="font-medium text-sm truncate">
                                      {formValues[field.label].originalName ||
                                        formValues[field.label].filename}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">
                                      Successfully uploaded
                                    </div>
                                  </div>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="flex-shrink-0 h-8 px-2 text-xs border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => {
                                      // Remove the file from form values
                                      const newFormValues = { ...formValues };
                                      delete newFormValues[field.label];
                                      setFormValues(newFormValues);

                                      // Clear any errors
                                      const newUploadErrors = {
                                        ...uploadErrors,
                                      };
                                      delete newUploadErrors[field.label];
                                      setUploadErrors(newUploadErrors);
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Remove
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between pt-6">
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={prevPage}
                      className="bg-gray-200 text-black font-medium px-6 py-2 flex items-center gap-2"
                      disabled={currentPage === 0}
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </Button>

                    <Button
                      type="button"
                      onClick={() => {
                        saveDraft();
                        setMessage("Progress saved successfully!");
                        setTimeout(() => setMessage(""), 3000);
                      }}
                      variant="outline"
                      className="border-gray-300 text-gray-700 font-medium"
                    >
                      Save Progress
                    </Button>
                  </div>

                  {currentPage < totalPages - 1 ? (
                    <Button
                      type="button"
                      onClick={nextPage}
                      className="bg-yellow-400 text-black font-medium px-6 py-2 flex items-center gap-2"
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={submitForm}
                      className="bg-yellow-400 text-black font-medium px-8 py-2 flex items-center gap-2"
                    >
                      Submit Application <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            )}
            {message && (
              <div className="mt-4 text-center p-3 rounded bg-yellow-50 text-yellow-700 font-medium">
                {message}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </RequireFeature>
  );
}
