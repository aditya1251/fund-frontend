"use client";

import React, { JSX, useEffect, useState } from "react";
import { Plus, User, Home, Building2, Car, Landmark, X } from "lucide-react";
import {
  useGetLoanTemplatesByTypeQuery,
  useCreateLoanTemplateMutation,
} from "@/redux/services/loanTemplateApi";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

/**
 * Icon mapping for different loan types
 * Maps loan category keywords to their corresponding Lucide React icons
 */
const iconMap: Record<string, JSX.Element> = {
  personal: <User className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  business: <Building2 className="w-5 h-5" />,
  car: <Car className="w-5 h-5" />,
  property: <Landmark className="w-5 h-5" />,
};

/**
 * Utility function to determine the appropriate icon for a loan template
 *
 * Performs case-insensitive matching of loan names to icon categories.
 * Uses substring matching to handle variations in naming conventions.
 *
 * @param name - The loan template name to match against
 * @returns JSX element containing the appropriate icon
 */
const getIcon = (name: string): JSX.Element => {
  const key = name.toLowerCase();
  if (key.includes("personal")) return iconMap.personal;
  if (key.includes("home")) return iconMap.home;
  if (key.includes("business")) return iconMap.business;
  if (key.includes("car")) return iconMap.car;
  if (key.includes("property")) return iconMap.property;
  return <User className="w-5 h-5" />; // Default fallback icon
};

/**
 * LoanHeader Component
 *
 * Displays and manages loan templates for a specific loan type category.
 * Provides functionality to view existing templates and create new ones.
 *
 * Features:
 * - Display loan templates in a responsive grid layout
 * - Template selection functionality with visual feedback
 * - Modal-based loan template creation
 * - Icon-based categorization of loan types
 * - Loading and error state handling
 *
 * @param loan - The loan type category (e.g., "private", "government")
 * @param selected - Currently selected template ID
 * @param setSelected - Function to update the selected template
 */
const LoanHeader = ({
  loan,
  selected,
  setSelected,
}: {
  loan: string;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  // Get current user session for authentication and user identification
  const { data: session } = useSession();

  // Fetch loan templates for the specified loan type with loading/error states
  const { data, isLoading, error, refetch } =
    useGetLoanTemplatesByTypeQuery(loan);

  // Mutation hook for creating new loan templates with loading state
  const [createLoanTemplate, { isLoading: isCreating }] =
    useCreateLoanTemplateMutation();

  // Modal visibility state for the loan creation form
  const [showModal, setShowModal] = useState(false);

  // Form data state for new loan template creation
  const [formData, setFormData] = useState({
    name: "", // Template name
    icon: "", // Icon keyword for categorization
    description: "", // Template description
  });

  /**
   * Handles the creation of a new loan template
   *
   * Creates a loan template with default structure including:
   * - Basic template information (name, description, icon)
   * - Default "Personal Info" page with required fields
   * - Proper categorization by loan type
   *
   * On success: closes modal, resets form, and refetches data
   * On error: handles gracefully (error logging handled elsewhere)
   */
  const handleCreate = async () => {
    try {
      await createLoanTemplate({
        ...formData,
        loanType: loan,
        createdBy: session?.user?.email ?? "Admin123", // Use session email or fallback
        pages: [
          {
            title: "Personal Info",
            pageNumber: 1,
            fixed: true, // Cannot be deleted or reordered
            fields: [
              // Standard required fields for all loan applications
              { label: "Name", type: "text", required: true, fixed: true },
              { label: "Email", type: "text", required: true, fixed: true },
              { label: "Phone", type: "text", required: true, fixed: true },
              { label: "Age", type: "number", required: true, fixed: true },
            ],
          },
        ],
      }).unwrap();

      // Reset UI state after successful creation
      setShowModal(false);
      setFormData({ name: "", icon: "", description: "" });
      refetch(); // Refresh the templates list
    } catch {
      /* Error handling is managed by the global error handler */
    }
  };

  // Loading state - show spinner while fetching templates
  if (isLoading) return <Loading />;

  // Error state - display user-friendly error message
  if (error)
    return (
      <div className="text-red-500 text-center py-10">
        Error loading loan templates
      </div>
    );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Page Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Page title with capitalized loan type */}
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          {loan.charAt(0).toUpperCase() + loan.slice(1)} Loans
        </h2>

        {/* Add new template button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm bg-black text-white rounded-full border-2 border-black hover:bg-neutral-700 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Loan Template
        </button>
      </div>

      {/* Loan Template Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {data?.map(
          (template: { id: string; name: string; description: string }) => (
            <div
              key={template.id}
              onClick={() => setSelected(template.id)}
              className={`flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border-2 border-black transition-all duration-200 cursor-pointer ${
                selected === template.id
                  ? "bg-[#FFD439]" // Highlight selected template with yellow background
                  : "bg-white shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-px hover:translate-y-px" // Neumorphism effect on hover
              }`}
            >
              {/* Template icon based on name/category */}
              <div className="text-black shrink-0">
                {getIcon(template.name)}
              </div>

              {/* Template information */}
              <div>
                <div className="font-semibold text-base md:text-lg text-black capitalize">
                  {template.name}
                </div>
                <p className="text-xs text-gray-600">{template.description}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Create New Loan Template Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-2 sm:p-4">
          <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg p-4 md:p-6 rounded-xl border-2 border-black shadow-[6px_6px_0_0_#000] relative">
            {/* Modal close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 md:top-3 md:right-3 p-2 text-black hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal title */}
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black">
              Create New Loan
            </h3>

            {/* Loan template creation form */}
            <div className="space-y-4">
              {/* Template name input */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border-2 border-black px-3 py-2 rounded-lg bg-white text-sm"
                  placeholder="Loan name"
                />
              </div>

              {/* Icon keyword input for categorization */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Icon Keyword
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full border-2 border-black px-3 py-2 rounded-lg bg-white text-sm"
                  placeholder="e.g., car, home"
                />
              </div>

              {/* Template description input */}
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border-2 border-black px-3 py-2 rounded-lg bg-white text-sm"
                  placeholder="Loan description"
                />
              </div>

              {/* Form submission section */}
              <div className="text-right pt-4">
                <button
                  onClick={handleCreate}
                  disabled={isCreating}
                  className={`px-5 py-2 rounded-full border-2 border-black transition-all flex items-center gap-2 ml-auto text-sm ${
                    isCreating
                      ? "bg-gray-400 cursor-not-allowed text-white" // Disabled state styling
                      : "bg-black text-white hover:bg-neutral-700 cursor-pointer" // Active state styling
                  }`}
                >
                  {isCreating ? (
                    <>
                      {/* Loading spinner for creation in progress */}
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating...
                    </>
                  ) : (
                    "Create Loan"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanHeader;
