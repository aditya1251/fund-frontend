"use client";

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
	const baseUrl = "/crm";
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
			<div>
				<div className="text-black flex items-center justify-between px-6 py-4 border-b border-gray-200">
					<div className="w-8 h-8 rounded-full overflow-hidden bg-[#ddd]">
						<img
							src="/placeholder.svg"
							alt="Logo"
							className="w-full h-full object-cover"
						/>
					</div>
					<PanelLeftClose />
				</div>
				<nav className="p-4 flex flex-col justify-between gap-4">
					<ul className="flex flex-col gap-2 justify-evenly h-full overflow-y-auto">
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
										<span>{label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
					<Link
						href="/logout"
						className="flex items-center p-2 gap-3 rounded-lg text-sm text-neutral-500 hover:bg-gray-200 transition-colors duration-200"
					>
						<LogOutIcon />
						<span>Log Out</span>
					</Link>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
