import { Button } from "@/components/ui/button";
import Image from "next/image";
import govtScheme from "../../public/assets/ui1.png";
import Link from "next/link";
export default function GovernmentSchemes() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
            GOVERNMENT SCHEMES WE OFFER
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Connecting Individuals And Businesses To Verified And
            <br />
            Impactful Government Support Programs.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <div className="bg-[#f7c430] rounded-2xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              730+
            </div>
            <div className="text-sm md:text-base font-medium text-black">
              Mudra Loans
            </div>
          </div>
          <div className="bg-[#f7c430] rounded-2xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              60+
            </div>
            <div className="text-sm md:text-base font-medium text-black">
              CGTMSE Loan
            </div>
          </div>
          <div className="bg-[#f7c430] rounded-2xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              230+
            </div>
            <div className="text-sm md:text-base font-medium text-black">
              PMGP Loans
            </div>
          </div>
          <div className="bg-[#f7c430] rounded-2xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-black mb-2">
              340+
            </div>
            <div className="text-sm md:text-base font-medium text-black">
              MSME Loans
            </div>
          </div>
        </div>

        {/* Central Feature Section */}
        <div className="relative flex justify-center items-center mb-16">
          <div className="relative w-full max-w-4xl">
            {/* Central Circle with Family Illustration */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-80 h-80 bg-[#f7c430] rounded-full flex items-center justify-center">
                <Image
                  src={govtScheme}
                  alt="Family with government scheme benefits"
                  className="w-70 h-70 object-contain rounded-full"
                />
              </div>
            </div>

            {/* Surrounding Feature Circles */}
            <div className="relative w-full h-96 md:h-[500px]">
              {/* Top Left */}
              <div className="absolute top-0 left-8 md:left-16">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#f7c430] rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-black leading-tight">
                      BOOST YOUR
                      <br />
                      BUSINESS
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Right */}
              <div className="absolute top-0 right-8 md:right-16">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#f7c430] rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-black leading-tight">
                      MINIMAL
                      <br />
                      DOCUMENTS
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Left */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
                <div className="w-28 h-28 md:w-32 md:h-32 bg-[#f7c430] rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-black">
                      LOWEST ROI
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Right */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                <div className="inline-flex h-[165px] w-[165px] px-[36px] items-center justify-center flex-shrink-0 rounded-full bg-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-black leading-tight">
                      SAFE & SECURE
                    </div>
                  </div>
                </div>
</div>

              {/* Bottom Left */}
              <div className="absolute bottom-0 left-8 md:left-16">
                <div className="inline-flex h-[200px] w-[200px] px-[36px] items-center justify-center flex-shrink-0 rounded-full bg-white shadow-2xl">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-black">
                      SAFE & SECURE
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Right */}
              <div className="absolute bottom-0 right-8 md:right-16">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-[#f7c430] rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs md:text-sm text-black">
                      QUICK APPLY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <Link href="/contact">
            <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black px-10 py-6 text-xl rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
