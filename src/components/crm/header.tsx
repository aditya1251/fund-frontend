import NotificationPanel from "./notificationPanel";
import ProfilePanel from "./profilePanel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className="bg-white shadow-md py-3 px-6 flex items-center justify-between z-10 sticky top-0 font-space-grotesk">
			<div className="flex items-center">
				<span className="text-gray-700 text-lg font-medium">
					Welcome,{" "}
					<span className="text-[#ffb700]">
						{session?.user?.name || "New User"}
					</span>
					, code
				</span>
			</div>

			<div className="flex items-center space-x-4">
				<NotificationPanel userId={session?.user?.id || ""} />
				<ProfilePanel user={session?.user || {}} />
			</div>
		</header>
	);
}
