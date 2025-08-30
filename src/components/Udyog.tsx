import {
  Building,
  Award,
  TrendingUp,
  FileText,
  Clock,
  Target,
  Calculator,
  Upload,
  CheckCircle,
  Zap,
  Users,
  Banknote,
  Shield,
  Star,
  Factory,
  Store,
  Home,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function UdyogRegistrationLanding() {
  const whyudyogCrucial = [
    {
      icon: <Banknote className="h-6 w-6" />,
      title: "Access Government Benefits",
      description:
        "This registration is the key to unlocking many special benefits from the government, such as loans with low interest rates, special subsidies, and other support schemes for small businesses.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Easy to Get",
      description:
        "The registration process is very simple and doesn't require much paperwork. It's a single, easy online form.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Increased Credibility",
      description:
        "Having an udyog Registration number can give your business more credibility and make it easier to deal with banks and other institutions.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Business Growth",
      description:
        "Opens doors to government tenders, priority sector lending, and various business development programs for MSMEs.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Eligibility Assessment",
      description: "Helping you understand if your business is eligible for udyog Registration.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Information Guidance",
      description: "Guiding you on all the information needed for the registration process.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Form Completion",
      description: "Filling out the online form for you and ensuring all details are correct.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Certificate Delivery",
      description: "Ensuring you get your udyog Registration certificate without any hassle.",
    },
  ]

  const msmeCategories = [
    {
      icon: <Home className="h-5 w-5" />,
      category: "Micro Enterprise",
      investment: "Up to ₹1 Crore",
      turnover: "Up to ₹5 Crore",
      examples: ["Home-based businesses", "Small shops", "Local services", "Handicrafts"],
      color: "bg-blue-50 border-blue-200",
    },
    {
      icon: <Store className="h-5 w-5" />,
      category: "Small Enterprise",
      investment: "₹1-10 Crore",
      turnover: "₹5-50 Crore",
      examples: ["Retail businesses", "Small manufacturing", "Trading companies", "Service providers"],
      color: "bg-green-50 border-green-200",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      category: "Medium Enterprise",
      investment: "₹10-50 Crore",
      turnover: "₹50-250 Crore",
      examples: ["Manufacturing units", "Large retail chains", "Export businesses", "Tech companies"],
      color: "bg-purple-50 border-purple-200",
    },
  ]

  const governmentBenefits = [
    {
      icon: <Banknote className="h-5 w-5" />,
      title: "Priority Sector Lending",
      description: "Easy access to bank loans at lower interest rates",
      benefit: "Up to 2% interest subsidy",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Government Subsidies",
      description: "Various subsidy schemes for business development",
      benefit: "Up to 25% subsidy on machinery",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Tender Preferences",
      description: "Priority in government tenders and contracts",
      benefit: "20% price preference in tenders",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Tax Benefits",
      description: "Income tax exemptions and reduced compliance burden",
      benefit: "Tax holiday for 3 years",
    },
  ]

  const businessTypes = [
    {
      icon: <Factory className="h-5 w-5" />,
      title: "Manufacturing",
      description: "Production and manufacturing businesses",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Service Providers",
      description: "Professional and business services",
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: "Trading",
      description: "Wholesale and retail trading businesses",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Startups",
      description: "New and innovative business ventures",
    },
  ]

  const stats = [
    { number: "50K+", label: "Udyog Registrations", icon: <Building className="h-5 w-5" /> },
    { number: "1 Day", label: "Registration Time", icon: <Clock className="h-5 w-5" /> },
    { number: "100%", label: "Success Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "Free", label: "Government Fee", icon: <Star className="h-5 w-5" /> },
  ]

  const registrationProcess = [
    { step: "Eligibility Check", duration: "Same Day", description: "Verify business eligibility criteria" },
    { step: "Document Collection", duration: "1 Day", description: "Gather Aadhaar and PAN details" },
    { step: "Online Application", duration: "Same Day", description: "Submit application on udyog portal" },
    { step: "Certificate Generation", duration: "Instant", description: "Receive udyog Registration certificate" },
  ]

  const requiredInformation = [
    {
      info: "Aadhaar Number",
      description: "Entrepreneur's Aadhaar card number",
      icon: <Users className="h-4 w-4" />,
    },
    {
      info: "PAN Details",
      description: "Business PAN card information",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      info: "Business Information",
      description: "Business name, address, and activity details",
      icon: <Building className="h-4 w-4" />,
    },
    {
      info: "Investment & Turnover",
      description: "Business investment and annual turnover figures",
      icon: <Banknote className="h-4 w-4" />,
    },
  ]

  const complianceFeatures = [
    { feature: "Single Window Clearance", description: "Simplified approval process for various licenses" },
    { feature: "Reduced Documentation", description: "Minimal paperwork for government schemes" },
    { feature: "Online Tracking", description: "Track application status and benefits online" },
    { feature: "Lifetime Validity", description: "No renewal required for udyog Registration" },
  ]

  const schemeBenefits = [
    { scheme: "PMEGP Scheme", benefit: "Up to ₹25 lakh loan with 15-35% subsidy" },
    { scheme: "MUDRA Loan", benefit: "Collateral-free loans up to ₹10 lakh" },
    { scheme: "Credit Guarantee Scheme", benefit: "Loan guarantee up to ₹2 crore without collateral" },
    { scheme: "Technology Upgradation", benefit: "15% capital subsidy for technology adoption" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Building className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Udyog Registration</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              MSME Registration for Government Benefits
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              Udyog Aadhar, now known as udyog Registration, is a simple government registration for micro, small, and
              medium businesses (MSMEs). It's a single, easy online form that gives your business a unique registration
              number and a certificate from the government.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Building className="mr-2 h-5 w-5" />
                Get Udyog Registration
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
                  <div className="p-2 bg-[#F7C430] rounded-lg text-[#1E1E1E]">{stat.icon}</div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#F7C430] mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-[#FFFFFF] opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is udyog Registration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is Udyog Registration?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Star className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">MSME Government Registration</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    Udyog Registration (formerly Udyog Aadhar) is a government registration system for Micro, Small, and
                    Medium Enterprises (MSMEs) that provides a unique identification number and certificate.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This simple online registration process enables businesses to access various government benefits,
                    subsidies, and support schemes designed specifically for MSMEs.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Required Information</h3>
              {requiredInformation.map((info, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                        <div className="text-[#1E1E1E]">{info.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">{info.info}</h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MSME Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">MSME Categories</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Udyog Registration covers three categories of businesses based on investment and annual turnover criteria.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {msmeCategories.map((category, index) => (
              <Card key={index} className={`${category.color} border-2 shadow-lg hover:shadow-xl transition-shadow`}>
                <CardContent className="p-8 mt-4">
                  <div className="text-center mb-6">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                      <div className="text-[#1E1E1E]">{category.icon}</div>
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">{category.category}</h3>
                    <div className="space-y-2 mb-4">
                      <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">Investment: {category.investment}</Badge>
                      <br />
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">Turnover: {category.turnover}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#1E1E1E] mb-2">Examples:</h4>
                    {category.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#F7C430]" />
                        <span className="text-sm text-[#1E1E1E]">{example}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Government Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Udyog Registration unlocks access to numerous government schemes, subsidies, and benefits designed
            specifically for MSMEs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {governmentBenefits.map((benefit, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{benefit.title}</h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">{benefit.description}</p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{benefit.benefit}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scheme Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Popular MSME Schemes</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Access to various government schemes and financial assistance programs exclusively available for registered
            MSMEs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemeBenefits.map((scheme, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardContent className="p-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Banknote className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{scheme.scheme}</h3>
                      <p className="text-[#1E1E1E] opacity-80">{scheme.benefit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Registration Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our streamlined process ensures your Udyog Registration is completed quickly with instant certificate
            generation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {registrationProcess.map((process, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg text-center relative">
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{process.step}</h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">{process.duration}</Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">{process.description}</p>
                </CardContent>
                {index < registrationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why udyog is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is Udyog Registration Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Udyog Registration provides comprehensive benefits that enhance business credibility, financial access, and
            growth opportunities for MSMEs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyudyogCrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${reason.color.replace("text-", "text-").replace("bg-", "bg-")}`}>
                      {reason.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">{reason.title}</h3>
                      <p className="text-[#1E1E1E] leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key Features</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Udyog Registration offers simplified compliance and enhanced business benefits for registered MSMEs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceFeatures.map((feature, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <CheckCircle className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{feature.feature}</h3>
                      <p className="text-[#1E1E1E] opacity-80">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How We Help You Every Step of the Way
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We make getting your Udyog Registration number quick and easy, handling all processes for seamless
            registration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardHeader className="p-6 mt-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">{step.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-[#F7C430] mb-1">Step {index + 1}</div>
                      <CardTitle className="text-xl text-[#1E1E1E]">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1E1E1E] leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Needs This Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Who Needs Udyog Registration?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Any micro, small, or medium enterprise looking to access government benefits, subsidies, and support schemes
            for business growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((business, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6 mt-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{business.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{business.title}</h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{business.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
         
    </div>
  )
}
