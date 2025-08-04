"use client";
import { useState, useMemo } from "react";
import {
	useGetLoansByRmIdQuery,
	useUpdateLoanMutation,
} from "@/redux/services/loanApi";
import { useGetAdminsQuery } from "@/redux/services/superadminApi";
import { useCreateNotificationMutation } from "@/redux/services/notificationApi";
import { CheckCircle, X, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { getFileUrl } from "@/utils/fileUploadService";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function DsaApplicationsPage({
	applicationType,
}: {
	applicationType: string;
}) {
	const session = useSession();
	const rmId = session.data?.user?.id;
	const {
		data: fetchedData = [],
		isLoading,
		error,
		refetch,
	} = useGetLoansByRmIdQuery(rmId || "");
	const { data: adminData } = useGetAdminsQuery();
	const [updateLoan] = useUpdateLoanMutation();
	const [createNotification] = useCreateNotificationMutation();

	const [filter, setFilter] = useState<
		"all" | "pending" | "approved" | "rejected"
	>("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [rejectionReason, setRejectionReason] = useState("");
	const [showReasonInputId, setShowReasonInputId] = useState<string | null>(
		null
	);
	const [notification, setNotification] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);
	const [updatingId, setUpdatingId] = useState<string | null>(null);

	const [selectedLoan, setSelectedLoan] = useState<any | null>(null);
	const [showModal, setShowModal] = useState(false);

	const loansData = useMemo(() => {
		return fetchedData.filter((loan: any) => {
			switch (applicationType) {
				case "Loan":
					return ["private", "government", "insurance"].includes(loan.loanType);
				case "Quick Loan":
					return loan.loanType === "Quick Loan";
				case "Taxation":
					return loan.loanType === "Taxation";
				default:
					return false;
			}
		});
	}, [fetchedData, applicationType]);

	const openModal = (loan: any) => {
		setSelectedLoan(loan);
		setShowModal(true);
	};

	const closeModal = () => {
		setSelectedLoan(null);
		setShowModal(false);
	};

	const extractField = (loan: any, label: string) => {
		const personalInfo = loan.values?.find((p: any) => p.pageNumber === 1);
		return (
			personalInfo?.fields?.find((f: any) => f.label === label)?.value || ""
		);
	};

	const filteredLoans = useMemo(() => {
		let filtered = loansData;

		if (filter !== "all") {
			filtered = filtered.filter((loan: any) => loan.status === filter);
		}

		if (searchTerm.trim() !== "") {
			filtered = filtered.filter((loan: any) => {
				const name = extractField(loan, "Name").toLowerCase();
				const email = extractField(loan, "Email").toLowerCase();
				return (
					name.includes(searchTerm.toLowerCase()) ||
					email.includes(searchTerm.toLowerCase())
				);
			});
		}

		return [...filtered].sort(
			(a, b) =>
				new Date(b.createdAt || "").getTime() -
				new Date(a.createdAt || "").getTime()
		);
	}, [loansData, filter, searchTerm]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedLoans = filteredLoans.slice(startIndex, endIndex);

	// Reset to first page when filters change
	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		setCurrentPage(1);
	};

	const handleFilterChange = (value: "all" | "pending" | "approved" | "rejected") => {
		setFilter(value);
		setCurrentPage(1);
	};

	const handleItemsPerPageChange = (value: number) => {
		setItemsPerPage(value);
		setCurrentPage(1);
	};

	const handleStatusChange = async (
		id: string,
		status: "approved" | "rejected"
	) => {
		setUpdatingId(id);
		const loan = loansData.find((loan: any) => loan._id === id);
		const user = adminData?.find(
			(admin: any) => admin.email === loan?.subscriber
		);
		const userId = user?._id;
		const applicantName = user?.name || "Applicant";

		try {
			if (status === "rejected" && showReasonInputId !== id) {
				setShowReasonInputId(id);
				setUpdatingId(null);
				return;
			}

			await updateLoan({
				_id: id,
				status,
				rejectionMessage: status === "rejected" ? rejectionReason : undefined,
			}).unwrap();

			if (userId) {
				await createNotification({
					userId,
					title:
						status === "approved"
							? "Loan Application Approved!"
							: "Loan Application Rejected",
					message:
						status === "approved"
							? `Congratulations ${applicantName}, your loan was approved!`
							: `Sorry ${applicantName}, your loan was rejected. Reason: ${
									rejectionReason || "No reason provided."
							  }`,
				});
			}

			setNotification({ message: `Loan ${status}`, type: "success" });
			refetch();
		} catch {
			setNotification({ message: `Failed to ${status} loan`, type: "error" });
		} finally {
			setUpdatingId(null);
			setRejectionReason("");
			setShowReasonInputId(null);
			setTimeout(() => setNotification(null), 4000);
		}
	};

	return (
		<div className="min-h-screen py-8 px-4">
			{notification && (
				<div
					className={`fixed top-4 right-4 z-50 flex items-center gap-2 p-4 rounded shadow-lg ${
						notification.type === "success"
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					}`}
				>
					{notification.type === "success" ? (
						<CheckCircle size={20} />
					) : (
						<XCircle size={20} />
					)}
					<span>{notification.message}</span>
				</div>
			)}

			<div className="max-w-6xl mx-auto space-y-10">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900">
						Manage <span className="text-[#FFD439]">{applicationType}</span>{" "}
						Applications
					</h1>
					<p className="text-lg text-gray-600 mt-2">
						Approve or reject based on application review.
					</p>
				</div>

				<div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-300 pb-4">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => handleSearchChange(e.target.value)}
						placeholder="Search by name or email"
						className="px-4 py-2 border border-gray-300 rounded w-full md:w-1/2 ring-black hover:ring-1 focus:ring-2 focus:outline-none transition duration-200"
					/>
					<div className="flex gap-2">
						{["all", "pending", "approved", "rejected"].map((tab) => (
							<button
								key={tab}
								onClick={() => handleFilterChange(tab as any)}
								className={`capitalize px-4 py-2 font-semibold rounded-full ${
									filter === tab
										? "bg-[#FFD439] text-black shadow-[4px_4px_0_0_#000]"
										: "text-gray-600 hover:text-black"
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				<div className="space-y-6">
					{isLoading ? (
						<div>
							<Loading />
						</div>
					) : error ? (
						<div className="text-center text-red-500">
							Failed to load applications.
						</div>
					) : paginatedLoans.length === 0 ? (
						<div className="text-center text-gray-500">
							No applications found.
						</div>
					) : (
						paginatedLoans.map((loan) => {
							const name = extractField(loan, "Name");
							const email = extractField(loan, "Email");
							const phone = extractField(loan, "Phone");
							const age = extractField(loan, "Age");

							return (
								<div
									key={loan._id}
									className="bg-white border border-black shadow-[6px_6px_0_0_#000] rounded-lg p-6"
								>
									<div className="grid md:grid-cols-2 gap-4">
										<div>
											<h3 className="font-bold text-lg">{name || "N/A"}</h3>
											<p className="text-sm text-gray-700">Email: {email}</p>
											<p className="text-sm text-gray-700">Phone: {phone}</p>
											<p className="text-sm text-gray-700">Age: {age}</p>
										</div>
										<div>
											<p className="text-sm text-gray-700">
												Submitted:{" "}
												{new Date(loan.createdAt).toLocaleDateString()}
											</p>
											<p className="text-sm text-gray-700">
												Subscriber: {loan.subscriber}
											</p>
											<p className="text-sm text-gray-700">
												Status: <strong>{loan.status}</strong>
											</p>
										</div>
									</div>
									<button
										onClick={() => openModal(loan)}
										className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 text-sm font-medium mt-4"
									>
										View Details
									</button>
								</div>
							);
						})
					)}
				</div>

				{/* Pagination Controls */}
				{filteredLoans.length > 0 && (
					<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
						<div className="text-sm text-gray-700">
							Showing {startIndex + 1} to {Math.min(endIndex, filteredLoans.length)} of {filteredLoans.length} applications
						</div>
						
						<div className="flex items-center gap-2">
							<select
								value={itemsPerPage}
								onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
								className="px-3 py-1 border border-gray-300 rounded text-sm cursor-pointer hover:ring-2 focus:outline-none focus:ring-2 focus:ring-[#FFD439]"
							>
								<option value={5}>5 per page</option>
								<option value={10}>10 per page</option>
								<option value={20}>20 per page</option>
								<option value={50}>50 per page</option>
							</select>
						</div>

						<div className="flex items-center gap-2">
							<button
								onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
								disabled={currentPage === 1}
								className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<ChevronLeft className="w-4 h-4" />
								Previous
							</button>
							
							<div className="flex items-center gap-1">
								{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
									const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
									if (pageNum > totalPages) return null;
									
									return (
										<button
											key={pageNum}
											onClick={() => setCurrentPage(pageNum)}
											className={`px-3 py-2 text-sm font-medium rounded-lg ${
												currentPage === pageNum
													? "bg-[#FFD439] text-black shadow-[2px_2px_0_0_#000]"
													: "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
											}`}
										>
											{pageNum}
										</button>
									);
								})}
							</div>
							
							<button
								onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
								disabled={currentPage === totalPages}
								className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}
			</div>

			{showModal && selectedLoan && (
				<div className="fixed inset-0 z-50 bg-opacity-40 backdrop-blur-sm flex justify-center items-center">
					<div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-xl border-2 border-black shadow-[8px_8px_0_0_#000] relative">
						<button
							onClick={closeModal}
							className="absolute top-3 right-3 p-2 rounded-full text-black hover:bg-gray-200"
						>
							<X className="w-5 h-5" />
						</button>
						<h3 className="text-2xl font-bold mb-6 text-black">
							{applicationType} Application Details
						</h3>

						<div className="space-y-8">
							{selectedLoan.values.map((page: any) => (
								<div key={page.pageNumber}>
									<h4 className="text-lg font-semibold text-black mb-2">
										{page.title}
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										{page.fields.map((field: any, index: number) => (
											<div
												key={index}
												className="bg-gray-100 p-4 rounded-lg border border-gray-300"
											>
												<label className="block text-sm font-medium text-black mb-1">
													{field.label}
												</label>
												{field.isDocument ? (
													<FileViewer fileKey={field.value} />
												) : (
													<p className="text-gray-800 text-sm break-words">
														{field.value || "N/A"}
													</p>
												)}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export const FileViewer = ({ fileKey }: { fileKey: string }) => {
	const [loading, setLoading] = useState(false);

	const handleViewFile = async () => {
		setLoading(true);
		try {
			const url = await getFileUrl(fileKey);
			window.open(url, "_blank", "noopener,noreferrer");
		} catch (err) {
			console.error("Error fetching file:", err);
			alert("Failed to open file");
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			onClick={handleViewFile}
			className="text-blue-600 underline text-sm break-all"
			disabled={loading}
		>
			{loading ? "Loading..." : "View Document"}
		</button>
	);
};
