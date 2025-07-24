import React from "react";
import ProfileHeader from "@/components/crm/profileHeader";

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="px-8">
			<ProfileHeader />
			{children}
		</div>
	);
}
