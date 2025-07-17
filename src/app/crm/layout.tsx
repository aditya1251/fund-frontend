import React from "react";
import Header from "@/components/crm/header";
import Banner from "@/components/crm/banner";
import Sidebar from "@/components/crm/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CrmLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession(authOptions);
	if (
		!session ||
		(session.user?.role !== "DSA" && session.user?.role !== "SUPERADMIN")
	) {
		redirect("/");
	}
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
