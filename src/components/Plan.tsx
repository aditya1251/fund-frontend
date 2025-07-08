import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Price() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            SMART PLANS FOR <span className="text-[#ffd439]">SMART</span>{" "}
            BUSINESSES
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Tailored, Cost-Effective Plans Built To Support Your
            Business At Every Stage Of Growth.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-16">
          <div className="bg-black rounded-full p-1 flex">
            <button className="px-6 py-2 rounded-full text-white font-medium">
              Standard
            </button>
            <button className="px-6 py-2 rounded-full bg-[#ffd439] text-black font-medium">
              Premium
            </button>
            <button className="px-6 py-2 rounded-full text-white font-medium">
              Professional
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Standard Plan */}
          <Card className="bg-[#ffd439] border-4 border-black rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-black mb-6">
                Standard Plan
              </h3>
              <div className="text-3xl font-bold text-black mb-8">₹ 3599/-</div>

              <Button className="w-full bg-white text-black border-2 border-black rounded-xl font-semibold py-3 mb-8 hover:bg-gray-100">
                Get Started
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Loan Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Insurance Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Accounting Services</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Credit Card Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">CRM Panel</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Marketing Material</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="bg-[#ffd439] border-4 border-black rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-black mb-6">
                Premium Plan
              </h3>
              <div className="text-3xl font-bold text-black mb-8">₹ 5499/-</div>

              <Button className="w-full bg-white text-black rounded-xl font-semibold py-3 mb-8 hover:bg-gray-100 border-2 border-black">
                Get Started
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Plan 1 Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Taxation (20% OFF)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Govt Loan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Account Opening</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Instant Loan</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Plan */}
          <Card className="bg-[#ffd439] border-4 border-black rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-black mb-6">
                Professional Plan
              </h3>
              <div className="text-3xl font-bold text-black mb-8">
                ₹ 10999/-
              </div>

              <Button className="w-full bg-white text-black border-2 border-black rounded-xl font-semibold py-3 mb-8 hover:bg-gray-100">
                Get Started
              </Button>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Plan 1 Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Plan 2 Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Taxation (20%OFF)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Marketing (50 Lead/Month)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Website Designing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-black" />
                  <span className="text-black">Home / Property Loan</span>
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
