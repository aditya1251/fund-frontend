"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeletePlanMutation,
  useGetPlansQuery,
  useUpdateActiveStatusMutation,
} from "@/redux/services/plansApi";
import Loading from "@/components/Loading";

export const features = [
  "Leads",
  "Loans",
  "Govt-Loans",
  "Insurance",
  "Quick-Loans",
  "Marketing-Materials",
  "Taxation",
  "Emi-Calculator",
  "Training-Support",
  "Feedback-Grievance",
];

type Plan = {
  _id: string;
  id?: string;
  name: string;
  description: string;
  amount: number;
  duration: number;
  features: string[];
  isActive: boolean;
};

const PlansPage = () => {
  const router = useRouter();
  const {
    data: plans = [],
    isLoading,
    error,
    refetch,
  } = useGetPlansQuery(undefined);
  const [deletePlan] = useDeletePlanMutation();
  const [toggleStatus] = useUpdateActiveStatusMutation();
  const [activeTab, setActiveTab] = useState("All Plans");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      await deletePlan(id).unwrap();
      await refetch();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const newStatus = currentStatus ? "inactive" : "active";
      await toggleStatus({ id, status: newStatus }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleEdit = (id: string) => router.push(`/superadmin/plans/edit/${id}`);
  const handleAdd = () => router.push("/superadmin/plans/add");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const getTabButtonClasses = (tabName: string) =>
    `px-4 py-2 md:px-6 md:py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ${
      activeTab === tabName
        ? "bg-[#ffd439] text-black"
        : "text-white hover:bg-gray-800"
    }`;

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load plans</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-3 py-6 md:px-4 md:py-10">
      {/* Header */}
      <div className="text-center mb-8 md:mb-16">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black mb-2 md:mb-4">
          MANAGE YOUR <span className="text-[#ffd439]">BUSINESS</span> PLANS
        </h1>
        <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
          Create, edit and manage your business plans with ease.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <div className="bg-black rounded-full p-1 flex space-x-1 md:space-x-2">
          {["All Plans", "Active", "Inactive"].map((tab) => (
            <button
              key={tab}
              className={getTabButtonClasses(tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 md:gap-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`bg-black hover:bg-gray-800 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-medium text-sm ${
              isRefreshing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans
          .filter((plan: Plan) => {
            if (activeTab === "Active") return plan.isActive;
            if (activeTab === "Inactive") return !plan.isActive;
            return true;
          })
          .map((plan: Plan) => (
            <div
              key={plan.id || plan._id}
              className={`flex flex-col bg-white rounded-[12px] md:rounded-[16px] p-4 md:p-6 border-2 border-black transition-all duration-300 ${
                plan.isActive
                  ? "bg-[#FFD439] shadow-[6px_6px_0_0_#000] md:shadow-[10px_10px_0_0_#000]"
                  : "bg-gray-100 shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000]"
              }`}
            >
              {/* Plan Header */}
              <div className="flex justify-between items-start mb-3 md:mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-black">
                  {plan.name}
                </h2>
                <span
                  className={`px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium ${
                    plan.isActive ? "bg-black text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-4 md:mb-6">
                <span className="text-2xl md:text-3xl font-bold text-black">
                  ₹{plan.amount}
                </span>
                {plan.duration > 0 && (
                  <span className="text-sm md:text-base text-gray-700">/{plan.duration}</span>
                )}
              </div>

              {/* Features */}
              <div className="flex-grow mb-4 md:mb-6">
                <h3 className="font-semibold text-black mb-2 md:mb-3 text-sm md:text-base">
                  Features:
                </h3>
                <div className="space-y-1.5 md:space-y-2">
                  {plan.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm md:text-base text-black">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(plan._id, plan.isActive)}
                  className={`flex-1 py-2 rounded-lg md:rounded-xl font-medium border-2 border-black text-xs md:text-sm ${
                    plan.isActive
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  {plan.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleEdit(plan._id)}
                  className="flex-1 py-2 rounded-lg md:rounded-xl font-medium bg-black text-white hover:bg-gray-900 border-2 border-black text-xs md:text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="flex-1 py-2 rounded-lg md:rounded-xl font-medium bg-white text-black hover:bg-gray-200 border-2 border-black text-xs md:text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-10 md:py-16">
          <p className="text-gray-500 text-base md:text-xl mb-4">No plans available</p>
          <button
            onClick={handleAdd}
            className="bg-[#ffd439] hover:bg-[#e6bf33] text-black px-6 py-3 rounded-full font-medium text-sm md:text-base"
          >
            Create Your First Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default PlansPage;