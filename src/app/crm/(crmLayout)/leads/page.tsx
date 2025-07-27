"use client";
import React, { useState } from "react";
import { Users } from "lucide-react";
import { MetricGrid, MetricCard } from "@/components/ui/dashboard-metric";
import {
  TableWrapper,
  TableHeadings,
  TableRow,
  EmailCell,
  StatusBadge,
  ViewAllButton,
} from "@/components/ui/data-table";
import { useGetLoansByDsaIdQuery, useGetLoansQuery } from "@/redux/services/loanApi";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { RequireFeature } from "@/components/RequireFeature";
import { useSession } from "next-auth/react";

type Tab = "Loans" | "Govt Loans" | "Insurance";

interface StatusCardData {
  label: string;
  value: string;
  variant?: "primary" | "secondary" | "columned";
  icon?: React.ReactNode;
  className?: string;
}

const TABS: Tab[] = ["Loans", "Govt Loans", "Insurance"];

const getDataByTab = (tab: Tab, loansData: any[] = []): StatusCardData[] => {
  if (tab === "Loans") {
    const allLoans = loansData.filter((loan) => loan.loanType === "private");
    const pendingLoans = allLoans.filter((loan) => loan.status === "pending");
    const approvedLoans = allLoans.filter((loan) => loan.status === "approved");
    const rejectedLoans = allLoans.filter((loan) => loan.status === "rejected");
    return [
      {
        label: "All Loans",
        value: allLoans.length.toString(),
        variant: "primary",
        icon: <Users />, // keep icon
        className: "font-bold",
      },
      {
        label: "Pending",
        value: pendingLoans.length.toString(),
        variant: "secondary",
      },
      {
        label: "Approved",
        value: approvedLoans.length.toString(),
        variant: "primary",
      },
      {
        label: "Disbursed",
        value: rejectedLoans.length.toString(),
        variant: "secondary",
      },
    ];
  }
  if (tab === "Govt Loans") {
    const allLoans = loansData.filter((loan) => loan.loanType === "government");
    const pendingLoans = allLoans.filter((loan) => loan.status === "pending");
    const approvedLoans = allLoans.filter((loan) => loan.status === "approved");
    const rejectedLoans = allLoans.filter((loan) => loan.status === "rejected");
    return [
      {
        label: "All Loans",
        value: allLoans.length.toString(),
        variant: "primary",
        icon: <Users />, // keep icon
        className: "font-bold",
      },
      {
        label: "Pending",
        value: pendingLoans.length.toString(),
        variant: "secondary",
      },
      {
        label: "Approved",
        value: approvedLoans.length.toString(),
        variant: "primary",
      },
      {
        label: "Disbursed",
        value: rejectedLoans.length.toString(),
        variant: "secondary",
      },
    ];
  }
  if (tab === "Insurance") {
    const allLoans = loansData.filter((loan) => loan.loanType === "insurance");
    const pendingLoans = allLoans.filter((loan) => loan.status === "pending");
    const approvedLoans = allLoans.filter((loan) => loan.status === "approved");
    const rejectedLoans = allLoans.filter((loan) => loan.status === "rejected");
    return [
      {
        label: "All Loans",
        value: allLoans.length.toString(),
        variant: "primary",
        icon: <Users />, // keep icon
        className: "font-bold",
      },
      {
        label: "Pending",
        value: pendingLoans.length.toString(),
        variant: "secondary",
      },
      {
        label: "Approved",
        value: approvedLoans.length.toString(),
        variant: "primary",
      },
      {
        label: "Disbursed",
        value: rejectedLoans.length.toString(),
        variant: "secondary",
      },
    ];
  }
  return [];
};

