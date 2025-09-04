"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import govtScheme from "../../public/assets/ui1.png";
import Link from "next/link";
import dynamic from "next/dynamic";
const CountUp = dynamic(() => import("./animations/CountUp"), { ssr: false });


export default function GovernmentSchemes() {
  // Small helper component for the rings
  const Ring = ({ label, size = "md", className = "" }: { label: string; size?: "sm" | "md" | "lg"; className?: string }) => {
    const sizeClasses = {
      sm: "w-28 h-28 md:w-32 md:h-32",
      md: "w-32 h-32 md:w-40 md:h-40",
      lg: "w-36 h-36 md:w-48 md:h-48",
    };
    return (
      <div
        className={`flex-shrink-0 flex items-center justify-center rounded-full bg-[#f7c430] ${sizeClasses[size]} ${className}`}
      >
        <span className="text-center text-xs md:text-sm font-medium text-black leading-tight">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 md:mb-6 tracking-tight">
            GOVERNMENT SCHEMES WE OFFER
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Connecting Individuals And Businesses To Verified And Impactful Government Support Programs.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-20">
          {[
            { val: "730+", name: "Mudra Loans" },
            { val: "60+", name: "CGTMSE Loan" },
            { val: "230+", name: "PMGP Loans" },
            { val: "340+", name: "MSME Loans" },
          ].map((s) => (
            <div key={s.name} className="bg-[#f7c430] rounded-2xl p-4 md:p-6 text-center">
              <CountUp delay={0} duration={1500}>
              <div className="text-2xl md:text-4xl font-bold text-black mb-1 md:mb-2">{s.val}</div>
              </CountUp>
              <div className="text-xs md:text-base font-medium text-black">{s.name}</div>
            </div>
          ))}
        </div>

        {/* ----------------- DESKTOP: absolute circles ----------------- */}
        <div className="hidden md:block relative h-[500px] mb-20">
          {/* Central circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-64 h-64 lg:w-80 lg:h-80 bg-[#f7c430] rounded-full flex items-center justify-center">
              <Image
                src={govtScheme}
                alt="Family with government scheme benefits"
                className="w-60 h-60 lg:w-70 lg:h-70 object-contain rounded-full"
              />
            </div>
          </div>

          {/* Surrounding rings */}
          <Ring label="BOOST YOUR BUSINESS" size="md" className="absolute top-0 left-16" />
          <Ring label="MINIMAL DOCUMENTS" size="md" className="absolute top-0 right-16" />
          <Ring label="LOWEST ROI" size="sm" className="absolute top-1/2 -translate-y-1/2 left-0" />
          <Ring label="SAFE & SECURE" size="sm" className="absolute top-1/2 -translate-y-1/2 right-0" />
          <Ring label="SAFE & SECURE" size="lg" className="absolute bottom-0 left-16" />
          <Ring label="QUICK APPLY" size="md" className="absolute bottom-0 right-16" />
        </div>

        {/* ----------------- MOBILE / TABLET: flex column ----------------- */}
        <div className="md:hidden flex flex-col items-center gap-8 mb-12">
          <div className="w-48 h-48 bg-[#f7c430] rounded-full flex items-center justify-center">
            <Image
              src={govtScheme}
              alt="Family with government scheme benefits"
              className="w-44 h-44 object-contain rounded-full"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-xs">
            <Ring label="BOOST YOUR BUSINESS" size="sm" />
            <Ring label="MINIMAL DOCUMENTS" size="sm" />
            <Ring label="LOWEST ROI" size="sm" />
            <Ring label="SAFE & SECURE" size="sm" />
            <Ring label="SAFE & SECURE" size="sm" />
            <Ring label="QUICK APPLY" size="sm" />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/contact">
            <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black px-8 py-4 md:px-10 md:py-6 text-lg md:text-xl rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}