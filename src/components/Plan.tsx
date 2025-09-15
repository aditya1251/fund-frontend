"use client";
import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Price() {
  const [activeTab, setActiveTab] = useState("Premium");
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const scrollPrevented = useRef(false); 

  const pricingPlans = [
    {
      id: "Standard",
      title: "Standard Plan",
      price: "₹ 3599/-",
      features: [
        "Loan Panel",
        "Insurance Panel",
        "Accounting Services",
        "Credit Card Panel",
        "CRM Panel",
        "Marketing Material"
      ]
    },
    {
      id: "Premium",
      title: "Premium Plan",
      price: "₹ 5499/-",
      features: [
        "Plan 1 Included",
        "Taxation (20% OFF)",
        "Govt Loan",
        "Account Opening",
        "Instant Loan"
      ]
    },
    {
      id: "Professional",
      title: "Professional Plan",
      price: "₹ 10999/-",
      features: [
        "Plan 1 Included",
        "Plan 2 Included",
        "Taxation (20%OFF)",
        "Marketing (50 Lead/Month)",
        "Website Designing",
      ]
    },
    {
      id: "BCP Portal",
      title: "BCP Portal",
      price: "₹ 89999/-",
      features: [
        "Own BCP portal to manage your DSA team",
        "Plan 1, 2, 3 included",
        "Dedicated RM",
        "Access to 120+ banks and NBFC"
      ]
    }
  ];

  const getTabButtonClasses = (tabName: string) => {
    return `px-4 py-2 rounded-full font-medium cursor-pointer transition-all duration-300 ease-in-out ${
      activeTab === tabName
        ? "bg-[#ffd439] text-black shadow-md"
        : "text-white hover:bg-gray-800"
    }`;
  };

  const getCardButtonClasses = (cardTabName: string) => {
    return `w-full rounded-xl font-semibold py-3 mt-6 border-2 transition-all duration-300 ease-in-out ${
      activeTab === cardTabName
        ? "bg-black text-white hover:bg-gray-800"
        : "bg-white text-black hover:bg-gray-100"
    } border-black`;
  };

  // Prevent scrolling on initial load
  useEffect(() => {
    if (!scrollPrevented.current) {
      const scrollY = window.scrollY;
      const originalScrollRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      
      setTimeout(() => {
        window.scrollTo(0, scrollY);
        window.history.scrollRestoration = originalScrollRestoration;
      }, 10);
      
      scrollPrevented.current = true;
    }
  }, []);

  const handleTabClick = (tabName: string): void => {
    setActiveTab(tabName);
  };

  const router = useRouter();

  useEffect(() => {
    if (cardContainerRef.current) {
      const activeCardElement = cardContainerRef.current.querySelector(
        `[data-plan="${activeTab}"]`
      ) as HTMLElement;

      if (activeCardElement) {
        // Calculate horizontal scroll position without affecting vertical position
        const container = cardContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const cardRect = activeCardElement.getBoundingClientRect();
        
        // Calculate scroll position relative to container
        const scrollLeft = cardRect.left - containerRect.left + container.scrollLeft;
        
        // Scroll horizontally only
        container.scrollTo({
          left: scrollLeft - (containerRect.width / 2) + (cardRect.width / 2),
          behavior: "smooth"
        });
      }
    }
  }, [activeTab]);

  return (
    <div id="plans" className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SMART PLANS FOR <span className="text-[#ffd439]">SMART</span> BUSINESSES
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Tailored, Cost-Effective Plans Built To Support Your
            Business At Every Stage Of Growth.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-16">
          <div className="bg-black rounded-full p-1 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {pricingPlans.map(plan => (
              <button
                key={plan.id}
                className={getTabButtonClasses(plan.id)}
                onClick={() => handleTabClick(plan.id)}
              >
                {plan.id}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={cardContainerRef}
          className="flex overflow-x-auto scroll-smooth pb-4 gap-8 mb-16 hide-scrollbar px-4 items-stretch"
        >
          {pricingPlans.map(plan => (
            <div
              key={plan.id}
              data-plan={plan.id}
              className={`flex flex-col w-[300px] min-w-[300px] md:w-[350px] md:min-w-[350px] p-6 flex-shrink-0 rounded-xl border-3 border-black bg-[#FFD439] transition-all duration-300 ease-in-out ${
                activeTab === plan.id
                  ? "shadow-[10px_10px_0_0_#000] z-10"
                  : "shadow-[6px_6px_0_0_#000]"
              }`}
            >
              {/* Card content */}
              <div className="flex flex-col h-full">
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">
                    {plan.title}
                  </h3>
                  <div className="text-3xl font-bold text-black mb-2">{plan.price}</div>
                </div>
                
                <button onClick={() => router.push("/contact")} className={getCardButtonClasses(plan.id)}>
                  Get Started
                </button>

                <div className="flex-grow mt-4">
                  <div className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-black text-left">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="text-center">
          <p className="text-gray-500 mb-2">More details and all features</p>
          <button className="text-gray-800 font-medium hover:text-[#ffd439] transition-colors">
            View pricing page
          </button>
        </div>
      </div>
    </div>
  );
}