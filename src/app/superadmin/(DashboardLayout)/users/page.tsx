"use client";
import { useState, useMemo } from "react";
import {
	Pencil,
	Trash2,
	Bell,
	X,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
	useGetAdminsQuery,
	useDeleteAdminMutation,
} from "@/redux/services/superadminApi";
import { useCreateNotificationMutation } from "@/redux/services/notificationApi";

interface Admin {
	_id: string;
	name: string;
	email: string;
	role: string;
	planName: string;
	createdAt: string;
	isDeleted?: boolean;
	rmId?: {
		_id: string;
		name: string;
		email: string;
	};
}

export default function ManageAdmins() {
	const { data: session } = useSession();
	const token = session?.user?.token;
	const router = useRouter();

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [roleFilter, setRoleFilter] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// Notification overlay states
	const [showNotifyOverlay, setShowNotifyOverlay] = useState(false);
	const [currentAdminId, setCurrentAdminId] = useState("");
	const [currentAdminName, setCurrentAdminName] = useState("");
	const [notificationTitle, setNotificationTitle] = useState("");
	const [notificationMessage, setNotificationMessage] = useState("");
	const [notificationStatus, setNotificationStatus] = useState<{
		show: boolean;
		message: string;
		type: "success" | "error";
	}>({
		show: false,
		message: "",
		type: "success",
	});

	const {
		data: admins = [],
		isLoading,
		isError,
		refetch,
	} = useGetAdminsQuery();
	console.log("Admins data:", admins);
	const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();
	const [createNotification, { isLoading: isSendingNotification }] =
		useCreateNotificationMutation();

	const handleDelete = async (id: string) => {
		if (!token) return;
		try {
			await deleteAdmin(id).unwrap();
			refetch();
		} catch (error) {
			console.error("Failed to delete admin");
		}
	};

	const handleEdit = (id: string) => {
		router.push(`/superadmin/users/edit?id=${id}`);
	};

	const handleNotify = (id: string, name: string) => {
		setCurrentAdminId(id);
		setCurrentAdminName(name);
		setNotificationTitle("");
		setNotificationMessage("");
		setShowNotifyOverlay(true);
	};

	const sendNotification = async () => {
		if (!notificationTitle.trim() || !notificationMessage.trim()) {
			setNotificationStatus({
				show: true,
				message: "Please fill in both title and message fields",
				type: "error",
			});
			return;
		}

		try {
			await createNotification({
				userId: currentAdminId,
				title: notificationTitle.trim(),
				message: notificationMessage.trim(),
			}).unwrap();

			setNotificationStatus({
				show: true,
				message: "Notification sent successfully!",
				type: "success",
			});

			// Clear fields and close overlay after a short delay
			setTimeout(() => {
				setShowNotifyOverlay(false);
				setNotificationTitle("");
				setNotificationMessage("");
				setNotificationStatus({ show: false, message: "", type: "success" });
			}, 1500);
		} catch (error: any) {
			setNotificationStatus({
				show: true,
				message: error?.data?.error?.message || "Failed to send notification",
				type: "error",
			});
		}
	};

	const filteredAdmins = useMemo(() => {
		return admins.filter((admin: Admin) => {
			const matchesSearch =
				admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				admin.planName.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesStatus =
				statusFilter === "all"
					? true
					: statusFilter === "active"
					? !admin.isDeleted
					: admin.isDeleted;

			const matchesRole =
				roleFilter === "all"
					? true
					: admin.role.toLowerCase() === roleFilter.toLowerCase();

			return matchesSearch && matchesStatus && matchesRole;
		});
	}, [admins, searchTerm, statusFilter, roleFilter]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedAdmins = filteredAdmins.slice(startIndex, endIndex);

	// Reset to first page when filters change
	const handleSearchChange = (value: string) => {
		setSearchTerm(value);
		setCurrentPage(1);
	};

	const handleStatusFilterChange = (value: string) => {
		setStatusFilter(value);
		setCurrentPage(1);
	};

	const handleRoleFilterChange = (value: string) => {
		setRoleFilter(value);
		setCurrentPage(1);
	};

	const handleItemsPerPageChange = (value: number) => {
		setItemsPerPage(value);
		setCurrentPage(1);
	};

	return (
		<div className="min-h-screen py-16 px-4">
			<div className="max-w-full mx-auto space-y-12 overflow-hidden">
				<div className="text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Manage <span className="text-[#FFD439]">Users</span>
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						View, filter, and manage all your registered users.
					</p>
				</div>

				{/* Notification Overlay */}
				{showNotifyOverlay && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
						<div className="bg-white border-2 border-black shadow-[6px_6px_0_0_#000] rounded-xl p-6 max-w-md w-full m-4">
							<div className="flex justify-between items-center mb-6">
								<h2 className="text-xl font-bold text-black">
									Notify
									<span className="text-[#FFD439] pl-3">
										{currentAdminName}
									</span>
								</h2>
								<button
									onClick={() => setShowNotifyOverlay(false)}
									className="p-1 hover:bg-gray-100 rounded-full"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							<div className="space-y-4">
								<div>
									<label className="block mb-1 text-sm font-medium">
										Notification Title
									</label>
									<input
										type="text"
										value={notificationTitle}
										onChange={(e) => setNotificationTitle(e.target.value)}
										placeholder="Enter notification title..."
										className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
									/>
								</div>

								<div>
									<label className="block mb-1 text-sm font-medium">
										Notification Message
									</label>
									<textarea
										value={notificationMessage}
										onChange={(e) => setNotificationMessage(e.target.value)}
										placeholder="Enter notification message here..."
										rows={4}
										className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
									/>
								</div>

								{notificationStatus.show && (
									<div
										className={`p-3 rounded-lg text-sm ${
											notificationStatus.type === "success"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{notificationStatus.message}
									</div>
								)}

								<div className="flex justify-end">
									<button
										onClick={sendNotification}
										disabled={isSendingNotification}
										className={`px-6 py-2 rounded-xl font-semibold border-2 border-black transition-all ${
											isSendingNotification
												? "bg-gray-300 cursor-not-allowed text-black"
												: "bg-black text-white hover:bg-gray-800"
										}`}
									>
										{isSendingNotification ? "Sending..." : "Send Notification"}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Filters */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
					<input
						type="text"
						placeholder="Search by name, email or plan"
						className="w-full border border-black rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black hover:ring-1"
						value={searchTerm}
						onChange={(e) => handleSearchChange(e.target.value)}
					/>
					<select
						value={statusFilter}
						onChange={(e) => handleStatusFilterChange(e.target.value)}
						className="w-full border border-black rounded-xl px-4 py-3 text-sm cursor-pointer focus:ring-2 focus:ring-black hover:ring-1"
					>
						<option value="all">All Status</option>
						<option value="active">Active</option>
						<option value="deleted">Deleted</option>
					</select>
					<select
						value={roleFilter}
						onChange={(e) => handleRoleFilterChange(e.target.value)}
						className="w-full border border-black rounded-xl px-4 py-3 text-sm cursor-pointer focus:ring-2 focus:ring-black hover:ring-1"
					>
						<option value="all">All Roles</option>
						<option value="superadmin">Superadmin</option>
						<option value="rm">RM</option>
						<option value="dsa">DSA</option>
					</select>
					<button
						className="px-6 py-3 bg-[#FFD439] text-black font-semibold rounded-xl shadow hover:bg-yellow-400 transition cursor-pointer"
						onClick={() => router.push("/superadmin/users/add")}
					>
						+ Add User
					</button>
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
											"Name",
											"Email",
											"Plan",
											"Role",
											"RM Details",
											"Created",
											"Status",
											"Actions",
										].map((header) => (
											<th
												key={header}
												className="px-3 py-3 border-b border-black whitespace-nowrap text-xs"
											>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{isLoading || isDeleting ? (
										<tr>
											<td colSpan={8} className="text-center py-6">
												Loading...
											</td>
										</tr>
									) : isError ? (
										<tr>
											<td colSpan={8} className="text-center py-6 text-red-500">
												Failed to load admins.
											</td>
										</tr>
									) : paginatedAdmins.length === 0 ? (
										<tr>
											<td
												colSpan={8}
												className="text-center py-6 text-gray-500"
											>
												No matching admins found.
											</td>
										</tr>
									) : (
										paginatedAdmins.map((admin: Admin) => {
											const disabled =
												admin.isDeleted || admin.role === "SUPERADMIN";
											return (
												<tr
													key={admin._id}
													className="hover:bg-gray-50 transition-all"
												>
													<td className="px-3 py-3 border-b border-black">
														<div
															className="max-w-[120px] truncate text-xs"
															title={admin.name}
														>
															{admin.name}
														</div>
													</td>
													<td className="px-3 py-3 border-b border-black">
														<div
															className="max-w-[140px] truncate text-xs"
															title={admin.email}
														>
															{admin.email}
														</div>
													</td>
													<td className="px-3 py-3 border-b border-black">
														<div
															className="max-w-[100px] truncate text-xs"
															title={admin.planName}
														>
															{admin.planName}
														</div>
													</td>
													<td className="px-3 py-3 border-b border-black">
														<span
															className={`px-2 py-1 rounded-full text-xs font-medium uppercase whitespace-nowrap ${
																admin.role === "SUPERADMIN"
																	? "bg-black text-white"
																	: "bg-white border border-black text-black"
															}`}
														>
															{admin.role}
														</span>
													</td>
													<td className="px-3 py-3 border-b border-black">
														{admin.role === "DSA" && admin.rmId ? (
															<div className="flex flex-col max-w-[120px]">
																<span
																	className="text-xs font-medium truncate"
																	title={admin.rmId.name}
																>
																	{admin.rmId.name}
																</span>
																<span
																	className="text-xs text-gray-500 truncate"
																	title={admin.rmId.email}
																>
																	{admin.rmId.email}
																</span>
															</div>
														) : (
															<span className="text-xs text-gray-500">N/A</span>
														)}
													</td>
													<td className="px-3 py-3 border-b border-black whitespace-nowrap">
														<span className="text-xs">
															{new Date(admin.createdAt).toLocaleDateString()}
														</span>
													</td>
													<td className="px-3 py-3 border-b border-black">
														<span
															className={`text-xs px-2 py-1 rounded-full font-semibold whitespace-nowrap ${
																admin.isDeleted
																	? "bg-red-500 text-white"
																	: "bg-green-500 text-white"
															}`}
														>
															{admin.isDeleted ? "Deleted" : "Active"}
														</span>
													</td>
													<td className="px-3 py-3 border-b border-black">
														<div className="flex gap-1">
															{[
																{
																	icon: Bell,
																	onClick: () =>
																		handleNotify(admin._id, admin.name),
																},
																{
																	icon: Pencil,
																	onClick: () => handleEdit(admin._id),
																},
																{
																	icon: Trash2,
																	onClick: () => handleDelete(admin._id),
																	isDelete: true,
																},
															].map((btn, idx) => (
																<button
																	key={idx}
																	className={`p-1.5 rounded-full transition-all ${
																		disabled
																			? "bg-gray-300 cursor-not-allowed"
																			: btn.isDelete
																			? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
																			: "bg-black hover:bg-neutral-600 text-white cursor-pointer"
																	}`}
																	disabled={disabled}
																	onClick={btn.onClick}
																>
																	<btn.icon className="w-3 h-3" />
																</button>
															))}
														</div>
													</td>
												</tr>
											);
										})
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
									Showing {filteredAdmins.length === 0 ? 0 : startIndex + 1} to{" "}
									{Math.min(endIndex, filteredAdmins.length)} of{" "}
									{filteredAdmins.length} users
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
			</div>
		</div>
	);
}
