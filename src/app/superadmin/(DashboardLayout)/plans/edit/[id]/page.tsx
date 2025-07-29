"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { planSchema, PlanFormData } from "@/lib/validation/planSchema";
import { useGetPlanByIdQuery, useUpdatePlansMutation } from "@/redux/services/plansApi";
import { features } from "../../page";
import Loading from "@/components/Loading";

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
      <Loading/>
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
    <div className="min-h-screen py-10 px-4 bg-white">
      <div className="max-w-3xl mx-auto bg-white border-2 border-black shadow-[6px_6px_0_0_#000] rounded-xl p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-black text-center mb-2">
          Edit <span className="text-[#FFD439]">Plan</span>
        </h1>
        <p className="text-center text-gray-600 mb-6">Update your subscription plan</p>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Plan Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white focus:ring-2 focus:ring-black"
              placeholder="Enter plan name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Amount (₹) *</label>
              <input
                name="amount"
                type="number"
                min="1"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">Duration (months) *</label>
              <input
                name="duration"
                type="number"
                min="0"
                value={formData.duration}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white"
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
              className="w-full px-4 py-2 border-2 border-black rounded-lg bg-white"
              placeholder="Search features..."
            />

            {showDropdown && (
              <div className="mt-2 border-2 border-black rounded-xl bg-white shadow-[6px_6px_0_0_#000] max-h-60 overflow-y-auto">
                <div className="flex justify-end px-4 py-2 border-b border-black">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(false)}
                    className="text-sm text-black hover:text-gray-600"
                  >
                    ✕ Close
                  </button>
                </div>
                {filteredFeatures.map((feature) => (
                  <div
                    key={feature}
                    onClick={() => handleFeatureToggle(feature)}
                    className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#FFD439] ${
                      formData.features.includes(feature) ? "bg-[#FFD439]" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      readOnly
                      className="w-4 h-4 border-2 border-black rounded"
                    />
                    <span className="ml-3 text-sm">{feature.replace(/([A-Z])/g, " $1").trim()}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {formData.features.map((feature) => (
                <span
                  key={feature}
                  className="flex items-center bg-black text-white text-sm px-3 py-1 rounded-full"
                >
                  {feature.replace(/([A-Z])/g, " $1").trim()}
                  <button
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className="ml-2 hover:text-[#FFD439]"
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
              className="w-4 h-4 border-2 border-black rounded"
            />
            <label htmlFor="isActive" className="ml-3 text-sm text-black">
              Active Plan
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-black">
            <button
              type="submit"
              disabled={loading}
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg border-2 border-black font-medium"
            >
              {loading ? "Updating..." : "Update Plan"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg border-2 border-black font-medium"
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
