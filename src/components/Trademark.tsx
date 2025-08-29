import {
  Shield,
  Award,
  FileText,
  Phone,
  Building,
  Clock,
  Briefcase,
  Upload,
  CheckCircle,
  UserCheck,
  Zap,
  Search,
  Eye,
  Lock,
  TrendingUp,
  Copyright,
  Stamp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function TrademarkRegistrationLanding() {
  const whyTrademarkCrucial = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Protects Your Brand",
      description: "It gives you the legal power to stop anyone from using a similar name or logo for their business.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Builds Trust",
      description:
        "A registered trademark shows customers that your brand is unique and legitimate, which builds trust and loyalty.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Valuable Asset",
      description:
        "Your trademark can become a very valuable asset for your business over time. It can be sold, licensed, or used to get a loan.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Legal Proof",
      description: "It acts as legal proof of ownership, which is very useful if someone tries to copy your brand.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Trademark Search",
      description: "Do a detailed search to check if your desired name or logo is available for registration.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation",
      description: "Handle all the paperwork and fill out all the complex government forms for you.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Application Filing",
      description: "File the application with the Trademark Registry and follow up on its status regularly.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Objection Handling",
      description: "Address any objections or issues that may come up during the registration process.",
    },
  ]

  const trademarkTypes = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Word Mark",
      description: "Business names & slogans",
      example: "Brand names, taglines",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Logo Mark",
      description: "Visual symbols & designs",
      example: "Logos, symbols, graphics",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Combined Mark",
      description: "Text + logo combination",
      example: "Name with logo design",
    },
    {
      icon: <Copyright className="h-5 w-5" />,
      title: "Service Mark",
      description: "Service-based businesses",
      example: "Professional services",
    },
  ]

  const businessTypes = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Startups",
      description: "New businesses establishing brand identity",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "SMEs",
      description: "Small & medium enterprises",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "E-commerce",
      description: "Online businesses & marketplaces",
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: "Professionals",
      description: "Doctors, lawyers, consultants",
    },
  ]

  const protectionBenefits = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Exclusive Rights",
      description: "Sole ownership of your brand identity",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Legal Protection",
      description: "Court-enforceable brand rights",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Asset Value",
      description: "Tradeable business asset",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Brand Credibility",
      description: "Enhanced customer trust",
    },
  ]

  const stats = [
    { number: "10K+", label: "Trademarks Filed", icon: <Stamp className="h-5 w-5" /> },
    { number: "98%", label: "Success Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "15 Days", label: "Filing Time", icon: <Clock className="h-5 w-5" /> },
    { number: "10 Years", label: "Protection Period", icon: <Shield className="h-5 w-5" /> },
  ]

  const registrationProcess = [
    { step: "Search", duration: "1-2 Days", description: "Comprehensive trademark search" },
    { step: "Application", duration: "3-5 Days", description: "Prepare and file application" },
    { step: "Examination", duration: "12-18 Months", description: "Government examination process" },
    { step: "Publication", duration: "4 Months", description: "Journal publication period" },
    { step: "Registration", duration: "2-3 Months", description: "Final registration certificate" },
  ]

  const trademarkClasses = [
    { class: "1-34", category: "Goods", examples: "Products, merchandise, physical items" },
    { class: "35-45", category: "Services", examples: "Professional services, business services" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Shield className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Trademark Registration</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Protect Your Brand Identity Legally
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              A trademark is a name, logo, slogan, or symbol that identifies your business's goods or services. We make
              brand protection simple and easy, giving you legal ownership of your brand identity and stopping others
              from copying it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href='/contact'>
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
                >
                <Shield className="mr-2 h-5 w-5" />
                Register Trademark
              
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

      {/* What is Trademark Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is Trademark Registration?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Stamp className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Legal Brand Protection</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    Trademark registration is the process of getting the legal right to use your business name, logo,
                    slogan, or symbol exclusively.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This gives you ownership of your brand identity and provides legal protection against unauthorized
                    use by competitors or copycats.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {trademarkTypes.map((type, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-6 text-center mt-4">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                      <div className="text-[#1E1E1E]">{type.icon}</div>
                    </div>
                    <h3 className="font-semibold text-[#1E1E1E] mb-2">{type.title}</h3>
                    <p className="text-sm text-[#1E1E1E] opacity-80 mb-2">{type.description}</p>
                    <p className="text-xs text-[#1E1E1E] opacity-60">{type.example}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Registration Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our streamlined process ensures your trademark registration is handled professionally from start to finish.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {registrationProcess.map((process, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center relative">
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

      {/* Why Trademark is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is Trademark Registration Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Trademark registration provides comprehensive legal protection for your brand, builds customer trust, and
            creates valuable business assets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyTrademarkCrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-[#FFF0C3] shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
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

      {/* Trademark Classes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Trademark Classes</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Trademarks are registered under specific classes based on the type of goods or services your business
            offers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trademarkClasses.map((tmClass, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardContent className="p-8 text-center mt-4">
                  <div className="mx-auto w-20 h-20 bg-[#F7C430] rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-[#1E1E1E]">{tmClass.class}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-4">{tmClass.category}</h3>
                  <p className="text-[#1E1E1E] leading-relaxed">{tmClass.examples}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Protection Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Protection Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Trademark registration provides comprehensive protection and valuable benefits for your business brand.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {protectionBenefits.map((benefit, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{benefit.title}</h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{benefit.description}</p>
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
            We make brand protection simple and easy, handling all the complex legal processes for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardHeader>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Who Needs This Service?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Any business, big or small, that wants to protect its unique brand name, logo, or slogan from unauthorized
            use.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((type, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{type.icon}</div>
                  </div> 
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{type.title}</h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{type.description}</p>
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
