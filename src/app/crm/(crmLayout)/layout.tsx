import React from "react";
import Banner from "@/components/crm/banner";

export default async function CrmLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<Banner />
			{children}
		</div>
	);
}
