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

import { HousePlus, ShieldPlus, CarFront, HeartPulse } from "lucide-react";
import { useGetLoansQuery } from "@/redux/services/loanApi";
import React, { useState, useMemo } from "react";

export default function Page() {
	const { data: insuranceLoans = [] } = useGetLoansQuery({ loanType: "insurance" });
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [sortBy, setSortBy] = useState("date-desc");

	const filteredLeads = useMemo(() => {
		let leads = insuranceLoans;
		// Search
		if (search) {
			leads = leads.filter((lead: any) =>
				(lead.values?.Name || "").toLowerCase().includes(search.toLowerCase()) ||
				(lead.values?.Email || "").toLowerCase().includes(search.toLowerCase())
			);
		}
		// Status filter
		if (statusFilter) {
			leads = leads.filter((lead: any) => (lead.status || "").toLowerCase() === statusFilter.toLowerCase());
		}
		// Sort
		leads = leads.slice().sort((a: any, b: any) => {
			if (sortBy === "date-desc") {
				const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				if (dateA === dateB) {
					return (b._id || "").localeCompare(a._id || "");
				}
				return dateB - dateA;
			}
			if (sortBy === "date-asc") {
				const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
				const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
				if (dateA === dateB) {
					return (a._id || "").localeCompare(b._id || "");
				}
				return dateA - dateB;
			}
			if (sortBy === "name-asc") {
				const nameA = (a.values?.Name || "").toLowerCase();
				const nameB = (b.values?.Name || "").toLowerCase();
				return nameA.localeCompare(nameB);
			}
			if (sortBy === "name-desc") {
				const nameA = (a.values?.Name || "").toLowerCase();
				const nameB = (b.values?.Name || "").toLowerCase();
				return nameB.localeCompare(nameA);
			}
			return 0;
		});
		return leads;
	}, [insuranceLoans, search, statusFilter, sortBy]);

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
          {/* Filter/Sort/Search Controls */}
          <div className="flex gap-2 mb-4 mt-4">
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border bg-white px-2 py-1 rounded"
              style={{ minWidth: 200 }}
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border bg-white px-2 py-1 rounded"
              style={{ minWidth: 150 }}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border bg-white px-2 py-1 rounded"
              style={{ minWidth: 180 }}
            >
              <option value="date-desc">Sort by Latest</option>
              <option value="date-asc">Sort by Oldest</option>
              <option value="name-asc">Sort by Name (A-Z)</option>
              <option value="name-desc">Sort by Name (Z-A)</option>
            </select>
          </div>
					<TableHeader>Insurance Leads</TableHeader>

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
								{filteredLeads.map((lead: any, index: number) => (
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
	);
}
