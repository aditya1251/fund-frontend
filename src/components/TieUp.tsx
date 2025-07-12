"use client";

import Image from "next/image";

// Import all your NBFC logos
import shri from "../../public/assets/shriram.png";
import chola from "../../public/assets/chola.png";
import ujjivan from "../../public/assets/ujjivan.png";
import jana from "../../public/assets/jana.jpg";
import captial from "../../public/assets/Capital_Small_Finance_Logo.png"; // Note: This was imported but not used in the original.
import equitas from "../../public/assets/Equitas-logo.png";
import baja from "../../public/assets/bajaj.png";
import au from "../../public/assets/aubank.png";
import muthoot from "../../public/assets/muthoot.png";
import aditya from "../../public/assets/aditya.png";
import sundaram from "../../public/assets/sundaram.png";
import lt from "../../public/assets/lt.webp";
import poonawala from "../../public/assets/poona.png";
import lic from "../../public/assets/lic.png";
import piramal from "../../public/assets/primal.jpeg";
import iifl from "../../public/assets/IIFLFinance.webp";
import tata from "../../public/assets/TCHFL.webp";

export default function Tieup() {
  const nbfcLogos = [
    { src: au, alt: "AU Small Finance Bank" },
    { src: equitas, alt: "Equitas Small Finance Bank" },
    { src: jana, alt: "Jana Small Finance Bank" },
    { src: ujjivan, alt: "Ujjivan Small Finance Bank" },
    { src: baja, alt: "Bajaj Finserv" },
    { src: chola, alt: "Cholamandalam Finance" },
    { src: shri, alt: "Shriram Finance" },
    { src: muthoot, alt: "Muthoot Finance" },
    { src: aditya, alt: "Aditya Birla Finance" },
    { src: sundaram, alt: "Sundaram Finance" },
    { src: lt, alt: "L&T Finance" },
    { src: poonawala, alt: "Poonawala Finance" },
    { src: lic, alt: "LIC Housing Finance" },
    { src: tata, alt: "Tata Capital Housing Finance" },
    { src: piramal, alt: "Piramal Finance" },
    { src: iifl, alt: "IIFL Finance" },
    // Add captial if you want to include it, it was imported but not used in the original logo list
    // { src: captial, alt: "Capital Small Finance Bank" },
  ];

  return (
    <div className="w-full max mx-auto px-6 py-16 bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
          Our <span className="text-yellow-500">NBFC</span> Tieup (110+)
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          We're proud to collaborate with leading organizations and government
          bodies who support our mission. Their trust and partnership help us
          deliver reliable and impactful services to our users.
        </p>
      </div>

      {/* Logos Section - Infinite Loop Container */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <div className="flex w-max animate-nbfc-scroll">
          {/* Duplicate the logos to create the infinite effect */}
          {[...nbfcLogos, ...nbfcLogos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-16 w-48 mx-4 flex-shrink-0" // Added mx-4 for spacing
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add a style block for the custom animation */}
      <style jsx>{`
        @keyframes nbfc-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%); /* Moves half the total width of duplicated content */
          }
        }

        .animate-nbfc-scroll {
          animation: nbfc-scroll 50s linear infinite; /* Adjust duration as needed */
        }

        .animate-nbfc-scroll:hover {
          animation-play-state: paused; /* Pause on hover */
        }
      `}</style>
    </div>
  );
}