import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            What People Say <span className="text-[#f5d949]">About Us</span>
          </h2>
          <p className="text-[#505050] text-lg max-w-3xl mx-auto leading-relaxed">
            Fund Raizer Helps Individuals And Businesses Access Trusted Loans
            <br />
            And Government-Backed Funding With Ease.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-[#fff0c3] border-[#cbcccc] border-2 rounded-2xl"
            >
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#f7c430] text-[#f7c430]"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-black text-base leading-relaxed mb-8 font-medium">
                  {testimonial.text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#cbcccc]">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black text-sm">
                      {testimonial.author}
                    </h4>
                    <p className="text-[#505050] text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === 3 ? "bg-[#f7c430]" : "bg-[#cbcccc]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
