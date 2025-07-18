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
    className={`${bgColor} ${textColor} rounded-lg p-3 md:p-5 text-center flex items-center justify-between font-semibold text-sm md:text-base`}
  >
    <p>{label}</p>
    <p className="text-lg md:text-xl font-bold">{value}</p>
  </div>
);

const Statistics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Stats column */}
      <div className="flex flex-col gap-2 p-3 md:p-4 justify-evenly bg-white shadow-md rounded-lg">
        {stats.map((item, idx) => (
          <StatsCard key={idx} {...item} />
        ))}
      </div>

      {/* EMI Calculator column */}
      <div
        className="bg-[url('/emi-calc.svg')] bg-cover bg-center rounded-lg py-4 px-4 md:py-6 md:px-6 text-right flex items-center justify-between shadow-md shadow-black"
      >
        <Image
          src="/calculator.svg"
          alt="Calculator"
          width={160}
          height={160}
          className="object-contain w-32 h-32 md:w-40 md:h-40"
          unoptimized
        />
        <div className="flex flex-col justify-center pl-3 md:pl-8 relative right-3">
          <h4 className="text-black text-base md:text-lg font-semibold">EMI Calculator</h4>
          <p className="text-black text-xs md:text-sm">Instantly check your loan EMI amount.</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;