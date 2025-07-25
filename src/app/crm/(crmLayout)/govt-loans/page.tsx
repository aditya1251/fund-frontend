"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsLabel,
  TabsDescription,
  TabsIcon,
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
import Link from "next/link";
import { useGetLoansQuery } from "@/redux/services/loanApi";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";
import { Building, Car, House, LandPlot, User } from "lucide-react";

export default function Page() {
  const { data: loansData = [] } = useGetLoansQuery({ loanType: "government" });
  const { data: loansTemplates = [] } =
    useGetLoanTemplatesByTypeQuery("government");

  return (
    <RequireFeature feature="Govt-Loans">
      <div>
        <h4 className="font-semibold mb-6 text-black">Govt. Loan Types</h4>

        <Tabs defaultValue="msme">
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

        {/* Govt. Loan Leads Table */}
        <div className="mt-6">
          <div className="py-4">
            <TableHeader>Govt. Loan Leads</TableHeader>

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
                        lead.values.Name,
                        <EmailCell email={lead.subscriber} />,
                        <EmailCell email={lead.values.Email} />,
                        lead.values.Phone,
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
