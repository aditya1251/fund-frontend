"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logo from "../../public/logo1000.png";
import { useSession, signOut } from "next-auth/react";

/* -------------  Mobile accordion ------------- */
const MobileAccordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 text-black font-medium"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-3 space-y-2 pl-4">{children}</div>}
    </div>
  );
};

export default function NavigationHeader() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = () => setMobileOpen(!mobileOpen);

  /* ---- Desktop & Tablet nav ---- */
  const desktopNav = (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 flex-wrap">
      <Link href="/" className="text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
        Home
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium cursor-pointer">
            <span>Loan</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>
            <Link href="/personal-loan" className="w-full text-black">Personal Loan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/business-loan" className="w-full text-black">Business Loan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/home-loan" className="w-full text-black">Home Loan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/loan-against-property" className="w-full text-black">Loan Against Property</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium cursor-pointer">
            <span>Govt. Loan</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>
            <Link href="/mudra-loan" className="w-full text-black">Mudra Loan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/startup-loan" className="w-full text-black">Startup Loan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/msme-loan" className="w-full text-black">MSME Loan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/pmegp-loan" className="w-full text-black">PMEGP Loan</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium cursor-pointer">
            <span>Insurance</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem>
            <Link href="/life-insurance" className="w-full text-black">Life Insurance</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/health-insurance" className="w-full text-black">Health Insurance</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/home-insurance" className="w-full text-black">Home Insurance</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium cursor-pointer">
            <span>Taxation</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem><Link href="/income-tax" className="w-full text-black">ITR Services</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/tds" className="w-full text-black">TDS Return filling</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/gst" className="w-full text-black">GST Services</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/cma" className="w-full text-black">CMA/Project report</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/trademark" className="w-full text-black">Trademark Registration</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/company-registration" className="w-full text-black">Company Registration</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/iec" className="w-full text-black">IEC Registration</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/iso" className="w-full text-black">ISO Registration</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/fssai" className="w-full text-black">FSSAI Registration</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/udyog-aadhar" className="w-full text-black">Udyog Aadhar Registration</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/pf-esic" className="w-full text-black">PF/ESIC</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/roc-filling" className="w-full text-black">ROC Filling</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/trade-license" className="w-full text-black">Trade License</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/company-audit" className="w-full text-black">Company Audit</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/balance-sheet" className="w-full text-black">Balance Sheet/Finance</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-1 text-black hover:text-[#f7c430] transition-colors duration-200 font-medium cursor-pointer">
            <span>Marketing</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem><Link href="/digital-marketing" className="w-full text-black">Digital Marketing</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/social-media" className="w-full text-black">Google &amp; Meta Ads</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/content-marketing" className="w-full text-black">WhatsApp Campaigns Ads</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/about" className="text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
        About
      </Link>
      <Link href="/contact" className="text-black hover:text-[#f7c430] transition-colors duration-200 font-medium">
        Contact Us
      </Link>
    </nav>
  );

  /* ---- Mobile drawer (unchanged) ---- */
  const mobileDrawer = (
    <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 border-b">
        <Link href="/" onClick={toggle}>
          <Image src={logo} alt="Logo" width={150} height={48} className="rounded-full" />
        </Link>
        <button onClick={toggle}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <Link href="/" onClick={toggle} className="block py-3 text-black font-medium">Home</Link>

        <MobileAccordion title="Loan">
          <div><Link href="/personal-loan" onClick={toggle} className="text-black">Personal Loan</Link></div>
          <div><Link href="/business-loan" onClick={toggle} className="text-black">Business Loan</Link></div>
          <div><Link href="/home-loan" onClick={toggle} className="text-black">Home Loan</Link></div>
          <div><Link href="/loan-against-property" onClick={toggle} className="text-black">Loan Against Property</Link></div>
        </MobileAccordion>

        <MobileAccordion title="Govt. Loan">
          <div><Link href="/mudra-loan" onClick={toggle} className="text-black">Mudra Loan</Link></div>
          <div><Link href="/startup-loan" onClick={toggle} className="text-black">Startup Loan</Link></div>
          <div><Link href="/msme-loan" onClick={toggle} className="text-black">MSME Loan</Link></div>
          <div><Link href="/pmegp-loan" onClick={toggle} className="text-black">PMEGP Loan</Link></div>
        </MobileAccordion>

        <MobileAccordion title="Insurance">
          <div><Link href="/life-insurance" onClick={toggle} className="text-black">Life Insurance</Link></div>
          <div><Link href="/health-insurance" onClick={toggle} className="text-black">Health Insurance</Link></div>
          <div><Link href="/home-insurance" onClick={toggle} className="text-black">Home Insurance</Link></div>
        </MobileAccordion>

        <MobileAccordion title="Taxation">
          <div><Link href="/income-tax" onClick={toggle} className="text-black">ITR Services</Link></div>
          <div><Link href="/tds" onClick={toggle} className="text-black">TDS Return filling</Link></div>
          <div><Link href="/gst" onClick={toggle} className="text-black">GST Services</Link></div>
          <div><Link href="/cma-project-report" onClick={toggle} className="text-black">CMA/Project report</Link></div>
          <div><Link href="/trademark-registration" onClick={toggle} className="text-black">Trademark Registration</Link></div>
          <div><Link href="/company-registration" onClick={toggle} className="text-black">Company Registration</Link></div>
          <div><Link href="/iec-registration" onClick={toggle} className="text-black">IEC Registration</Link></div>
          <div><Link href="/iso-registration" onClick={toggle} className="text-black">ISO Registration</Link></div>
          <div><Link href="/fssai-registration" onClick={toggle} className="text-black">FSSAI Registration</Link></div>
          <div><Link href="/udyog-aadhar-registration" onClick={toggle} className="text-black">Udyog Aadhar Registration</Link></div>
          <div><Link href="/pf-esic" onClick={toggle} className="text-black">PF/ESIC</Link></div>
          <div><Link href="/roc-filling" onClick={toggle} className="text-black">ROC Filling</Link></div>
          <div><Link href="/trade-license" onClick={toggle} className="text-black">Trade License</Link></div>
          <div><Link href="/company-audit" onClick={toggle} className="text-black">Company Audit</Link></div>
          <div><Link href="/balance-sheet" onClick={toggle} className="text-black">Balance Sheet/Finance</Link></div>
        </MobileAccordion>

        <MobileAccordion title="Marketing">
          <div><Link href="/digital-marketing" onClick={toggle} className="text-black">Digital Marketing</Link></div>
          <div><Link href="/social-media" onClick={toggle} className="text-black">Google &amp; Meta Ads</Link></div>
          <div><Link href="/content-marketing" onClick={toggle} className="text-black">WhatsApp Campaigns Ads</Link></div>
        </MobileAccordion>

        <Link href="/about" onClick={toggle} className="block py-3 text-black font-medium">About</Link>
        <Link href="/contact" onClick={toggle} className="block py-3 text-black font-medium">Contact Us</Link>

        {/* Auth buttons */}
        {status === "authenticated" && (
          <>
            {session.user?.role === "DSA" && (
              <Link href="/crm" onClick={toggle}>
                <Button className="w-full mt-4 bg-[#f7c430] text-black font-medium cursor-pointer">CRM Panel</Button>
              </Link>
            )}
            {session.user?.role === "RM" && (
              <Link href="/rm" onClick={toggle}>
                <Button className="w-full mt-4 bg-[#f7c430] text-black font-medium cursor-pointer">RM Panel</Button>
              </Link>
            )}
            {session.user?.role === "SUPERADMIN" && (
              <Link href="/superadmin" onClick={toggle}>
                <Button className="w-full mt-4 bg-[#f7c430] text-black font-medium">Super Admin</Button>
              </Link>
            )}
            <Button onClick={() => { signOut(); toggle(); }} className="w-full mt-4 bg-[#f7c430] text-black font-medium">Logout</Button>
          </>
        )}
        {status !== "authenticated" && (
          <Link href="/login" onClick={toggle}>
            <Button className="w-full mt-4 bg-[#f7c430] text-black font-medium">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 relative z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src={logo} alt="Logo" width={150} height={48} className="" />
            </Link>

            {/* Desktop / Tablet nav */}
            {desktopNav}

            {/* Right side: auth buttons + hamburger */}
            <div className="flex items-center space-x-2">
              {/* Desktop auth buttons */}
              <div className="hidden md:flex items-center space-x-2">
                {status === "authenticated" && session?.user?.role === "DSA" && (
                  <Link href="/crm">
                    <Button className="bg-[#f7c430] text-black font-medium px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer">
                      CRM Panel
                    </Button>
                  </Link>
                )}
                {status === "authenticated" && session?.user?.role === "RM" && (
                  <Link href="/rm">
                    <Button className="bg-[#f7c430] text-black font-medium px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer">
                      RM Panel
                    </Button>
                  </Link>
                )}
                {status === "authenticated" && session?.user?.role === "SUPERADMIN" && (
                  <Link href="/superadmin">
                    <Button className="bg-[#f7c430] text-black font-medium px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer">
                      Super Admin
                    </Button>
                  </Link>
                )}
                {status === "authenticated" ? (
                  <Button
                    className="bg-[#f7c430] text-black font-medium px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button className="bg-[#f7c430] text-black font-medium px-3 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow cursor-pointer">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>

              {/* Hamburger (mobile only) */}
              <button onClick={toggle} className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && mobileDrawer}
    </>
  );
}