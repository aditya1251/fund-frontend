"use client";

import { Check, Clock, AlertCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useGetDsaDetailsQuery } from "@/redux/services/dsaApi";
import { useGetPlanByIdQuery } from "@/redux/services/plansApi";

export default function Page() {
	const { data: session } = useSession();
	const userId = session?.user.id;

	// Fetch DSA details to get the plan ID
	const { data: dsaData, isLoading: isDsaLoading } = useGetDsaDetailsQuery(
		userId!
	);

	// Fetch plan details using the plan ID
	const planId = dsaData?.planId;
	const { data: planData, isLoading: isPlanLoading } =
		useGetPlanByIdQuery(planId);
	const isLoading = isDsaLoading || isPlanLoading;

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[300px]">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500"></div>
			</div>
		);
	}
	return (
		<div className="mx-auto py-8 rounded-md">
			<div className="flex justify-between items-center mb-6">
				<h4 className="text-xl font-semibold text-black">My RM Details</h4>
				<div className="flex items-center gap-2">
					<span
						className={`px-3 py-1 rounded-full text-xs font-semibold ${
							planData?.isActive
								? "bg-green-100 text-green-800"
								: "bg-yellow-100 text-yellow-800"
						}`}
					>
						{planData?.isActive ? "Active" : "Inactive"}
					</span>
				</div>
			</div>

			{!planData ? (
				<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
					<AlertCircle className="text-yellow-500 w-5 h-5" />
					<p className="text-yellow-700">
						No plan is currently assigned to your account.
					</p>
				</div>
			) : (
				<>
					{/* Plan Card */}
					<div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-8">
						<div className="bg-[#FFD439] px-6 py-4">
							<h3 className="text-2xl font-bold text-black">{planData.name}</h3>
						</div>

						<div className="p-6">
							<div className="flex justify-between items-center mb-6">
								<div>
									<span className="text-3xl font-bold text-black">
										₹{planData.amount}
									</span>
									<span className="text-gray-500 ml-2">
										/ {planData.billingCycle || "month"}
									</span>
								</div>

								<div className="flex items-center gap-2">
									<Clock className="w-4 h-4 text-gray-500" />
									<span className="text-sm text-gray-500">
										{planData.duration === 0
											? "Lifetime Access"
											: `Expires in ${planData.duration} months`}
									</span>
								</div>
							</div>

							{/* Plan Description */}
							<p className="text-gray-600 mb-6">{planData.description}</p>

							{/* Features List */}
							<div className="space-y-3">
								<h4 className="font-semibold text-black mb-2">
									Features Included:
								</h4>
								{planData.features?.map((feature: string, index: number) => (
									<div key={index} className="flex items-start gap-2">
										<Check className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
										<span className="text-gray-700">{feature}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Plan Usage Metrics */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<MetricCard
							title="Leads Submitted"
							value={dsaData?.leadsSubmitted || 0}
						/>
						<MetricCard
							title="Loans Processed"
							value={dsaData?.loansProcessed || 0}
						/>
						<MetricCard
							title="Commission Earned"
							value={`₹${dsaData?.commissionsEarned || 0}`}
						/>
					</div>
				</>
			)}
		</div>
	);
}

interface MetricCardProps {
	title: string;
	value: number | string;
}

const MetricCard = ({ title, value }: MetricCardProps) => {
	return (
		<div className="bg-white border border-gray-200 p-4 rounded-lg">
			<h5 className="text-sm font-medium text-gray-500 mb-2">{title}</h5>

			<div className="flex justify-between items-end mb-2">
				<div className="text-2xl font-bold text-black">{value}</div>
			</div>
		</div>
	);
};
