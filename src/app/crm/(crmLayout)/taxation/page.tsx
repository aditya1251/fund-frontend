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
import Link from "next/link";
import { BriefcaseBusiness, FileText, History } from "lucide-react";
import { RequireFeature } from "@/components/RequireFeature";
import { useGetLoansQuery } from "@/redux/services/loanApi";
import { useGetLoanTemplatesByTypeQuery } from "@/redux/services/loanTemplateApi";

export default function Page() {
	const { data: taxData = [] } = useGetLoansQuery({ loanType: "taxation" });
	const { data: taxTemplates = [] } =
		useGetLoanTemplatesByTypeQuery("taxation");

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
						<TableHeader>Taxation Requests</TableHeader>

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
									{taxData.map((lead: any, index: number) => {
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
