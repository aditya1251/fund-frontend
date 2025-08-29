import {
  FileText,
  TrendingUp,
  Shield,
  Phone,
  Building,
  Clock,
  Award,
  Target,
  CreditCard,
  Calculator,
  Briefcase,
  Receipt,
  Upload,
  CheckCircle,
  UserCheck,
  Zap,
  IndianRupee,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CMAProjectReportLanding() {
  const whyCMACrucial = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Loan Approval",
      description:
        "A well-prepared report is the first thing a bank looks at. It shows them that your business is strong and that your loan is a good investment.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Shows Business Strength",
      description:
        "It gives a clear and professional overview of your business's health, its plans, and how the loan money will be used to grow.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Better Loan Terms",
      description:
        "A detailed and organized report can help you get a bigger loan amount or a better interest rate.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk Assessment",
      description:
        "Banks use CMA reports to assess the creditworthiness and repayment capacity of your business for informed lending decisions.",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const serviceSteps = [
    {
      icon: <Receipt className="h-6 w-6" />,
      title: "Data Collection",
      description:
        "Work with you to gather all the necessary financial data and business information.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Report Creation",
      description:
        "Create a detailed and professional report that highlights the strengths of your business.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Bank Compliance",
      description:
        "Make sure the report meets all the bank's requirements, which increases your chances of approval.",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Presentation Support",
      description:
        "Assist you in presenting the report to the bank with confidence and clarity.",
    },
  ];

  const reportComponents = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Financial Analysis",
      description: "3-year financial statements & ratios",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Business Projections",
      description: "Future cash flow & growth plans",
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      title: "Fund Utilization",
      description: "Detailed loan usage breakdown",
    },
    {
      icon: <LineChart className="h-5 w-5" />,
      title: "Repayment Schedule",
      description: "EMI capacity & repayment plan",
    },
  ];

  const loanTypes = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Term Loans",
      description: "Long-term business expansion loans",
      amount: "₹10L - ₹50Cr",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Working Capital",
      description: "Short-term operational funding",
      amount: "₹5L - ₹25Cr",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Credit Lines",
      description: "Flexible credit facilities",
      amount: "₹2L - ₹10Cr",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Project Finance",
      description: "New project funding",
      amount: "₹25L - ₹100Cr",
    },
  ];

  const businessSectors = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Manufacturing",
      description: "Production & industrial businesses",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Trading",
      description: "Import/export & wholesale trade",
    },
    {
      icon: <Calculator className="h-5 w-5" />,
      title: "Services",
      description: "Professional & IT services",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Startups",
      description: "New business ventures",
    },
  ];

  const stats = [
    {
      number: "5K+",
      label: "CMA Reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      number: "95%",
      label: "Loan Approval Rate",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      number: "₹500Cr+",
      label: "Loans Facilitated",
      icon: <IndianRupee className="h-5 w-5" />,
    },
    {
      number: "7 Days",
      label: "Report Delivery",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  const keyRatios = [
    {
      ratio: "Current Ratio",
      benchmark: "> 1.5",
      importance: "Liquidity measure",
    },
    {
      ratio: "Debt-Equity",
      benchmark: "< 2:1",
      importance: "Leverage assessment",
    },
    { ratio: "DSCR", benchmark: "> 1.25", importance: "Repayment capacity" },
    { ratio: "ROI", benchmark: "> 15%", importance: "Profitability indicator" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <FileText className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">
              CMA/Project Report
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Professional Financial Reports for Loan Success
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              A CMA report (Credit Monitoring Arrangement) or Project report is
              a detailed analysis of your business's financial health. We create
              professional reports that banks trust, increasing your loan
              approval chances and securing better terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Get CMA Report
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1E1E1E]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-[#F7C430] rounded-lg text-[#1E1E1E]">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#F7C430] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-[#FFFFFF] opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is CMA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is a CMA/Project Report?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <BarChart3 className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">
                      Comprehensive Financial Analysis
                    </h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    A detailed report of your business's financial health that
                    includes past performance, current financial position, and a
                    clear plan for the future.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    Banks and financial institutions require this report when
                    you apply for a business loan to assess your
                    creditworthiness and repayment capacity.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {reportComponents.map((component, index) => (
                <Card
                  key={index}
                  className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors"
                >
                  <CardContent className="p-6 text-center mt-4">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                      <div className="text-[#1E1E1E]">{component.icon}</div>
                    </div>
                    <h3 className="font-semibold text-[#1E1E1E] mb-2">
                      {component.title}
                    </h3>
                    <p className="text-sm text-[#1E1E1E] opacity-80">
                      {component.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Financial Ratios Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Key Financial Ratios
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Banks evaluate your business using specific financial ratios. We
            ensure your CMA report presents these ratios in the best possible
            light.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyRatios.map((ratio, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <BarChart3 className="h-8 w-8 text-[#1E1E1E]" />
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">
                    {ratio.ratio}
                  </h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3">
                    {ratio.benchmark}
                  </Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">
                    {ratio.importance}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why CMA is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is CMA Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            A professionally prepared CMA report is your key to loan approval
            success. It demonstrates your business credibility and financial
            strength to lenders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyCMACrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-[#FFF0C3] shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${reason.color
                        .replace("text-", "text-")
                        .replace("bg-", "bg-")}`}
                    >
                      {reason.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-[#1E1E1E] leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Loan Types We Support
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our CMA reports are tailored for different types of business loans,
            ensuring compliance with specific bank requirements for each loan
            category.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loanTypes.map((loan, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{loan.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">
                    {loan.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">
                    {loan.description}
                  </p>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">
                    {loan.amount}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How We Help You Every Step of the Way
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We create professional and persuasive reports that meet all bank
            requirements and maximize your loan approval chances.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg">
                <CardHeader className="mt-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#F7C430] mb-1">
                        Step {index + 1}
                      </div>
                      <CardTitle className="text-xl text-[#1E1E1E]">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1E1E1E] leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Needs This Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Who Needs This Service?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Business owners across various sectors who are applying for business
            loans, working capital loans, or any other kind of credit facility
            from banks.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSectors.map((sector, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{sector.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">
                    {sector.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">
                    {sector.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  );
}
