"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { planSchema, PlanFormData } from "@/lib/validation/planSchema";
import { features } from "../page";
import { useCreatePlanMutation } from "@/redux/services/plansApi";

const AddPlanPage = () => {
  const router = useRouter();
  const [createPlan] = useCreatePlanMutation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    amount: 0,
    duration: 1,
    features: [],
    isActive: true,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const filteredFeatures = features.filter((feature) =>
    feature.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = planSchema.safeParse(formData);
    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message).join(", ");
      setError(messages);
      return;
    }

    setLoading(true);
    try {
      await createPlan(result.data).unwrap();
      router.push("/superadmin/plans");
    } catch (err: any) {
      setError(err?.data?.message || "Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6 md:py-10 px-3 sm:px-4 bg-white">
      {/* Fixed width issue: Added max-w-full and adjusted padding */}
      <div className="w-[95vw] max-w-full sm:max-w-3xl mx-auto bg-white border-2 border-black shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] rounded-xl p-4 sm:p-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black text-center mb-1 md:mb-2">
          Add <span className="text-[#FFD439]">Plan</span>
        </h1>
        <p className="text-center text-gray-600 text-sm md:text-base mb-4 md:mb-6">
          Create a new subscription plan
        </p>

        {error && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Plan Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 border-2 border-black rounded-lg bg-white focus:ring-2 focus:ring-black text-sm sm:text-base"
              placeholder="Enter plan name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="min-w-0">
              <label className="block text-sm font-medium text-black mb-1">Amount (₹) *</label>
              <input
                name="amount"
                type="number"
                min="1"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-2 border-2 border-black rounded-lg bg-white text-sm sm:text-base"
              />
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-black mb-1"> Duration (months) * (0 = lifetime) </label>
              <input
                name="duration"
                type="number"
                min="0"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-3 sm:px-4 py-2 border-2 border-black rounded-lg bg-white text-sm sm:text-base"
              />
            </div>
          </div>

          <div ref={dropdownRef}>
            <label className="block text-sm font-medium text-black mb-1">
              Features * (search to select)
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
              className="w-full px-3 sm:px-4 py-2 border-2 border-black rounded-lg bg-white text-sm sm:text-base"
              placeholder="Search features..."
            />

            {showDropdown && (
              <div className="mt-2 border-2 border-black rounded-xl bg-white shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] max-h-60 overflow-y-auto">
                <div className="flex justify-end px-3 sm:px-4 py-2 border-b border-black">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(false)}
                    className="text-xs sm:text-sm text-black hover:text-gray-600"
                  >
                    ✕ Close
                  </button>
                </div>
                {filteredFeatures.map((feature) => (
                  <div
                    key={feature}
                    onClick={() => handleFeatureToggle(feature)}
                    className={`flex items-center px-3 sm:px-4 py-2 cursor-pointer hover:bg-[#FFD439] ${
                      formData.features.includes(feature) ? "bg-[#FFD439]" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      readOnly
                      className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-black rounded flex-shrink-0"
                    />
                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm break-words">
                      {feature.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {formData.features.map((feature) => (
                <span
                  key={feature}
                  className="flex items-center bg-black text-white text-xs sm:text-sm px-2.5 sm:px-3 py-1 rounded-full max-w-[90%] truncate"
                >
                  <span className="truncate">
                    {feature.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className="ml-1.5 sm:ml-2 hover:text-[#FFD439] text-sm flex-shrink-0"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-black rounded flex-shrink-0"
            />
            <label htmlFor="isActive" className="ml-2 sm:ml-3 text-xs sm:text-sm text-black">
              Active Plan
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t-2 border-black">
            <button
              type="submit"
              disabled={loading}
              className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border-2 border-black font-medium text-sm sm:text-base"
            >
              {loading ? "Creating..." : "Create Plan"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white text-black hover:bg-gray-100 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border-2 border-black font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlanPage;