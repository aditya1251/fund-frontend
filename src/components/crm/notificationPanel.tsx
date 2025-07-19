"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import React, { useEffect } from "react";
import {
	useGetNotificationsQuery,
	useMarkAsReadMutation,
} from "@/redux/notificationApi";

type Notification = {
	_id: string;
	title: string;
	message: string;
	read: boolean;
	createdAt: string;
};

const NotificationPanel = ({ userId }: { userId: string }) => {
	const {
		data: notifications = [],
		refetch,
		isLoading,
	} = useGetNotificationsQuery(userId, {
		pollingInterval: 3600000, // Poll every 1 hour
	});

	const [markAsRead] = useMarkAsReadMutation();
	const unreadCount = notifications.filter((n: Notification) => !n.read).length;

	const handleMarkAsRead = async (id: string) => {
		try {
			await markAsRead(id);
			refetch(); // Refresh after marking
		} catch (error) {
			console.error("Failed to mark as read", error);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
					<Bell className="w-5 h-5 text-gray-600" />
					{unreadCount > 0 && (
						<span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-[#ffb700]"></span>
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-80 p-4 bg-white shadow-lg rounded-xl"
				align="end"
			>
				<h4 className="text-lg font-bold text-black mb-2">Notifications</h4>
				<hr className="mb-3 border-gray-200" />

				<div className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-1">
					{isLoading ? (
						<p className="text-sm text-gray-500">Loading...</p>
					) : notifications.length === 0 ? (
						<p className="text-sm text-gray-500">No notifications yet.</p>
					) : (
						notifications.map((item: Notification) => (
							<div key={item._id} className="flex justify-between items-start">
								<div>
									<p className="text-black font-medium text-sm">{item.title}</p>
									<p className="text-gray-700 text-sm">{item.message}</p>
									<p className="text-yellow-500 text-xs mt-1">
										{new Date(item.createdAt).toLocaleString()}
									</p>
								</div>
								<div>
									<button
										className={`p-2 rounded-lg w-full text-black opacity-75 text-sm cursor-pointer hover:opacity-100 ${
											item.read ? "hidden" : "visible"
										}`}
										onClick={() => handleMarkAsRead(item._id)}
									>
										Mark as Read
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NotificationPanel;
