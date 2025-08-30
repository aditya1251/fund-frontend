import {
  Store,
  Scale,
  Shield,
  Building2,
  Phone,
  Clock,
  Calculator,
  Upload,
  CheckCircle,
  AlertTriangle,
  Award,
  MapPin,
  Users,
  Briefcase,
  Factory,
  UtensilsCrossed,
  FileText,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function TradeLicenseLanding() {
  const whyTradeLicenseCrucial = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "It's the Law",
      description:
        "A trade license is a legal requirement for most businesses. Running a business without one can lead to fines or the closure of your business.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Legitimacy",
      description:
        "It shows that your business is legitimate and has the legal permission to operate.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "No Disputes",
      description:
        "Having a trade license can help you avoid disputes with local authorities and ensures a smooth operation.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Business Credibility",
      description:
        "Enhances your business reputation with customers, suppliers, and financial institutions by demonstrating compliance.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const serviceSteps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "License Type Assessment",
      description:
        "Helping you understand which type of license your business needs based on your business activity.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Document Preparation",
      description:
        "Assisting you in preparing all the necessary documents, like your address proof and business details.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Application Submission",
      description:
        "Filling out the application form correctly and submitting it to the local government body.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Follow-up & Support",
      description:
        "Following up on your application to make sure you get your license quickly.",
    },
  ];

  const licenseTypes = [
    {
      type: "Retail Trade License",
      description: "For shops, stores, and retail establishments",
      validity: "1-3 Years",
      authority: "Municipal Corporation",
      fees: "₹500 - ₹5,000",
      processing: "15-30 Days",
    },
    {
      type: "Food Business License",
      description: "For restaurants, cafes, and food establishments",
      validity: "1-5 Years",
      authority: "Municipal Corporation + FSSAI",
      fees: "₹1,000 - ₹10,000",
      processing: "30-45 Days",
    },
    {
      type: "Manufacturing License",
      description: "For factories and manufacturing units",
      validity: "1-5 Years",
      authority: "Municipal Corporation + Pollution Board",
      fees: "₹2,000 - ₹25,000",
      processing: "45-60 Days",
    },
    {
      type: "Service Business License",
      description: "For offices, consultancies, and service providers",
      validity: "1-3 Years",
      authority: "Municipal Corporation",
      fees: "₹500 - ₹3,000",
      processing: "15-30 Days",
    },
  ];

  const businessTypes = [
    {
      icon: <Store className="h-5 w-5" />,
      title: "Retail Shops",
      description: "Clothing stores, electronics shops, general stores",
      licenseType: "Retail Trade License",
    },
    {
      icon: <UtensilsCrossed className="h-5 w-5" />,
      title: "Restaurants & Cafes",
      description: "Food establishments, bars, catering services",
      licenseType: "Food Business License",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      title: "Manufacturing Units",
      description: "Production facilities, workshops, processing units",
      licenseType: "Manufacturing License",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Service Businesses",
      description: "Offices, consultancies, professional services",
      licenseType: "Service Business License",
    },
  ];

  const complianceRequirements = [
    {
      requirement: "Health & Safety Standards",
      description: "Compliance with local health and safety regulations",
      authority: "Municipal Health Department",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      requirement: "Fire Safety Clearance",
      description: "Fire safety compliance for commercial establishments",
      authority: "Fire Department",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    {
      requirement: "Building Plan Approval",
      description: "Approved building plans for commercial use",
      authority: "Municipal Planning Department",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      requirement: "Environmental Clearance",
      description: "Environmental compliance for certain business types",
      authority: "Pollution Control Board",
      icon: <Award className="h-4 w-4" />,
    },
  ];

  const stats = [
    {
      number: "25K+",
      label: "Licenses Obtained",
      icon: <Store className="h-5 w-5" />,
    },
    {
      number: "30 Days",
      label: "Average Processing",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      number: "98%",
      label: "Success Rate",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      number: "500+",
      label: "Cities Covered",
      icon: <MapPin className="h-5 w-5" />,
    },
  ];

  const applicationProcess = [
    {
      step: "Business Assessment",
      duration: "1-2 Days",
      description: "Evaluate business type and determine license requirements",
    },
    {
      step: "Document Collection",
      duration: "3-5 Days",
      description: "Gather required documents and prepare application",
    },
    {
      step: "Application Filing",
      duration: "1 Day",
      description: "Submit application to relevant municipal authority",
    },
    {
      step: "License Issuance",
      duration: "15-45 Days",
      description: "Processing and approval by local government",
    },
  ];

  const requiredDocuments = [
    {
      document: "Identity Proof",
      description: "Aadhar card, PAN card, or passport of business owner",
      icon: <Users className="h-4 w-4" />,
    },
    {
      document: "Address Proof",
      description: "Property documents, rent agreement, or utility bills",
      icon: <Home className="h-4 w-4" />,
    },
    {
      document: "Business Registration",
      description:
        "Shop Act registration, GST registration, or incorporation certificate",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      document: "NOC Certificates",
      description:
        "No Objection Certificates from fire, health, and pollution departments",
      icon: <FileText className="h-4 w-4" />,
    },
  ];

  const penaltyStructure = [
    {
      violation: "Operating without trade license",
      penalty: "₹5,000 - ₹50,000 fine",
      consequence: "Business closure order",
    },
    {
      violation: "Late renewal of license",
      penalty: "₹500 - ₹5,000 penalty",
      consequence: "License suspension",
    },
    {
      violation: "Non-compliance with conditions",
      penalty: "₹2,000 - ₹25,000 fine",
      consequence: "License cancellation",
    },
    {
      violation: "False information in application",
      penalty: "₹10,000 - ₹1 lakh fine",
      consequence: "Criminal prosecution",
    },
  ];

  const renewalProcess = [
    {
      step: "Renewal Notice",
      timeline: "30 days before expiry",
      action: "Submit renewal application",
    },
    {
      step: "Document Update",
      timeline: "15 days before expiry",
      action: "Update changed information",
    },
    {
      step: "Fee Payment",
      timeline: "Before expiry date",
      action: "Pay renewal fees",
    },
    {
      step: "License Renewal",
      timeline: "On approval",
      action: "Receive renewed license",
    },
  ];

  const municipalAuthorities = [
    {
      authority: "Municipal Corporation",
      jurisdiction: "Major cities and urban areas",
      services: "Trade license, building permits, NOCs",
    },
    {
      authority: "Municipal Council",
      jurisdiction: "Smaller towns and cities",
      services: "Local trade permits, health clearances",
    },
    {
      authority: "Panchayat Raj",
      jurisdiction: "Rural and village areas",
      services: "Village-level business permits",
    },
    {
      authority: "Development Authority",
      jurisdiction: "Special economic zones",
      services: "Industrial licenses, special permits",
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
                <Store className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">
              Trade License
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Local Business Authorization & Compliance
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              A trade license is a permission given by the local government
              (like a municipal corporation) to run a specific business in a
              particular area. It ensures that your business follows the rules
              and safety standards of that area, like health, safety, and fire
              regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
                >
                  <Store className="mr-2 h-5 w-5" />
                  Get Trade License
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

      {/* What is Trade License Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is a Trade License?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <MapPin className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">
                      Local Business Authorization
                    </h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    A trade license is official permission from local government
                    authorities to operate a business in a specific location,
                    ensuring compliance with local regulations and safety
                    standards.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This license validates that your business meets health,
                    safety, fire, and environmental regulations required by the
                    municipal corporation or local governing body.
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

      {/* License Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Types of Trade Licenses
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different business activities require specific types of trade
            licenses with varying requirements, fees, and processing times.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {licenseTypes.map((license, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <Store className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                        {license.type}
                      </h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">
                        {license.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        Validity
                      </p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">
                        {license.validity}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        Processing
                      </p>
                      <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">
                        {license.processing}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        Fees
                      </p>
                      <span className="text-sm text-[#1E1E1E]">
                        {license.fees}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        Authority
                      </p>
                      <span className="text-xs text-[#1E1E1E] opacity-80">
                        {license.authority}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Requirements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Compliance Requirements
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Trade licenses require compliance with various local regulations and
            obtaining clearances from multiple departments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceRequirements.map((requirement, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors"
              >
                <CardContent className="p-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <div className="text-[#1E1E1E]">{requirement.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">
                        {requirement.requirement}
                      </h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-2">
                        {requirement.description}
                      </p>
                      <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">
                        {requirement.authority}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Penalty Structure Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Penalty for Non-Compliance
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Operating without a trade license or violating license conditions
            can result in severe penalties and business closure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {penaltyStructure.map((penalty, index) => (
              <Card
                key={index}
                className="border-red-200 bg-red-50 hover:border-red-300 transition-colors"
              >
                <CardContent className="p-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 mb-2">
                        {penalty.violation}
                      </h3>
                      <p className="text-red-700 font-medium mb-2">
                        {penalty.penalty}
                      </p>
                      <p className="text-red-600 text-sm">
                        {penalty.consequence}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Application Process
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our streamlined process ensures your trade license application is
            completed efficiently with all required compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {applicationProcess.map((process, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] shadow-lg text-center relative"
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
                {index < applicationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trade License is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is Trade License Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Trade license ensures legal compliance, establishes business
            legitimacy, and protects your business from disputes while enabling
            smooth operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyTradeLicenseCrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
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

      {/* How We Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How We Help You Every Step of the Way
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We make the trade license process easy for you, handling all
            complexities to ensure quick approval and complete compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg">
                <CardHeader className="p-6 mt-4">
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
            Who Needs Trade License?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Anyone who wants to start a business like a shop, restaurant,
            factory, or commercial establishment in a particular city or town.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((business, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{business.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">
                    {business.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">
                    {business.description}
                  </p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">
                    {business.licenseType}
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
