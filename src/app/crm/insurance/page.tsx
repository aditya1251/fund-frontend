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

import { HousePlus, ShieldPlus, CarFront, HeartPulse } from "lucide-react";

export default function Page() {
	return (
		<div>
			<h4 className="font-semibold mb-6 text-black">
				Secure Your Future with Trusted Insurance Plans
			</h4>

			<Tabs defaultValue="health">
				<TabsList>
					<TabsTrigger value="health">
						<TabsIcon>
							<ShieldPlus />
						</TabsIcon>
						<TabsLabel>
							Health Insurance
							<TabsDescription>
								Cover medical expenses and ensure care when it matters most.
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>

					<TabsTrigger value="life">
						<TabsIcon>
							<HeartPulse />
						</TabsIcon>
						<TabsLabel>
							Life Insurance
							<TabsDescription>
								Ensure your family's financial safety with life coverage plans.
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>

					<TabsTrigger value="car">
						<TabsIcon>
							<CarFront />
						</TabsIcon>
						<TabsLabel>
							Car Insurance
							<TabsDescription>
								Drive worry-free with comprehensive vehicle protection plans.
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>

					<TabsTrigger value="home">
						<TabsIcon>
							<HousePlus />
						</TabsIcon>
						<TabsLabel>
							Home Insurance
							<TabsDescription>
								Protect your property against natural disasters, fire, and
								theft.
							</TabsDescription>
						</TabsLabel>
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{/* Insurance Leads Table */}
			<div className="mt-6">
				<div className="py-4">
					<TableHeader>Insurance Leads</TableHeader>

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
