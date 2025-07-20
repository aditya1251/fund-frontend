"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeletePlanMutation, useGetPlansQuery, useUpdateActiveStatusMutation } from "@/redux/services/plansApi";

export const features = [
  "Leads",
  "Loans",
  "Govt-Loans",
  "Insurance",
  "QuickLoans",
  "Capaign-Marketing",
  "Taxation",
  "emiCalculator",
  "TrainingAndSupport",
  "FeedbackAndGrievance",
];

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

  const handleEdit = async (id: string) => {
    router.push(`/superadmin/plans/edit/${id}`);
  };

  const handleAdd = () => {
    router.push("/superadmin/plans/add");
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const getTabButtonClasses = (tabName: string) => {
    return `px-6 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ease-in-out ${
      activeTab === tabName
        ? "bg-[#ffd439] text-black"
        : "text-white hover:bg-gray-800"
    }`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#ffd439]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-xl">Failed to load plans</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
          MANAGE YOUR <span className="text-[#ffd439]">BUSINESS</span> PLANS
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create, edit and manage your business plans with ease.
        </p>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div className="bg-black rounded-full p-1 flex space-x-2">
          <button
            className={getTabButtonClasses("All Plans")}
            onClick={() => setActiveTab("All Plans")}
          >
            All Plans
          </button>
          <button
            className={getTabButtonClasses("Active")}
            onClick={() => setActiveTab("Active")}
          >
            Active
          </button>
          <button
            className={getTabButtonClasses("Inactive")}
            onClick={() => setActiveTab("Inactive")}
          >
            Inactive
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out ${
              isRefreshing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            onClick={handleAdd}
            className="bg-[#ffd439] hover:bg-[#e6bf33] text-black px-6 py-2 rounded-full font-medium transition-all duration-300 ease-in-out"
          >
            Add New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans
          .filter((plan:any) => {
            if (activeTab === "Active") return plan.isActive;
            if (activeTab === "Inactive") return !plan.isActive;
            return true;
          })
          .map((plan:any) => (
            <div
              key={plan.id}
              className={`flex flex-col bg-white rounded-[16px] p-6 border-3 border-black transition-all duration-300 ease-in-out ${
                plan.isActive
                  ? "bg-[#FFD439] shadow-[10px_10px_0_0_#000]"
                  : "bg-gray-100 shadow-[6px_6px_0_0_#000]"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-black">
                  {plan.name}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    plan.isActive
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-bold text-black">
                  ₹{plan.amount}
                </span>
                {plan.duration > 0 && (
                  <span className="text-gray-700">/{plan.duration}</span>
                )}
              </div>

              <div className="flex-grow mb-6">
                <h3 className="font-semibold text-black mb-3">Features:</h3>
                <div className="space-y-2">
                  {plan.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-black"
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
                      <span className="text-black">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggle(plan._id, plan.isActive)}
                  className={`flex-1 py-2 rounded-xl font-medium border-2 border-black transition-all hover:cursor-pointer duration-300 ${
                    plan.isActive
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-black text-white hover:bg-gray-900"
                  }`}
                >
                  {plan.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleEdit(plan._id)}
                  className="flex-1 py-2 rounded-xl font-medium bg-black text-white hover:bg-gray-900 hover:cursor-pointer border-2 border-black transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan._id)}
                  className="flex-1 py-2 rounded-xl font-medium bg-white text-black hover:bg-gray-200 hover:cursor-pointer border-2 border-black transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl mb-4">No plans available</div>
          <button
            onClick={handleAdd}
            className="bg-[#ffd439] hover:bg-[#e6bf33] text-black px-8 py-3 rounded-full font-medium transition-all duration-300 ease-in-out"
          >
            Create Your First Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default PlansPage;
