"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ApplicationCard from "@/components/ApplicationCard";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/lib/superadminApi";

// TypeScript interface for application data
interface Application {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  rejectionReason?: string;
  credentials?: {
    username: string;
    password: string;
  };
}

export default function SuperAdminApplications() {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useGetApplicationsQuery(undefined, {
    skip: !token,
    extra: { token },
  });
  const [updateStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation();

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected", data: any) => {
    if (!token) return;
    try {
      await updateStatus({ id, status: newStatus }, { extra: { token } }).unwrap();
      showNotification(
        newStatus === "approved"
          ? "User application approved successfully!"
          : "User application rejected successfully!",
        "success"
      );
      refetch();
    } catch (error) {
      showNotification("Failed to update user application status.", "error");
    }
  };

  const filteredApplications = applications.filter((app: Application) => app.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-center ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {notification.message}
        </div>
      )}

      <div className="p-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Applications</h1>
            <p className="mt-2 text-gray-600">Review and manage user account requests.</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "pending"
                  ? "border-[#F7C430] text-[#F7C430]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Pending
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {applications.filter((app: Application) => app.status === "pending").length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("approved")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "approved"
                  ? "border-[#F7C430] text-[#F7C430]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Approved
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {applications.filter((app: Application) => app.status === "approved").length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("rejected")}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${
                activeTab === "rejected"
                  ? "border-[#F7C430] text-[#F7C430]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Rejected
              <span className="ml-2 bg-gray-100 text-gray-700 py-0.5 px-2 rounded-full text-xs">
                {applications.filter((app: Application) => app.status === "rejected").length}
              </span>
            </button>
          </nav>
        </div>

        {/* Applications List */}
        {isLoading || isUpdating ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7C430]"></div>
          </div>
        ) : isError ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">Failed to load applications.</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">No {activeTab} applications found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredApplications.map((application: Application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}