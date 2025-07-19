"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

const testimonials = [
  {
    id: 1,
    text: "Dude, your stuff is the bomb! House rent is the real deal!",
    author: "Mrs. Gautami Bisht",
    role: "Senior Paradigm Strategist",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    text: "I like Infinity Estate more and more each day…",
    author: "Mrs. Lavanya Singh",
    role: "Legacy Usability Manager",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    text: "You've saved our business! It's really wonderful.",
    author: "Siddeshwar Singh",
    role: "District Assurance Officer",
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    text: "You've saved our business! It's really wonderful.",
    author: "Siddeshwar Singh",
    role: "District Assurance Officer",
    avatar: "/placeholder.svg",
  },
];

const DESKTOP_VISIBLE = 3;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate total groups for desktop
  const totalGroups = Math.ceil(testimonials.length / DESKTOP_VISIBLE);
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Desktop navigation
  const nextDesktop = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalGroups);
  }, [totalGroups]);

  const prevDesktop = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalGroups) % totalGroups);
  }, [totalGroups]);

  // Mobile navigation
  const nextMobile = useCallback(() => {
    setMobileIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevMobile = useCallback(() => {
    setMobileIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Autoplay for desktop and mobile
  useEffect(() => {
    const desktopTimer = setInterval(nextDesktop, 5000);
    const mobileTimer = setInterval(nextMobile, 5000);
    
    return () => {
      clearInterval(desktopTimer);
      clearInterval(mobileTimer);
    };
  }, [nextDesktop, nextMobile]);

  // Apply desktop transform
  useEffect(() => {
    if (trackRef.current) {
      const offset = -(activeIndex * 100) / DESKTOP_VISIBLE;
      trackRef.current.style.transform = `translateX(${offset}%)`;
    }
  }, [activeIndex]);

  // Card component
  const Card = ({ text, author, role, avatar }: Testimonial) => (
    <div className="flex flex-col gap-4 justify-between border-black border-1 rounded-2xl p-6 bg-white h-full">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[#f7c430] text-[#f7c430]" />
        ))}
      </div>
      <p className="text-black text-sm leading-snug flex-grow">{text}</p>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#cbcccc]">
          <img src={avatar} alt={author} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-semibold text-black text-sm">{author}</div>
          <div className="text-[#505050] text-xs">{role}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="bg-white shadow-md rounded-lg mb-6 py-6 px-4 md:px-8 overflow-hidden"
    >
      <h4 className="text-center font-semibold text-base md:text-lg mb-6 md:mb-8 text-black">
        What Our Clients Are Saying
      </h4>

      {/* Desktop Carousel */}
      <div className="hidden md:block relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-in-out"
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <div 
              key={`desktop-${i}`} 
              className="w-1/3 flex-shrink-0 px-2"
            >
              <Card {...testimonial} />
            </div>
          ))}
        </div>

        <button
          aria-label="Previous testimonial"
          onClick={prevDesktop}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          aria-label="Next testimonial"
          onClick={nextDesktop}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full z-10"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {Array.from({ length: totalGroups }).map((_, i) => (
            <button
              key={`desktop-dot-${i}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "bg-black w-6" : "bg-[#cbcccc] w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative w-full">
        {testimonials.map((testimonial, idx) => (
          <div
            key={`mobile-${testimonial.id}`}
            className={`transition-opacity duration-500 ease-in-out ${
              idx === mobileIndex ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
          >
            <Card {...testimonial} />
          </div>
        ))}

        <button
          aria-label="Previous testimonial"
          onClick={prevMobile}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next testimonial"
          onClick={nextMobile}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={`mobile-dot-${i}`}
              onClick={() => setMobileIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === mobileIndex ? "bg-black w-6" : "bg-[#cbcccc] w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}