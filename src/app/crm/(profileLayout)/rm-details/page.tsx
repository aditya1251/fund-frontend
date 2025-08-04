"use client";

import { User, Mail, Phone, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetDsaDetailsQuery } from "@/redux/services/dsaApi";
import Loading from "@/components/Loading";

export default function Page() {
	const { data: session } = useSession();
	const userId = session?.user.id;

	// Fetch DSA details to get the assigned RM ID
	const { data: dsaData, isLoading: isDsaLoading } = useGetDsaDetailsQuery(
		userId!
	);
	const assignedRmId = dsaData?.rmId;

	// Fetch RM details using the assigned RM ID
	const { data: rmData, isLoading: isRmLoading } = useGetDsaDetailsQuery(
		assignedRmId,
		{ skip: !assignedRmId }
	);
	const isLoading = isDsaLoading || isRmLoading;

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="mx-auto py-8 rounded-md">
			<h4 className="text-xl font-semibold text-black mb-6">RM Details</h4>

			{!assignedRmId || !rmData ? (
				<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
					<AlertCircle className="text-yellow-500 w-5 h-5" />
					<p className="text-yellow-700">
						No RM is currently assigned to your account.
					</p>
				</div>
			) : (
				<div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mx-auto">
					<div className="bg-[#FFD439] px-6 py-4 flex items-center flex-col md:flex-row gap-4">
						<div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
							{rmData.avatarUrl ? (
								<img
									src={rmData.avatarUrl}
									alt="RM Avatar"
									className="w-full h-full object-cover"
								/>
							) : (
								<User className="w-8 h-8 text-gray-400" />
							)}
						</div>
						<div className="text-center md:text-left">
							<h3 className="text-lg font-semibold text-black">{rmData.name}</h3>
							<p className="text-gray-700 text-sm">Relationship Manager</p>
						</div>
					</div>

					<div className="p-6 space-y-4">
						<div className="flex items-center gap-3">
							<Mail className="w-5 h-5 text-gray-500" />
							<span className="text-gray-800 text-sm">{rmData.email}</span>
						</div>
						<div className="flex items-center gap-3">
							<Phone className="w-5 h-5 text-gray-500" />
							<span className="text-gray-800 text-sm">
								{rmData.phone || "N/A"}
							</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
