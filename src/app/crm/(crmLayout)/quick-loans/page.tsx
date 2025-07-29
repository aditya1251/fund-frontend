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
  TableWrapper,
  TableHeadings,
  TableRow,
  EmailCell,
  StatusBadge,
  ViewAllButton,
} from "@/components/ui/data-table";
import { House, User, Car, Building, LandPlot, History } from "lucide-react";
import Link from "next/link";
import { useGetLoansByDsaIdQuery } from "@/redux/services/loanApi";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function Page() {
  const session = useSession();
  const dsaId = session.data?.user?.id || "";

  // ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP LEVEL
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // default to latest

  const { data, isLoading: loansLoading } = useGetLoansByDsaIdQuery(dsaId);
  const { data: loansTemplates = [], isLoading: templatesLoading } =
    useGetLoanTemplatesByTypeQuery("quick");

  // Data processing based on fetched data
  const loansData =
    data?.filter((loan: any) => loan.loanType === "quick") || [];

  // This useMemo is now called unconditionally
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
        const nameA = (a.values?.[0]?.fields?.[0]?.value || "").toLowerCase();
        const nameB = (b.values?.[0]?.fields?.[0]?.value || "").toLowerCase();
        return nameA.localeCompare(nameB);
      }
      if (sortBy === "name-desc") {
        const nameA = (a.values?.[0]?.fields?.[0]?.value || "").toLowerCase();
        const nameB = (b.values?.[0]?.fields?.[0]?.value || "").toLowerCase();
        return nameB.localeCompare(nameA);
      }
      return 0;
    });
    return leads;
  }, [loansData, search, statusFilter, sortBy]);

  // Now, you can conditionally return, as all hooks have been called
  if (loansLoading || templatesLoading) {
    return <Loading />;
  }

  return (
    <RequireFeature feature="Loans">
      {/* Overall page container with responsive horizontal padding */}
      <div className="max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6">
        {/* Header section: "Loan Types" title and "Saved Drafts" button */}
        {/* Stacks on mobile (flex-col), becomes row on small screens and up (sm:flex-row) */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h4 className="font-semibold text-black mb-4 sm:mb-0">Loan Types</h4> {/* Added mb-4 sm:mb-0 for spacing */}
          <Link href="/crm/drafts">
            <button className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full sm:w-auto justify-center"> {/* w-full on mobile, w-auto on sm+, justify-center for centering */}
              <History className="h-4 w-4" />
              Saved Drafts
            </button>
          </Link>
        </div>

        <Tabs defaultValue="6885355c8298919446610fbb">
          {/* TabsList with responsive grid columns.
              This will override any hardcoded grid-cols-4 in the TabsList component's definition
              for smaller screens.
              grid-cols-1 for very small screens (default).
              sm:grid-cols-2 for small screens (e.g., larger phones, portrait tablets).
              lg:grid-cols-4 for large screens (desktop).
          */}
          <TabsList className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {loansTemplates.map((template: any) => (
              <Link key={template.id} href={`/crm/loan-form?id=${template.id}`}>
                {/* Assuming TabsTrigger is designed to receive 'isActive' prop for styling.
                    Also assuming TabsTrigger, TabsIcon, TabsLabel, TabsDescription are
                    designed to be responsive and handle their internal height consistency
                    (e.g., using min-height on Trigger, fixed height/overflow on Description).
                */}
                <TabsTrigger value={template.id}>
                  <TabsIcon>
                    {template.icon === "user" ? (
                      <User />
                    ) : template.icon === "home" ? (
                      <House />
                    ) : template.icon === "car" ? (
                      <Car />
                    ) : template.icon === "building" ? (
                      <Building />
                    ) : template.icon === "landplot" ? (
                      <LandPlot />
                    ) : (
                      <User className="text-black" />
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

        {/* Loan Leads Table Section */}
        <div className="mt-6">
          <div className="py-4">
            {/* Flex container for "Quick Loan Leads" title and filter/sort controls */}
            {/* Stacks on mobile (flex-col), becomes row on medium screens and up (md:flex-row) */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <h4 className="text-lg font-semibold text-black mb-4 md:mb-0"> {/* Added mb-4 sm:mb-0 for spacing */}
                Quick Loan Leads
              </h4>
              {/* Filter/Sort controls: stack on mobile (flex-col), become row on small screens (sm:flex-row),
                  prevent wrapping on medium screens and up (md:flex-nowrap).
                  Full width on mobile, auto width on sm+ to allow them to sit side-by-side.
              */}
              <div className="mb-4 mt-0 md:mt-4 flex flex-col sm:flex-row md:flex-row md:flex-nowrap gap-2 w-full md:w-auto justify-end">
                <Input
                  type="text"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded border bg-white px-2 py-1 w-full sm:w-auto" // w-full on mobile, w-auto on sm+
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded border bg-white px-2 py-1 w-full sm:w-auto" // w-full on mobile, w-auto on sm+
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded border bg-white px-2 py-1 w-full sm:w-auto" // w-full on mobile, w-auto on sm+
                >
                  <option value="date-desc">Sort by Latest</option>
                  <option value="date-asc">Sort by Oldest</option>
                  <option value="name-asc">Sort by Name (A-Z)</option>
                  <option value="name-desc">Sort by Name (Z-A)</option>
                </Select>
              </div>
            </div>

            {/* Table wrapper with horizontal overflow for responsiveness */}
            <TableWrapper className="overflow-x-auto">
              <table className="w-full whitespace-nowrap bg-white text-sm"> {/* whitespace-nowrap to prevent cell content wrapping */}
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
                        <EmailCell key={`email-sub-${index}`} email={lead.subscriber} />,
                        <EmailCell key={`email-val-${index}`} email={lead.values[0].fields[1].value} />,
                        lead.values[0].fields[2].value,
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