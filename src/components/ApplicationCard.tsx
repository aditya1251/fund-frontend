import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  purpose: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  rejectionReason?: string;
  credentials?: {
    username: string;
    password: string;
  };
}

interface ApplicationCardProps {
  application: Application;
  onUpdateStatus: (
    id: string,
    status: "approved" | "rejected",
    data: any
  ) => void;
}

export default function ApplicationCard({
  application,
  onUpdateStatus,
}: ApplicationCardProps) {
  // State for approval credentials
  const [credentials, setCredentials] = useState({
    username: application.email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, ""),
    password: generateRandomPassword(10),
  });

  // State for rejection reason
  const [rejectionReason, setRejectionReason] = useState("");

  // State for dialog visibility
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  // Convert purpose value to readable text
  const purposeMap: Record<string, string> = {
    personal: "Personal Fundraising",
    nonprofit: "Nonprofit Organization",
    business: "Business",
    education: "Educational Institution",
    other: "Other",
  };

  const timeAgo = formatDistanceToNow(new Date(application.createdAt), {
    addSuffix: true,
  });

  // Function to generate random password
  function generateRandomPassword(length: number) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  // Handle approve submission
  const handleApprove = () => {
    onUpdateStatus(application.id, "approved", { credentials });
    setShowApproveDialog(false);
  };

  // Handle reject submission
  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }
    onUpdateStatus(application.id, "rejected", { rejectionReason });
    setShowRejectDialog(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-[#F7C430]/10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {application.firstName} {application.lastName}
          </h3>
          <p className="text-sm text-gray-600">Applied {timeAgo}</p>
        </div>

        <div>
          {application.status === "pending" ? (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
              Pending Review
            </span>
          ) : application.status === "approved" ? (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
              Approved
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
              Rejected
            </span>
          )}
        </div>
      </div>

      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Contact Information
          </h4>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Email:</span>{" "}
              <a
                href={`mailto:${application.email}`}
                className="text-blue-600 hover:text-blue-700"
              >
                {application.email}
              </a>
            </p>
            <p className="text-sm">
              <span className="font-medium">Phone:</span>{" "}
              <a
                href={`tel:${application.phone}`}
                className="text-blue-600 hover:text-blue-700"
              >
                {application.phone}
              </a>
            </p>
            {application.organization && (
              <p className="text-sm">
                <span className="font-medium">Organization:</span>{" "}
                {application.organization}
              </p>
            )}
            <p className="text-sm">
              <span className="font-medium">Purpose:</span>{" "}
              {purposeMap[application.purpose] || application.purpose}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Fundraising Description
          </h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {application.description}
          </p>
        </div>
      </div>

      {/* Show credentials if approved */}
      {application.status === "approved" && application.credentials && (
        <div className="px-6 py-4 bg-green-50 border-t border-green-200">
          <h4 className="text-xs font-semibold text-green-800 uppercase tracking-wider mb-2">
            Account Credentials (Sent to User)
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <span className="font-medium">Username:</span>{" "}
                {application.credentials.username}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Password:</span>{" "}
                {application.credentials.password}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Show rejection reason if rejected */}
      {application.status === "rejected" && application.rejectionReason && (
        <div className="px-6 py-4 bg-red-50 border-t border-red-200">
          <h4 className="text-xs font-semibold text-red-800 uppercase tracking-wider mb-2">
            Rejection Reason (Sent to User)
          </h4>
          <p className="text-sm text-red-700">{application.rejectionReason}</p>
        </div>
      )}

      {/* Action buttons for pending applications */}
      {application.status === "pending" && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowRejectDialog(true)}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C430]"
          >
            Reject
          </button>
          <button
            onClick={() => setShowApproveDialog(true)}
            className="px-4 py-2 bg-[#F7C430] border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#e6b62c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C430]"
          >
            Approve
          </button>
        </div>
      )}

      {/* Approve Dialog */}
      {showApproveDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Create User Account
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please review or modify the generated credentials for{" "}
              {application.firstName} {application.lastName}. These credentials
              will be emailed to {application.email}.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7C430] focus:border-[#F7C430]"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="flex space-x-2">
                  <input
                    id="password"
                    type="text"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7C430] focus:border-[#F7C430]"
                  />
                  <button
                    onClick={() =>
                      setCredentials({
                        ...credentials,
                        password: generateRandomPassword(10),
                      })
                    }
                    type="button"
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowApproveDialog(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C430]"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-[#F7C430] border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#e6b62c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C430]"
              >
                Approve & Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Reject Application
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for rejection. This message will be sent
              to {application.email}.
            </p>

            <div className="mb-6">
              <label
                htmlFor="rejectionReason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rejection Reason*
              </label>
              <textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F7C430] focus:border-[#F7C430]"
                placeholder="Please explain why this application is being rejected..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C430]"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 border border-transparent text-sm font-medium rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Reject & Send Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
