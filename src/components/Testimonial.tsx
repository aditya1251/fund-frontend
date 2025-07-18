"use client";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    text: "I like Infinity Estate more and more each day because it makes my life a lot easier. We can't understand how we've been living without Infinity Estate.",
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

export default function Testimonials() {
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
            and government-backed funding with ease.
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto flex gap-4 md:gap-6 snap-x snap-mandatory pb-4 hide-scrollbar">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="snap-start flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
            >
              <Card className="bg-[#fff0c3] border-[#cbcccc] border-2 rounded-2xl flex flex-col h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#f7c430] text-[#f7c430]"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-black font-medium mb-4 flex-grow">
                    {t.text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#cbcccc]">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-black text-sm">
                        {t.author}
                      </h4>
                      <p className="text-xs text-[#505050]">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Hide scroll-bar helper (add once in global CSS or tailwind.config) */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}