"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfileHeader() {
	const router = useRouter();
	const { data: session } = useSession();
	const user = session?.user;

	const handleBack = () => {
		router.push("/crm");
	};

	return (
		<>
			<div className="w-full py-2 flex items-center gap-4 border-b border-gray-100">
				<div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
					<img
						src={user?.image || "/placeholder.svg"}
						alt="User Avatar"
						className="w-full h-full object-cover"
					/>
				</div>
				<div>
					<div className="font-medium text-md text-black">{user?.name}</div>
					<div className="text-sm text-gray-500">{user?.email}</div>
				</div>
				<div className="ml-auto">
					<button
						onClick={handleBack}
						className="text-sm text-black bg-[#f5d949] rounded-md px-4 py-2 flex items-center gap-2"
					>
						BACK <ChevronRight className="w-4 h-4" />
					</button>
				</div>
			</div>
		</>
	);
}
