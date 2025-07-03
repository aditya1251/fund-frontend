import NotificationPanel from "./notificationPanel";
import ProfilePanel from "./profilePanel";

export default function Header() {
	return (
		<header className="bg-white shadow-md py-3 px-6 flex items-center justify-between z-10 sticky top-0 font-space-grotesk">
			<div className="flex items-center">
				<span className="text-gray-700 text-lg font-medium">
					Welcome, <span className="text-[#ffb700]">Ruth Mishra</span>, code
				</span>
			</div>

			<div className="flex items-center space-x-4">
				<NotificationPanel />
				<ProfilePanel />
			</div>
		</header>
	);
}
