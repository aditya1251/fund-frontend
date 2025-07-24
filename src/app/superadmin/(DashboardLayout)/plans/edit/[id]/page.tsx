"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { planSchema, PlanFormData } from "@/lib/validation/planSchema";
import { useGetPlanByIdQuery, useUpdatePlansMutation } from "@/redux/services/plansApi";
import { features } from "../../page";

const EditPlanPage = () => {
  const router = useRouter();
  const params = useParams();
  
  const planId = params.id as string;
  
  const { data: plan, isLoading: planLoading, error: planError } = useGetPlanByIdQuery(planId);
  const [updatePlan] = useUpdatePlansMutation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<PlanFormData>({
    name: "",
    amount: 0,
    duration: 0,
    features: [],
    isActive: true,
  });

  // Populate form data when plan is loaded
  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name || "",
        amount: plan.amount || 0,
        duration: plan.duration || 0,
        features: plan.features || [],
        isActive: plan.isActive ?? true,
      });
    }
  }, [plan]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === "isActive") {
      setFormData((prev) => ({ ...prev, isActive: checked }));
    }
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
      const errorMessages = result.error.issues.map((e) => e.message).join(", ");
      setError(errorMessages);
      return;
    }

    setLoading(true);
    try {
      const updatedPlan = await updatePlan({ id: planId, data: result.data }).unwrap();
      console.log("Plan updated:", updatedPlan);
      router.push("/superadmin/plans");
    } catch (err: any) {
      setError(err?.data?.message || "Failed to update plan");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.back();

  if (planLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#ffd439]"></div>
      </div>
    );
  }

  if (planError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Failed to load plan</p>
          <button
            onClick={() => router.back()}
            className="bg-[#ffd439] hover:bg-[#e6bf33] text-black px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          EDIT <span className="text-[#ffd439]">PLAN</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Update your subscription plan details
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col items-start gap-6 w-full p-6 rounded-[16px] border-3 border-black bg-[#FFD439] transition-all duration-300 shadow-[10px_10px_0_0_#000]">
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
              Plan Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-black rounded-lg focus:ring-2 focus:ring-[#ffd439] focus:border-black bg-white"
              placeholder="Enter plan name"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-black mb-2">
                Amount (₹) *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="1"
                className="w-full px-4 py-3 border-2 border-black rounded-lg bg-white"
                placeholder="Enter amount"
                required
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-black mb-2">
                Duration (months) * (0 = lifetime)
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 border-2 border-black rounded-lg bg-white"
                placeholder="Enter duration"
                required
              />
            </div>
          </div>

          <div ref={dropdownRef} className="relative">
            <label className="block text-sm font-medium text-black mb-2">
              Features * (Search and select)
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowDropdown(true)}
              className="w-full px-4 py-3 border-2 border-black rounded-lg bg-white"
              placeholder="Search features..."
            />

            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border-2 border-black rounded-lg shadow-[6px_6px_0_0_#000] max-h-60 overflow-y-auto">
                <div className="flex justify-end px-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(false)}
                    className="text-sm text-black hover:text-gray-700"
                  >
                    ✕ Close
                  </button>
                </div>
                {filteredFeatures.map((feature) => (
                  <div
                    key={feature}
                    className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#ffd439] ${
                      formData.features.includes(feature) ? "bg-[#ffd439]" : ""
                    }`}
                    onClick={() => handleFeatureToggle(feature)}
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      readOnly
                      className="w-5 h-5 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm text-black">
                      {feature.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-black text-white"
                >
                  {feature.replace(/([A-Z])/g, " $1").trim()}
                  <button
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className="ml-2 text-white hover:text-[#ffd439]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleCheckboxChange}
              className="w-5 h-5 border-2 border-black rounded"
            />
            <label htmlFor="isActive" className="ml-3 text-sm font-medium text-black">
              Active Plan
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-black">
            <button
              type="submit"
              disabled={loading}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white px-10 py-4 rounded-lg font-medium flex items-center justify-center border-2 border-black transition-all duration-300"
            >
              {loading ? "Updating..." : "Update Plan"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-50 text-black px-10 py-4 rounded-lg font-medium border-2 border-black transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlanPage;
