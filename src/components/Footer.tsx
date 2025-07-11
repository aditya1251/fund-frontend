import { Button } from "./ui/button";
import { Star, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import logo from "../../public/assets/logo.png"; // Adjust the path as necessary

export default function Footer() {
  return (
    <div className="w-full">
      {/* Main Footer Section */}
      <div className="bg-[#fff0c3] px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Section - Company Info */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-6">
                <Image src={logo} alt="Logo" width={40} height={40} />
                <span className="text-black text-xl font-semibold">
                  Fund Raizer
                </span>
              </div>

              <div className="text-[#141212] text-sm leading-relaxed mb-8">
                <p>Fund Raizer Pvt. Ltd.</p>
                <p>A-27, 2nd Floor, Sector 63,</p>
                <p>Noida, Uttar Pradesh – 201301</p>
                <p>India</p>
              </div>

              <div className="mb-4">
                <h3 className="text-black text-lg font-semibold mb-4">
                  Verified Lending Partners
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">HDFC</span>
                    </div>
                    <span className="text-xs text-black">BANK</span>
                  </div>
                  <div className="w-12 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">BAJAJ</span>
                  </div>
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">AU</span>
                  </div>
                  <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Column */}
            <div className="lg:col-span-2">
              <h3 className="text-black text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-3 text-[#141212] text-sm">
                <li>
                  <a href="#" className="hover:text-black">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    EMI Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-2">
              <h3 className="text-black text-lg font-semibold mb-4">
                Services
              </h3>
              <ul className="space-y-3 text-[#141212] text-sm">
                <li>
                  <a href="#" className="hover:text-black">
                    Taxation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Loan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Govt. Loan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Quick Loans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Insurance
                  </a>
                </li>
              </ul>
            </div>

            {/* Lorem Column */}
            <div className="lg:col-span-2">
              <h3 className="text-black text-lg font-semibold mb-4">Lorem</h3>
              <ul className="space-y-3 text-[#141212] text-sm">
                <li>
                  <a href="#" className="hover:text-black">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    FAQs And Tips
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Section - CTA */}
            <div className="lg:col-span-3">
              <div className="flex items-start gap-2 mb-4">
                <h2 className="text-black text-2xl font-bold leading-tight">
                  YOUR JOURNEY TO GIVING STARTS HERE
                </h2>
                <Star className="w-6 h-6 text-[#f7c430] fill-[#f7c430] mt-1 flex-shrink-0" />
              </div>

              <p className="text-[#141212] text-sm mb-6 leading-relaxed">
                Transparent. Trusted. Impactful. Let's Build A Better Future.
              </p>

              <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black font-semibold px-8 py-3 rounded-lg mb-6">
                Get Started
              </Button>

              <div className="flex items-center gap-3">
                <span className="text-black text-sm font-medium">
                  Follow us on
                </span>
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-black hover:text-[#141212] cursor-pointer" />
                  <Twitter className="w-5 h-5 text-black hover:text-[#141212] cursor-pointer" />
                  <Facebook className="w-5 h-5 text-black hover:text-[#141212] cursor-pointer" />
                  <Youtube className="w-5 h-5 text-black hover:text-[#141212] cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-black px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <a href="#" className="text-white text-sm hover:text-gray-300">
              Privacy & Policy
            </a>
            <a href="#" className="text-white text-sm hover:text-gray-300">
              Term & Condition
            </a>
          </div>
          <div className="text-white text-sm">Copyright @2024</div>
        </div>
      </div>
    </div>
  );
}
