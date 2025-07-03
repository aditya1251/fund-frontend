import React from "react";
import Header from "@/components/crm/header";
import Banner from "@/components/crm/banner";
import Sidebar from "@/components/crm/sidebar";

export default function CrmLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen bg-gray-50 font-space-grotesk overflow-hidden">
			<Sidebar />
			<main className="flex-1 overflow-x-hidden overscroll-y-contain">
				<Header />
				<div className="flex-1 px-8 pt-8 bg-gray-100 min-h-screen overflow-y-auto ">
					<Banner />
					{children}
				</div>
			</main>
		</div>
	);
}
