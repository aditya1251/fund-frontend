"use client";
import NotificationPanel from "./notificationPanel";
import ProfilePanel from "./profilePanel";
import { useSession } from "next-auth/react";

interface NotificationPanel {
	userId: string;
}
interface ProfilePanel {
	 user: string;
}

export default function Header() {
	const { data: session } = useSession();

	return (
		<header className="bg-white shadow-md py-3 px-4 sm:px-6 flex items-center justify-between z-50 sticky top-0 font-space-grotesk">
			{/* Left: Welcome text */}
			<div className="flex items-center">
				<span className="text-gray-700 text-sm sm:text-lg font-medium">
					Welcome,{" "}
					<span className="text-[#ffb700]">
						{session?.user?.name || "User"}
					</span>
				</span>
			</div>

			{/* Right: Notification & Profile */}
			<div className="flex items-center space-x-2 sm:space-x-4">
				<NotificationPanel userId={session?.user?.id || ""} />
				<ProfilePanel user={{ name: session?.user?.name ?? "", email: session?.user?.email ?? "" }} />
			</div>
		</header>
	);
}