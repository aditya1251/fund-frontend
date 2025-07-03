"use client";

import Image from "next/image";
import React from "react";

interface Bank {
	src: string;
	alt: string;
}

const banks: Bank[] = [
	{ src: "/banks-logo/canara-logo.png", alt: "Canara Bank" },
	{ src: "/banks-logo/icici-logo.png", alt: "ICICI Bank" },
	{ src: "/banks-logo/bob-logo.png", alt: "Bank of Baroda" },
	{ src: "/banks-logo/union-logo.png", alt: "Union Bank" },
	{ src: "/banks-logo/axis-logo.png", alt: "Axis Bank" },
];

const Banks: React.FC = () => {
	return (
		<div className="flex justify-evenly gap-6 p-6 flex-wrap bg-white shadow-md rounded-lg mb-6">
			{banks.map((bank, index) => (
				<Image
					key={index}
					src={bank.src}
					alt={bank.alt}
					width={150}
					height={60}
					unoptimized
				/>
			))}
		</div>
	);
};

export default Banks;
