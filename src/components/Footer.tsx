"use client";

import { Button } from "./ui/button";
import { Star, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo512.png"; // Adjust the path as necessary
import hdfc from "../../public/assets/hdfc.png"; // Adjust the path as necessary
import bajaj from "../../public/assets/bajaj.png"; // Adjust the path as necessary
import axis from "../../public/assets/axis.png"; // Adjust the path as necessary
import lic from "../../public/assets/lic.png"; // Adjust the path as necessary
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="w-full">
      {/* Main Footer Section */}
      <div className="bg-[#fff0c3] px-8 py-10">
        <div className="max-w-screen mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Section - Company Info */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-4">
                <Image src={logo} alt="Logo" width={40} height={40} />
                <span className="text-black text-xl font-semibold">
                  Navi Mudra
                </span>
              </div>

              <div className="text-[#141212] text-sm leading-relaxed mb-8">
                <p>Navi Mudra Pvt. Ltd.</p>
                <p>Hastsal, Uttam Nagar,</p>
                <p> New Delhi - 110059</p>
                <p>India</p>
              </div>

              <div className="mb-4">
                <h3 className="text-black text-sm mb-4">
                  Verified Lending Partners
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Image
                      src={hdfc}
                      alt="HDFC Bank"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={bajaj}
                      alt="Bajaj Finserv"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <Image
                      src={lic}
                      alt="LIC"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src={axis}
                      alt="Axis Bank"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Links Column */}
            <div className="lg:col-span-2 ">
              <h4 className="text-black text-lg mb-4">Links</h4>
              <ul className="space-y-3 text-[#141212] text-sm">
                <li>
                  <a href="#" className="hover:text-black">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-black">
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
                  <a href="/contact" className="hover:text-black">
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
              <h4 className="text-black text-lg mb-4">
                Services
              </h4>
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
              <h4 className="text-black text-lg mb-4">Learn more</h4>
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
                <h2 className="text-black text-xl leading-tight">
                  YOUR JOURNEY TO GIVING STARTS HERE
                </h2>
                <Star className="w-6 h-6 text-[#f7c430] fill-[#f7c430] mt-1 flex-shrink-0" />
              </div>

              <p className="text-[#141212] text-sm mb-2 leading-relaxed">
                Transparent. Trusted. Impactful. Let's Build A Better Future.
              </p>

              <Link href={"/contact"}>
                <Button
                onClick={() => router.push("/contact")}
                className="bg-[#f7c430] text-black font-medium px-6 py-2 rounded-md duration-200 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer">
                  Get Started
                </Button>
              </Link>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-black text-sm font-medium">
                  Follow us on
                </span>
                <div className="flex items-center gap-2">
                  <Instagram onClick={() => window.open("https://www.instagram.com/navimudra/", "_blank")} className="w-5 h-5 text-black hover:text-[#141212] cursor-pointer" />
                  <Twitter onClick={() => window.open("https://x.com/Navimudra", "_blank")} className="w-5 h-5 text-black hover:text-[#141212] cursor-pointer" />
                  <Facebook onClick={() => window.open("https://www.facebook.com/profile.php?id=61580471006144", "_blank")} className="w-5 h-5 text-black hover:text-[#141212] cursor-pointer" />
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
            <a href="/privacy-policy" className="text-white text-sm hover:text-gray-300">
              Privacy & Policy
            </a>
            <a href="/terms-and-conditions" className="text-white text-sm hover:text-gray-300">
              Term & Condition
            </a>
          </div>
          <div className="text-white text-sm">Copyright @2025</div>
        </div>
      </div>
    </div>
  );
}
