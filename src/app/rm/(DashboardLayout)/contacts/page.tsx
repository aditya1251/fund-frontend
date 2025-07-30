"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/redux/services/applicationApi";
import { CheckCircle, XCircle, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

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
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  // Close expanded card when applications change
  useEffect(() => {
    setExpandedId(null);
  }, [applications]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 inset-x-4 z-50 flex items-center gap-2 p-4 rounded shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6 md:space-y-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Manage <span className="text-[#FFD439]">Applications</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Review, approve, or reject user account requests.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-300 pb-4">
          <nav className="flex flex-wrap gap-2 sm:gap-4 mb-4 md:mb-0">
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`capitalize cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 font-semibold text-sm sm:text-base ${
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
            className="mt-4 md:mt-0 flex items-center gap-2 bg-black text-white px-4 py-2 rounded shadow-md hover:bg-gray-800 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow border border-black">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#FFD439] text-black uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border-b border-black">Name</th>
                <th className="px-4 py-3 border-b border-black">Email</th>
                <th className="px-4 py-3 border-b border-black">Phone</th>
                <th className="px-4 py-3 border-b border-black max-w-[200px]">Message</th>
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
                    <td className="px-4 py-3 border-b border-black whitespace-nowrap">{app.name}</td>
                    <td className="px-4 py-3 border-b border-black whitespace-nowrap truncate max-w-[150px]">
                      {app.email}
                    </td>
                    <td className="px-4 py-3 border-b border-black whitespace-nowrap">{app.phone}</td>
                    <td className="px-4 py-3 border-b border-black max-w-[200px] truncate">
                      {app.message}
                    </td>
                    <td className="px-4 py-3 border-b border-black whitespace-nowrap">
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
                    <td className="px-4 py-3 border-b border-black whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 border-b border-black flex gap-2">
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
                        <span className="text-gray-400 text-xs italic whitespace-nowrap">No action</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {isLoading || isUpdating ? (
            <div className="text-center py-10">Loading applications...</div>
          ) : isError ? (
            <div className="text-center py-10 text-red-500">Failed to load applications</div>
          ) : filteredApps.length === 0 ? (
            <div className="text-center py-10 text-gray-500">No {filter} applications found</div>
          ) : (
            filteredApps.map((app: Application) => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow border border-black overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{app.name}</h3>
                      <p className="text-gray-600 text-sm truncate">{app.email}</p>
                      <p className="text-gray-600 text-sm">{app.phone}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => setExpandedId(expandedId === app._id ? null : app._id)}
                      className="text-blue-600 flex items-center gap-1"
                    >
                      {expandedId === app._id ? (
                        <>
                          <span>Less</span>
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          <span>Details</span>
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {expandedId === app._id && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-700">Message</h4>
                      <p className="mt-1 text-gray-600 break-words">{app.message}</p>
                    </div>

                    {app.status === "pending" && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(app._id, "approved")}
                          className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded text-sm hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app._id, "rejected")}
                          className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}