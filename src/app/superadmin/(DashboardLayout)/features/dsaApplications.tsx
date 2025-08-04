"use client";

import { useState, useEffect, useMemo } from "react";
import {
	useGetLoansQuery,
	useUpdateLoanMutation,
} from "@/redux/services/loanApi";
import { useGetAdminsQuery } from "@/redux/services/superadminApi";
import { useCreateNotificationMutation } from "@/redux/services/notificationApi";
import { CheckCircle, X, XCircle } from "lucide-react";
import { getFileUrl } from "@/utils/fileUploadService";
import Loading from "@/components/Loading";

export default function DSAApplications({
	applicationType,
}: {
	applicationType: string;
}) {
	const getQueryParams = () => {
		switch (applicationType) {
			case "Loan":
				return "";
			case "Quick Loan":
				return "quick";
			case "Taxation":
				return "taxation";
			default:
				return "";
		}
	};

	const [filter, setFilter] = useState<
		"all" | "pending" | "approved" | "rejected"
	>("all");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(10);

	const {
		data: loansDataResponse = { loans: [], total: 0 },
		isLoading,
		error,
		refetch,
	} = useGetLoansQuery({
		loanType: getQueryParams(),
		status: filter,
		search: searchTerm,
		page: currentPage,
		limit,
	});

	const loansData = loansDataResponse.loans || [];
	const totalCount = loansDataResponse.total || 0;

	const { data: adminData } = useGetAdminsQuery();
	const [updateLoan] = useUpdateLoanMutation();
	const [createNotification] = useCreateNotificationMutation();

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

	const [isRefetching, setIsRefetching] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsRefetching(true);
			try {
				await refetch();
			} finally {
				setIsRefetching(false);
			}
		};
		fetchData();
	}, [filter, searchTerm]);

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

	const handleStatusChange = async (
		id: string,
		status: "approved" | "rejected"
	) => {
		// If rejection reason input hasn't been shown yet
		if (status === "rejected" && showReasonInputId !== id) {
			setShowReasonInputId(id);
			return;
		}

		// If rejection is requested but no reason is entered yet
		if (status === "rejected" && !rejectionReason.trim()) {
			return;
		}

		setUpdatingId(id);
		const loan = loansData.find((loan: any) => loan._id === id);
		const user = adminData?.find(
			(admin: any) => admin.email === loan?.subscriber
		);
		const userId = user?._id;
		const applicantName = user?.name || "Applicant";

		try {
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
							: `Sorry ${applicantName}, your loan was rejected. ${
									rejectionReason ? `Reason: ${rejectionReason}` : ""
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

	const totalPages = Math.ceil(totalCount / limit);

	return (
		<div className="min-h-screen py-6 px-4">
			{notification && (
				<div
					className={`fixed top-4 right-4 z-[10000] p-4 rounded shadow-lg text-sm flex gap-2 items-center ${
						notification.type === "success"
							? "bg-green-100 text-green-800"
							: "bg-red-100 text-red-800"
					}`}
				>
					{notification.type === "success" ? (
						<CheckCircle size={16} />
					) : (
						<XCircle size={16} />
					)}
					<span className="ml-2">{notification.message}</span>
				</div>
			)}

			<div className="max-w-6xl mx-auto space-y-6">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900">
						Manage <span className="text-[#FFD439]">{applicationType}</span>{" "}
						Applications
					</h1>
					<p className="text-gray-600 mt-2">
						Approve or reject based on application review.
					</p>
				</div>

				{/* Controls */}
				<div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-4">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						}}
						placeholder="Search by name or email"
						className="px-4 py-2 border rounded-md w-full md:w-1/2"
					/>
					<div className="flex gap-2 flex-wrap justify-center">
						{(["all", "pending", "approved", "rejected"] as const).map(
							(tab) => (
								<button
									key={tab}
									onClick={() => {
										setFilter(tab);
										setCurrentPage(1);
									}}
									className={`capitalize px-4 py-2 font-semibold rounded-full text-sm ${
										filter === tab
											? "bg-[#FFD439] text-black shadow-md"
											: "text-gray-600 hover:text-black"
									}`}
								>
									{tab}
								</button>
							)
						)}
					</div>
				</div>

				{/* Loan Cards */}
				<div className="space-y-6">
					{isLoading || isRefetching ? (
						<Loading />
					) : error ? (
						<p className="text-center text-red-500">
							Failed to load applications.
						</p>
					) : loansData.length === 0 ? (
						<p className="text-center text-gray-500">No applications found.</p>
					) : (
						loansData.map((loan) => {
							const name = extractField(loan, "Name");
							const email = extractField(loan, "Email");
							const phone = extractField(loan, "Phone");
							const age = extractField(loan, "Age");

							return (
								<div
									key={loan._id}
									className="bg-white border border-gray-200 shadow-[6px_6px_0_0_#000] sm:shadow-[8px_8px_0_0_#000] rounded-xl p-6 sm:p-8 hover:shadow-[10px_10px_0_0_#000] transition-shadow cursor-pointer"
								>
									<div className="grid sm:grid-cols-2 gap-6">
										<div className="space-y-3">
											<h3 className="text-xl font-bold text-gray-900 mb-4">
												{name}
											</h3>
											<div className="space-y-2">
												<p className="text-gray-700 flex items-center">
													<span className="font-medium text-gray-900 w-16">
														Email:
													</span>
													<span className="text-blue-600">{email}</span>
												</p>
												<p className="text-gray-700 flex items-center">
													<span className="font-medium text-gray-900 w-16">
														Phone:
													</span>
													<span>{phone}</span>
												</p>
												<p className="text-gray-700 flex items-center">
													<span className="font-medium text-gray-900 w-16">
														Age:
													</span>
													<span>{age}</span>
												</p>
											</div>
										</div>
										<div className="space-y-3">
											<div className="space-y-2">
												<p className="text-gray-700 flex items-center">
													<span className="font-medium text-gray-900 w-24">
														Submitted:
													</span>
													<span>
														{new Date(loan.createdAt).toLocaleDateString()}
													</span>
												</p>
												<p className="text-gray-700 flex items-center">
													<span className="font-medium text-gray-900 w-24">
														Subscriber:
													</span>
													<span className="text-blue-600">
														{loan.subscriber}
													</span>
												</p>
												<p className="text-gray-700 flex items-center">
													<span className="font-medium text-gray-900 w-24">
														Status:
													</span>
													<span
														className={`font-bold px-3 py-1 rounded-full text-sm ${
															loan.status === "approved"
																? "bg-green-100 text-green-800"
																: loan.status === "rejected"
																? "bg-red-100 text-red-800"
																: "bg-yellow-100 text-yellow-800"
														}`}
													>
														{loan.status}
													</span>
												</p>
											</div>
										</div>
									</div>

									<div className="mt-6 pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-2 items-center justify-between">
										{loan.status === "pending" && (
											<div className="flex flex-wrap gap-3">
												<button
													onClick={() =>
														handleStatusChange(loan._id, "approved")
													}
													disabled={updatingId === loan._id}
													className="bg-green-100 text-green-800 px-6 py-3 rounded-lg hover:bg-green-200 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
												>
													{updatingId === loan._id
														? "Processing..."
														: "Approve"}
												</button>
												<button
													onClick={() =>
														handleStatusChange(loan._id, "rejected")
													}
													disabled={updatingId === loan._id}
													className="bg-red-100 text-red-700 px-6 py-3 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
												>
													{updatingId === loan._id ? "Processing..." : "Reject"}
												</button>
											</div>
										)}
										<div className="mx-auto  sm:mr-0">
											<button
												onClick={() => openModal(loan)}
												className="bg-blue-100 text-blue-800 px-6 py-3 rounded-lg hover:bg-blue-200 text-sm transition-all"
											>
												View Details
											</button>
										</div>
									</div>

									{showReasonInputId === loan._id && (
										<div className="mt-6">
											<div className="flex flex-col sm:flex-row gap-3">
												<input
													type="text"
													className="flex-1 border border-gray-300 px-4 py-3 rounded-lg text-sm focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
													placeholder="Enter rejection reason..."
													value={rejectionReason}
													onChange={(e) => setRejectionReason(e.target.value)}
												/>
												<button
													onClick={() =>
														handleStatusChange(loan._id, "rejected")
													}
													disabled={!rejectionReason.trim()}
													className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
												>
													Confirm Rejection
												</button>
											</div>
										</div>
									)}
								</div>
							);
						})
					)}
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex justify-center gap-4 mt-6">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 border rounded disabled:opacity-50"
						>
							Prev
						</button>
						<span className="text-sm mt-2">
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className="px-4 py-2 border rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				)}
			</div>

			{/* Modal */}
			{showModal && selectedLoan && (
				<div className="fixed inset-0 start-0 lg:start-[270px] bg-opacity-40 backdrop-blur-sm flex justify-center items-center p-2">
					<div className="bg-white w-full max-w-full sm:max-w-2xl lg:max-w-3xl max-h-[75vh] overflow-y-auto p-4 sm:p-6 rounded-xl border-2 border-black shadow-[6px_6px_0_0_#000] sm:shadow-[8px_8px_0_0_#000] relative">
						<button
							onClick={closeModal}
							className="absolute top-2 right-2 sm:top-3 sm:right-3 text-black p-1 sm:p-2 rounded-full hover:bg-gray-200 cursor-pointer"
						>
							<X className="w-4 h-4 sm:w-5 sm:h-5" />
						</button>
						<h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 md:mb-6 text-black">
							{applicationType} Details
						</h3>

						<div className="space-y-6 md:space-y-8">
							{selectedLoan.values.map((page: any) => (
								<div key={page.pageNumber}>
									<h4 className="text-sm sm:text-base md:text-lg font-semibold text-black mb-1 md:mb-2">
										{page.title}
									</h4>
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
										{page.fields.map((field: any, index: number) => (
											<div
												key={index}
												className="bg-gray-100 p-3 sm:p-4 rounded-lg border border-gray-300"
											>
												<label className="block text-xs sm:text-sm font-medium text-black mb-1">
													{field.label}
												</label>
												{field.isDocument ? (
													<FileViewer fileKey={field.value} />
												) : (
													<p className="text-xs sm:text-sm text-gray-800 break-words">
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

const FileViewer = ({ fileKey }: { fileKey: string }) => {
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
			className="text-blue-600 hover:underline hover:cursor-pointer text-sm break-all"
			disabled={loading}
		>
			{loading ? "Loading..." : "View Document"}
		</button>
	);
};
