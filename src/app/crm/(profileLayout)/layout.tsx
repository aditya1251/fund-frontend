import React from "react";
import ProfileHeader from "@/components/crm/profileHeader";

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="px-8 pt-8 bg-white">
			<ProfileHeader />
			{children}
		</div>
	);
}
