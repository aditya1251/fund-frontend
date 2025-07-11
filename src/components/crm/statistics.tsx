"use client";

import Image from "next/image";
import React from "react";

interface StatsItem {
	label: string;
	value: string;
	bgColor: string;
	textColor: string;
}

const stats: StatsItem[] = [
	{
		label: "Approved",
		value: "20",
		bgColor: "bg-[#2d2c2c]",
		textColor: "text-white",
	},
	{
		label: "Rejected",
		value: "20",
		bgColor: "bg-[#f5d949]",
		textColor: "text-black",
	},
	{
		label: "Disbursed",
		value: "₹2000",
		bgColor: "bg-[#2d2c2c]",
		textColor: "text-white",
	},
];

const StatsCard: React.FC<StatsItem> = ({
	label,
	value,
	bgColor,
	textColor,
}) => (
	<div
		className={`${bgColor} ${textColor} rounded-lg p-5 text-center flex items-center justify-between font-semibold`}
	>
		<p>{label}</p>
		<p className="text-xl font-bold">{value}</p>
	</div>
);

const Statistics: React.FC = () => {
	return (
		<div className="grid grid-cols-2 gap-4 mb-6">
			<div className="flex flex-col gap-2 p-3 justify-evenly bg-white shadow-md rounded-lg">
				{stats.map((item, idx) => (
					<StatsCard key={idx} {...item} />
				))}
			</div>

			<div className="bg-[url('/emi-calc.svg')] rounded-lg py-6 text-right flex justify-between shadow-md shadow-black">
				<Image
					src="/calculator.svg"
					alt="Calculator"
					width={200}
					height={200}
					unoptimized
					style={{ objectFit: "contain" }}
				/>
				<div className="px-6">
					<h4 className="text-black">EMI Calculator</h4>
					<p className="text-black">Instantly check your loan EMI amount.</p>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
