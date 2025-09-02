"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link"; // Import Link component for navigation
import home from "../../public/assets/home.png";
import govt from "../../public/assets/govt.jpg";
import panIndia from "../../public/assets/panIndia.png";
import dsa from "../../public/assets/become.png";
import business from "../../public/assets/business.png"; // Assuming you have a business image

export default function Hero() {


const MobileDots = ({
  slides,
  currentSlideIndex,
  goTo,
}: {
  slides: any[];
  currentSlideIndex: number;
  goTo: (i: number) => void;
}) => (
  <div className="flex justify-center space-x-2 mt-6 md:hidden">
    {slides.map((_, idx) => (
      <button
        key={idx}
        onClick={() => goTo(idx)}
        className={`w-2.5 h-2.5 rounded-full transition-all ${
          idx === currentSlideIndex
            ? "bg-[#f7c430] scale-125"
            : "bg-white/60"
        }`}
      />
    ))}
  </div>
);

  const slides = [
    {
      id: 1,
      backgroundImage: home,
      headline: (
        <>
          TURN YOUR <span className="text-[#f7c430]">DREAM</span>
          <br />
          <span className="text-[#f7c430]">HOME</span> INTO REALITY.
        </>
      ),
      paragraph: (
        <>
          Low Interest Rates | Quick Approvals |
          <br />
          Minimal Documentation | Flexibble EMI Options
        </>
      ),
    },
    {
      id: 2,
      backgroundImage: govt,
      headline: (
        <>
          GROW YOUR <span className="text-[#f7c430]">BUSINESS</span>
          <br />
          WITH GOVERNMENT-BACKED LOANS.
        </>
      ),
      paragraph: (
        <>
          Get Upto 2 Crore Funding | Mudra, PMEFP, MSME & CGTKSE Schemes
          <br />
          Collateral-Free | Low Interest | Easy Processing
        </>
      ),
    },
    {
      id: 3,
      backgroundImage: dsa,
      headline: (
        <>
          START EARNING - <span className="text-[#f7c430]">BIG BECOME</span>.
          <br />A LOAN DSA PARTNER TODAY.
        </>
      ),
      paragraph: (
        <>
          Zero Investment | High Payouts | Wide Range of Products
          <br />
          Full Training & Support Provided.
        </>
      ),
    },
    {
      id: 4,
      backgroundImage: business,
      headline: (
        <>
          FUEL YOUR <span className="text-[#f7c430]">BUSINESS GROWTH</span>.
          <br />
          WITH EASY BUSINESS LOANS.
        </>
      ),
      paragraph: (
        <>
          Loan upto 5 Crore | Fast Approval | Minimal Documentation
          <br />
          No Collateral Required
        </>
      ),
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetAutoAdvanceTimeout = () => {
    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }
  };

  useEffect(() => {
    resetAutoAdvanceTimeout();

    autoAdvanceTimeoutRef.current = setTimeout(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlideIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
        setTransitioning(false);
      }, 700);
    }, 5000);

    return () => resetAutoAdvanceTimeout();
  }, [currentSlideIndex, slides.length]);

  const currentSlide = slides[currentSlideIndex];

  // Define the routes/links
  const applyRoute = "/contact"; // Your general apply route
  const becomeRoute = "/contact"; // Your become partner route

  // Determine the current button link
  const currentButtonLink = currentSlideIndex === 2 ? becomeRoute : applyRoute; // Index 2 is the 3rd slide (DSA partner)

  return (
  <div className="relative w-full overflow-hidden">
    {/* Background slides */}
    <div className="absolute inset-0 flex">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(${100 * (index - currentSlideIndex)}%)`,
            zIndex: index === currentSlideIndex ? 2 : 0,
          }}
        >
          <Image
            src={
              typeof slide.backgroundImage === "string"
                ? slide.backgroundImage
                : slide.backgroundImage.src
            }
            alt={`Slide ${slide.id}`}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
            className="absolute inset-0"
          />
        </div>
      ))}
    </div>

    {/* Foreground content */}
    <div className="relative z-30 flex min-h-[500px] items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center h-full">
        {/* Left copy */}
        <div className="max-w-4xl flex-grow md:pt-0 text-center md:text-left">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 md:mb-6 transition-opacity duration-700 ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentSlide.headline}
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-6 md:mb-8 max-w-3xl leading-relaxed transition-opacity duration-700 ${
              transitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentSlide.paragraph}
          </p>
          <Link href={currentButtonLink} passHref>
            <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black font-semibold px-8 py-5 md:px-10 md:py-7 text-lg md:text-xl rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer">
              APPLY NOW
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile dots */}
          <MobileDots
            slides={slides}
            currentSlideIndex={currentSlideIndex}
            goTo={(i) => {
              if (i === currentSlideIndex) return;
              resetAutoAdvanceTimeout();
              setTransitioning(true);
              setCurrentSlideIndex(i);
              setTimeout(() => setTransitioning(false), 700);
            }}
          />
        </div>

        {/* Right vertical bar (hidden on mobile) */}
        <div className="hidden md:flex flex-col items-center justify-center py-8 md:py-0 md:ml-8 mt-auto md:mt-0 h-[250px] md:h-[calc(100%-80px)]">
          <div className="bg-white/20 rounded-full p-2 flex flex-col items-center justify-between h-full">
            {slides.map((_, index) => (
              <div
                key={index}
                onClick={() => {
                  if (index === currentSlideIndex) return;
                  resetAutoAdvanceTimeout();
                  setTransitioning(true);
                  setCurrentSlideIndex(index);
                  setTimeout(() => setTransitioning(false), 700);
                }}
                className={`w-1 md:w-2 h-16 my-2 rounded-full cursor-pointer transition-all duration-300
                  ${
                    index === currentSlideIndex
                      ? "bg-[#f7c430] scale-x-150"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)}