"use client";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Dude, your stuff is the bomb! House rent is the real deal! I STRONGLY recommend house rent to EVERYONE interested in running a successful online business!",
      author: "Mrs. Gautami Bisht",
      role: "Senior Paradigm Strategist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      text: "I like Infinity Estate more and more each day because it makes my life a lot easier. We can't understand how we've been living without Infinity Estate. Infinity Estate has got everything I need. The service was excellent.",
      author: "Mrs. Lavanya Singh",
      role: "Legacy Usability Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      text: "You've saved our business! Infinity Estate has got everything I need. We were treated like royalty. It's really wonderful.",
      author: "Siddeshwar Singh",
      role: "District Assurance Officer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    // Add more testimonials here to see the slider with more than 3 items work
    {
      id: 4,
      text: "Fund Raizer is incredibly user-friendly and has streamlined our loan application process. Highly recommended!",
      author: "Rahul Sharma",
      role: "Financial Consultant",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      text: "The support team at Fund Raizer is fantastic! They helped us navigate complex government funding with ease.",
      author: "Priya Verma",
      role: "Startup Founder",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      text: "A truly transformative service. Fund Raizer connected us with the perfect loan for our expansion. Thank you!",
      author: "Amit Patel",
      role: "Small Business Owner",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const itemsPerPage = 3; // Number of testimonials to show per window/slide
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage); // Calculate total "slides" based on groups

  const [currentSlideGroup, setCurrentSlideGroup] = useState(0);

  const nextSlide = () => {
    setCurrentSlideGroup((prevGroup) => (prevGroup + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlideGroup((prevGroup) => (prevGroup - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What People Say <span className="text-[#f5d949]">About Us</span>
          </h2>
          <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
            Fund Raizer helps individuals and businesses access trusted loans
            <br className="sm:hidden" />
            and government-backed funding with ease.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative overflow-hidden mb-8">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            // Adjust transform: now moves by 1/3 of the total width for each group
            style={{ transform: `translateX(-${currentSlideGroup * 100 / itemsPerPage}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                // Each testimonial now takes 1/3 of the width, allowing 3 per view
                className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 px-2"
              >
                <div className="relative pt-[100%]">
                  <Card
                    className="absolute inset-0 bg-[#fff0c3] border-[#cbcccc] border-2 rounded-2xl flex flex-col justify-between"
                  >
                    <CardContent className="p-8 flex flex-col h-full">
                      {/* Stars */}
                      <div className="flex gap-1 mb-6 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-[#f7c430] text-[#f7c430]"
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-black text-base leading-relaxed mb-8 font-medium flex-grow overflow-hidden text-ellipsis">
                        {testimonial.text}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#cbcccc] flex items-center justify-center">
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={`Avatar of ${testimonial.author}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-black text-sm">
                            {testimonial.author}
                          </h4>
                          <p className="text-[#505050] text-sm">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 opacity-75 hover:opacity-100 hidden md:block"
            aria-label="Previous testimonials group"
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 opacity-75 hover:opacity-100 hidden md:block"
            aria-label="Next testimonials group"
          >
            &#10095;
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideGroup(i)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                i === currentSlideGroup ? "bg-[#f7c430]" : "bg-[#cbcccc]"
              }`}
              aria-label={`Go to testimonial group ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}