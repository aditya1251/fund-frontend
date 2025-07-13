"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Price() {
  const [activeTab, setActiveTab] = useState("Premium");
  const cardContainerRef = useRef<HTMLDivElement>(null);
  // Fix: Move isInitialLoad ref to top-level
  const isInitialLoad = useRef(true);

  const handleTabClick = (tabName: string): void => {
    setActiveTab(tabName);
  };

  const getTabButtonClasses = (tabName: string) => {
    return `px-6 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ease-in-out ${
      activeTab === tabName
        ? "bg-[#ffd439] text-black"
        : "text-white hover:bg-gray-800"
    }`;
  };

  const getCardButtonClasses = (cardTabName: string) => {
    return `w-full rounded-xl font-semibold py-3 mb-8 border-2 transition-all duration-300 ease-in-out ${
      activeTab === cardTabName
        ? "bg-black text-white hover:bg-gray-800"
        : "bg-white text-black hover:bg-gray-100"
    } border-black`;
  };

  const checkIconClasses = "w-5 h-5 text-black";

  useEffect(() => {
    // Use the top-level isInitialLoad ref
    if (isInitialLoad.current) {
      // Skip scrolling on initial load
      isInitialLoad.current = false;
      return;
    }

    // Only scroll when activeTab changes after initial load
    if (cardContainerRef.current) {
      const activeCardElement = cardContainerRef.current.querySelector(
        `[data-plan="${activeTab}"]`
      ) as HTMLElement;

      if (activeCardElement) {
        activeCardElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            SMART PLANS FOR{" "}
            <span className="text-[#ffd439]">SMART</span> BUSINESSES
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Tailored, Cost-Effective Plans Built To Support Your Business
            At Every Stage Of Growth.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-16">
          <div className="bg-black rounded-full p-1 flex space-x-2">
            <button
              className={getTabButtonClasses("Standard")}
              onClick={() => handleTabClick("Standard")}
            >
              Standard
            </button>
            <button
              className={getTabButtonClasses("Premium")}
              onClick={() => handleTabClick("Premium")}
            >
              Premium
            </button>
            <button
              className={getTabButtonClasses("Professional")}
              onClick={() => handleTabClick("Professional")}
            >
              Professional
            </button>
            <button
              className={getTabButtonClasses("BCP Portal")}
              onClick={() => handleTabClick("BCP Portal")}
            >
              BCP Portal
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={cardContainerRef}
          className="flex overflow-x-auto scroll-smooth pb-4 gap-8 mb-16 hide-scrollbar px-4 items-center"
        >
          {/* Standard Plan */}
          <Card
            data-plan="Standard"
            className={`flex flex-col items-start gap-6 w-[401px] h-[624px] p-6 flex-shrink-0 rounded-[16px] border-3 border-black bg-[#FFD439] transition-all duration-300 ease-in-out ${
              activeTab === "Standard"
                ? "shadow-[10px_10px_0_0_#000] z-10"
                : "shadow-[6px_6px_0_0_#000]"
            }`}
          >
            <CardContent className="p-0 w-full">
              <h3 className="text-xl font-semibold text-black mb-6">
                Standard Plan
              </h3>
              <div className="text-3xl font-bold text-black mb-8">₹ 3599/-</div>

              <Button className={getCardButtonClasses("Standard")}>
                Get Started
              </Button>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Loan Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Insurance Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Accounting Services</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Credit Card Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">CRM Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Marketing Material</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card
            data-plan="Premium"
            className={`flex flex-col items-start gap-6 w-[401px] h-[624px] p-6 flex-shrink-0 rounded-[16px] border-3 border-black bg-[#FFD439] transition-all duration-300 ease-in-out ${
              activeTab === "Premium"
                ? "shadow-[10px_10px_0_0_#000] z-10"
                : "shadow-[6px_6px_0_0_#000]"
            }`}
          >
            <CardContent className="p-0 w-full">
              <h3 className="text-xl font-semibold text-black mb-6">
                Premium Plan
              </h3>
              <div className="text-3xl font-bold text-black mb-8">₹ 5499/-</div>

              <Button className={getCardButtonClasses("Premium")}>
                Get Started
              </Button>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Plan 1 Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Taxation (20% OFF)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Govt Loan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Account Opening</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Instant Loan</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Plan */}
          <Card
            data-plan="Professional"
            className={`flex flex-col items-start gap-6 w-[401px] h-[624px] p-6 flex-shrink-0 rounded-[16px] border-3 border-black bg-[#FFD439] transition-all duration-300 ease-in-out ${
              activeTab === "Professional"
                ? "shadow-[10px_10px_0_0_#000] z-10"
                : "shadow-[6px_6px_0_0_#000]"
            }`}
          >
            <CardContent className="p-0 w-full">
              <h3 className="text-xl font-semibold text-black mb-6">
                Professional Plan
              </h3>
              <div className="text-3xl font-bold text-black mb-8">
                ₹ 10999/-
              </div>

              <Button className={getCardButtonClasses("Professional")}>
                Get Started
              </Button>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Plan 1 Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Plan 2 Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Taxation (20%OFF)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Marketing (50 Lead/Month)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Website Designing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Home / Property Loan</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BCP Portal Card */}
          <Card
            data-plan="BCP Portal"
            className={`flex flex-col items-start gap-6 w-[401px] h-[624px] p-6 flex-shrink-0 rounded-[16px] border-3 border-black bg-[#FFD439] transition-all duration-300 ease-in-out ${
              activeTab === "BCP Portal"
                ? "shadow-[10px_10px_0_0_#000] z-10"
                : "shadow-[6px_6px_0_0_#000]"
            }`}
          >
            <CardContent className="p-0 w-full">
              <h3 className="text-xl font-semibold text-black mb-6">
                BCP Portal
              </h3>
              <div className="text-3xl font-bold text-black mb-8">₹ 89999/-</div>

              <Button className={getCardButtonClasses("BCP Portal")}>
                Get Started
              </Button>

              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">
                    Own BCP portal to manage your DSA team
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Plan 1, 2, 3 included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">Dedicated RM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className={checkIconClasses} />
                  <span className="text-black">
                    Access to 120+ banks and NBFC
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Text */}
        <div className="text-center">
          <p className="text-gray-500 mb-2">More details and all features</p>
          <p className="text-gray-500">View pricing page</p>
        </div>
      </div>
    </div>
  );
}