"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Building2, Network, Users, ShieldCheck, Banknote } from "lucide-react"; // NEW icons

const CountUp = dynamic(() => import("./animations/CountUp"), { ssr: false });

interface StatCardProps { 
  icon: React.ReactNode; 
  value: string; 
  label: string 
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="w-[140px] h-[140px] md:w-[200px] md:h-[200px] bg-white/10 rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg">
    <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full text-black mb-2">
      {icon}
    </div>
    <CountUp delay={0} duration={1500}>
      <span className="font-['Space_Grotesk'] text-3xl md:text-5xl leading-none text-black">{value}</span>
    </CountUp>
    <span className="font-['Space_Grotesk'] text-xs md:text-lg uppercase text-black text-center mt-2 whitespace-nowrap">{label}</span>
  </div>
);

export default function StatsSection() {
  const stats = [
    { icon: <Building2 className="w-8 h-8 md:w-10 md:h-10" />, value: "100+", label: "Cities" },
    { icon: <Network className="w-8 h-8 md:w-10 md:h-10" />, value: "3200+", label: "Connectors" },
    { icon: <Users className="w-8 h-8 md:w-10 md:h-10" />, value: "50+", label: "Employees" },
    { icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />, value: "700+", label: "Financial Advisors" },
    { icon: <Banknote className="w-8 h-8 md:w-10 md:h-10" />, value: "125+", label: "Lending Partners" },
  ];

  return (
    <section className="w-full min-h-[358px] bg-[#F7C430] py-10 md:py-24 flex items-center justify-center">
      {/* DESKTOP: single row, 5 equal columns */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-10 lg:gap-12 xl:gap-[46px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* MOBILE / TABLET: 2-1-2 masonry */}
      <div className="md:hidden grid grid-cols-2 gap-4 max-w-xs mx-auto">
        {stats.map((s, i) => (
          <div key={i} className={i === 2 ? "col-span-2" : "col-span-1"}>
            <StatCard {...s} />
          </div>
        ))}
      </div>
    </section>
  );
}
