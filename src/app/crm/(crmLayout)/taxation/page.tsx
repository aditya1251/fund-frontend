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
import Link from "next/link";
import { BriefcaseBusiness, FileText, History } from "lucide-react";
import { RequireFeature } from "@/components/RequireFeature";
import {
  useGetLoansByDsaIdQuery,
} from "@/redux/services/loanApi";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function Page() {
  const session = useSession();
  const dsaId = session.data?.user?.id || "";
  const { data, isLoading: loansLoading } = useGetLoansByDsaIdQuery(dsaId);
  const taxData =
    data?.filter((loan: any) => loan.loanType === "taxation") || [];
  const { data: taxTemplates = [], isLoading: templatesLoading } =
    useGetLoanTemplatesByTypeQuery("taxation");
    
  // Show loading when fetching initial data
  if (loansLoading || templatesLoading) {
    return <Loading />;
  }
    
  // New state for search/filter/sort
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc"); // default to latest

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let leads = taxData;
    // Search
    if (search) {
      leads = leads.filter((lead: any) => {
        const fields = lead.values[0]?.fields || [];
        // Extract values by label
        const getFieldValue = (label: string) => {
          const field = fields.find((f: any) => f.label === label);
          return field?.value || "";
        };
        
        const name = getFieldValue("Name").toLowerCase();
        const email = getFieldValue("Email").toLowerCase();
        const service = getFieldValue("Services").toLowerCase();
        const searchLower = search.toLowerCase();
        
        return name.includes(searchLower) || 
               email.includes(searchLower) || 
               service.includes(searchLower);
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
      if (sortBy === "name-asc" || sortBy === "name-desc") {
        const fieldsA = a.values[0]?.fields || [];
        const fieldsB = b.values[0]?.fields || [];
        
        const getFieldValue = (fields: any[], label: string) => {
          const field = fields.find((f: any) => f.label === label);
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

  return (
    <RequireFeature feature="Taxation">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h4 className="font-semibold mb-6 text-black">
            Providing Taxation Services At Affordable Prices
          </h4>
          <Link href="/crm/drafts">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm">
              <History className="w-4 h-4" />
              Saved Drafts
            </button>
          </Link>
        </div>

        <Tabs defaultValue="6885fc055d73e6b0d50b5b24">
          <TabsList>
            {taxTemplates.map((template: any) => (
              <Link key={template.id} href={`/crm/loan-form?id=${template.id}`}>
                <TabsTrigger value={template.id}>
                  <TabsIcon>
                    {template.icon === "service" ? (
                      <BriefcaseBusiness />
                    ) : (
                      <FileText />
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

        {/* Requests Table */}
        <div className="mt-6">
          <div className="py-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-black">Taxation Requests</h4>
              <div className="flex gap-2 mb-4 mt-4">
                <Input
                  type="text"
                  placeholder="Search by name, email or service"
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

                    // Extract values by label
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
                          <EmailCell email={lead.subscriber} />,
                          <EmailCell email={getFieldValue("Email")} />,
                          getFieldValue("Phone"),
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
