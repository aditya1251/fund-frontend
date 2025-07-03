import { Button } from "@/components/ui/button";
import mobileMockup from "../../public/assets/Group.png";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Mobile() {
  return (
    <div className="min-h-screen bg-[#fff0c3] overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                  FundsRaize Simplifies Finance With Smart Solutions And
                  Growth-Driven Partnerships.
                </h1>
                <div className="flex-shrink-0 mt-2">
                  <Sparkles className="w-12 h-12 text-[#f7c430] fill-[#f7c430]" />
                </div>
              </div>

              <p className="text-lg text-[#141212] opacity-70 max-w-md">
                Empowering Businesses With Seamless Funding Solutions And
                Strategic Growth Support.
              </p>
            </div>

            <div className="flex gap-16">
              <div>
                <div className="text-3xl font-bold text-black">700+</div>
                <div className="text-[#141212] opacity-70">
                  Financial Advisors
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">125+</div>
                <div className="text-[#141212] opacity-70">
                  Lending Partners
                </div>
              </div>
            </div>
            <Link href="/contact">
              <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black font-semibold px-10 py-6 text-xl rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src={mobileMockup}
                alt="Mobile Mockup"
                width={320}
                height={640}
                className="w-auto h-[640px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
