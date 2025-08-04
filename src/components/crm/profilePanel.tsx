"use client";

import React, { useState } from "react";
import {
	ChevronRight,
	Trash2,
	User,
	BadgeCheck,
	Info,
	Bell,
	X,
	AlertTriangle,
	RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteAdminMutation } from "@/redux/services/superadminApi";

const ProfilePanel = ({
	user,
}: {
	user: { id: string; name?: string; email?: string };
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();
	const [deleteAdmin] = useDeleteAdminMutation();

	const handleDeleteClick = () => {
		setShowDeleteConfirmation(true);
	};

	const handleCancelDelete = () => {
		if (!isDeleting) setShowDeleteConfirmation(false);
	};

	const handleConfirmDelete = () => {
		setIsDeleting(true);
		deleteAdmin(user.id)
			.unwrap()
			.then(() => {
				setShowDeleteConfirmation(false);
				router.push("/login");
			})
			.catch((error) => {
				setIsDeleting(false);
				console.error("Failed to delete account:", error);
			});
	};

	const handleResetPassword = () => {
		router.push("/reset-pass");
	};

	return (
		<>
			{/* Avatar Button */}
			<div
				className="flex items-center space-x-4 cursor-pointer p-1 pr-4 rounded-full bg-gray-100"
				onClick={() => setIsOpen(true)}
			>
				<div className="w-8 h-8 rounded-full overflow-hidden bg-[#cbcccc]">
					<img
						src="/placeholder.svg"
						alt="User Avatar"
						className="w-full h-full object-cover"
					/>
				</div>
				<span className="text-sm font-medium text-gray-700">{user?.name}</span>
			</div>

			{/* Slide-in Profile Panel */}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex justify-end">
					{/* Overlay */}
					<div
						className="fixed inset-0 bg-black opacity-25"
						onClick={() => setIsOpen(false)}
					/>
					{/* Panel */}
					<aside className="relative z-50 w-72 px-2 bg-white h-full shadow-xl flex flex-col">
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<h5 className="font-semibold text-black">PROFILE</h5>
							<button
								onClick={() => setIsOpen(false)}
								className="p-1 hover:bg-gray-100 transition-colors"
							>
								<X className="w-5 h-5 text-gray-500" />
							</button>
						</div>

						{/* User Info */}
						<div className="p-4 flex items-center gap-3 border-b border-gray-100">
							<div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
								<img
									src="/placeholder.svg"
									alt="User Avatar"
									className="w-full h-full object-cover"
								/>
							</div>
							<div>
								<div className="font-medium text-sm text-black">
									{user?.name}
								</div>
								<div className="text-xs text-gray-500">{user?.email}</div>
							</div>
						</div>

						{/* Menu */}
						<div className="flex flex-col px-2 py-4 gap-2 text-sm text-gray-700 flex-1">
							<PanelItem
								icon={<User className="w-4 h-4" />}
								label="My Profile"
								redirect="/crm/profile"
							/>
							<PanelItem
								icon={<BadgeCheck className="w-4 h-4" />}
								label="My Plan"
								redirect="/crm/plan"
							/>
							<PanelItem
								icon={<Info className="w-4 h-4" />}
								label="My RM Details"
								redirect="/crm/rm-details"
							/>
							<PanelItem
								icon={<Bell className="w-4 h-4" />}
								label="Notifications"
								suffix={<span className="text-xs text-gray-400">Allow</span>}
							/>

							<div className="py-4 flex flex-col gap-4">
								<button
									className="w-full bg-[#fbb700] hover:bg-yellow-600 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-3 cursor-pointer"
									onClick={handleResetPassword}
								>
									<RefreshCw className="w-4 h-4" />
									Reset Password
								</button>
								<button
									className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-3 cursor-pointer"
									onClick={handleDeleteClick}
								>
									<Trash2 className="w-4 h-4" />
									Delete Account
								</button>
							</div>
						</div>
					</aside>
				</div>
			)}

			{/* Delete Account Confirmation Dialog */}
			{showDeleteConfirmation && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div
						className="fixed inset-0 bg-black opacity-50"
						onClick={handleCancelDelete}
					></div>
					<div className="relative z-50 bg-white rounded-lg p-6 w-84 max-w-full shadow-xl">
						<div className="flex items-center mb-4 text-red-500">
							<AlertTriangle className="w-6 h-6 mr-2" />
							<h3 className="text-lg font-bold">Delete Account</h3>
						</div>

						<p className="mb-6 text-sm text-gray-600">
							Are you sure you want to delete your account? This action cannot
							be undone and all your data will be permanently lost.
						</p>

						<div className="flex gap-3">
							<button
								onClick={handleCancelDelete}
								className="flex-1 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 text-sm font-medium transition-colors"
								disabled={isDeleting}
							>
								Cancel
							</button>
							<button
								onClick={handleConfirmDelete}
								className={`flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
									isDeleting ? "opacity-70 cursor-not-allowed" : ""
								}`}
								disabled={isDeleting}
							>
								{isDeleting && (
									<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
								)}
								Confirm Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

interface PanelItemProps {
	icon: React.ReactNode;
	label: string;
	redirect?: string;
	suffix?: React.ReactNode;
}

const PanelItem: React.FC<PanelItemProps> = ({
	icon,
	label,
	redirect,
	suffix,
}) => (
	<a
		href={redirect}
		className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition"
	>
		<div className="flex items-center gap-3 text-sm text-black">
			{icon}
			<span>{label}</span>
		</div>
		{suffix ?? <ChevronRight className="w-4 h-4 text-gray-400" />}
	</a>
);

export default ProfilePanel;
