"use client";

import { CheckCircle, XCircle, Hourglass } from "lucide-react";
import ServiceCategoryChart from "./ServiceCategoryChart";
import {
  BriefcaseBusiness,
  FileText,
  HandCoins,
  Timer,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useGetLoansByRmIdQuery,
} from "@/redux/services/loanApi";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function LoanDashboardPage() {
  const session = useSession();
  const rmId = session.data?.user?.id;
  const router = useRouter();

  // Fetch all loan data
  const { data: loansData = [], isLoading } = useGetLoansByRmIdQuery(
    rmId || ""
  );

  // State for processed loan stats
  const [loanStats, setLoanStats] = useState({
    "Private Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
    "Government Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
    "Insurance": { total: 0, approved: 0, pending: 0, rejected: 0 },
    "Quick Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
    "Taxation": { total: 0, approved: 0, pending: 0, rejected: 0 },
  });
  
  // State for recent loan applications (for table)
  const [recentLoans, setRecentLoans] = useState<any[]>([]);

  // Process loan data when it's loaded
  useEffect(() => {
    if (loansData && loansData.length > 0) {
      // Initialize stats counters
      const stats = {
        "Private Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
        "Government Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
        "Insurance": { total: 0, approved: 0, pending: 0, rejected: 0 },
        "Quick Loan": { total: 0, approved: 0, pending: 0, rejected: 0 },
        "Taxation": { total: 0, approved: 0, pending: 0, rejected: 0 },
      };

      // Process each loan application
      loansData.forEach((loan: any) => {
        const category = getCategoryName(loan.loanType);

        if (stats[category]) {
          // Update total count
          stats[category].total += 1;

          // Update status counts
          if (loan.status.toLowerCase() === "approved") {
            stats[category].approved += 1;
          } else if (loan.status.toLowerCase() === "pending") {
            stats[category].pending += 1;
          } else if (loan.status.toLowerCase() === "rejected") {
            stats[category].rejected += 1;
          }
        }
      });

      // Update state with processed stats
      setLoanStats(stats);

      // Get recent loans for the table (most recent first, limit to 4)
      const sortedLoans = [...loansData]
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

      // Format loans for table display
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

      setRecentLoans(formattedLoans);
    }
  }, [loansData]);

  // Helper function to map loan types to display categories
  const getCategoryName = (loanType: string) => {
    switch (loanType?.toLowerCase()) {
      case "private":
        return "Private Loan";
      case "government":
        return "Government Loan";
      case "insurance":
        return "Insurance";
      case "quick":
        return "Quick Loan";
      case "taxation":
        return "Taxation";
      default:
        return "Private Loan"; // Default fallback
    }
  };

  // Format amount with commas (e.g., 200000 -> 2,00,000)
  const formatAmount = (amount: string | number) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return num.toLocaleString("en-IN");
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen py-6 sm:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 sm:mb-10 text-center">
          DASHBOARD
        </h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-3xl mx-auto">
          <Button 
          onClick={() => router.push("/rm/loans/applications")}
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-900 shadow-md justify-center w-full py-4 sm:py-3">
            <HandCoins className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">View Loan Applications</span>
          </Button>
          <Button 
            onClick={() => router.push("/rm/loans/quick-loan")}
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-900 shadow-md justify-center w-full py-4 sm:py-3">
            <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">View Quick Loan Applications</span>
          </Button>
          <Button 
          onClick={() => router.push("/rm/taxation")}
          className="flex items-center gap-2 bg-black text-white hover:bg-gray-900 shadow-md justify-center w-full py-4 sm:py-3">
            <BriefcaseBusiness className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">View Taxation Orders</span>
          </Button>
          <Button
            onClick={() => router.push("/rm/users")}
            className="flex items-center hover:cursor-pointer gap-2 bg-[#ffd439] text-black font-semibold shadow-md hover:brightness-110 justify-center w-full py-4 sm:py-3"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">View Assigned DSA Users</span>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {isLoading
            ? // Show loading state for statistics
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
            : Object.entries(loanStats).map(([category, stats]) => (
                <div
                  key={category}
                  className="bg-white rounded-xl shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] p-4 sm:p-6"
                >
                  <h4 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">
                    {category}
                  </h4>
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

        {/* Chart */}
        <div className="mb-6 sm:mb-8">
          <ServiceCategoryChart />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-[4px_4px_0_0_#000] sm:shadow-[6px_6px_0_0_#000] p-4 sm:p-6">
          {/* Header with View All */}
          <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3 mb-4">
            <div className="text-lg sm:text-xl flex justify-center gap-2 items-center font-semibold text-black">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8" /> 
              <span>Recent Requests</span>
            </div>
            <button
              onClick={() => router.push("/rm/loans/applications")}
              className="text-xs sm:text-sm font-medium text-[#ffd439] hover:underline hover:text-black transition"
            >
              View All Requests →
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">ID</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Name</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4 hidden sm:table-cell">Category</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Amount</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Status</th>
                  <th className="py-2 px-2 sm:py-3 sm:px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Show loading state for table rows
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
                  recentLoans.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <span className="hidden sm:inline">{row.id.substring(0, 6)}...</span>
                        <span className="sm:hidden">{row.id.substring(0, 4)}..</span>
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 truncate max-w-[80px] sm:max-w-none">
                        {row.name}
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4 hidden sm:table-cell">
                        {row.category}
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4">{row.amount}</td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          {renderStatusIcon(row.status)}
                          <span className="capitalize">{row.status}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 sm:py-3 sm:px-4">
                        <span className="hidden sm:inline">{row.date}</span>
                        <span className="sm:hidden">{row.date.substring(5)}</span>
                      </td>
                    </tr>
                  ))
                ) : (
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

// Stat Card Component
const StatCard = ({
  label,
  value,
  color = "gray",
}: {
  label: string;
  value: number;
  color?: "green" | "yellow" | "red" | "gray";
}) => {
  const colorMap = {
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    gray: "bg-gray-100 text-black",
  };
  return (
    <div className={`rounded-lg sm:rounded-xl p-2 sm:p-3 ${colorMap[color]} shadow`}>
      <div className="text-xs sm:text-sm font-semibold">{label}</div>
      <div className="text-base sm:text-xl font-bold">{value}</div>
    </div>
  );
};

// Status Icon Renderer
const renderStatusIcon = (status: string) => {
  if (status === "Approved")
    return <CheckCircle className="text-green-600 w-4 h-4 sm:w-5 sm:h-5" />;
  if (status === "Pending")
    return <Hourglass className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5" />;
  return <XCircle className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />;
};