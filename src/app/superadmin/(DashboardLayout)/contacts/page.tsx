"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/redux/services/applicationApi";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface Application {
  _id: string;
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

  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    data: applications = [],
    isLoading,
    isError,
    refetch,
  } = useGetApplicationsQuery(undefined);

  const [updateStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation();

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    if (!token) return;
    try {
      await updateStatus({ id, status }).unwrap();
      setNotification({
        message: status === "approved" ? "Application approved" : "Application rejected",
        type: "success",
      });
      refetch();
    } catch {
      setNotification({ message: "Status update failed", type: "error" });
    }
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredApps = applications.filter((app: Application) =>
    filter === "all" ? true : app.status === filter
  );

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 p-4 rounded shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Manage <span className="text-[#FFD439]">Applications</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review, approve, or reject user account requests.
          </p>
        </div>

        {/* Status Filter */}
         <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 pb-4">
          <nav className="flex gap-4">
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)} // ✅ FIXED this line
                className={`capitalize cursor-pointer px-4 py-2 font-semibold ${
                  filter === tab
                    ? "text-black bg-[#ffd439] rounded-full shadow-[4px_4px_0_0_#000]"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab}
                <span className="ml-2 cursor-pointer bg-gray-100 text-gray-700 text-xs rounded-full px-2">
                  {tab === "all"
                    ? applications.length
                    : applications.filter((a: Application) => a.status === tab).length}
                </span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => refetch()}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-black text-white px-4 py-2 rounded shadow-md hover:bg-gray-800"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow border border-black">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FFD439] text-black uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border-b border-black">Name</th>
                <th className="px-4 py-3 border-b border-black">Email</th>
                <th className="px-4 py-3 border-b border-black">Phone</th>
                <th className="px-4 py-3 border-b border-black">Message</th>
                <th className="px-4 py-3 border-b border-black">Status</th>
                <th className="px-4 py-3 border-b border-black">Date</th>
                <th className="px-4 py-3 border-b border-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isUpdating ? (
                <tr>
                  <td colSpan={7} className="text-center py-10">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-red-500">
                    Failed to load applications
                  </td>
                </tr>
              ) : filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No {filter} applications found
                  </td>
                </tr>
              ) : (
                filteredApps.map((app: Application) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b border-black">{app.name}</td>
                    <td className="px-4 py-3 border-b border-black">{app.email}</td>
                    <td className="px-4 py-3 border-b border-black">{app.phone}</td>
                    <td className="px-4 py-3 border-b border-black">{app.message}</td>
                    <td className="px-4 py-3 border-b border-black">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          app.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-black">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border-b border-black space-x-2">
                      {app.status === "pending" ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(app._id, "approved")}
                            className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app._id, "rejected")}
                            className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs italic">No action</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
