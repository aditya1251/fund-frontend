"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsIcon,
  TabsLabel,
  TabsDescription,
} from "@/components/ui/tab";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import {
  TableHeader,
  TableWrapper,
  TableHeadings,
  TableRow,
  EmailCell,
  StatusBadge,
  ViewAllButton,
} from "@/components/ui/data-table";
import { House, User, Car, Building, LandPlot, History } from "lucide-react";
import Link from "next/link";
import { useGetLoansQuery } from "@/redux/services/loanApi";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { useMemo, useState } from "react";

export default function Page() {
  const { data: loansData = [] } = useGetLoansQuery({ loanType: "private" });
  const { data: loansTemplates = [] } =
    useGetLoanTemplatesByTypeQuery("private");

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
    <RequireFeature feature="Loans">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-semibold text-black">Loan Types</h4>
          <Link href="/crm/drafts">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm">
              <History className="w-4 h-4" />
              Saved Drafts
            </button>
          </Link>
        </div>

        <Tabs defaultValue="personal">
          <TabsList>
            {loansTemplates.map((template: any) => (
              <Link key={template.id} href={`/crm/loan-form?id=${template.id}`}>
                <TabsTrigger value={template.id}>
				  <TabsIcon>
					{template.icon === "user" ? <User /> :
					 template.icon === "home" ? <House /> :
					 template.icon === "car" ? <Car /> :
					 template.icon === "building" ? <Building /> :
					 template.icon === "landplot" ? <LandPlot /> :
					 <User />}
				  </TabsIcon>
                  <TabsLabel>
                    {template.name}
                    <TabsDescription>
                      {template.description || "No description available"}
                    </TabsDescription>
                  </TabsLabel>
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>

        {/* Loan Leads Table */}
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
}
