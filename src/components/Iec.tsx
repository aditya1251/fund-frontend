import {
  Globe,
  Ship,
  TrendingUp,
  FileText,
  Clock,
  Award,
  Calculator,
  Briefcase,
  Upload,
  CheckCircle,
  Zap,
  Lock,
  Banknote,
  Scale,
  Package,
  Building2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
export default function IECRegistrationLanding() {
  const whyIECCrucial = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Legal Requirement",
      description:
        "The IEC is a must for any business that wants to do international trade. Without it, you cannot import or export goods.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Expansion",
      description:
        "It's the first step to expanding your business globally, helping you reach a wider market and increase your earnings.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Builds Credibility",
      description:
        "A registered IEC gives your business international credibility and makes it easier to establish trade relationships worldwide.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Business Growth",
      description:
        "Opens doors to international markets, allowing you to diversify revenue streams and scale your business globally.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const serviceSteps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Collection",
      description:
        "Gather all required documents including PAN, bank certificate, and business registration proof.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Online Application",
      description:
        "File your IEC application online through the DGFT portal with accurate business details.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Verification Process",
      description:
        "DGFT verifies your application and documents for compliance with trade regulations.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "IEC Certificate",
      description:
        "Receive your unique 10-digit IEC code and certificate for international trade operations.",
    },
  ];

  const tradeTypes = [
    {
      icon: <Package className="h-5 w-5" />,
      title: "Import Business",
      description: "Bring goods from international markets",
      examples: ["Raw materials", "Finished products", "Machinery & equipment"],
    },
    {
      icon: <Ship className="h-5 w-5" />,
      title: "Export Business",
      description: "Send goods to international markets",
      examples: ["Manufactured goods", "Agricultural products", "Services"],
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Both Import & Export",
      description: "Complete international trade operations",
      examples: ["Trading companies", "Manufacturers", "Service providers"],
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Service Exports",
      description: "Export services internationally",
      examples: ["IT services", "Consulting", "Professional services"],
    },
  ];

  const tradeBenefits = [
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Market Access",
      description: "Access to 200+ countries for trade",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Revenue Growth",
      description: "Diversify income through global markets",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Trade Credibility",
      description: "Official recognition for international trade",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Compliance Assurance",
      description: "Legal compliance with trade regulations",
    },
  ];

  const businessSectors = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Manufacturing",
      description: "Export finished goods and import raw materials",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Trading Companies",
      description: "Import and export various products",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "IT & Software",
      description: "Export software and IT services globally",
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "E-commerce",
      description: "Cross-border online business operations",
    },
  ];

  const stats = [
    {
      number: "25K+",
      label: "IEC Codes Issued",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      number: "3 Days",
      label: "Processing Time",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      number: "100%",
      label: "Success Rate",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      number: "Lifetime",
      label: "Validity Period",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  const registrationProcess = [
    {
      step: "Document Preparation",
      duration: "1 Day",
      description: "Collect and verify required documents",
    },
    {
      step: "Online Application",
      duration: "1 Day",
      description: "Submit application on DGFT portal",
    },
    {
      step: "Payment & Verification",
      duration: "1 Day",
      description: "Fee payment and document verification",
    },
    {
      step: "IEC Issuance",
      duration: "1-2 Days",
      description: "Receive IEC certificate and code",
    },
  ];

  const requiredDocuments = [
    {
      document: "PAN Card",
      description: "Business PAN card copy",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      document: "Bank Certificate",
      description: "Current account certificate from bank",
      icon: <Banknote className="h-4 w-4" />,
    },
    {
      document: "Business Registration",
      description: "Company incorporation or partnership deed",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      document: "Address Proof",
      description: "Business address proof document",
      icon: <MapPin className="h-4 w-4" />,
    },
  ];

  const tradeOpportunities = [
    {
      region: "Asia-Pacific",
      countries: "50+ Countries",
      potential: "High Growth Markets",
    },
    {
      region: "Europe",
      countries: "40+ Countries",
      potential: "Premium Markets",
    },
    {
      region: "Americas",
      countries: "35+ Countries",
      potential: "Large Consumer Base",
    },
    {
      region: "Africa & Middle East",
      countries: "75+ Countries",
      potential: "Emerging Markets",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Globe className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">
              IEC Registration
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Your Gateway to Global Trade
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              IEC stands for Importer-Exporter Code. It's a unique 10-digit code
              that is needed if you want to import or export goods and services
              from India to other countries. Issued by the Directorate General
              of Foreign Trade (DGFT), it's your official license for
              international business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href='/contact'>
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Globe className="mr-2 h-5 w-5" />
                Get IEC Code
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

      {/* What is IEC Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is IEC Registration?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Ship className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">
                      International Trade License
                    </h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    IEC (Importer-Exporter Code) is a unique 10-digit
                    identification number required for any business wanting to
                    engage in international trade operations.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    Issued by DGFT (Directorate General of Foreign Trade), this
                    code is mandatory for importing or exporting goods and
                    services from India to other countries.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">
                Required Documents
              </h3>
              {requiredDocuments.map((doc, index) => (
                <Card
                  key={index}
                  className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors"
                >
                  <CardContent className="p-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                        <div className="text-[#1E1E1E]">{doc.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">
                          {doc.document}
                        </h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trade Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Types of International Trade
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            IEC registration enables various types of international trade
            operations, from importing raw materials to exporting finished
            products and services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tradeTypes.map((type, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <div className="text-[#1E1E1E]">{type.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                        {type.title}
                      </h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#1E1E1E] mb-2">
                      Examples:
                    </h4>
                    {type.examples.map((example, exampleIndex) => (
                      <div
                        key={exampleIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-[#F7C430]" />
                        <span className="text-sm text-[#1E1E1E]">
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Trade Opportunities */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Global Trade Opportunities
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            With IEC registration, access international markets across all
            continents and tap into diverse business opportunities worldwide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradeOpportunities.map((opportunity, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <Globe className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">
                    {opportunity.region}
                  </h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">
                    {opportunity.countries}
                  </Badge>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">
                    {opportunity.potential}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            IEC Registration Process
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our streamlined process ensures your IEC registration is completed
            quickly and efficiently for immediate trade operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {registrationProcess.map((process, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center relative"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">
                    {process.step}
                  </h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">
                    {process.duration}
                  </Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">
                    {process.description}
                  </p>
                </CardContent>
                {index < registrationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why IEC is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is IEC Registration Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            IEC registration is not just a legal requirement but a gateway to
            unlimited global business opportunities and international market
            access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyIECCrucial.map((reason, index) => (
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

      {/* Trade Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Key Trade Benefits
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            IEC registration unlocks numerous advantages that help accelerate
            international business growth and provide global market access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tradeBenefits.map((benefit, index) => (
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
            We make IEC registration simple and quick, handling all complex
            government processes for seamless international trade setup.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4 mt-4">
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
            Who Needs IEC Registration?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Any business planning to engage in international trade, whether
            importing raw materials, exporting products, or providing services
            globally.
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
