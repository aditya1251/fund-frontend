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

import { Package } from "lucide-react";

export default function Page() {
	return (
		<div>
			<h4 className="font-semibold mb-6 text-black">
				Providing Taxation Services At Affordable Prices
			</h4>

			<Tabs defaultValue="order">
				<TabsList>
					<TabsTrigger value="order">
						<TabsIcon>
							<Package />
						</TabsIcon>
						<TabsLabel>
							Place A Order
							<TabsDescription>
								Ensure your family's financial safety with life coverage plans.
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{/* Orders Table */}
			<div className="mt-6">
				<div className="py-4">
					<TableHeader>Taxation Orders</TableHeader>

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
