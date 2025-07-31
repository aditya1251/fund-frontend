"use client";

import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/redux/services/applicationApi";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Loading from "@/components/Loading";

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

  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
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

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();

  const handleStatusUpdate = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    if (!token) return;
    try {
      await updateStatus({ id, status }).unwrap();
      setNotification({
        message: status === "approved" ? "Approved" : "Rejected",
        type: "success",
      });
      refetch();
    } catch {
      setNotification({ message: "Update failed", type: "error" });
    }
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredApps = useMemo(() => {
    return applications.filter((app: Application) => {
      const statusMatch = filter === "all" ? true : app.status === filter;
      const searchMatch =
        searchTerm.trim() === ""
          ? true
          : app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.email.toLowerCase().includes(searchTerm.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [applications, filter, searchTerm]);

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApps = filteredApps.slice(startIndex, endIndex);

  const handleFilterChange = (
    newFilter: "all" | "pending" | "approved" | "rejected"
  ) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  /* ----------  MOBILE CARD COMPONENT  ---------- */
  function MobileCard({ app }: { app: Application }) {
    return (
      <div className="bg-white border border-black rounded-xl shadow-[4px_4px_0_0_#000] p-4 space-y-3">
        <h3 className="font-bold text-black">{app.name}</h3>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Email:</span> {app.email}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Phone:</span> {app.phone}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Message:</span> {app.message}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Date:</span>{" "}
          {new Date(app.createdAt).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              app.status === "approved"
                ? "bg-green-100 text-green-700"
                : app.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {app.status}
          </span>
          {app.status === "pending" && (
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => handleStatusUpdate(app._id, "approved")}
                className="bg-green-100 text-green-700 px-2.5 py-1 rounded text-xs hover:bg-green-200"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusUpdate(app._id, "rejected")}
                className="bg-red-100 text-red-700 px-2.5 py-1 rounded text-xs hover:bg-red-200"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-2 md:py-8 md:px-4">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-2 right-2 z-50 flex items-center gap-2 p-2.5 rounded shadow-lg text-sm ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <XCircle size={16} />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-6 md:space-y-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
            Manage <span className="text-[#FFD439]">Applications</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Review, approve, or reject user account requests.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="space-y-3 md:space-y-4">
          <div className="flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name or email..."
              className="px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#FFD439]"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-b border-gray-300 pb-3">
            <nav className="flex flex-wrap gap-2 md:gap-4">
              {(["all", "pending", "approved", "rejected"] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => handleFilterChange(tab)}
                    className={`capitalize cursor-pointer px-3 py-1.5 md:px-4 md:py-2 font-semibold text-xs md:text-sm ${
                      filter === tab
                        ? "text-black bg-[#ffd439] rounded-full shadow-[3px_3px_0_0_#000] md:shadow-[4px_4px_0_0_#000]"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {tab}
                    <span className="ml-1 md:ml-2 bg-gray-100 text-gray-700 text-[10px] md:text-xs rounded-full px-1.5 py-0.5 md:px-2">
                      {tab === "all"
                        ? applications.length
                        : applications.filter(
                            (a: Application) => a.status === tab
                          ).length}
                    </span>
                  </button>
                )
              )}
            </nav>

            <button
              onClick={() => refetch()}
              className="flex items-center gap-1.5 cursor-pointer bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded shadow hover:bg-gray-800 text-xs md:text-sm"
            >
              <RefreshCw size={14} /> Refresh
            </button>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {isLoading || isUpdating ? (
            <Loading />
          ) : isError ? (
            <p className="text-center text-red-500">
              Failed to load applications
            </p>
          ) : paginatedApps.length === 0 ? (
            <p className="text-center text-gray-500">
              No {filter} applications found
            </p>
          ) : (
            paginatedApps.map((app: Application) => (
              <MobileCard key={app._id} app={app} />
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-[6px_6px_0_0_#000] border border-black">
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
                  <td colSpan={7} className="text-center py-10">
                    <Loading />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-red-500">
                    Failed to load applications
                  </td>
                </tr>
              ) : paginatedApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No {filter} applications found
                  </td>
                </tr>
              ) : (
                paginatedApps.map((app: Application) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border-b border-black">
                      {app.name}
                    </td>
                    <td className="px-4 py-3 border-b border-black">
                      {app.email}
                    </td>
                    <td className="px-4 py-3 border-b border-black">
                      {app.phone}
                    </td>
                    <td className="px-4 py-3 border-b border-black">
                      {app.message}
                    </td>
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
                            onClick={() =>
                              handleStatusUpdate(app._id, "approved")
                            }
                            className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(app._id, "rejected")
                            }
                            className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs italic">
                          No action
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
                className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFD439] text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              {filteredApps.length === 0 ? 0 : startIndex + 1}–
              {Math.min(endIndex, filteredApps.length)} of {filteredApps.length}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2)
                    pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === pageNum
                          ? "bg-[#FFD439] border-black text-black font-semibold"
                          : "border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
