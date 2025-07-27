"use client";
import { useState } from "react";
import { Pencil, Trash2, Bell, X } from "lucide-react";
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

	const filteredAdmins = admins.filter((admin: Admin) => {
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

	return (
		<div className="min-h-screen py-16">
			<div className="max-w-6xl mx-auto space-y-12">
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
				<div className="grid md:grid-cols-4 gap-4">
					<input
						type="text"
						placeholder="Search by name, email or plan"
						className="w-full border border-black rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="w-full border border-black rounded-xl px-4 py-3 text-sm"
					>
						<option value="all">All Status</option>
						<option value="active">Active</option>
						<option value="deleted">Deleted</option>
					</select>
					<select
						value={roleFilter}
						onChange={(e) => setRoleFilter(e.target.value)}
						className="w-full border border-black rounded-xl px-4 py-3 text-sm"
					>
						<option value="all">All Roles</option>
						<option value="superadmin">Superadmin</option>
						<option value="rm">RM</option>
						<option value="dsa">DSA</option>
					</select>
					<button
						className=" px-6 py-3 bg-[#FFD439] text-black font-semibold rounded-xl shadow hover:bg-yellow-400 transition"
						onClick={() => router.push("/superadmin/users/add")}
					>
						+ Add User
					</button>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm border border-black rounded-xl overflow-hidden">
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
									<th key={header} className="px-4 py-3 border-b border-black">
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
							) : filteredAdmins.length === 0 ? (
								<tr>
									<td colSpan={8} className="text-center py-6 text-gray-500">
										No matching admins found.
									</td>
								</tr>
							) : (
								filteredAdmins.map((admin: Admin) => {
									const disabled =
										admin.isDeleted || admin.role === "SUPERADMIN";
									return (
										<tr
											key={admin._id}
											className="hover:bg-gray-100 transition-all"
										>
											{/* Standard cell styling for basic text content */}
											<td className="px-1 text-center py-3 border-b border-black">
												{admin.name}
											</td>
											<td className="px-1 text-center py-3 border-b border-black">
												{admin.email}
											</td>
											<td className="px-1 text-center py-3 border-b border-black">
												{admin.planName}
											</td>
											<td className="px-1 text-center py-3 border-b border-black">
												<span
													className={`px-1 py-1 rounded-full text-xs font-medium uppercase ${
														admin.role === "SUPERADMIN"
															? "bg-black text-white"
															: "bg-white border border-black text-black"
													}`}
												>
													{admin.role}
												</span>
											</td>
											<td className="px-4 py-3 border-b border-black">
												{admin.role === "DSA" && admin.rmId ? (
													<div className="flex flex-col">
														<span className="text-sm font-medium">{admin.rmId.name}</span>
														<span className="text-xs text-gray-500">{admin.rmId.email}</span>
													</div>
												) : (
													<span className="text-xs text-gray-500">N/A</span>
												)}
											</td>
											<td className="px-4 py-3 border-b border-black">
												{new Date(admin.createdAt).toLocaleDateString()}
											</td>
											<td className="px-4 py-3 border-b border-black">
												<span
													className={`text-xs px-3 py-1 rounded-full font-semibold ${
														admin.isDeleted
															? "bg-red-500 text-white"
															: "bg-green-500 text-white"
													}`}
												>
													{admin.isDeleted ? "Deleted" : "Active"}
												</span>
											</td>
											<td className="px-4 py-3 border-b border-black">
												<div className="flex gap-2">
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
															className={`p-2 rounded-full transition-all ${
																disabled
																	? "bg-gray-300 cursor-not-allowed"
																	: btn.isDelete
																	? "bg-red-600 hover:bg-red-700 text-white"
																	: "bg-black hover:bg-gray-800 text-white"
															}`}
															disabled={disabled}
															onClick={btn.onClick}
														>
															<btn.icon className="w-4 h-4" />
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
			</div>
		</div>
	);
}
