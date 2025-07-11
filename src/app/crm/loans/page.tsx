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
import leads from "@/app/crm/sample-data";

import { House, User, Car, Building, LandPlot } from "lucide-react";

export default function Page() {
	return (
		<div>
			<h4 className="font-semibold mb-6 text-black">Loan Types</h4>

			<Tabs defaultValue="personal">
				<TabsList>
					<TabsTrigger value="personal">
						<TabsIcon>
							<User />
						</TabsIcon>
						<TabsLabel>
							Personal Loan
							<TabsDescription>
								Funds are delivered to your bank account for your own use
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>

					<TabsTrigger value="home">
						<TabsIcon>
							<House />
						</TabsIcon>
						<TabsLabel>
							Home Loan
							<TabsDescription>
								Funds are delivered to your bank account for your own use
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>

					<TabsTrigger value="business">
						<TabsIcon>
							<Building />
						</TabsIcon>
						<TabsLabel>
							Business Loan
							<TabsDescription>
								Funds are delivered to your bank account for your own use
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>

					<TabsTrigger value="car">
						<TabsIcon>
							<Car />
						</TabsIcon>
						<TabsLabel>
							Car Loan
							<TabsDescription>
								Funds are delivered to your bank account for your own use
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>

					<TabsTrigger value="property">
						<TabsIcon>
							<LandPlot />
						</TabsIcon>
						<TabsLabel>
							Loan Against Property
							<TabsDescription>
								Funds are delivered to your bank account for your own use
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>
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
									"Applicant name",
									"Subscriber",
									"Email",
									"Phone",
									"Review",
									"Status",
								]}
							/>
							<tbody>
								{leads.map((lead, index) => (
									<TableRow
										key={index}
										row={[
											lead.fileNo,
											lead.loan,
											lead.mode,
											lead.applicant,
											lead.subscriber,
											<EmailCell email={lead.email} />,
											lead.phone,
											lead.review,
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
	);
}
