"use client";

import { Phone, Mail, FileText, User, Calendar, ChevronRight } from "lucide-react";
import { StatusBadge } from "./data-table";

interface MobileCardProps {
  data: {
    id: string;
    type: string;
    mode?: string;
    applicant: string;
    email: string;
    phone: string;
    review?: any;
    status: "approved" | "pending" | "rejected";
    createdAt?: string;
  };

}

export function MobileCard({ data }: MobileCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateEmail = (email: string) => {
    if (email.length <= 25) return email;
    return email.substring(0, 22) + "...";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header with Type and Status */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h5 className="font-semibold text-gray-900 text-sm mb-1">{data.type}</h5>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
            File: {data.id}
          </span>
        </div>
        <StatusBadge status={data.status} />
      </div>

      {/* Main Content */}
      <div className="space-y-2">
        {/* Applicant */}
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-700 font-medium">{data.applicant}</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-600" title={data.email}>
            {truncateEmail(data.email)}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-sm text-gray-600">{data.phone}</span>
        </div>

        {/* Mode and Date Row */}
        <div className="flex justify-between items-center pt-2 ">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Mode:</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {data.mode || "Online"}
            </span>
          </div>
          {data.createdAt && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {formatDate(data.createdAt)}
            </div>
          )}
        </div>       

        {/* Review/Rejection Message */}
        {data.review && data.review !== "undefined" && data.review !== "-" && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <span className="font-medium">Review: </span>
            {data.review}
          </div>
        )}
      </div>

      
    </div>
  );
}

interface MobileCardListProps {
  items: any[];
  renderCard: (item: any, index: number) => React.ReactNode;
  emptyMessage?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  currentPage?: number;
  totalPages?: number;
}

export function MobileCardList({
  items,
  renderCard,
  emptyMessage = "No items found",
  showLoadMore = false,
  onLoadMore,
  isLoadingMore = false,
  currentPage = 1,
  totalPages = 1,
}: MobileCardListProps) {
  return (
    <div className="block md:hidden">
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>{emptyMessage}</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {items.map((item, index) => renderCard(item, index))}
          </div>

          {/* Pagination Info */}
          {totalPages > 1 && (
            <div className="text-center text-sm text-gray-500 mt-4 mb-2">
              Page {currentPage} of {totalPages}
            </div>
          )}

          {/* Load More Button */}
          {showLoadMore && currentPage < totalPages && (
            <div className="text-center mt-4">
              <button
                onClick={onLoadMore}
                disabled={isLoadingMore}
                className="bg-[#FFD439] hover:bg-yellow-500 disabled:bg-gray-300 text-black font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Loading...
                  </div>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
