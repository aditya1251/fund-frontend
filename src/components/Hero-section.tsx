"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Import Next.js Image component
import home from "../../public/assets/home.png";
import govt from "../../public/assets/govt.png";
import dsa from "../../public/assets/become.png"; 

export default function Hero() {
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
          <br />
          A LOAN DSA PARTNER TODAY.
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
      backgroundImage:
        govt, // Fallback to URL for example
      headline: (
        <>
          INVEST IN <span className="text-[#f7c430]">YOURSELF</span>.
          <br />
          GROW WITH US.
        </>
      ),
      paragraph: (
        <>
          From Education to Business, We Support Your Aspirations –
          <br />
          Unlock Your Full Potential.
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
      }, 700); // Matches text transition duration
    }, 5000); // Time each slide is visible

    return () => resetAutoAdvanceTimeout();
  }, [currentSlideIndex, slides.length]);

  const currentSlide = slides[currentSlideIndex];

  return (
    // Removed min-h-screen. Height will now be driven by the image aspect ratio or min-height
    <div className="relative w-full overflow-hidden">
      {/* Background Image Container - Now uses Next.js Image component */}
      <div className="absolute inset-0 flex">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out`}
            style={{
              transform: `translateX(${100 * (index - currentSlideIndex)}%)`,
              zIndex:
                index === currentSlideIndex
                  ? 2
                  : index === (currentSlideIndex + 1) % slides.length
                  ? 1
                  : 0,
            }}
          >
            {/* Using Next.js Image component for better optimization and aspect ratio handling */}
            {/* object-cover ensures it fills the container while maintaining aspect ratio */}
            <Image
              src={
                typeof slide.backgroundImage === "string"
                  ? slide.backgroundImage
                  : slide.backgroundImage.src
              }
              alt={`Slide ${slide.id}`}
              fill // Makes the image fill its parent div
              style={{ objectFit: "cover" }} // Ensures image covers the area, cropping if necessary
              priority={index === 0} // Load the first image with high priority
              className="absolute inset-0" // Ensure it takes up space within its parent div
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}
      </div>

      {/* Content Layer (Main Headline, Paragraph, Button) and Vertical Slider */}
      {/* min-h-[500px] added to ensure content is visible even with short images */}
      <div className="relative z-30 flex min-h-[500px] items-center py-20"> {/* Added min-h and py-20 for content spacing */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center h-full">
          {/* Main Content Area */}
          <div className="max-w-4xl flex-grow md:pt-0"> {/* Removed pt-20 as content container has py-20 */}
            {/* Main Headline - Fade out/in effect */}
            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-opacity duration-700 ${
                transitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentSlide.headline}
            </h1>
            {/* Subheading - Fade out/in effect */}
            <p
              className={`text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl leading-relaxed transition-opacity duration-700 ${
                transitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {currentSlide.paragraph}
            </p>
            {/* CTA Button */}
            <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black font-semibold px-10 py-7 text-xl rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
              APPLY NOW
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Vertical Slider at the right */}
          {/* Height adjusted to be more contained within the content area */}
          <div className="flex flex-col items-center justify-center py-8 md:py-0 md:ml-8 mt-auto md:mt-0 h-[250px] md:h-[calc(100%-80px)]"> {/* Adjusted heights */}
            <div className="bg-white/20 rounded-full p-2 flex flex-col items-center justify-between h-full">
              {slides.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (index === currentSlideIndex) return;

                    resetAutoAdvanceTimeout();
                    setTransitioning(true);

                    setCurrentSlideIndex(index);

                    setTimeout(() => {
                      setTransitioning(false);
                    }, 700);
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
  );
}