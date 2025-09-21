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
} from "@/components/ui/data-table";
import {
  House,
  User,
  Car,
  Building,
  LandPlot,
  History,
  X,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useGetLoansByDsaIdQuery } from "@/redux/services/loanApi";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";
import { MobileCard, MobileCardList } from "@/components/ui/mobile-card";
import { getFileUrl } from "@/utils/fileUploadService";
import LoanChatModal from "@/components/LoanChatModal";

export default function Page() {
  const session = useSession();
  const dsaId = session.data?.user?.id || "";
  const [chatLoanId, setChatLoanId] = useState<string | null>(null);

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

  const { data, isLoading: loansLoading } = useGetLoansByDsaIdQuery(dsaId);
  const { data: loansTemplates = [], isLoading: templatesLoading } =
    useGetLoanTemplatesByTypeQuery("quick");

  const loansData =
    data?.filter((loan: any) => loan.loanType === "quick") || [];

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
        return (
          (new Date(b.createdAt).getTime() || 0) -
          (new Date(a.createdAt).getTime() || 0)
        );
      }
      if (sortBy === "date-asc") {
        return (
          (new Date(a.createdAt).getTime() || 0) -
          (new Date(b.createdAt).getTime() || 0)
        );
      }
      if (sortBy === "name-asc") {
        return (a.values?.[0]?.fields?.[0]?.value || "").localeCompare(
          b.values?.[0]?.fields?.[0]?.value || ""
        );
      }
      if (sortBy === "name-desc") {
        return (b.values?.[0]?.fields?.[0]?.value || "").localeCompare(
          a.values?.[0]?.fields?.[0]?.value || ""
        );
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
    <RequireFeature feature="Loans">
      <div className="max-w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h4 className="font-semibold text-black mb-4 sm:mb-0">Loan Types</h4>
          <Link href="/crm/drafts">
            <button className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full sm:w-auto justify-center">
              <History className="h-4 w-4" />
              Saved Drafts
            </button>
          </Link>
        </div>

        {/* Loan Templates Tabs */}
        <Tabs defaultValue="quick">
          <TabsList className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

        {/* Quick Loan Leads Table */}
        <div className="mt-6">
          <div className="py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <h4 className="text-lg font-semibold text-black mb-4 md:mb-0">
                Quick Loan Leads
              </h4>
              <div className="mb-4 mt-0 md:mt-4 flex flex-col sm:flex-row md:flex-row md:flex-nowrap gap-2 w-full md:w-auto justify-end">
                <Input
                  type="text"
                  placeholder="Search by name or email"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded border bg-white px-2 py-1 w-full sm:w-auto"
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded border bg-white px-2 py-1 w-full sm:w-auto">
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Select>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded border bg-white px-2 py-1 w-full sm:w-auto">
                  <option value="date-desc">Sort by Latest</option>
                  <option value="date-asc">Sort by Oldest</option>
                  <option value="name-asc">Sort by Name (A-Z)</option>
                  <option value="name-desc">Sort by Name (Z-A)</option>
                </Select>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <TableWrapper className="overflow-x-auto">
                <table className="w-full whitespace-nowrap bg-white text-sm">
                  <TableHeadings
                    columns={[
                      "File No.",
                      "Loan",
                      "Loan Mode",
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
                            key={`email-val-${index}`}
                            email={lead.values[0].fields[1].value}
                          />,
                          lead.values[0].fields[2].value,
                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal(lead)}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 text-xs">
                              Review
                            </button>
                             <button
                              onClick={() => setChatLoanId(lead._id)}
                              className="bg-green-100 text-green-800 flex gap-2 justify-center items-center p-2 rounded hover:bg-green-200">
                              <MessageCircle className="w-4 h-4" />
                              {lead.unreadCount > 0 ? lead.unreadCount : ""}
                            </button>
                          </div>,
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(lead)}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 text-xs">
                          Review
                        </button>
                        <button
                          onClick={() => setChatLoanId(lead._id)}
                          className="bg-green-100 text-green-800 flex gap-2 justify-center items-center p-2 rounded hover:bg-green-200">
                          <MessageCircle className="w-4 h-4" />
                          {lead.unreadCount > 0 ? lead.unreadCount : ""}
                        </button>
                      </div>
                    ),
                    status: lead.status.toLowerCase() as
                      | "approved"
                      | "pending"
                      | "rejected",
                    createdAt: lead.createdAt,
                  }}
                />
              )}
              emptyMessage="No quick loan leads found"
              showLoadMore={true}
              onLoadMore={handleLoadMore}
              isLoadingMore={isLoadingMore}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
        </div>

        {/* Review Modal */}
        {showModal && selectedLoan && (
          <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-2">
            <div className="bg-white w-full max-w-3xl max-h-[75vh] overflow-y-auto p-6 rounded-xl border-2 border-black shadow-lg relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black p-2 rounded-full hover:bg-gray-200">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold mb-4">Quick Loan Details</h3>

              <div className="space-y-6">
                {selectedLoan.values.map((page: any) => (
                  <div key={page.pageNumber}>
                    <h4 className="text-lg font-semibold mb-2">{page.title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {page.fields.map((field: any, index: number) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-3 rounded border">
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
      {chatLoanId && (
        <LoanChatModal
          loanId={chatLoanId}
          isOpen={!!chatLoanId}
          onClose={() => setChatLoanId(null)}
        />
      )}
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
      disabled={loading}>
      {loading ? "Loading..." : "View Document"}
    </button>
  );
};
