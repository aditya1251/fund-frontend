import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";

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

interface ApplicationCardProps {
  application: Application;
  onUpdateStatus: (
    _id: string,
    status: "approved" | "rejected",
    data: any
  ) => void;
}

export default function ApplicationCard({
  application,
  onUpdateStatus,
}: ApplicationCardProps) {
  const timeAgo = formatDistanceToNow(new Date(application.createdAt), {
    addSuffix: true,
  });

  const handleApprove = () => {
    onUpdateStatus(application._id, "approved", {});
  };
  const handleReject = () => {
    onUpdateStatus(application._id, "rejected", {});
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-[#F7C430]/10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {application.name}
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
              <span className="font-medium">Purpose:</span> {application.name}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Description
          </h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {application.message}
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
            onClick={handleReject}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C430]"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            className="px-4 py-2 bg-[#F7C430] border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#e6b62c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7C430]"
          >
            Approve
          </button>
        </div>
      )}
    </div>
  );
}
