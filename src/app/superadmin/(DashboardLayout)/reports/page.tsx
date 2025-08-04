"use client";
import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Eye, X } from "lucide-react";
import { useGetIssuesQuery } from "@/redux/services/issueApi";
import { useGetAdminByIdQuery } from "@/redux/services/superadminApi";
import { getFileUrl } from "@/utils/fileUploadService";
import Loading from "@/components/Loading";

interface IssueReport {
	_id: string;
	userId: string;
	title: string;
	description: string;
	category: "bug" | "feature" | "support" | "other";
	priority: "low" | "medium" | "high" | "critical";
	screenshots?: string[];
	createdAt: string;
	updatedAt: string;
}

const ReportsPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("all");
	const [priorityFilter, setPriorityFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedReport, setSelectedReport] = useState<IssueReport | null>(
		null
	);
	const [viewDialogOpen, setViewDialogOpen] = useState(false);

	const { data: reports = [], isLoading, isError } = useGetIssuesQuery();

	const filteredReports = useMemo(() => {
		return reports.filter((report: IssueReport) => {
			const matchesSearch =
				report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				report.description.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesCategory =
				categoryFilter === "all" || report.category === categoryFilter;
			const matchesPriority =
				priorityFilter === "all" || report.priority === priorityFilter;

			return matchesSearch && matchesCategory && matchesPriority;
		});
	}, [reports, searchTerm, categoryFilter, priorityFilter]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedReports = filteredReports.slice(startIndex, endIndex);

	const handleCategoryChange = (newCategory: string) => {
		setCategoryFilter(newCategory);
		setCurrentPage(1);
	};

	const handlePriorityChange = (newPriority: string) => {
		setPriorityFilter(newPriority);
		setCurrentPage(1);
	};

	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		setCurrentPage(1);
	};

	const handleItemsPerPageChange = (value: number) => {
		setItemsPerPage(value);
		setCurrentPage(1);
	};

	const handleViewReport = (report: IssueReport) => {
		setSelectedReport(report);
		setViewDialogOpen(true);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);

		const time = date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});

		const day = date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});

		return (
			<div className="flex flex-col">
				<span>{time}</span>
				<span>{day}</span>
			</div>
		);
	};

	/* ----------  REPORT ROW COMPONENT WITH ADMIN DATA  ---------- */
	function ReportRow({ report }: { report: IssueReport }) {
		const { data: admin } = useGetAdminByIdQuery(report.userId);

		return (
			<tr className="hover:bg-gray-50 transition-all">
				<td className="p-4 border-b border-black">
					<div
						className="max-w-[150px] truncate text-sm font-medium"
						title={report.title}
					>
						{report.title}
					</div>
					<div className="text-gray-500 text-sm truncate max-w-[150px]">
						{report.description.substring(0, 50)}...
					</div>
				</td>
				<td className="p-4 border-b border-black">
					<div
						className="max-w-[120px] truncate text-sm"
						title={admin?.name || "Loading..."}
					>
						{admin?.name || "Loading..."}
					</div>
					<div
						className="max-w-[120px] truncate text-sm text-gray-500"
						title={admin?.email || ""}
					>
						{admin?.email || ""}
					</div>
				</td>
				<td className="p-4 border-b border-black">
					<span
						className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
							report.category === "bug"
								? "bg-red-100 text-red-700"
								: report.category === "feature"
								? "bg-blue-100 text-blue-700"
								: report.category === "support"
								? "bg-orange-100 text-orange-700"
								: "bg-gray-100 text-gray-700"
						}`}
					>
						{report.category}
					</span>
				</td>
				<td className="p-4 border-b border-black">
					<span
						className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
							report.priority === "critical"
								? "bg-red-100 text-red-700"
								: report.priority === "high"
								? "bg-orange-100 text-orange-700"
								: report.priority === "medium"
								? "bg-yellow-100 text-yellow-700"
								: "bg-green-100 text-green-700"
						}`}
					>
						{report.priority}
					</span>
				</td>
				<td className="p-4 border-b border-black">
					<span className="text-sm text-gray-600">
						{report.screenshots?.length || 0} file(s)
					</span>
				</td>
				<td className="p-4 border-b border-black whitespace-nowrap">
					<span className="text-sm">{formatDate(report.createdAt)}</span>
				</td>
				<td className="p-4 border-b border-black">
					<button
						onClick={() => handleViewReport(report)}
						className="px-3 py-2 rounded-xl transition-all bg-neutral-900 hover:bg-neutral-700 text-white cursor-pointer"
					>
						Details
					</button>
				</td>
			</tr>
		);
	}

	/* ----------  REPORT MODAL WITH ADMIN DATA  ---------- */
	function ReportModal({ report }: { report: IssueReport }) {
		const { data: admin } = useGetAdminByIdQuery(report.userId);

		return (
			<div className="fixed inset-0 start-0 lg:start-[270px] z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
				<div className="bg-white border-2 border-black shadow-[6px_6px_0_0_#000] rounded-xl max-w-4xl w-full m-4 max-h-[75vh] overflow-y-auto">
					<div className="bg-[#FFD439] px-6 py-4 border-b border-black flex justify-between items-center">
						<h2 className="text-xl font-bold text-black">Report Details</h2>
						<button
							onClick={() => setViewDialogOpen(false)}
							className="p-1 hover:bg-black hover:text-white rounded-full transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					<div className="p-6 space-y-6">
						<div>
							<h3 className="text-xl font-bold text-black mb-2">
								{report.title}
							</h3>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex gap-2">
								<p className="text-sm text-gray-600 font-medium mb-1">
									Reported By:
								</p>
								<div>
									<p className="text-black font-medium">
										{admin?.name || "Loading..."}
									</p>
									<p className="text-gray-600 text-sm">{admin?.email || ""}</p>
								</div>
							</div>
							<div className="flex gap-2">
								<p className="text-sm text-gray-600 font-medium mb-1">
									Created:
								</p>
								<p className="text-black">{formatDate(report.createdAt)}</p>
							</div>
							<div className="flex gap-2">
								<p className="text-sm text-gray-600 font-medium mb-1">
									Category:
								</p>
								<span
									className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${
										report.category === "bug"
											? "bg-red-100 text-red-700"
											: report.category === "feature"
											? "bg-blue-100 text-blue-700"
											: report.category === "support"
											? "bg-orange-100 text-orange-700"
											: "bg-gray-100 text-gray-700"
									}`}
								>
									{report.category}
								</span>
							</div>
							<div className="flex gap-2">
								<p className="text-sm text-gray-600 font-medium mb-1">
									Priority:
								</p>
								<span
									className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${
										report.priority === "critical"
											? "bg-red-100 text-red-700"
											: report.priority === "high"
											? "bg-orange-100 text-orange-700"
											: report.priority === "medium"
											? "bg-yellow-100 text-yellow-700"
											: "bg-green-100 text-green-700"
									}`}
								>
									{report.priority}
								</span>
							</div>
						</div>

						<div>
							<p className="text-sm text-gray-600 font-medium mb-2">
								Description:
							</p>
							<div className="bg-yellow-50 p-4 rounded-lg border">
								<div className="text-black leading-relaxed">
									{report.description}
								</div>
							</div>
						</div>

						{/* Screenshots Section */}
						{report.screenshots && report.screenshots.length > 0 && (
							<div>
								<p className="text-sm text-gray-600 font-medium mb-3">
									Screenshots ({report.screenshots.length}):
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{report.screenshots.map((screenshot, index) => (
										<div key={index} className="relative group">
											<ImagePreview fileKey={screenshot} index={index} />
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return (
			<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">
				Failed to load reports
			</div>
		);
	}

	return (
		<div className="min-h-screen py-16 px-4">
			<div className="max-w-full mx-auto space-y-12 overflow-hidden">
				{/* Title */}
				<div className="text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Issue <span className="text-[#FFD439]">Reports</span>
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						View and manage all issue reports submitted by users.
					</p>
				</div>

				{/* Filters */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
					<input
						type="text"
						placeholder="Search by title or description"
						className="w-full border border-black rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black hover:ring-1"
						value={searchTerm}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
					<select
						value={categoryFilter}
						onChange={(e) => handleCategoryChange(e.target.value)}
						className="w-full border border-black rounded-xl px-4 py-3 text-sm cursor-pointer focus:ring-2 focus:ring-black hover:ring-1"
					>
						<option value="all">All Categories</option>
						<option value="bug">Bug</option>
						<option value="feature">Feature</option>
						<option value="support">Support</option>
						<option value="other">Other</option>
					</select>
					<select
						value={priorityFilter}
						onChange={(e) => handlePriorityChange(e.target.value)}
						className="w-full border border-black rounded-xl px-4 py-3 text-sm cursor-pointer focus:ring-2 focus:ring-black hover:ring-1"
					>
						<option value="all">All Priorities</option>
						<option value="critical">Critical</option>
						<option value="high">High</option>
						<option value="medium">Medium</option>
						<option value="low">Low</option>
					</select>
				</div>

				{/* Table Container */}
				<div>
					<div className="bg-white rounded-xl shadow border border-black overflow-hidden">
						<div className="overflow-x-auto">
							<table
								className="w-full text-left text-sm"
								style={{ minWidth: "800px" }}
							>
								<thead className="bg-[#FFD439] text-black font-semibold">
									<tr>
										{[
											"Title",
											"Reported By",
											"Category",
											"Priority",
											"Screenshots",
											"Date",
											"Actions",
										].map((header) => (
											<th
												key={header}
												className="p-4 border-b border-black whitespace-nowrap"
											>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{isLoading ? (
										<tr>
											<td colSpan={7} className="text-center py-6">
												Loading...
											</td>
										</tr>
									) : isError ? (
										<tr>
											<td colSpan={7} className="text-center py-6 text-red-500">
												Failed to load reports.
											</td>
										</tr>
									) : paginatedReports.length === 0 ? (
										<tr>
											<td
												colSpan={7}
												className="text-center py-6 text-gray-500"
											>
												No matching reports found.
											</td>
										</tr>
									) : (
										paginatedReports.map((report: IssueReport) => (
											<ReportRow key={report._id} report={report} />
										))
									)}
								</tbody>
							</table>
						</div>

						{/* Pagination Controls */}
						<div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-gray-50 p-4 border-t">
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600">Show:</span>
								<select
									value={itemsPerPage}
									onChange={(e) =>
										handleItemsPerPageChange(Number(e.target.value))
									}
									className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFD439]"
								>
									<option value={5}>5</option>
									<option value={10}>10</option>
									<option value={25}>25</option>
									<option value={50}>50</option>
								</select>
								<span className="text-sm text-gray-600">per page</span>
							</div>

							<div className="flex items-center gap-2 text-sm text-gray-600">
								<span>
									Showing {filteredReports.length === 0 ? 0 : startIndex + 1} to{" "}
									{Math.min(endIndex, filteredReports.length)} of{" "}
									{filteredReports.length} reports
								</span>
							</div>

							{totalPages > 1 && (
								<div className="flex items-center gap-2">
									<button
										onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
										disabled={currentPage === 1}
										className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<ChevronLeft size={16} />
										Previous
									</button>

									<div className="flex items-center gap-1">
										{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
											let pageNum;
											if (totalPages <= 5) {
												pageNum = i + 1;
											} else if (currentPage <= 3) {
												pageNum = i + 1;
											} else if (currentPage >= totalPages - 2) {
												pageNum = totalPages - 4 + i;
											} else {
												pageNum = currentPage - 2 + i;
											}

											return (
												<button
													key={pageNum}
													onClick={() => setCurrentPage(pageNum)}
													className={`px-3 py-1 border rounded ${
														currentPage === pageNum
															? "bg-[#FFD439] border-black text-black font-semibold"
															: "border-gray-300 hover:bg-gray-100"
													}`}
												>
													{pageNum}
												</button>
											);
										})}
									</div>

									<button
										onClick={() =>
											setCurrentPage(Math.min(totalPages, currentPage + 1))
										}
										disabled={currentPage === totalPages}
										className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Next
										<ChevronRight size={16} />
									</button>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* View Report Modal */}
				{viewDialogOpen && selectedReport && (
					<ReportModal report={selectedReport} />
				)}
			</div>
		</div>
	);
};

export default ReportsPage;

const ImagePreview = ({
	fileKey,
	index,
}: {
	fileKey: string;
	index: number;
}) => {
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		handleViewFile();
	}, [fileKey]);

	const handleViewFile = async () => {
		try {
			const url = await getFileUrl(fileKey);
			setImageUrl(url);
		} catch (err) {
			console.error("Error fetching file:", err);
			alert("Failed to open file");
		}
	};

	return (
		<>
			{imageUrl && (
				<div>
					<img
						src={imageUrl}
						alt={`Screenshot ${index + 1}`}
						className="w-full h-48 object-cover rounded-xl border border-gray-300"
					/>
					<button
						onClick={() => window.open(imageUrl, "_blank")}
						className="absolute inset-0 z-50 rounded-xl flex items-center justify-center bg-opacity-50 hover:backdrop-blur-sm cursor-pointer"
					>
						<Eye className="w-8 h-8 opacity-0 text-neutral-800 group-hover:opacity-100 transition-opacity" />
					</button>
				</div>
			)}
		</>
	);
};
