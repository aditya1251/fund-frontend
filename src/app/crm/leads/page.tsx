"use client";

import React, { useState } from "react";
import { Users } from "lucide-react";
import { MetricGrid, MetricCard } from "@/components/ui/dashboard-metric";
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

type Tab = "Loans" | "Govt Loans" | "Insurance";

interface StatusCardData {
	label: string;
	value: string;
	variant?: "primary" | "secondary" | "columned";
	icon?: React.ReactNode;
	className?: string;
}

const TABS: Tab[] = ["Loans", "Govt Loans", "Insurance"];

const LOANS_DATA: StatusCardData[] = [
	{
		label: "All Leads",
		value: "08",
		variant: "primary",
		icon: <Users />,
		className: "font-bold",
	},
	{ label: "Check Bureau", value: "0", variant: "secondary" },
	{ label: "Leads Generated", value: "17", variant: "columned" },
	{ label: "Credit Reports", value: "8", variant: "columned" },
	{ label: "Leads Processing", value: "11", variant: "columned" },
	{ label: "Lender Section", value: "1", variant: "columned" },
	{ label: "Application Fulfillment", value: "6", variant: "secondary" },
	{ label: "Action Pending", value: "0", variant: "primary" },
	{ label: "Login", value: "4", variant: "primary" },
	{ label: "Sanctioned", value: "0", variant: "primary" },
	{ label: "Disbursed", value: "0", variant: "secondary" },
	{ label: "Allocate Leads", value: "0", variant: "primary" },
	{ label: "Under Process", value: "5", variant: "primary" },
	{ label: "Closed", value: "0", variant: "secondary" },
];

const GOVT_DATA: StatusCardData[] = [
	{
		label: "All Leads",
		value: "08",
		variant: "primary",
		icon: <Users />,
		className: "font-bold",
	},
	{ label: "Action Pending", value: "2", variant: "secondary" },
	{ label: "Under Process", value: "4", variant: "secondary" },
	{ label: "Closed", value: "1", variant: "primary" },
];
const INSURANCE_DATA: StatusCardData[] = [
	{
		label: "All Leads",
		value: "08",
		variant: "primary",
		icon: <Users />,
		className: "font-bold",
	},
	{ label: "Action Pending", value: "0", variant: "secondary" },
	{ label: "Under Process", value: "6", variant: "secondary" },
	{ label: "Closed", value: "0", variant: "primary" },
];

const getDataByTab = (tab: Tab): StatusCardData[] => {
	switch (tab) {
		case "Loans":
			return LOANS_DATA;
		case "Govt Loans":
			return GOVT_DATA;
		case "Insurance":
			return INSURANCE_DATA;
		default:
			return [];
	}
};

const LeadActivityStatus: React.FC = () => {
	const [activeTab, setActiveTab] = useState<Tab>("Loans");
	const data = getDataByTab(activeTab);

	return (
		<div>
			<h4 className="font-semibold mb-6 text-black">Lead Activity Status</h4>

			{/* Tabs */}
			<div className="flex gap-2 mb-4">
				{TABS.map((tab) => (
					<button
						key={tab}
						className={`text-sm px-12 py-2 rounded ${
							tab === activeTab
								? "bg-[#f5d949] text-black"
								: "bg-white text-black border-gray-300 border"
						}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Metric Grid */}
			<MetricGrid>
				{data.map(({ label, value, variant, icon, className }, index) => (
					<MetricCard
						key={index}
						label={label}
						value={value}
						icon={icon}
						variant={variant}
						className={className}
					/>
				))}
			</MetricGrid>

			{/* All Leads Table */}
			<div className="mt-6">
				<div className="py-4">
					<TableHeader>All Leads</TableHeader>

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
};

export default LeadActivityStatus;
