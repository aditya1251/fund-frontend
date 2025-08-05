import React from "react";
import { 
  Target, 
  CheckCircle, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonial";
import TrustedPartners from "@/components/Partner";
import Tieup from "@/components/TieUp";
import Fund from "@/components/Fundraize";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-yellow-100 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            About <span className="text-[#FFD439]">FundsRaize</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
            Empowering dreams through innovative financial solutions. We're not just a lending platform - 
            we're your partners in building a brighter financial future.
          </p>
          <div className="flex flex-col px-8 sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="bg-[#FFD439] hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all flex items-center justify-center gap-2">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="#our-story" className="border-2 border-gray-300 hover:border-[#FFD439] text-gray-700 hover:text-black font-bold py-4 px-8 rounded-xl transition-all">
              Learn Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 px-4 bg-white" id="our-story">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            {/* Mission */}
            <div className="bg-yellow-50 rounded-3xl p-10 border-4 border-yellow-500 hover:border-[#FFD439] transition-all duration-300">
              <div className="bg-[#FFD439] p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                To democratize access to financial services by providing innovative, transparent, 
                and customer-centric lending solutions that empower individuals and businesses 
                to achieve their dreams.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-neutral-800">Quick Approvals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-neutral-800">Transparent Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-neutral-800">Expert Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-neutral-800">Best Rates</span>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-[#FFD439] rounded-3xl p-10 border-4 border-black shadow-[8px_8px_0_0_#000]">
              <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-3xl font-bold text-black mb-6">Our Vision</h2>
              <p className="text-gray-800 text-lg leading-relaxed mb-6">
                To become India's most trusted financial ecosystem where every individual and 
                business can access the funding they need to grow, innovate, and contribute 
                to the nation's economic development.
              </p>
              <div className="bg-white/20 rounded-xl p-4">
                <h3 className="font-bold text-black mb-2">2030 Goals:</h3>
                <ul className="space-y-1 text-sm text-gray-800">
                  <li>• Serve 1 Million+ customers</li>
                  <li>• Facilitate ₹10,000+ Crores in funding</li>
                  <li>• Expand to 500+ cities</li>
                  <li>• Partner with 200+ financial institutions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Component - Stats */}
      <Journey />

      {/* What Makes Us Unique */}
      <Fund />

      {/* Partners */}
      <TrustedPartners />

      {/* Testimonials */}
      <Testimonials />

      {/* NBFC Partnerships */}
      <Tieup />

      {/* Call to Action */}
      <section className="py-20 px-4 bg-[#ffb700]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Start Your <span className="text-white">Financial Journey?</span>
          </h2>
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their financial future with FundsRaize.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/login" className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-xl shadow-[4px_4px_0_0_#fff] hover:shadow-[2px_2px_0_0_#fff] transition-all">
              Apply for Funding
            </Link>
            <Link href="/contact" className="bg-white hover:bg-gray-100 text-black font-bold py-4 px-8 rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all">
              Contact Our Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
