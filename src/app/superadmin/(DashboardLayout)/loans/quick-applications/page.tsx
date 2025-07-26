"use client";
import { useState, useMemo } from "react";
import {
  useGetLoansQuery,
  useUpdateLoanMutation,
} from "@/redux/services/loanApi";
import { useGetAdminsQuery } from "@/redux/services/superadminApi";
import { useCreateNotificationMutation } from "@/redux/services/notificationApi";
import { CheckCircle, X, XCircle } from "lucide-react";
import { getFileUrl } from "@/utils/fileUploadService";
export default function DsaApplicationsPage() {
  const {
    data: loansData = [],
    isLoading,
    error,
    refetch,
  } = useGetLoansQuery({loanType: "quick"});
  const { data: adminData } = useGetAdminsQuery();
  const [updateLoan] = useUpdateLoanMutation();
  const [createNotification] = useCreateNotificationMutation();

  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showReasonInputId, setShowReasonInputId] = useState<string | null>(
    null
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (loan: any) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedLoan(null);
    setShowModal(false);
  };

  const extractField = (loan: any, label: string) => {
    const personalInfo = loan.values?.find((p: any) => p.pageNumber === 1);
    return (
      personalInfo?.fields?.find((f: any) => f.label === label)?.value || ""
    );
  };

  const filteredLoans = useMemo(() => {
    let filtered = loansData;

    if (filter !== "all") {
      filtered = filtered.filter((loan) => loan.status === filter);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((loan) => {
        const name = extractField(loan, "Name").toLowerCase();
        const email = extractField(loan, "Email").toLowerCase();
        return (
          name.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase())
        );
      });
    }

    return [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime()
    );
  }, [loansData, filter, searchTerm]);

  const handleStatusChange = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    setUpdatingId(id);
    const loan = loansData.find((loan) => loan._id === id);
    const user = adminData?.find(
      (admin: any) => admin.email === loan?.subscriber
    );
    const userId = user?._id;
    const applicantName = user?.name || "Applicant";

    try {
      if (status === "rejected" && showReasonInputId !== id) {
        setShowReasonInputId(id);
        setUpdatingId(null);
        return;
      }

      await updateLoan({
        _id: id,
        status,
        rejectionMessage: status === "rejected" ? rejectionReason : undefined,
      }).unwrap();

      if (userId) {
        await createNotification({
          userId,
          title:
            status === "approved"
              ? "Loan Application Approved!"
              : "Loan Application Rejected",
          message:
            status === "approved"
              ? `Congratulations ${applicantName}, your loan was approved!`
              : `Sorry ${applicantName}, your loan was rejected. Reason: ${
                  rejectionReason || "No reason provided."
                }`,
        });
      }

      setNotification({ message: `Loan ${status}`, type: "success" });
      refetch();
    } catch {
      setNotification({ message: `Failed to ${status} loan`, type: "error" });
    } finally {
      setUpdatingId(null);
      setRejectionReason("");
      setShowReasonInputId(null);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-2 p-4 rounded shadow-lg ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Manage <span className="text-[#FFD439]">Quick Loan </span>Applications
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Approve or reject based on application review.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-300 pb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/2"
          />
          <div className="flex gap-2">
            {["all", "pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`capitalize px-4 py-2 font-semibold rounded-full ${
                  filter === tab
                    ? "bg-[#FFD439] text-black shadow-[4px_4px_0_0_#000]"
                    : "text-gray-600 hover:text-black"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center text-gray-600">
              Loading loan applications...
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Failed to load applications.
            </div>
          ) : filteredLoans.length === 0 ? (
            <div className="text-center text-gray-500">
              No applications found.
            </div>
          ) : (
            filteredLoans.map((loan) => {
              const name = extractField(loan, "Name");
              const email = extractField(loan, "Email");
              const phone = extractField(loan, "Phone");
              const age = extractField(loan, "Age");

              return (
                <div
                  key={loan._id}
                  className="bg-white border relative border-black shadow-[6px_6px_0_0_#000] rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{name || "N/A"}</h3>
                      <p className="text-sm text-gray-700">Email: {email}</p>
                      <p className="text-sm text-gray-700">Phone: {phone}</p>
                      <p className="text-sm text-gray-700">Age: {age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">
                        Submitted:{" "}
                        {new Date(loan.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-700">
                        Subscriber: {loan.subscriber}
                      </p>
                      <p className="text-sm text-gray-700">
                        Status: <strong>{loan.status}</strong>
                      </p>
                    </div>
                  </div>

                  {loan.status === "pending" && (
                    <div className="mt-4 flex flex-col md:flex-row gap-2">
                      <button
                        onClick={() => handleStatusChange(loan._id, "approved")}
                        disabled={updatingId === loan._id}
                        className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 text-sm font-medium">
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(loan._id, "rejected")}
                        disabled={updatingId === loan._id}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 text-sm font-medium">
                        Reject
                      </button>
                    </div>
                  )}

                  {showReasonInputId === loan._id && (
                    <div className="mt-3 flex flex-col md:flex-row gap-2 items-start">
                      <input
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 rounded"
                        placeholder="Enter rejection reason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                      />
                      <button
                        onClick={() => handleStatusChange(loan._id, "rejected")}
                        disabled={!rejectionReason.trim()}
                        className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700">
                        Confirm Reject
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => openModal(loan)}
                    className="bg-blue-100 text-blue-800 px-4 py-2 absolute right-10 bottom-8 rounded hover:bg-blue-200 text-sm font-medium mt-4">
                    View Details
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showModal && selectedLoan && (
        <div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl border-2 border-black shadow-[8px_8px_0_0_#000] relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-black hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-black">
              Loan Application Details
            </h3>

            <div className="space-y-8">
              {selectedLoan.values.map((page: any) => (
                <div key={page.pageNumber}>
                  <h4 className="text-lg font-semibold text-black mb-2">
                    {page.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {page.fields.map((field: any, index: number) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                        <label className="block text-sm font-medium text-black mb-1">
                          {field.label}
                        </label>
                        {field.isDocument ? (
                          <FileViewer fileKey={field.value} />
                        ) : (
                          <p className="text-gray-800 text-sm break-words">
                            {field.value || "N/A"}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const FileViewer = ({ fileKey }: { fileKey: string }) => {
  const [loading, setLoading] = useState(false);

  const handleViewFile = async () => {
    setLoading(true);
    try {
      const url = await getFileUrl(fileKey);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Error fetching file:', err);
      alert('Failed to open file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleViewFile}
      className="text-blue-600 underline text-sm break-all"
      disabled={loading}
    >
      {loading ? 'Loading...' : 'View Document'}
    </button>
  );
};

