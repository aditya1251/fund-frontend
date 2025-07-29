"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsLabel,
  TabsDescription,
  TabsIcon,
} from "@/components/ui/tab";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

import {
  TableHeader, // New component, assuming its internal structure is fine or responsive already
  TableWrapper,
  TableHeadings,
  TableRow,
  EmailCell,
  StatusBadge,
  ViewAllButton,
} from "@/components/ui/data-table";
import Link from "next/link";
import { useGetLoansByDsaIdQuery } from "@/redux/services/loanApi";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { Building, Car, House, LandPlot, User, History } from "lucide-react";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function Page() {
  const session = useSession();
  const dsaId = session.data?.user?.id || "";

  const { data, isLoading: loansLoading } = useGetLoansByDsaIdQuery(dsaId);
  const { data: loansTemplates = [], isLoading: templatesLoading } =
    useGetLoanTemplatesByTypeQuery("government");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const loansData = useMemo(() => {
    return data?.filter((loan: any) => loan.loanType === "government") || [];
  }, [data]);

  const filteredLeads = useMemo(() => {
    let leads = loansData;

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
    if (statusFilter) {
      leads = leads.filter(
        (lead: any) =>
          (lead.status || "").toLowerCase() === statusFilter.toLowerCase()
      );
    }
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


  if (loansLoading || templatesLoading) {
    return <Loading />;
  }


  return (
    <RequireFeature feature="Govt-Loans">
      {/* Added responsive horizontal padding for the main container */}
      <div className="max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6">
        {/* Loan Types header and Saved Drafts button */}
        {/* Changed to flex-col on mobile, flex-row on sm+ */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          {/* Added margin-bottom for mobile */}
          <h4 className="font-semibold text-black mb-4 sm:mb-0">Govt. Loan Types</h4>
          <Link href="/crm/drafts">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm w-full sm:w-auto justify-center"> {/* Added w-full sm:w-auto justify-center for responsiveness */}
              <History className="w-4 h-4" />
              Saved Drafts
            </button>
          </Link>
        </div>

        <Tabs defaultValue="MSME Loans">
          {/* TabsList no longer needs explicit grid classes here if it's updated internally.
              If not, uncomment the className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" below.
          */}
          <TabsList> {/* Assuming TabsList is already responsive internally or will be from tab.tsx */}
            {loansTemplates.map((template: any) => (
              <Link key={template.id} href={`/crm/loan-form?id=${template.id}`}>
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
                      <User />
                    )}
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

        {/* Govt. Loan Leads Table */}
        <div className="mt-6">
          <div className="py-4">
            {/* Flex container for "Govt. Loan Leads" title and controls: stacks on mobile, row on md+ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h4 className="text-lg font-semibold text-black mb-4 md:mb-0">
                Govt. Loan Leads
              </h4>
              {/* Controls: flex-col on mobile, sm:flex-row on small mobile to allow side-by-side if space,
                  md:flex-row and no-wrap for desktop. Added gap-2 for spacing.
                  w-full on mobile, md:w-auto for desktop.
              */}
              <div className="flex flex-col sm:flex-row md:flex-row md:flex-nowrap justify-end gap-2 mb-4 mt-0 md:mt-4 w-full md:w-auto">
                <Input
                  type="text"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border bg-white px-2 py-1 rounded w-full sm:w-auto" // w-full on mobile, w-auto on sm+
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border bg-white px-2 py-1 rounded w-full sm:w-auto" // w-full on mobile, w-auto on sm+
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border bg-white px-2 py-1 rounded w-full sm:w-auto" // w-full on mobile, w-auto on sm+
                >
                  <option value="date-desc">Sort by Latest</option>
                  <option value="date-asc">Sort by Oldest</option>
                  <option value="name-asc">Sort by Name (A-Z)</option>
                  <option value="name-desc">Sort by Name (Z-A)</option>
                </Select>
              </div>
            </div>

            <TableWrapper className="overflow-x-auto">
              <table className="w-full bg-white text-sm whitespace-nowrap"> {/* Added whitespace-nowrap to prevent cell content wrapping */}
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
                  {/* Ensure filteredLeads is always an array before mapping */}
                  {filteredLeads.map((lead: any, index: number) => (
                    <TableRow
                      key={index}
                      row={[
                        lead._id,
                        lead.loanSubType,
                        lead.mode ? lead.mode : "Online",
                        lead.values[0].fields[0].value,
                        <EmailCell key={`sub-${index}`} email={lead.subscriber} />,
                        <EmailCell key={`email-${index}`} email={lead.values[0].fields[1].value} />,
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