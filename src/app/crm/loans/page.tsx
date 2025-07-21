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
import { House, User, Car, Building, LandPlot } from "lucide-react";
import Link from "next/link";
import { useGetLoansQuery } from "@/redux/services/loanApi";
import { RequireFeature } from '@/components/RequireFeature';


export default function Page() {
	const { data: loansData = [] } = useGetLoansQuery({ loanType: "loan" });
	return (
		<RequireFeature feature="Loans">
			<div>
				<h4 className="font-semibold mb-6 text-black">Loan Types</h4>

				<Tabs defaultValue="personal">
					<TabsList>
						<Link href="/crm/loan-form?subtype=personal">
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
						</Link>
						<Link href="/crm/loan-form?subtype=home">
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
						</Link>

						<Link href="/crm/loan-form?subtype=business">
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
						</Link>
						<Link href="/crm/loan-form?subtype=car">
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
						</Link>

						<Link href="/crm/loan-form?subtype=property">
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
						</Link>
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
									{loansData.map((lead:any, index:number) => (
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
