"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Trash2, 
  FileText, 
  Clock, 
  ChevronRight, 
  History,
  ClipboardEdit,
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming Input is correctly imported from ui
import { Label } from "@/components/ui/label"; // Assuming Label is correctly imported from ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming Select components are correctly imported from ui
import { Checkbox } from "@/components/ui/checkbox"; // Assuming Checkbox is correctly imported from ui
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea is correctly imported from ui
import { DatePicker } from "@/components/ui/date-picker"; // Assuming DatePicker is correctly imported from ui


import { useSession } from "next-auth/react";
import { uploadFile } from "@/utils/fileUploadService";
import { useCreateLoanMutation } from "@/redux/services/loanApi";
import { useGetLoanTemplateByIdQuery } from "@/redux/services/loanTemplateApi";
import { useSearchParams, useRouter as useNextRouter, redirect } from "next/navigation"; // Renamed useRouter to avoid conflict
import { RequireFeature } from "@/components/RequireFeature";
import { useNotifySuperAdminMutation } from "@/redux/services/notificationApi"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText as DialogDescription, // Renamed to avoid conflict
  DialogActions as DialogHeader, // Renamed to avoid conflict
} from "@mui/material";


export default function LoanForm() {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [message, setMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showDraftModal, setShowDraftModal] = useState<boolean>(false);
  const [savedDrafts, setSavedDrafts] = useState<any[]>([]);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useNextRouter(); // Use aliased useRouter
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
		setIsSubmitting(true);

		if (!templateData?._id) {
			setMessage("No template found for this loan type.");
			setIsSubmitting(false);
			return;
		}

		// Check if any files are still uploading
		if (Object.values(uploading).some((status) => status === true)) {
			setMessage("Please wait for all file uploads to complete before submitting.");
			setIsSubmitting(false);
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
			setMessage(`Please fill all required fields: ${missingFields.join(", ")}`);
			setIsSubmitting(false);
			return;
		}

		// Check for any upload errors
		if (Object.keys(uploadErrors).length > 0) {
			setMessage("Please fix file upload errors before submitting.");
			setIsSubmitting(false);
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
				message: `A new form has been submitted for ${templateData.name} by ${subscriber}.`,
			}).unwrap();

			setFormSubmitted(true);
			setMessage("Form submitted successfully!");

			// Remove the draft from local storage if it was a draft
			if (draftId) {
				try {
					const storedDrafts = localStorage.getItem("loanFormDrafts");
					if (storedDrafts) {
						const parsedDrafts = JSON.parse(storedDrafts);
						const updatedDrafts = parsedDrafts.filter((draft: any) => draft.id !== draftId);
						localStorage.setItem("loanFormDrafts", JSON.stringify(updatedDrafts));
						setSavedDrafts(updatedDrafts);
					}
				} catch (error) {
					console.error("Error removing submitted draft:", error);
				}
			}

			// Redirect to return URL or default to appropriate page based on loan type
			setTimeout(() => {
				// Default redirection based on loan type
				switch (templateData.loanType) {
					case "government":
						router.push("/crm/govt-loans");
						break;
					case "private":
						router.push("/crm/loans");
						break;
					case "quick":
						router.push("/crm/quick-loans");
						break;
					case "insurance":
						router.push("/crm/insurance");
						break;
					case "taxation":
						router.push("/crm/taxation");
						break;
					default:
						router.push("/crm/leads");
				}
			}, 1500);
		} catch (err) {
			setMessage("Error submitting form. Please try again.");
			console.error("Form submission error:", err);
		} finally {
			setIsSubmitting(false);
		}
	};

  // Function to handle loading a draft
  const loadDraft = (draftIdToLoad: string) => { // Renamed parameter to avoid conflict with outer scope draftId
      router.push(`/crm/loan-form?id=${id}&draft=${draftIdToLoad}`);
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
    const deleteDraft = (draftIdToDelete: string) => { // Renamed parameter to avoid conflict
    try {
      const storedDrafts = localStorage.getItem("loanFormDrafts");
      if (storedDrafts) {
        const parsedDrafts = JSON.parse(storedDrafts);
        const updatedDrafts = parsedDrafts.filter(
          (draft: any) => draft.id !== draftIdToDelete
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
    return new Intl.DateTimeFormat("en-IN", { // Changed to en-IN for Indian locale
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true // Ensure 12-hour format with AM/PM for India locale if preferred
    }).format(date);
  };

  return (
    <RequireFeature feature="Loans">
      <div className="min-h-screen bg-[#f3f3f3] p-4 sm:p-6 lg:p-8"> {/* Responsive padding */}
        <Card className="shadow-sm max-w-4xl mx-auto border-0 bg-white text-black">
          {/* Drafts Modal */}
          <Dialog
            open={showDraftModal}
            onClose={() => setShowDraftModal(false)}
            maxWidth="md" // Set max-width for Dialog
            fullWidth={true} // Allow it to take full width up to maxWidth
          >
            <DialogContent className="p-4 sm:p-6"> {/* Responsive padding */}
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-xl font-semibold mb-2">Saved Draft Applications</DialogTitle> {/* Responsive font size */}
                <DialogDescription className="text-sm text-gray-600 mb-4"> {/* Responsive font size */}
                  Your unsubmitted applications are automatically saved. Click
                  on any draft to continue working on it.
                </DialogDescription>
              </DialogHeader>

              {savedDrafts.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm"> {/* Responsive font size */}
                  No saved drafts found for this template.
                </div>
              ) : (
                <div className="overflow-y-auto max-h-[60vh]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 px-3 text-left text-xs sm:text-sm">Loan Type</th> {/* Responsive font size */}
                        <th className="py-2 px-3 text-left text-xs sm:text-sm">Date</th>
                        <th className="py-2 px-3 text-left text-xs sm:text-sm">Progress</th>
                        <th className="py-2 px-3 text-center text-xs sm:text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedDrafts
                        .filter((draft) => draft.templateId === id) // Only show drafts for current template
                        .map((draft) => (
                          <tr
                            key={draft.id}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-3 px-3 text-xs sm:text-sm">{draft.templateName}</td>
                            <td className="py-3 px-3 text-xs sm:text-sm">
                              {formatDate(draft.timestamp)}
                            </td>
                            <td className="py-3 px-3 text-xs sm:text-sm">
                              <div className="flex items-center gap-2">
                                <span>Page {draft.currentPage + 1}</span>
                                <div className="w-20 h-2 bg-gray-200 rounded-full sm:w-24"> {/* Responsive width */}
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
                              <div className="flex flex-col sm:flex-row justify-center gap-2"> {/* Stack buttons on mobile */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2 text-xs w-full sm:w-auto" // Adjusted height and width for responsiveness
                                  onClick={() => loadDraft(draft.id)}
                                >
                                  Continue
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 w-full sm:w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" // Adjusted height and width for responsiveness
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
          <CardHeader className="p-4 sm:p-6"> {/* Responsive padding */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> {/* Stack on mobile */}
              <div className="mb-4 sm:mb-0"> {/* Margin for title/description on mobile */}
                <h2 className="text-lg sm:text-xl font-semibold text-[#2d2c2c]"> {/* Responsive font size */}
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
                className="flex items-center gap-1 text-sm w-full sm:w-auto justify-center mt-2 sm:mt-0" // Responsive width and margin
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
          <CardContent className="p-4 sm:p-6"> {/* Responsive padding */}
            {isLoading ? (
              <div className="text-gray-500 text-center py-10">Loading template...</div>
            ) : !templateData ? (
              <div className="text-gray-500 text-center py-10">
                No template found for this loan type.
              </div>
            ) : totalPages === 0 ? (
              <div className="text-gray-500 text-center py-10">
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
                  <div className="flex items-center justify-center w-full overflow-x-auto pb-2 custom-scrollbar"> {/* Added overflow-x-auto and custom-scrollbar */}
                    {Array.from({ length: totalPages }, (_, index) => (
                      <div key={index} className="flex items-center flex-shrink-0"> {/* flex-shrink-0 to prevent shrinking circles */}
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
                            className={`h-1 flex-grow mx-1 ${index < currentPage ? "bg-yellow-400" : "bg-gray-200"} min-w-[20px] sm:min-w-[40px]`} // Flex-grow and min-width for responsiveness
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
                              // This ensures the value cannot be negative or zero for age fields
                              min={field.label.toLowerCase().includes("age") ? "1" : undefined}
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
                              className="cursor-pointer w-full" // Added w-full
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
                                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 hover:bg-gray-50 transition-colors" // Responsive padding
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
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 border rounded-lg bg-gray-50"> {/* Stack on mobile */}
                                  <div className="bg-blue-100 p-2 rounded flex-shrink-0">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div className="flex-grow min-w-0 mb-2 sm:mb-0"> {/* Margin for text on mobile */}
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
                                    className="flex-shrink-0 h-8 px-2 text-xs border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 w-full sm:w-auto" // Responsive width
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
                <div className="flex flex-col sm:flex-row justify-between pt-6 gap-4"> {/* Stack on mobile, add gap */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"> {/* Stack internal buttons on mobile */}
                    <Button
                      type="button"
                      onClick={prevPage}
                      className="bg-gray-200 text-black font-medium px-6 py-2 flex items-center gap-2 w-full sm:w-auto" // Responsive width
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
                      className="border-gray-300 text-gray-700 font-medium w-full sm:w-auto" // Responsive width
                    >
                      Save Progress
                    </Button>
                  </div>

                  {currentPage < totalPages - 1 ? (
                    <Button
                      type="button"
                      onClick={nextPage}
                      className="bg-yellow-400 text-black font-medium px-6 py-2 flex items-center gap-2 w-full sm:w-auto" // Responsive width
                    >
                      Next <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={submitForm}
                      disabled={isSubmitting}
                      className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-medium px-8 py-2 flex items-center gap-2 w-full sm:w-auto transition-colors duration-200" // Responsive width
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application <Check className="h-4 w-4" />
                        </>
                      )}
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