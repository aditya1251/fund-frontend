import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fundsraize.png-R2ZQkoOximMpHpQT7rTSoWTQnOoGxi.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              TURN YOUR <span className="text-[#f7c430]">DREAM</span>
              <br />
              <span className="text-[#f7c430]">HOME</span> INTO REALITY.
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl leading-relaxed">
              Affordable EMIs, Flexible Tenures, And Easy Approval –<br />
              Your Home Is Just A Step Away.
            </p>

            {/* CTA Button */}
            <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black font-semibold px-10 py-7 text-xl rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
              APPLY NOW
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
