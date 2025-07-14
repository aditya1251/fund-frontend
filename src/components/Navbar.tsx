"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logo from "../../public/assets/logo.png";
import { useSession, signOut } from "next-auth/react";

export default function NavigationHeader() {
  const { data: session, status } = useSession();
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 flex items-center justify-center">
                {/* Logo Icon */}
                <Image
                  src={logo}
                  alt="Logo"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-black hover:text-[#f7c430] transition-colors duration-200 font-medium"
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
                  <span>Loan</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/personal-loan" className="w-full text-black">
                    Personal Loan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/business-loan" className="w-full text-black">
                    Business Loan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/home-loan" className="w-full text-black">
                    Home Loan
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
                  <span>Govt. Loan</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/mudra-loan" className="w-full text-black">
                    Mudra Loan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/startup-loan" className="w-full text-black">
                    Startup Loan
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/agriculture-loan" className="w-full text-black">
                    Agriculture Loan
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
                  <span>Insurance</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/life-insurance" className="w-full text-black">
                    Life Insurance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/health-insurance" className="w-full text-black">
                    Health Insurance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/vehicle-insurance" className="w-full text-black">
                    Vehicle Insurance
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
                  <span>Taxation</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/income-tax" className="w-full text-black">
                    Income Tax
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/gst" className="w-full text-black">
                    GST Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/tax-planning" className="w-full text-black">
                    Tax Planning
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
                  <span>Marketing</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem>
                  <Link href="/digital-marketing" className="w-full text-black">
                    Digital Marketing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/social-media" className="w-full text-black">
                    Social Media
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/content-marketing" className="w-full text-black">
                    Content Marketing
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/about"
              className="text-black hover:text-[#f7c430] transition-colors duration-200 font-medium"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-black hover:text-[#f7c430] transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
          </nav>

          {/* Admin/Superadmin Link & Sign In/Logout Button */}
          <div className="flex items-center space-x-2">
            {status === "authenticated" && session?.user?.role === "CRM" && (
              <Link href="/crm" passHref>
                <Button className="bg-[#f7c430] text-black font-medium px-6 py-2 rounded-md duration-200 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
                  Admin Panel
                </Button>
              </Link>
            )}
            {status === "authenticated" &&
              session?.user?.role === "SUPERADMIN" && (
                <Link href="/superadmin" passHref>
                  <Button className="bg-[#f7c430] text-black font-medium px-6 py-2 rounded-md duration-200 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
                    Super Admin
                  </Button>
                </Link>
              )}
            {status === "authenticated" ? (
              <Button
                className="bg-[#f7c430] text-black font-medium px-6 py-2 rounded-md duration-200 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            ) : (
              <Link href="/login" passHref>
                <Button className="bg-[#f7c430] text-black font-medium px-6 py-2 rounded-md duration-200 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
