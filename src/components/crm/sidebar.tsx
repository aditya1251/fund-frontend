"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	BadgeIndianRupee,
	BookOpenText,
	Calculator,
	HandCoins,
	Handshake,
	House,
	Landmark,
	LogOutIcon,
	Megaphone,
	MessageSquareText,
	PanelLeftClose,
	Timer,
	Users,
} from "lucide-react";

interface NavItem {
	href: string;
	label: string;
	icon: React.ReactNode;
}

const navItems: NavItem[] = [
	{ href: "", label: "Home", icon: <House /> },
	{ href: "/leads", label: "Leads", icon: <Users /> },
	{ href: "/loans", label: "Loans", icon: <HandCoins /> },
	{ href: "/govt-loans", label: "Govt. Loans", icon: <Landmark /> },
	{ href: "/insurance", label: "Insurance", icon: <Handshake /> },
	{ href: "/quick-loans", label: "Quick Loans", icon: <Timer /> },
	{
		href: "/campaign-marketing",
		label: "Campaign & Marketing",
		icon: <Megaphone />,
	},
	{ href: "/taxation", label: "Taxation", icon: <BadgeIndianRupee /> },
	{
		href: "/emi-calculator",
		label: "EMI Calculator",
		icon: <Calculator />,
	},
	{
		href: "/training-support",
		label: "Training & Support",
		icon: <BookOpenText />,
	},
	{
		href: "/feedback-grievance",
		label: "Feedback & Grievance",
		icon: <MessageSquareText />,
	},
];

const Sidebar = () => {
	const [open, setOpen] = useState(true);
	const baseUrl = "/crm";
	const pathname = usePathname();

	const toggleSidebar = () => setOpen((prev) => !prev);

	return (
		<aside
			className={`relative flex flex-col justify-between bg-white shadow-lg transition-[width] duration-300 ease-in-out ${
				open ? "w-64" : "w-20"
			}`}
		>
			<div>
				{/* Header */}
				<div className="text-black flex items-center justify-between px-4 py-4 border-b border-gray-200">
					{/* Logo */}
					<div
						className={`overflow-hidden transition-[width] duration-300 ${
							open ? "w-8" : "w-0"
						}`}
					>
						<div className="w-8 h-8 rounded-full overflow-hidden bg-[#ddd]">
							<img
								src="/placeholder.svg"
								alt="Logo"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>

					<button
						onClick={toggleSidebar}
						aria-label="Toggle sidebar"
						className="p-1 rounded hover:bg-gray-200"
					>
						<PanelLeftClose className="cursor-pointer" />
					</button>
				</div>

				{/* Navigation */}
				<nav className="p-4 flex flex-col gap-4">
					<ul className="flex flex-col gap-2">
						{navItems.map(({ href, label, icon }) => {
							const isActive = pathname === `${baseUrl}${href}`;
							return (
								<li key={href}>
									<Link
										href={`${baseUrl}${href}`}
										className={`flex items-center p-2 gap-3 rounded-lg text-sm transition-colors duration-200 ${
											isActive
												? "bg-[#f5d949] text-black"
												: "text-black hover:bg-gray-200"
										}`}
									>
										<div>{icon}</div>
										{open && <span>{label}</span>}
									</Link>
								</li>
							);
						})}
					</ul>

					{/* Logout */}
					<Link
						href="/logout"
						className="flex items-center p-2 gap-3 rounded-lg text-sm text-neutral-500 hover:bg-gray-200 transition-colors duration-200"
					>
						<LogOutIcon />
						{open && <span>Log Out</span>}
					</Link>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;