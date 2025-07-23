"use client";

import React, { useState } from "react";
import {
	ChevronRight,
	Trash2,
	User,
	Wallet,
	BadgeCheck,
	Info,
	Bell,
	X,
} from "lucide-react";

const ProfilePanel = ({
	user,
}: {
	user: { name?: string; email?: string };
}) => {
	const [isOpen, setIsOpen] = useState(false);
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
								icon={<Wallet className="w-4 h-4" />}
								label="My Payout"
								redirect="/crm/payout"
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

							{/* Footer */}
							<div className="py-4">
								<button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-3">
									<Trash2 className="w-4 h-4" />
									Delete Account
								</button>
							</div>
						</div>
					</aside>
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
	<button className="flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 transition">
		<div className="flex items-center gap-3 text-sm text-black">
			{icon}
			<a href={redirect}>{label}</a>
		</div>
		{suffix ?? <ChevronRight className="w-4 h-4 text-gray-400" />}
	</button>
);

export default ProfilePanel;
