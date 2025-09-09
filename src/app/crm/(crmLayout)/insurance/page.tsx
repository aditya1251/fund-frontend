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
  TableWrapper,
  TableHeadings,
  TableRow,
  EmailCell,
  StatusBadge,
} from "@/components/ui/data-table";
import Link from "next/link";
import { useGetLoansByDsaIdQuery } from "@/redux/services/loanApi";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { Building, Car, House, LandPlot, User, History, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { MobileCard, MobileCardList } from "@/components/ui/mobile-card";
import { getFileUrl } from "@/utils/fileUploadService";

export default function Page() {
  const session = useSession();
  const dsaId = session.data?.user?.id || "";

  const { data, isLoading: loansLoading } = useGetLoansByDsaIdQuery(dsaId);
  const { data: loansTemplates = [], isLoading: templatesLoading } =
    useGetLoanTemplatesByTypeQuery("insurance");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsPerPage = 10;

  // Modal state
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (loan: any) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedLoan(null);
    setShowModal(false);
  };

  const loansData = useMemo(() => {
    return data?.filter((loan: any) => loan.loanType === "insurance") || [];
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
        if (dateA === dateB) return (b._id || "").localeCompare(a._id || "");
        return dateB - dateA;
      }
      if (sortBy === "date-asc") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (dateA === dateB) return (a._id || "").localeCompare(b._id || "");
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

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(0, currentPage * itemsPerPage);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
      setIsLoadingMore(false);
    }, 500);
  };

  if (loansLoading || templatesLoading) {
    return <Loading />;
  }

  return (
    <RequireFeature feature="Insurance">
      <div className="max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h4 className="font-semibold text-black mb-4 sm:mb-0">
            Insurance Types
          </h4>
          <Link href="/crm/drafts">
            <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm w-full sm:w-auto justify-center">
              <History className="w-4 h-4" />
              Saved Drafts
            </button>
          </Link>
        </div>

        <Tabs defaultValue="Health Insurance">
          <TabsList>
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

        {/* Insurance Leads Table */}
        <div className="mt-6">
          <div className="py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h4 className="text-lg font-semibold text-black mb-4 md:mb-0">
                Insurance Leads
              </h4>
              <div className="flex flex-col sm:flex-row md:flex-row md:flex-nowrap justify-end gap-2 mb-4 mt-0 md:mt-4 w-full md:w-auto">
                <Input
                  type="text"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border bg-white px-2 py-1 rounded w-full sm:w-auto"
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border bg-white px-2 py-1 rounded w-full sm:w-auto"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border bg-white px-2 py-1 rounded w-full sm:w-auto"
                >
                  <option value="date-desc">Sort by Latest</option>
                  <option value="date-asc">Sort by Oldest</option>
                  <option value="name-asc">Sort by Name (A-Z)</option>
                  <option value="name-desc">Sort by Name (Z-A)</option>
                </Select>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <TableWrapper className="overflow-x-auto">
                <table className="w-full bg-white text-sm whitespace-nowrap">
                  <TableHeadings
                    columns={[
                      "File No.",
                      "Insurance Type",
                      "Insurance Mode",
                      "Applicant",
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
                          <EmailCell
                            key={`email-${index}`}
                            email={lead.values[0].fields[1].value}
                          />,
                          lead.values[0].fields[2].value,
                          <button
                            onClick={() => openModal(lead)}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 text-xs"
                          >
                            Review
                          </button>,
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
            </div>

            {/* Mobile Card View */}
            <MobileCardList
              items={paginatedLeads}
              renderCard={(lead: any, index: number) => (
                <MobileCard
                  key={index}
                  data={{
                    id: lead._id,
                    type: lead.loanSubType,
                    mode: lead.mode,
                    applicant: lead.values[0].fields[0].value,
                    email: lead.values[0].fields[1].value,
                    phone: lead.values[0].fields[2].value,
                    review: (
                      <button
                        onClick={() => openModal(lead)}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 text-xs"
                      >
                        Review
                      </button>
                    ),
                    status: lead.status.toLowerCase() as
                      | "approved"
                      | "pending"
                      | "rejected",
                    createdAt: lead.createdAt,
                  }}
                />
              )}
              emptyMessage="No insurance leads found"
              showLoadMore={true}
              onLoadMore={handleLoadMore}
              isLoadingMore={isLoadingMore}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedLoan && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-2">
            <div className="bg-white w-full max-w-3xl max-h-[75vh] overflow-y-auto p-6 rounded-xl border-2 border-black shadow-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black p-2 rounded-full hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-4">Insurance Details</h3>

              <div className="space-y-6">
                {selectedLoan.values.map((page: any) => (
                  <div key={page.pageNumber}>
                    <h4 className="text-lg font-semibold mb-2">{page.title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {page.fields.map((field: any, index: number) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-3 rounded border"
                        >
                          <label className="block text-sm font-medium mb-1">
                            {field.label}
                          </label>
                          {field.isDocument ? (
                            <FileViewer fileKey={field.value} />
                          ) : (
                            <p className="text-sm text-gray-800 break-words">
                              {field.value || "N/A"}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </RequireFeature>
  );
}

const FileViewer = ({ fileKey }: { fileKey: string }) => {
  const [loading, setLoading] = useState(false);

  const handleViewFile = async () => {
    setLoading(true);
    try {
      const url = await getFileUrl(fileKey);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error fetching file:", err);
      alert("Failed to open file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleViewFile}
      className="text-blue-600 hover:underline hover:cursor-pointer text-sm break-all"
      disabled={loading}
    >
      {loading ? "Loading..." : "View Document"}
    </button>
  );
};