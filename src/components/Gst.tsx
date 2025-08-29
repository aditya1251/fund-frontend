import {
  Calculator,
  Shield,
  FileText,
  Phone,
  Building,
  Clock,
  Award,
  TrendingUp,
  CreditCard,
  Target,
  Briefcase,
  Receipt,
  Download,
  Upload,
  CheckCircle,
  UserCheck,
  Zap,
  IndianRupee,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function GSTServicesLanding() {
  const whyGSTCrucial = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Legal Compliance",
      description:
        "It's mandatory for eligible businesses to have a GST number and file returns. Not doing so can lead to big penalties.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <IndianRupee className="h-6 w-6" />,
      title: "Claim Tax Credit",
      description:
        "GST allows you to claim 'Input Tax Credit,' which means you get to reduce the tax you pay on your sales by the tax you paid on your purchases.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Business Credibility",
      description:
        "Having a GST number shows that your business is formal and trustworthy. It helps you get bigger clients and a better reputation.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Easier Banking",
      description:
        "Banks often ask for your GST returns when you apply for a business loan.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const serviceSteps = [
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "GST Registration",
      description:
        "Helping you get your GST registration quickly and without any hassle.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Return Filing",
      description:
        "Preparing and filing all your monthly or quarterly GST returns (like GSTR-1 and GSTR-3B).",
    },
    {
      icon: <IndianRupee className="h-6 w-6" />,
      title: "Input Tax Credit",
      description:
        "Guiding you on how to claim all your eligible Input Tax Credits to maximize your savings.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Notice Handling",
      description:
        "Handling all communication and notices from the GST department on your behalf.",
    },
  ];

  const gstReturns = [
    {
      icon: <Receipt className="h-5 w-5" />,
      title: "GSTR-1",
      description: "Outward supplies return",
      frequency: "Monthly/Quarterly",
    },
    {
      icon: <Download className="h-5 w-5" />,
      title: "GSTR-2A",
      description: "Auto-populated purchase return",
      frequency: "Auto-generated",
    },
    {
      icon: <Calculator className="h-5 w-5" />,
      title: "GSTR-3B",
      description: "Summary return with tax payment",
      frequency: "Monthly",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "GSTR-9",
      description: "Annual return",
      frequency: "Yearly",
    },
  ];

  const businessTypes = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Manufacturing",
      description: "Goods production & distribution",
      threshold: "₹40 Lakhs",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Services",
      description: "Professional & business services",
      threshold: "₹20 Lakhs*",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Interstate Trade",
      description: "Cross-state business operations",
      threshold: "Any Amount",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "E-commerce",
      description: "Online marketplace sellers",
      threshold: "Mandatory",
    },
  ];

  const gstBenefits = [
    {
      icon: <IndianRupee className="h-5 w-5" />,
      title: "Input Tax Credit",
      description: "Reduce tax liability with ITC claims",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Unified Tax System",
      description: "Single tax replacing multiple taxes",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Legal Recognition",
      description: "Formal business status & credibility",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Digital Process",
      description: "Online filing & automated systems",
    },
  ];

  const stats = [
    {
      number: "25K+",
      label: "GST Registrations",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      number: "₹100Cr+",
      label: "ITC Claimed",
      icon: <IndianRupee className="h-5 w-5" />,
    },
    {
      number: "99.9%",
      label: "Filing Accuracy",
      icon: <Target className="h-5 w-5" />,
    },
    {
      number: "24hrs",
      label: "Registration Time",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  const gstRates = [
    { rate: "0%", items: "Essential items like milk, bread" },
    { rate: "5%", items: "Basic necessities like sugar, tea" },
    { rate: "12%", items: "Processed foods, medicines" },
    { rate: "18%", items: "Most goods and services" },
    { rate: "28%", items: "Luxury items, automobiles" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Calculator className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">
              GST Services
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Goods and Services Tax Made Simple
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              GST stands for Goods and Services Tax. It's a single tax system on
              the supply of goods and services in India. We simplify the entire
              GST process for your business, from registration to returns and
              compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
                >
                  <UserCheck className="mr-2 h-5 w-5" />
                  Get GST Registration
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

      {/* What is GST Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is GST?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Calculator className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">
                      Unified Tax System
                    </h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    GST is a single tax system on the supply of goods and
                    services in India. It replaced multiple indirect taxes and
                    created a unified national market.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    Many businesses that have a certain turnover need to get a
                    GST registration number and file regular returns (reports)
                    every month or quarter to stay compliant.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">
                GST Rate Structure
              </h3>
              {gstRates.map((rate, index) => (
                <Card
                  key={index}
                  className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors"
                >
                  <CardContent className="p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-[#F7C430] text-[#1E1E1E] text-lg px-3 py-1">
                          {rate.rate}
                        </Badge>
                        <span className="text-[#1E1E1E] text-sm">
                          {rate.items}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GST Returns Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            GST Return Types
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different types of GST returns need to be filed based on your
            business type and turnover. We handle all return types for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gstReturns.map((returnType, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{returnType.icon}</div>
                  </div>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3">
                    {returnType.title}
                  </Badge>
                  <h3 className="font-semibold text-[#1E1E1E] mb-2">
                    {returnType.description}
                  </h3>
                  <p className="text-sm text-[#1E1E1E] opacity-80">
                    {returnType.frequency}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why GST is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is GST Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            GST compliance is essential for business growth, legal protection,
            and financial benefits. Here's why your business needs proper GST
            management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyGSTCrucial.map((reason, index) => (
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

      {/* GST Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Key GST Benefits
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            GST offers numerous advantages for businesses, from tax savings to
            improved credibility and streamlined processes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gstBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
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
            We simplify the entire GST process for you. Our comprehensive
            services cover everything from registration to ongoing compliance.
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
                        Service {index + 1}
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
            Who Needs GST Registration?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Businesses with an annual turnover of more than ₹40 Lakhs (or ₹20
            Lakhs for services in some states) or those involved in selling
            goods and services across different states.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((type, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{type.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">
                    {type.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">
                    {type.description}
                  </p>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">
                    {type.threshold}
                  </Badge>
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
