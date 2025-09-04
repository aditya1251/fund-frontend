"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useGetDsasByRmIdQuery } from "@/redux/services/superadminApi";
import {
  useGetWithdrawalsByAdminQuery,
  useUpdateWithdrawMutation,
} from "@/redux/services/withdrawalApi";
import { Info } from "lucide-react";
import Loading from "@/components/Loading";
import { useGetBankInfoQuery } from "@/redux/services/dsaApi";

interface WithdrawalRequest {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  rmId: {
    _id: string;
    name: string;
    email: string;
  };
  amount: number;
  status: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
}

export default function WithdrawRequestsPage() {
  const { data: session } = useSession();
  const rmId = session?.user?.id;

  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showBankModal, setShowBankModal] = useState(false);

  // Fetch DSAs managed by this RM
  const { data: dsaUsers = [], isLoading: isDsaLoading } =
    useGetDsasByRmIdQuery(rmId || "", { skip: !rmId });

  // Get all DSA IDs for filtering
  const dsaIds = dsaUsers.map((dsa: any) => dsa._id);

  // Fetch withdrawals by RM
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: withdrawalsResponse,
    isLoading: isWithdrawalsLoading,
    refetch: refetchWithdrawals,
  } = useGetWithdrawalsByAdminQuery({ page, limit });

  const rmWithdrawals = withdrawalsResponse?.data ?? [];
  const totalWithdrawals = withdrawalsResponse?.total ?? 0;
  const totalPages = withdrawalsResponse?.totalPages ?? 1;

  const [filteredWithdrawals, setFilteredWithdrawals] = useState<
    WithdrawalRequest[]
  >([]);

  // Update withdrawal status mutation
  const [updateWithdrawal, { isLoading: isUpdating }] =
    useUpdateWithdrawMutation();

  // Track processing
  const [processingIds, setProcessingIds] = useState<string[]>([]);

  useEffect(() => {
    if (rmWithdrawals.length) {
      const filtered = rmWithdrawals.filter(
        (withdrawal: WithdrawalRequest) =>
          statusFilter === "all" || withdrawal.status === statusFilter
      );
      setFilteredWithdrawals(filtered);
    }
  }, [rmWithdrawals, statusFilter]);

  // Handle direct approve withdrawal
  const handleDirectApprove = async (withdrawalId: string) => {
    try {
      setProcessingIds((prev) => [...prev, withdrawalId]);
      await updateWithdrawal({
        id: withdrawalId,
        data: { status: "approved" },
      }).unwrap();
      setNotification({
        show: true,
        message: "Withdrawal request approved successfully",
        type: "success",
      });
      refetchWithdrawals();
      setTimeout(
        () => setNotification({ show: false, message: "", type: "success" }),
        3000
      );
    } catch (error: any) {
      setNotification({
        show: true,
        message: error?.data?.message || "Failed to approve withdrawal",
        type: "error",
      });
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== withdrawalId));
    }
  };

  // Handle direct reject withdrawal
  const handleDirectReject = async (withdrawalId: string) => {
    try {
      setProcessingIds((prev) => [...prev, withdrawalId]);
      await updateWithdrawal({
        id: withdrawalId,
        data: { status: "rejected", rejectReason: "Rejected by RM" },
      }).unwrap();
      setNotification({
        show: true,
        message: "Withdrawal request rejected",
        type: "success",
      });
      refetchWithdrawals();
      setTimeout(
        () => setNotification({ show: false, message: "", type: "success" }),
        3000
      );
    } catch (error: any) {
      setNotification({
        show: true,
        message: error?.data?.message || "Failed to reject withdrawal",
        type: "error",
      });
    } finally {
      setProcessingIds((prev) => prev.filter((id) => id !== withdrawalId));
    }
  };

  if (isDsaLoading || isWithdrawalsLoading) return <Loading />;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Manage <span className="text-[#FFD439]">Withdrawal Requests</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review, approve, or reject withdrawal requests from your DSA users.
          </p>
        </div>

        {/* Status filter */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm bg-gray-100 p-1">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  statusFilter === status
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-700 hover:bg-gray-200"
                }`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notification */}
        {notification.show && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            } text-white`}>
            {notification.message}
          </div>
        )}

        {/* Withdrawals List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-black">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold">Withdrawal Requests</h2>
          </div>

          {filteredWithdrawals.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mb-4">
                <Info size={40} className="mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No withdrawal requests found
              </h3>
              <p className="text-gray-500">
                {statusFilter === "all"
                  ? "There are no withdrawal requests from your DSA users at the moment."
                  : `There are no ${statusFilter} withdrawal requests from your DSA users.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      DSA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RM
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Remarks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWithdrawals.map((withdrawal) => (
                    <tr key={withdrawal._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {withdrawal.userId.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {withdrawal.userId.email}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedUserId(withdrawal.userId._id);
                              setShowBankModal(true);
                            }}
                            className="text-gray-500 hover:text-black">
                            <Info size={18} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        <div className="text-sm font-medium text-gray-900">
                          {withdrawal.rmId?.name || "-"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {withdrawal.rmId?.email || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        ₹ {Number(withdrawal.amount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(withdrawal.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(withdrawal.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            withdrawal.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : withdrawal.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                          {withdrawal.status.charAt(0).toUpperCase() +
                            withdrawal.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {withdrawal.remarks || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {withdrawal.status === "pending" && (
                          <div className="flex space-x-3">
                            <button
                              onClick={() =>
                                handleDirectApprove(withdrawal._id)
                              }
                              disabled={processingIds.includes(withdrawal._id)}
                              className={`px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700 ${
                                processingIds.includes(withdrawal._id)
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}>
                              {processingIds.includes(withdrawal._id)
                                ? "Processing..."
                                : "Approve"}
                            </button>
                            <button
                              onClick={() => handleDirectReject(withdrawal._id)}
                              disabled={processingIds.includes(withdrawal._id)}
                              className={`px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700 ${
                                processingIds.includes(withdrawal._id)
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}>
                              {processingIds.includes(withdrawal._id)
                                ? "Processing..."
                                : "Reject"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center p-4">
        <p className="text-sm text-gray-600">
          Page {page} of {totalPages} — {totalWithdrawals} total withdrawals
        </p>
        <div className="space-x-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>

      {/* Bank Info Modal */}
      {showBankModal && selectedUserId && (
        <BankInfoModal
          userId={selectedUserId}
          onClose={() => setShowBankModal(false)}
        />
      )}
    </div>
  );
}

// Bank Info Modal Component
function BankInfoModal({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const { data: bankInfo, isLoading } = useGetBankInfoQuery(userId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blend-color bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black">
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4">Bank Information</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : bankInfo ? (
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Account Holder:</span>{" "}
              {bankInfo.accountHolderName}
            </p>
            <p>
              <span className="font-semibold">Account Number:</span>{" "}
              {bankInfo.accountNumber}
            </p>
            <p>
              <span className="font-semibold">Bank Name:</span>{" "}
              {bankInfo.bankName}
            </p>
            <p>
              <span className="font-semibold">Branch Name:</span>{" "}
              {bankInfo.branchName}
            </p>
            <p>
              <span className="font-semibold">IFSC:</span> {bankInfo.ifsc}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No bank information found.</p>
        )}
      </div>
    </div>
  );
}
