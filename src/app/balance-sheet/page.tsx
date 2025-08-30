import {
  FileText,
  BarChart3,
  Scale,
  Handshake,
  ClipboardList,
  Banknote,
  ShieldCheck,
  Users,
  Target,
  Phone,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FinanceRatioAnalyzer from "@/components/BalanceSheet";
import Link from "next/link";
import NavigationHeader from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function BalanceSheetFinanceLanding() {
  const whyCrucial = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Financial Health",
      description:
        "Understand the true health of your business with a clear snapshot of assets, liabilities, and equity.",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Decisions",
      description:
        "Use reliable numbers to decide when to expand, hire, or apply for financing.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: <Banknote className="h-6 w-6" />,
      title: "Loan Applications",
      description:
        "Banks and investors require balance sheets and financial reports before funding.",
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Tax & Compliance",
      description: "Required for annual filings and statutory reporting.",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const howWeHelp = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Accurate Statements",
      description:
        "Preparation of clear, accurate balance sheets and other financial reports.",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Proper Records",
      description:
        "Ensure your books and records are maintained correctly throughout the year.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Simple Explanations",
      description:
        "We explain your reports in plain language so you fully understand them.",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Better Decisions",
      description:
        "Get the right insights to manage your business with confidence.",
    },
  ];

  const whoNeeds = [
    {
      icon: <Users className="h-5 w-5" />,
      title: "Startups & SMEs",
      description: "Track financial health and prepare for fundraising.",
    },
    {
      icon: <Banknote className="h-5 w-5" />,
      title: "Loan Seekers",
      description: "Get bank-ready balance sheets and supporting reports.",
    },
    {
      icon: <ClipboardList className="h-5 w-5" />,
      title: "Compliance-Focused",
      description:
        "Stay on top of year-end filings and statutory requirements.",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Growing Businesses",
      description:
        "Make informed decisions on hiring, expansion, and investments.",
    },
  ];

  return (
    <>
    <NavigationHeader/>
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-[#F7C430] p-4">
                <Scale className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-[#1E1E1E] sm:text-5xl lg:text-6xl">
              Balance Sheet & Finance
            </h1>
            <h2 className="mb-8 text-2xl font-semibold text-[#1E1E1E] sm:text-3xl lg:text-4xl">
              Clear, Bank‑Ready Financials for Smart Decisions
            </h2>
            <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed text-[#1E1E1E]">
              A balance sheet shows what your business owns, what it owes, and
              what belongs to you—the owner. Get a true snapshot of your
              financial position with statements prepared, maintained, and
              explained by experts.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button className="bg-[#F7C430] px-8 py-4 text-lg font-semibold text-[#1E1E1E] hover:bg-[#E6B429]">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to Finance Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why it’s crucial */}
      <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
            Why Is It Crucial?
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
            Balance sheets are essential for understanding financial health,
            making smart decisions, raising funds, and meeting compliance needs.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyCrucial.map((item, idx) => (
              <Card
                key={idx}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[#1E1E1E] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
            What Is a Balance Sheet?
          </h2>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <p className="mb-4 text-lg leading-relaxed text-[#1E1E1E]">
                    A balance sheet is a snapshot of your business’s financial
                    position at a point in time. It shows assets (what you own),
                    liabilities (what you owe), and equity (what belongs to the
                    owner).
                  </p>
                  <p className="text-lg leading-relaxed text-[#1E1E1E]">
                    It’s one of the most important financial statements for any
                    business—used for decision making, loan applications, and
                    compliance.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-4">
              <h3 className="mb-4 text-xl font-semibold text-[#1E1E1E]">
                How We Help You Every Step
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {howWeHelp.map((item, idx) => (
                  <Card
                    key={idx}
                    className="transition-colors border-[#FFF0C3] hover:border-[#F7C430]"
                  >
                    <CardContent className="p-4 mt-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F7C430] text-[#1E1E1E]">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E1E1E]">
                            {item.title}
                          </h4>
                          <p className="text-sm text-[#1E1E1E] opacity-80">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Health Check (interactive) */}
      <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
            Financial Health Check
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
            Quickly assess liquidity and leverage with key ratios and ensure
            your accounting equation balances.
          </p>
          <FinanceRatioAnalyzer />
        </div>
      </section>

      {/* Who needs this */}
      <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
            Who Needs This Service?
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
            Every business—big or small—that wants to track financial health,
            apply for loans, and make informed decisions.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whoNeeds.map((w, idx) => (
              <Card
                key={idx}
                className="transition-colors border-[#FFF0C3] hover:border-[#F7C430] text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto mb-4 w-fit rounded-full bg-[#F7C430] p-3">
                    <div className="text-[#1E1E1E]">{w.icon}</div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-[#1E1E1E]">
                    {w.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#1E1E1E]">
                    {w.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[#F7C430] p-4">
              <FileText className="h-8 w-8 text-[#1E1E1E]" />
            </div>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-[#FFFFFF] sm:text-4xl">
            Ready for Bank‑Ready Financials?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-[#FFFFFF] opacity-90">
            Get accurate balance sheets, clear explanations, and ongoing
            support—so you can secure loans, stay compliant, and make smarter
            business decisions.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/contact">
            <Button
              variant="outline"
              className="border-[#F7C430] bg-transparent px-8 py-4 text-lg text-[#F7C430] hover:bg-[#F7C430] hover:text-[#1E1E1E]"
            >
              <Phone className="mr-2 h-5 w-5" />
              Talk to Our Team
            </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    <ContactForm/>
    <Footer/>
    </>

  );
}
