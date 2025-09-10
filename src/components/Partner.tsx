"use client";

import Image from "next/image";

// Import all your logos
import boi from "../../public/assets/Bank-of-India-Logo.png";
import hdfc from "../../public/assets/hdfc.png";
import axis from "../../public/assets/axis.png";
import idbi from "../../public/assets/idbi.png";
import kotak from "../../public/assets/kotak.jpg";
import icici from "../../public/assets/icici.png";
import yes from "../../public/assets/yes.png";
import sbi from "../../public/assets/sbi.jpg";
import pnb from "../../public/assets/pnb.png";
import bob from "../../public/assets/bob.png";
import canara from "../../public/assets/canara.jpg";
import union from "../../public/assets/union.svg";

export default function TrustedPartners() {
  const logos = [
    { src: hdfc, alt: "HDFC Bank" },
    { src: axis, alt: "Axis Bank" },
    { src: idbi, alt: "IDBI Bank" },
    { src: kotak, alt: "Kotak Mahindra Bank" },
    { src: icici, alt: "ICICI Bank" },
    { src: yes, alt: "Yes Bank" },
    { src: sbi, alt: "SBI Bank" },
    { src: pnb, alt: "PNB Bank" },
    { src: bob, alt: "Bank of Baroda" },
    { src: canara, alt: "Canara Bank" },
    { src: union, alt: "Union Bank of India" },
    { src: boi, alt: "Bank of India" },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-[#111111]">Our Trusted </span>
          <span className="text-[#f7c430]">Banks</span>
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
          We're proud to collaborate with leading organizations and government
          bodies who support our mission. Their trust and partnership help us
          deliver reliable and impactful services to our users.
        </p>

        {/* Partner Logos - Infinite Loop Container */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <div className="flex w-max animate-infinite-scroll">
            {/* Duplicate the logos to create the infinite effect */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-16 w-40 mx-4 flex-shrink-0" // Add mx-4 for spacing
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={64}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add a style block for the custom animation */}
      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%); /* Move half the total width of duplicated content */
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite; /* Adjust duration as needed */
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused; /* Pause on hover */
        }
      `}</style>
    </section>
  );
}