const LeadActivityStatus: React.FC = () => {
  const session = useSession();
  const dsaId = session.data?.user?.id || "";
  const [activeTab, setActiveTab] = useState<Tab>("Loans");
  const { data: loansData = [] } = useGetLoansByDsaIdQuery(dsaId);
  const data = getDataByTab(activeTab, loansData);

  // New state for search/filter/sort
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // default to latest

  // Filtered and sorted data
  const filteredLeads = useMemo(() => {
    let leads = loansData;
    // Search
    if (search) {
      leads = leads.filter(
        (lead: any) =>
          (lead.values[0]?.fields[0].value || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (lead.values[0]?.fields[1].value || "")
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }
    // Status filter (case-insensitive)
    if (statusFilter) {
      leads = leads.filter(
        (lead: any) =>
          (lead.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }
    // Sort
    leads = leads.slice().sort((a: any, b: any) => {
      if (sortBy === "date-desc") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateA === dateB) {
          return (b._id || "").localeCompare(a._id || "");
        }
        return dateB - dateA; // latest first
      }
      if (sortBy === "date-asc") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateA === dateB) {
          return (a._id || "").localeCompare(b._id || "");
        }
        return dateA - dateB; // oldest first
      }
      if (sortBy === "name-asc") {
        const nameA = (a.values?.Name || "").toLowerCase();
        const nameB = (b.values?.Name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      }
      if (sortBy === "name-desc") {
        const nameA = (a.values?.Name || "").toLowerCase();
        const nameB = (b.values?.Name || "").toLowerCase();
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
    return leads;
  }, [loansData, search, statusFilter, sortBy]);

  return (
    <RequireFeature feature="Leads">
      <div>
        <h4 className="font-semibold mb-6 text-black">Lead Activity Status</h4>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`text-sm px-12 py-2 rounded ${
                tab === activeTab
                  ? "bg-[#f5d949] text-black"
                  : "bg-white text-black border-gray-300 border"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Metric Grid */}
        <MetricGrid>
          {data.map(({ label, value, variant, icon, className }, index) => (
            <MetricCard
              key={index}
              label={label}
              value={value}
              icon={icon}
              variant={variant}
              className={className}
            />
          ))}
        </MetricGrid>

        {/* Search, Filter, Sort Controls */}

        {/* All Leads Table */}
        <div className="mt-6">
          <div className="py-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-black">All Leads</h4>
              <div className="flex gap-2 mb-4 mt-4">
                <Input
                  type="text"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border bg-white px-2 py-1 rounded"
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border bg-white px-2 py-1 rounded"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border bg-white px-2 py-1 rounded"
                >
                  <option value="date-desc">Sort by Latest</option>
                  <option value="date-asc">Sort by Oldest</option>
                  <option value="name-asc">Sort by Name (A-Z)</option>
                  <option value="name-desc">Sort by Name (Z-A)</option>
                </Select>
              </div>
            </div>

            <TableWrapper>
              <table className="w-full bg-white overflow-hidden text-sm">
                <TableHeadings
                  columns={[
                    "File No.",
                    "Loan",
                    "Loan Mode",
                    "Applicant",
                    "Subscriber",
                    "Email",
                    "Phone",
                    "Review",
                    "Status",
                  ]}
                />
                <tbody>
                  {filteredLeads.map((lead: any, index: number) => (
                    <TableRow
                      key={index}
                      row={[
                        lead._id,
                        lead.loanSubType,
                        lead.mode ? lead.mode : "Online",
                        lead.values[0].fields[0].value,
                        <EmailCell email={lead.subscriber} />,
                        <EmailCell email={lead.values[0].fields[1].value} />,
                        lead.values[0].fields[2].value,
                        lead.rejectionMessage,
                        <StatusBadge
                          status={
                            lead.status.toLowerCase() as
                              | "approved"
                              | "pending"
                              | "rejected"
                          }
                        />,
                      ]}
                    />
                  ))}
                </tbody>
              </table>
            </TableWrapper>

            <ViewAllButton />
          </div>
        </div>
      </div>
    </RequireFeature>
  );
};

export default LeadActivityStatus;
