"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

const notifications = [
	{
		title: "Loan Status 301187",
		message: "Loan has been approved. Proceed Further.",
		time: "2 Mins. Ago",
	},
	{
		title: "Loan Status 302254",
		message: "Loan has been Rejected.",
		time: "Yesterday",
	},
	{
		title: "Document Expiry",
		message: "Your Document will bw expire in 3 days. Update them ASAP.",
		time: "Month Ago",
	},
];

const NotificationPanel = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
					<Bell className="w-5 h-5 text-gray-600" />
					<span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-[#ffb700] ring-2 ring-white"></span>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-80 p-4 bg-white shadow-lg rounded-xl"
				align="end"
			>
				<h4 className="text-lg font-bold text-black mb-2">Notification</h4>
				<hr className="mb-3 border-gray-200" />

				<div className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-1">
					{notifications.map((notif, idx) => (
						<div key={idx}>
							<p className="text-black font-medium text-sm">{notif.title}</p>
							<p className="text-gray-700 text-sm">{notif.message}</p>
							<p className="text-yellow-500 text-xs mt-1">{notif.time}</p>
						</div>
					))}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NotificationPanel;
