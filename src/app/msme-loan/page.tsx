import {
  IndianRupee,
  Factory,
  Wrench,
  PackageSearch,
  Rocket,
  TrendingUp,
  Handshake,
  ClipboardList,
  Users,
  Store,
  Percent,
  Phone,
  Calculator,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EMICalculator from "@/components/MsmeEmiCalculator";
import Link from "next/link";
import NavigationHeader from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function MSMELoanLanding() {
  const stats = [
    {
      number: "Fast",
      label: "Simplified Processing",
      icon: <Rocket className="h-5 w-5" />,
    },
    {
      number: "Low",
      label: "Competitive Rates",
      icon: <Percent className="h-5 w-5" />,
    },
    {
      number: "Flexible",
      label: "Repayment Options",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      number: "Priority",
      label: "MSME Focus",
      icon: <Handshake className="h-5 w-5" />,
    },
  ];

  const useCases = [
    {
      icon: <Factory className="h-6 w-6" />,
      title: "Buy Equipment & Machinery",
      description:
        "Upgrade capacity and productivity with new or modernized machines.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Expand Your Business",
      description: "Open new units, add product lines, or enter new markets.",
    },
    {
      icon: <PackageSearch className="h-6 w-6" />,
      title: "Purchase Raw Materials",
      description: "Ensure uninterrupted production with timely inventory.",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Manage Working Capital",
      description: "Smooth day-to-day operations and cash flow cycles.",
    },
  ];

  const benefits = [
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Easy to Get",
      description:
        "MSME support is a priority—applications are simpler and faster than typical business loans.",
      color: "bg-green-100 text-green-700",
    },
    {
      icon: <Percent className="h-6 w-6" />,
      title: "Lower Interest Rates",
      description:
        "Backed by national initiatives for MSMEs, lending often comes at competitive, affordable rates.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Flexible Repayment",
      description: "Choose a repayment plan that fits your business cash flow.",
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const howWeHelp = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Personalized Guidance",
      description:
        "We listen to your business needs and recommend the best loan options for your goals.",
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Quick & Easy Application",
      description:
        "Step-by-step support with paperwork for a smooth application and faster decisions.",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Complete Transparency",
      description:
        "Clear details on rates, fees, and terms—no hidden surprises.",
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Dedicated Support",
      description:
        "From your first query to final repayment, we’re with you at every step.",
    },
  ];

  return (
    <>
      <NavigationHeader />
      <div className="min-h-screen bg-[#FFFFFF]">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[#F7C430] p-4">
                  <IndianRupee className="h-12 w-12 text-[#1E1E1E]" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-[#1E1E1E] sm:text-5xl lg:text-6xl">
                MSME Loans: Fueling Your Business Ambitions
              </h1>
              <h2 className="mb-8 text-2xl font-semibold text-[#1E1E1E] sm:text-3xl lg:text-4xl">
                Simple, Supportive Finance for Growth
              </h2>
              <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed text-[#1E1E1E]">
                Micro, Small, and Medium Enterprises are the heart of our
                economy. If you need funds to grow, buy machinery, or manage
                cash flow, an MSME loan is a great option—designed to support
                your business with a straightforward process.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button className="bg-[#F7C430] px-8 py-4 text-lg font-semibold text-[#1E1E1E] hover:bg-[#E6B429]">
                    <Phone className="mr-2 h-5 w-5" />
                    Talk to Loan Expert
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#1E1E1E] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="rounded-lg bg-[#F7C430] p-2 text-[#1E1E1E]">
                      {s.icon}
                    </div>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-[#F7C430] sm:text-4xl">
                    {s.number}
                  </div>
                  <div className="text-sm text-[#FFFFFF] opacity-80 sm:text-base">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is MSME Loan */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
              What is an MSME Loan?
            </h2>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <Card className="border-[#FFF0C3] shadow-lg">
                  <CardContent className="p-8 mt-2">
                    <p className="mb-4 text-lg leading-relaxed text-[#1E1E1E]">
                      An MSME loan is designed specifically for micro, small,
                      and medium businesses. Supported by government and banks,
                      these loans make it easier for small businesses to access
                      credit for a wide range of needs—from buying equipment to
                      managing daily cash flow.
                    </p>
                    <p className="text-lg leading-relaxed text-[#1E1E1E]">
                      Use it to buy machinery, expand operations, purchase raw
                      materials, or smooth working capital—so you can focus on
                      building and scaling your business.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <h3 className="mb-4 text-xl font-semibold text-[#1E1E1E]">
                  Common Business Uses
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {useCases.map((item, idx) => (
                    <Card
                      key={idx}
                      className="transition-colors border-[#FFF0C3] hover:border-[#F7C430]"
                    >
                      <CardContent className="p-4 mt-6">
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

        {/* Benefits */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
              How MSME Loans Help You
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Flexible, business-first finance that helps you move faster with
              confidence.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {benefits.map((b, idx) => (
                <Card
                  key={idx}
                  className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-8 mt-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${b.color}`}>
                        {b.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                          {b.title}
                        </h3>
                        <p className="text-[#1E1E1E] leading-relaxed">
                          {b.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* EMI Calculator */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
              Plan Your Repayments
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Estimate your EMI with a simple calculator—adjust amount, rate,
              and tenure to find a plan that fits your cash flow.
            </p>
            <EMICalculator />
          </div>
        </section>

        {/* How We Help */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
              We Make Your Loan Journey Simple
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Your time is valuable—our team supports you with clarity and
              speed.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howWeHelp.map((step, idx) => (
                <Card key={idx} className="border-none bg-[#FFFFFF] shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-[#F7C430] p-3 text-[#1E1E1E]">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-[#1E1E1E]">
                          {step.title}
                        </h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-[#1E1E1E]">
                      {step.description}
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
                <Store className="h-8 w-8 text-[#1E1E1E]" />
              </div>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-[#FFFFFF] sm:text-4xl">
              Ready to Grow Your Business?
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-[#FFFFFF] opacity-90">
              Don’t let a lack of funds hold you back. Talk to our friendly team
              today to explore MSME loans, understand your options clearly, and
              move forward with confidence.
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
      <ContactForm />
      <Footer />
    </>
  );
}
