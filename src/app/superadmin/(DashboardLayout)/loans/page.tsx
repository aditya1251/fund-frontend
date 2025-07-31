"use client";

// Import necessary icons for status indicators and action buttons
import { CheckCircle, XCircle, Hourglass } from "lucide-react";
import LoanCategoryChart from "./LoanCategoryChart";
import {
  PlusCircle,
  FileText,
  Building,
  HandCoins,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetLoansQuery } from "@/redux/services/loanApi";
import { useEffect, useState } from "react";

/**
 * LoanDashboardPage Component
 *
 * Main dashboard component for managing loan applications in the super admin panel.
 * Provides overview statistics, quick actions, and recent loan applications table.
 *
 * Features:
 * - Real-time loan statistics by category (Private, Government, Insurance)
 * - Quick action buttons for creating new loans
 * - Visual chart representation of loan data
 * - Recent loan applications table with filtering and status indicators
 */
export default function LoanDashboardPage() {
  // Router instance for programmatic navigation
  const router = useRouter();

  // Fetch all loan data using RTK Query
  // This hook automatically handles loading states and caching
  const { data: loansData = [], isLoading } = useGetLoansQuery({});

  // State for processed loan statistics organized by category
  // Tracks total count and status breakdown for each loan type
  const [loanStats, setLoanStats] = useState({
    "Private Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
    "Government Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
    Insurance: { total: 0, approved: 0, pending: 0, rejected: 0 },
  });

  // State for recent loan applications displayed in the table
  // Stores formatted loan data for quick overview
  const [recentLoans, setRecentLoans] = useState<any[]>([]);

  /**
   * Process loan data when it's loaded from the API
   *
   * This effect runs whenever loansData changes and performs:
   * 1. Statistical aggregation by loan category and status
   * 2. Sorting and formatting of recent loans for table display
   * 3. State updates for dashboard components
   */
  useEffect(() => {
    if (loansData && loansData.length > 0) {
      // Initialize statistics counters for all loan categories
      const stats = {
        "Private Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
        "Government Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
        Insurance: { total: 0, approved: 0, pending: 0, rejected: 0 },
      };

      // Process each loan application to aggregate statistics
      loansData.forEach((loan: any) => {
        // Map loan type to display category
        const category = getCategoryName(loan.loanType);

        if (stats[category]) {
          // Increment total count for this category
          stats[category].total += 1;

          // Increment status-specific counters based on loan status
          if (loan.status.toLowerCase() === "approved") {
            stats[category].approved += 1;
          } else if (loan.status.toLowerCase() === "pending") {
            stats[category].pending += 1;
          } else if (loan.status.toLowerCase() === "rejected") {
            stats[category].rejected += 1;
          }
        }
      });

      // Update state with processed statistics
      setLoanStats(stats);

      // Prepare recent loans for table display
      // Sort by creation date (newest first) and limit to 4 entries
      const sortedLoans = [...loansData]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

      // Transform raw loan data into table-friendly format
      const formattedLoans = sortedLoans.map((loan) => ({
        id: loan._id,
        name: loan.values?.Name || "N/A",
        category: getCategoryName(loan.loanType),
        status:
          loan.status.charAt(0).toUpperCase() +
          loan.status.slice(1).toLowerCase(),
        amount: loan.values?.LoanAmount
          ? `₹${formatAmount(loan.values.LoanAmount)}`
          : "N/A",
        date: formatDate(loan.createdAt),
      }));

      // Update recent loans state for table rendering
      setRecentLoans(formattedLoans);
    }
  }, [loansData]);

  /**
   * Helper function to map loan types to display categories
   *
   * Normalizes different loan type values to consistent display names
   * for better user experience and categorization
   *
   * @param loanType - Raw loan type from database
   * @returns Formatted category name for display
   */
  const getCategoryName = (loanType: string) => {
    switch (loanType?.toLowerCase()) {
      case "private":
        return "Private Loan";
      case "government":
        return "Government Loan";
      case "insurance":
        return "Insurance";
      default:
        return "Private Loan"; // Default fallback for unknown types
    }
  };

  /**
   * Format numerical amount with Indian number system commas
   *
   * Converts numeric values to readable format with proper comma placement
   * following Indian numbering convention (e.g., 2,00,000 instead of 200,000)
   *
   * @param amount - Numerical amount (string or number)
   * @returns Formatted string with commas
   */
  const formatAmount = (amount: string | number) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return num.toLocaleString("en-IN");
  };

  /**
   * Format ISO date string to readable YYYY-MM-DD format
   *
   * @param dateString - ISO date string from database
   * @returns Formatted date string for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main dashboard title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 sm:mb-10 text-center">
          LOAN DASHBOARD
        </h1>

        {/* Quick action buttons for creating new loan applications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-3xl mx-auto">
          {/* Private Loan Creation Button */}
          <Button
            onClick={() => router.push("/superadmin/loans/private")}
            className="flex items-center gap-2 bg-black text-white hover:bg-neutral-700 shadow-md justify-center w-full py-4 sm:py-3"
          >
            <HandCoins className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Add New Private Loan</span>
          </Button>

          {/* Government Loan Creation Button */}
          <Button
            onClick={() => router.push("/superadmin/loans/government")}
            className="flex items-center gap-2 bg-black text-white hover:bg-neutral-700 shadow-md justify-center w-full py-4 sm:py-3"
          >
            <Building className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Add New Government Loan</span>
          </Button>

          {/* Insurance Plan Creation Button */}
          <Button
            onClick={() => router.push("/superadmin/loans/insurance")}
            className="flex items-center gap-2 bg-black text-white hover:bg-neutral-700 shadow-md justify-center w-full py-4 sm:py-3"
          >
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">Add New Insurance Plan</span>
          </Button>

          {/* View All Applications Button - highlighted with different color */}
          <Button
            onClick={() => router.push("/superadmin/loans/applications")}
            className="flex items-center hover:cursor-pointer gap-2 bg-[#ffd439] text-black font-semibold shadow-md hover:brightness-110 justify-center w-full py-4 sm:py-3"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">View All Applications</span>
          </Button>
        </div>

        {/* Statistics Section - Displays loan counts by category and status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {isLoading
            ? // Loading skeleton for statistics cards
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] p-4 sm:p-6 animate-pulse"
                  >
                    <div className="h-5 sm:h-6 bg-gray-200 rounded w-2/3 mb-3 sm:mb-4"></div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      {Array(4)
                        .fill(0)
                        .map((_, j) => (
                          <div
                            key={j}
                            className="h-16 sm:h-20 bg-gray-200 rounded"
                          ></div>
                        ))}
                    </div>
                  </div>
                ))
            : // Actual statistics cards with loan data
              Object.entries(loanStats).map(([category, stats]) => (
                <div
                  key={category}
                  className="bg-white rounded-xl shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] p-4 sm:p-6"
                >
                  <h4 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">
                    {category}
                  </h4>
                  {/* Grid of status statistics for each category */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-center">
                    <StatCard label="Total" value={stats.total} />
                    <StatCard
                      label="Approved"
                      value={stats.approved}
                      color="green"
                    />
                    <StatCard
                      label="Pending"
                      value={stats.pending}
                      color="yellow"
                    />
                    <StatCard
                      label="Rejected"
                      value={stats.rejected}
                      color="red"
                    />
                  </div>
                </div>
              ))}
        </div>

        {/* Visual chart component for loan category distribution */}
        <div className="mb-6 sm:mb-8">
          <LoanCategoryChart />
        </div>

        {/* Recent Loan Applications Table */}
        <div className="bg-white rounded-xl shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] p-4 sm:p-6">
          {/* Table header with navigation link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-lg sm:text-xl flex justify-center gap-2 items-center font-semibold text-black">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
              <span>Recent Loan Requests</span>
            </h2>
            {/* Link to view complete applications list */}
            <button
              onClick={() => router.push("/superadmin/loans/applications")}
              className="text-xs sm:text-sm font-medium text-[#ffb700] hover:underline hover:text-black transition cursor-pointer"
            >
              View All Requests →
            </button>
          </div>

          {/* Responsive loan applications table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-xs sm:text-sm text-left">
              {/* Table header with column labels */}
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">ID</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Name</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 hidden sm:table-cell">
                    Category
                  </th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Amount</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Status</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Loading skeleton rows while data is being fetched
                  Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="border-b animate-pulse">
                        <td colSpan={6} className="py-3 sm:py-4">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </td>
                      </tr>
                    ))
                ) : recentLoans.length > 0 ? (
                  // Display actual loan data rows
                  recentLoans.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Truncated ID display - shorter on mobile */}
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <span className="hidden sm:inline">
                          {row.id.substring(0, 6)}...
                        </span>
                        <span className="sm:hidden">
                          {row.id.substring(0, 4)}..
                        </span>
                      </td>
                      {/* Applicant name with text truncation */}
                      <td className="py-2 px-2 sm:py-3 sm:px-4 truncate max-w-[80px] sm:max-w-none">
                        {row.name}
                      </td>
                      {/* Loan category - hidden on mobile to save space */}
                      <td className="py-2 px-2 sm:py-3 sm:px-4 hidden sm:table-cell">
                        {row.category}
                      </td>
                      {/* Loan amount in Indian currency format */}
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        {row.amount}
                      </td>
                      {/* Status with colored icon indicator */}
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {renderStatusIcon(row.status)}
                          <span className="capitalize">{row.status}</span>
                        </div>
                      </td>
                      {/* Application date - abbreviated on mobile */}
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <span className="hidden sm:inline">{row.date}</span>
                        <span className="sm:hidden">
                          {row.date.substring(5)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Empty state when no loan applications exist
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500">
                      No loan applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * StatCard Component
 *
 * Reusable card component for displaying statistical information
 * with color-coded styling based on the data type.
 *
 * @param label - Text label for the statistic
 * @param value - Numerical value to display
 * @param color - Color theme for the card (green, yellow, red, gray)
 */
const StatCard = ({
  label,
  value,
  color = "gray",
}: {
  label: string;
  value: number;
  color?: "green" | "yellow" | "red" | "gray";
}) => {
  // Color mapping for different statistic types
  const colorMap = {
    green: "bg-green-100 text-green-800", // For approved/positive stats
    yellow: "bg-yellow-100 text-yellow-800", // For pending/warning stats
    red: "bg-red-100 text-red-800", // For rejected/negative stats
    gray: "bg-gray-100 text-black", // For neutral/total stats
  };

  return (
    <div
      className={`rounded-lg sm:rounded-xl p-2 sm:p-3 ${colorMap[color]} shadow`}
    >
      <div className="text-xs sm:text-sm font-semibold">{label}</div>
      <div className="text-base sm:text-xl font-bold">{value}</div>
    </div>
  );
};

/**
 * Status Icon Renderer
 *
 * Returns appropriate icon component based on loan application status.
 * Uses consistent color coding across the application.
 *
 * @param status - Current status of the loan application
 * @returns JSX element with appropriate icon and color
 */
const renderStatusIcon = (status: string) => {
  if (status === "Approved")
    return <CheckCircle className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />;
  if (status === "Pending")
    return <Hourglass className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />;
  // Default to rejected/error state for any other status
  return <XCircle className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />;
};
