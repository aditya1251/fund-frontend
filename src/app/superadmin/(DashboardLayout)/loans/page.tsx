"use client";

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

const sampleStats = {
  "Private Loan": { total: 120, approved: 80, pending: 30, rejected: 10 },
  "Government Loan": { total: 90, approved: 65, pending: 15, rejected: 10 },
  Insurance: { total: 70, approved: 50, pending: 15, rejected: 5 },
};

const sampleTableData = [
  {
    id: "REQ001",
    name: "Amit Sharma",
    category: "Private Loan",
    status: "Approved",
    amount: "₹2,00,000",
    date: "2025-07-20",
  },
  {
    id: "REQ002",
    name: "Sneha Rao",
    category: "Government Loan",
    status: "Pending",
    amount: "₹5,00,000",
    date: "2025-07-19",
  },
  {
    id: "REQ003",
    name: "Rajiv Mehta",
    category: "Insurance",
    status: "Rejected",
    amount: "₹1,00,000",
    date: "2025-07-18",
  },
  {
    id: "REQ004",
    name: "Priya Singh",
    category: "Private Loan",
    status: "Approved",
    amount: "₹1,50,000",
    date: "2025-07-17",
  },
];

export default function LoanDashboardPage() {

  const router = useRouter();
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-10 text-center">
          LOAN DASHBOARD
        </h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-3xl mx-auto">
          {/* Add New Buttons */}
          <Button className="flex items-center gap-2 bg-black text-white hover:bg-gray-900 shadow-md justify-center w-full">
            <HandCoins className="w-5 h-5" />
            Add New Private Loan
          </Button>
          <Button className="flex items-center gap-2 bg-black text-white hover:bg-gray-900 shadow-md justify-center w-full">
            <Building className="w-5 h-5" />
            Add New Government Loan
          </Button>
          <Button className="flex items-center gap-2 bg-black text-white hover:bg-gray-900 shadow-md justify-center w-full">
            <ShieldCheck className="w-5 h-5" />
            Add New Insurance Plan
          </Button>

          {/* View Applications */}
          <Button
          onClick={() => router.push("/superadmin/loans/applications")}
           className="flex items-center hover:cursor-pointer gap-2 bg-[#ffd439] text-black font-semibold shadow-md hover:brightness-110 justify-center w-full">
            <FileText className="w-5 h-5" />
            View All Applications
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(sampleStats).map(([category, stats]) => (
            <div
              key={category}
              className="bg-white rounded-xl shadow-[6px_6px_0_0_#000] p-6">
              <h4 className="text-xl font-semibold text-black mb-4">
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-center">
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
                <StatCard label="Rejected" value={stats.rejected} color="red" />
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className=" space-y-4 mb-8">
        <LoanCategoryChart />

        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-[6px_6px_0_0_#000] p-6">
          {/* Header with View All */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl flex justify-center gap-2 items-center font-semibold text-black">
                         <FileText className="w-8 h-8" />  Recent Loan Requests
            </h2>
            <button className="text-sm font-medium text-[#ffd439] hover:underline hover:text-black transition">
              View All Requests →
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {sampleTableData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50 transition">
                    <td className="py-3 px-4">{row.id}</td>
                    <td className="py-3 px-4">{row.name}</td>
                    <td className="py-3 px-4">{row.category}</td>
                    <td className="py-3 px-4">{row.amount}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {renderStatusIcon(row.status)}
                        <span className="capitalize">{row.status}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{row.date}</td>
                  </tr>
                ))}
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
    <div className={`rounded-xl p-4 ${colorMap[color]} shadow-md`}>
      <div className="text-sm font-semibold">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
};

// Status Icon Renderer
const renderStatusIcon = (status: string) => {
  if (status === "Approved")
    return <CheckCircle className="text-green-600 w-5 h-5" />;
  if (status === "Pending")
    return <Hourglass className="text-yellow-500 w-5 h-5" />;
  return <XCircle className="text-red-500 w-5 h-5" />;
};
