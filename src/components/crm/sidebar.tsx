"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";
import {
	BadgeIndianRupee,
	Calculator,
	Files,
	HandCoins,
	Handshake,
	House,
	Landmark,
	LogOutIcon,
	MessageSquareWarning,
	PanelLeftClose,
	Menu,
	X,
	Timer,
	Users,
	BookOpenText,
	ArrowLeftToLine,
	ChevronLeft,
} from "lucide-react";
import logo from "../../../public/logo1000.png"; // Adjust the path as necessary
import { signOut } from "next-auth/react";

interface NavItem {
	href: string;
	label: string;
	icon: React.ReactNode;
	external?: boolean;
}

const navItems: NavItem[] = [
	{ href: "", label: "Home", icon: <House /> },
	{ href: "/leads", label: "Leads", icon: <Users /> },
	{ href: "/loans", label: "Loans", icon: <HandCoins /> },
	{ href: "/govt-loans", label: "Govt. Loans", icon: <Landmark /> },
	{ href: "/insurance", label: "Insurance", icon: <Handshake /> },
	{ href: "/quick-loans", label: "Quick Loans", icon: <Timer /> },
	{ href: "/drafts", label: "Drafts", icon: <Files /> },
	{ href: "/taxation", label: "Taxation", icon: <BadgeIndianRupee /> },
	{
		href: "/emi-calculator",
		label: "EMI Calculator",
		icon: <Calculator />,
	},
	{
		href: "https://drive.google.com/drive/folders/1CHqORL-WO-TSxpW3hBOIhd0X0UJNNjow?usp=sharing",
		label: "Training Support",
		external: true,
		icon: <BookOpenText />,
	},
	{
		href: "/report",
		label: "Report an Issue",
		icon: <MessageSquareWarning />,
	},
];

const Sidebar = () => {
	const [open, setOpen] = useState(true); // Default state - will be adjusted in useEffect
	const [isMobile, setIsMobile] = useState(false);
	const baseUrl = "/crm";
	const pathname = usePathname();

	// Check if we're in a mobile viewport
	useEffect(() => {
		const checkIfMobile = () => {
			const isMobileView = window.innerWidth < 768;
			setIsMobile(isMobileView);
			
			// Close sidebar by default on mobile, keep open on desktop
			setOpen(!isMobileView);
		};

		// Initial check
		checkIfMobile();
		
		// Add resize listener
		window.addEventListener('resize', checkIfMobile);
		
		// Cleanup
		return () => window.removeEventListener('resize', checkIfMobile);
	}, []);

	const toggleSidebar = () => setOpen((prev) => !prev);

	return (
		<>
			{/* Mobile hamburger menu (only visible on mobile when sidebar is closed) */}
			{isMobile && !open && (
				<div className="fixed top-1 left-2 z-[1001]">
					<button
						onClick={toggleSidebar}
						className="p-2.5 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
						aria-label="Open sidebar"
					>
						<Menu size={24} className="text-black" />
					</button>
				</div>
			)}

			{/* Overlay for mobile (only visible when sidebar is open on mobile) */}
			{isMobile && (
				<div 
					className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-[999] ${open ? 'opacity-50 visible' : 'opacity-0 invisible'}`}
					onClick={toggleSidebar}
				/>
			)}

			<aside
				className={`flex flex-col bg-white h-full z-[1000] transition-all duration-300 ease-in-out
					${isMobile ? 
						(open ? "fixed translate-x-0 w-64 shadow-2xl" : "fixed -translate-x-full w-0 opacity-0") : 
						(open ? "w-64 shadow-md" : "w-20 shadow-sm")}
				`}
				style={{ position: isMobile ? 'fixed' : 'static', top: 0, left: 0, bottom: 0 }}
			>
				<div>
					{/* Header */}
					<div className="text-black flex items-center justify-between px-4 py-4 border-b border-gray-200">
						<Link href="/crm" className="flex items-center">
							<Image
								src={logo}
								alt="Logo"
								width={150}
								height={40}
								className={`transition-all duration-300 ${!open && !isMobile ? 'w-0 h-0 opacity-0' : 'h-10 opacity-100'}`}
								quality={100}
								placeholder="blur"
								blurDataURL="/placeholder.svg" // Placeholder image for blur effect
							/>
						</Link>

						{/* Toggle button */}
						<button
							onClick={toggleSidebar}
							aria-label="Toggle sidebar"
							className={`p-1.5 rounded hover:bg-gray-200 ${isMobile ? 'text-gray-800' : ''}`}
						>
							{isMobile ? (
								<X size={20} className="cursor-pointer" />
							) : (
								<ChevronLeft className={`cursor-pointer ${!open ? 'rotate-180' : ''}`} />
							)}
						</button>
					</div>

					{/* Navigation */}
					<nav className="p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-80px)]">
						<ul className="flex flex-col gap-2">
							{navItems.map((navItem) => {
								const isActive = pathname === `${baseUrl}${navItem.href}`;
								return (
									<li key={navItem.href}>
										<Link
											href={navItem.external ? navItem.href : `${baseUrl}${navItem.href}`}
											target={navItem.external ? "_blank" : "_self"}
											className={`flex items-center p-2 gap-3 rounded-lg text-sm transition-colors duration-200 ${isActive
												? "bg-[#f5d949] text-black"
												: "text-black hover:bg-gray-200"
												}`}
											onClick={isMobile ? toggleSidebar : undefined}
										>
											<div>{navItem.icon}</div>
											<span className={`${!open && !isMobile ? 'hidden' : 'block'}`}>{navItem.label}</span>
										</Link>
									</li>
								);
							})}
						</ul>

						{/* Logout */}
						<div
							onClick={() => {
								signOut();
								if (isMobile) toggleSidebar();
							}}
							className="flex items-center p-2.5 gap-3 rounded-lg text-sm text-neutral-500 hover:bg-gray-200 transition-colors duration-200 cursor-pointer mt-auto"
						>
							<div className="min-w-[24px] flex items-center justify-center"><LogOutIcon /></div>
							<span className={`transition-opacity duration-300 ${!open && !isMobile ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>Log Out</span>
						</div>
					</nav>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
