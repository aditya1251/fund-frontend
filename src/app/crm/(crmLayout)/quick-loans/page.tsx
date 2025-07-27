"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsIcon,
  TabsLabel,
  TabsDescription,
} from "@/components/ui/tab";

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

export default function Page() {
  const { data: loansData = [] } = useGetLoansQuery({ loanType: "quick" });
  const { data: loansTemplates = [] } = useGetLoanTemplatesByTypeQuery("quick");
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

        {/* Loan Leads Table */}
        <div className="mt-6">
          <div className="py-4">
            <TableHeader>Loan Leads</TableHeader>

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
                  {loansData.map((lead: any, index: number) => (
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
