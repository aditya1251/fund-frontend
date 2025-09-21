import React from "react";
import Header from "@/components/crm/header";
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
		<html lang="en">
			<head>
				<link rel="icon" href="/assets/favicon.ico" />
				<title>CRM Panel</title>
			</head>
			<body>
				<div className="flex h-screen bg-gray-50 font-space-grotesk overflow-hidden">
					<Sidebar />
					<main className="flex-1 overflow-x-hidden overscroll-y-contain relative">
						<Header />
						<div className="flex-1 min-h-[calc(100vh-4rem)] overflow-y-auto p-4 md:p-6">
							{children}
						</div>
					</main>
				</div>
			</body>
		</html>
	);
}
