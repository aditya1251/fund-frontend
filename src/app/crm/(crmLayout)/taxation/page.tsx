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
  // TableHeader, // Removed TableHeader import as its functionality is moved inline
  TableWrapper,
  TableHeadings,
  TableRow,
  EmailCell,
  StatusBadge,
  ViewAllButton,
} from "@/components/ui/data-table";
import { BriefcaseBusiness, FileText, History, Search, Filter, SlidersHorizontal } from "lucide-react"; // Import necessary icons for inline controls
import Link from "next/link";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoansByDsaIdQuery } from "@/redux/services/loanApi";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function Page() {
  // --- ALL HOOKS AND DEPENDENT LOGIC MUST BE AT THE TOP ---
  const session = useSession();
  const dsaId = session.data?.user?.id || "";

  // State hooks
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  // Data fetching hooks
  const { data, isLoading: loansLoading } = useGetLoansByDsaIdQuery(dsaId);
  const { data: taxTemplates = [], isLoading: templatesLoading } =
    useGetLoanTemplatesByTypeQuery("taxation");

  // Data transformation logic and memoization hook
  const taxData =
    data?.filter((loan: any) => loan.loanType === "taxation") || [];

  const filteredData = useMemo(() => {
    let leads = taxData;
    // Search
    if (search) {
      leads = leads.filter((lead: any) => {
        const fields = lead.values[0]?.fields || [];
        const getFieldValue = (label: string) => {
          const field = fields.find((f: any) => f.label === label);
          return field?.value || "";
        };

        const name = getFieldValue("Name").toLowerCase();
        const email = getFieldValue("Email").toLowerCase();
        const service = getFieldValue("Services").toLowerCase(); // Assuming "Services" is a field
        const searchLower = search.toLowerCase();

        return (
          name.includes(searchLower) ||
          email.includes(searchLower) ||
          service.includes(searchLower)
        );
      });
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
        return dateB - dateA;
      }
      if (sortBy === "date-asc") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateA === dateB) {
          return (a._id || "").localeCompare(b._id || "");
        }
        return dateA - dateB;
      }
      if (sortBy === "name-asc" || sortBy === "name-desc") {
        const fieldsA = a.values[0]?.fields || [];
        const fieldsB = b.values[0]?.fields || [];

        const getFieldValue = (fieldsArray: any[], label: string) => {
          const field = fieldsArray.find((f: any) => f.label === label);
          return (field?.value || "").toLowerCase();
        };

        const nameA = getFieldValue(fieldsA, "Name");
        const nameB = getFieldValue(fieldsB, "Name");

        return sortBy === "name-asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      return 0;
    });
    return leads;
  }, [taxData, search, statusFilter, sortBy]);

  // --- CONDITIONAL RETURN IS NOW AFTER ALL HOOKS ---
  if (loansLoading || templatesLoading) {
    return <Loading />;
  }

  return (
    <RequireFeature feature="Taxation">
      {/* Overall page container with responsive horizontal padding */}
      <div className="max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6">
        {/* Header section: Title and Saved Drafts button */}
        {/* Stacks on mobile (flex-col), becomes row on small screens and up (sm:flex-row) */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          {/* Added mb-4 sm:mb-0 for spacing when stacked */}
          <h4 className="font-semibold text-black mb-4 sm:mb-0">
            Providing Taxation Services At Affordable Prices
          </h4>
          <Link href="/crm/drafts">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm w-full sm:w-auto justify-center mt-4 sm:mt-0"> {/* w-full on mobile, sm:w-auto, justify-center, mt-4 sm:mt-0 */}
              <History className="w-4 h-4" />
              Saved Drafts
            </button>
          </Link>
        </div>

        <Tabs defaultValue="6885fc055d73e6b0d50b5b24">
          {/* TabsList is now inherently responsive based on its updated definition in components/ui/tab.tsx */}
          <TabsList>
            {taxTemplates.map((template: any) => (
              <Link key={template.id} href={`/crm/loan-form?id=${template.id}`}>
                {/* TabsTrigger and its children (Icon, Label, Description) are responsive and maintain height consistency due to updates in components/ui/tab.tsx */}
                <TabsTrigger value={template.id}>
                  <TabsIcon>
                    {template.icon === "service" ? (
                      <BriefcaseBusiness className="text-black" />
                    ) : (
                      <FileText className="text-black" />
                    )}
                  </TabsIcon>
                  <TabsLabel>
                    <div className="text-black">{template.name}</div>
                    <TabsDescription>
                      {template.description || "No description available"}
                    </TabsDescription>
                  </TabsLabel>
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>

        {/* Requests Table Section */}
        <div className="mt-6">
          <div className="py-4">
            {/* NEW: Table Header (Title and Controls) - Made responsive */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-black mb-4 md:mb-0">Taxation Requests</h4>
              <div className="flex flex-col sm:flex-row md:flex-row md:flex-nowrap gap-2 items-stretch sm:items-center w-full md:w-auto"> {/* Added w-full md:w-auto, items-stretch/center */}
                {/* Search Input */}
                <div className="relative w-full sm:w-auto"> {/* Added w-full sm:w-auto for input */}
                  <input
                    type="text"
                    placeholder="Search by name, email or service"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-sm text-black rounded border border-gray-300 focus:outline-none w-full" // w-full inside relative div
                  />
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                {/* Filters Button */}
                <button className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-200 w-full sm:w-auto"> {/* Added w-full sm:w-auto */}
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                {/* Sort Button */}
                <button className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-200 w-full sm:w-auto"> {/* Added w-full sm:w-auto */}
                  <SlidersHorizontal className="w-4 h-4" />
                  Sort
                </button>
              </div>
            </div>

            {/* Table wrapper with horizontal overflow for responsiveness */}
            <TableWrapper className="overflow-x-auto">
              <table className="w-full whitespace-nowrap bg-white text-sm"> {/* whitespace-nowrap to prevent cell content wrapping */}
                <TableHeadings
                  columns={[
                    "File No.",
                    "Service",
                    "Applicant name",
                    "Subscriber",
                    "Email",
                    "Phone",
                    "Review",
                    "Status",
                  ]}
                />
                <tbody>
                  {filteredData.map((lead: any, index: number) => {
                    const fields = lead.values[0]?.fields || [];

                    const getFieldValue = (label: string) => {
                      const field = fields.find((f: any) => f.label === label);
                      return field?.value || "-";
                    };
                    return (
                      <TableRow
                        key={index}
                        row={[
                          lead._id,
                          getFieldValue("Services"),
                          getFieldValue("Name"),
                          <EmailCell key={`email-sub-${index}`} email={lead.subscriber} />,
                          <EmailCell key={`email-val-${index}`} email={getFieldValue("Email")} />,
                          getFieldValue("Phone"),
                          lead.rejectionMessage,
                          <StatusBadge
                            key={`status-${index}`}
                            status={
                              lead.status.toLowerCase() as
                                | "approved"
                                | "pending"
                                | "rejected"
                            }
                          />,
                        ]}
                      />
                    );
                  })}
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