"use client";

import {
  CheckCircle,
  XCircle,
  Hourglass,
  FileText,
  Building,
  HandCoins,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useGetLoansQuery,
  useGetLoanStatsQuery,
} from "@/redux/services/loanApi";
import { useEffect, useState } from "react";
import LoanCategoryChart from "./LoanCategoryChart";

export default function LoanDashboardPage() {
  const router = useRouter();

  const { data: statsData, isLoading: statsLoading } = useGetLoanStatsQuery();
  const { data: loansData, isLoading: loansLoading } = useGetLoansQuery({
    page: 1,
    limit: 4,
  });

  const [loanStats, setLoanStats] = useState({});

  useEffect(() => {
    if (statsData) setLoanStats(statsData);
  }, [statsData]);

  const [recentLoans, setRecentLoans] = useState<Array<{
    _id: string;
    id: string;
    name: string;
    category: string;
    status: string;
    amount: string;
    date: string;
  }>>([]);
  
  useEffect(() => {
    if (loansData?.loans) {
      const rows = loansData.loans.map((loan: any) => {
        const values = loan.values?.[0]?.fields || [];
        const name =
          values.find((f: any) => f.label === "Name")?.value || "N/A";
        const amount =
          values.find((f: any) => f.label === "LoanAmount")?.value || "N/A";
        return {
          _id: loan._id,
          id: loan._id,
          name,
          category: getCategoryName(loan.loanType),
          status: capitalize(loan.status),
          amount: amount !== "N/A" ? `₹${formatAmount(amount)}` : "N/A",
          date: formatDate(loan.createdAt),
        };
      });
      setRecentLoans(rows);
    }
  }, [loansData]);

  const getCategoryName = (loanType: string) => {
    switch (loanType?.toLowerCase()) {
      case "private":
        return "Private Loan";
      case "government":
        return "Government Loan";
      case "insurance":
        return "Insurance";
      default:
        return "Private Loan";
    }
  };

  const formatAmount = (amount: string | number) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return num.toLocaleString("en-IN");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const capitalize = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  return (
    <div className="min-h-screen py-6 px-4 sm:py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
          LOAN DASHBOARD
        </h1>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-8">
          <Button
            onClick={() => router.push("/superadmin/loans/private")}
            className="bg-black text-white w-full flex gap-2 hover:bg-gray-900">
            <HandCoins /> Add New Private Loan
          </Button>
          <Button
            onClick={() => router.push("/superadmin/loans/government")}
            className="bg-black text-white w-full flex gap-2 hover:bg-gray-900">
            <Building /> Add New Government Loan
          </Button>
          <Button
            onClick={() => router.push("/superadmin/loans/insurance")}
            className="bg-black text-white w-full flex gap-2 hover:bg-gray-900">
            <ShieldCheck /> Add New Insurance Plan
          </Button>
          <Button
            onClick={() => router.push("/superadmin/loans/applications")}
            className="bg-[#ffd439] font-semibold w-full flex gap-2 hover:bg-yellow-500">
            <FileText /> View All Applications
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statsLoading
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="p-6 bg-gray-200 rounded-xl animate-pulse h-40"></div>
                ))
            : Object.entries(loanStats).map(([category, stats]: any) => (
                <div
                  key={category}
                  className="bg-white rounded-xl shadow-md p-6">
                  <h4 className="text-xl font-semibold mb-4">{category}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm text-center">
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

        <div className="mb-6 sm:mb-8">
          <LoanCategoryChart statsData={loanStats} />
        </div>
        {/* Recent Loan Table */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileText /> Recent Loan Requests
            </h2>
            <button
              onClick={() => router.push("/superadmin/loans/applications")}
              className="text-[#ffb700] hover:underline text-sm">
              View All Requests →
            </button>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {loansLoading ? (
                  Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="animate-pulse h-10 bg-gray-100">
                        <td colSpan={6}></td>
                      </tr>
                    ))
                ) : recentLoans.length > 0 ? (
                  recentLoans.map((loan) => (
                    <tr
                      key={loan._id}
                      className="border-b hover:bg-gray-50 transition">
                      <td className="p-3">{loan.id.substring(0, 6)}...</td>
                      <td className="p-3">{loan.name}</td>
                      <td className="p-3">{loan.category}</td>
                      <td className="p-3">{loan.amount}</td>
                      <td className="p-3 flex items-center gap-1">
                        {renderStatusIcon(loan.status)}
                        {loan.status}
                      </td>
                      <td className="p-3">{loan.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-gray-500">
                      No loan applications found.
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
    <div className={`rounded-lg p-3 ${colorMap[color]} shadow`}>
      <div className="font-semibold">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
};

const renderStatusIcon = (status: string) => {
  if (status === "Approved")
    return <CheckCircle className="text-green-600 w-4 h-4" />;
  if (status === "Pending")
    return <Hourglass className="text-yellow-500 w-4 h-4" />;
  return <XCircle className="text-red-500 w-4 h-4" />;
};
