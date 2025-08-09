import {
  Shield,
  Award,
  Scale,
  FileText,
  Phone,
  Clock,
  Target,
  Calculator,
  Upload,
  CheckCircle,
  Lock,
  Users,
  Building2,
  Star,
  ChefHat,
  Store,
  Truck,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FSSAIRegistrationLanding() {
  const whyFSSAICrucial = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "It's the Law",
      description:
        "Having an FSSAI license is mandatory to operate a food business in India. Operating without one can lead to heavy fines and even closure of your business.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Builds Customer Trust",
      description:
        "The FSSAI logo on your products or shop shows customers that your food is safe, hygienic, and follows all government standards.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Business Credibility",
      description:
        "It gives your business a professional and trustworthy image, which is very important in the food industry.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Legal Protection",
      description:
        "Protects your business from legal issues and ensures compliance with food safety regulations and standards.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "License Type Selection",
      description: "Help you figure out which type of FSSAI registration you need (Basic, State, or Central License).",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation & Application",
      description: "Handle all the paperwork and fill out the online application form correctly for you.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Follow-up & Processing",
      description: "Follow up with the FSSAI department to make sure your license is issued without any delays.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Compliance Guidance",
      description: "Guide you on the rules and regulations you need to follow after getting your license.",
    },
  ]

  const fssaiLicenseTypes = [
    {
      icon: <Home className="h-5 w-5" />,
      type: "Basic Registration",
      title: "Small Food Businesses",
      description: "For businesses with annual turnover up to ₹12 lakhs",
      features: ["Home-based food businesses", "Small retailers", "Hawkers & vendors", "Petty manufacturers"],
      validity: "1-5 Years",
      fee: "₹100",
    },
    {
      icon: <Store className="h-5 w-5" />,
      type: "State License",
      title: "Medium Food Businesses",
      description: "For businesses with annual turnover ₹12 lakhs to ₹20 crores",
      features: ["Restaurants & cafes", "Food manufacturers", "Distributors", "Storage & warehouses"],
      validity: "1-5 Years",
      fee: "₹2,000-5,000",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      type: "Central License",
      title: "Large Food Businesses",
      description: "For businesses with annual turnover above ₹20 crores",
      features: ["Large manufacturers", "Importers & exporters", "Multi-state operations", "Food additives"],
      validity: "1-5 Years",
      fee: "₹7,500+",
    },
  ]

  const foodBusinessTypes = [
    {
      icon: <ChefHat className="h-5 w-5" />,
      title: "Restaurants & Cafes",
      description: "Dining establishments and food service providers",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Food Manufacturers",
      description: "Food processing and manufacturing units",
    },
    {
      icon: <Truck className="h-5 w-5" />,
      title: "Food Trucks & Vendors",
      description: "Mobile food businesses and street vendors",
    },
    {
      icon: <Home className="h-5 w-5" />,
      title: "Home-based Businesses",
      description: "Home bakers and online food sellers",
    },
  ]

  const complianceBenefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Food Safety Assurance",
      description: "Ensures food safety and hygiene standards",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Brand Recognition",
      description: "Official FSSAI logo builds customer confidence",
    },
    {
      icon: <Scale className="h-5 w-5" />,
      title: "Legal Compliance",
      description: "Meets all regulatory requirements",
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Market Access",
      description: "Access to larger markets and platforms",
    },
  ]

  const stats = [
    { number: "10K+", label: "FSSAI Licenses Issued", icon: <Shield className="h-5 w-5" /> },
    { number: "15 Days", label: "Average Processing Time", icon: <Clock className="h-5 w-5" /> },
    { number: "99%", label: "Approval Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "5 Years", label: "Maximum Validity", icon: <Award className="h-5 w-5" /> },
  ]

  const registrationProcess = [
    { step: "Business Assessment", duration: "1 Day", description: "Evaluate business type and turnover" },
    { step: "Document Collection", duration: "2-3 Days", description: "Gather required documents and certificates" },
    { step: "Online Application", duration: "1 Day", description: "Submit application on FSSAI portal" },
    { step: "License Issuance", duration: "7-15 Days", description: "Receive FSSAI license certificate" },
  ]

  const requiredDocuments = [
    {
      document: "Form B Application",
      description: "Completed FSSAI application form",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      document: "Identity & Address Proof",
      description: "Aadhaar, PAN card, and address proof",
      icon: <Users className="h-4 w-4" />,
    },
    {
      document: "Food Safety Plan",
      description: "Food safety management system plan",
      icon: <Shield className="h-4 w-4" />,
    },
    {
      document: "NOC Certificates",
      description: "No objection certificates from local authorities",
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ]

  const safetyStandards = [
    { standard: "Hygiene Practices", description: "Proper food handling and storage procedures" },
    { standard: "Quality Control", description: "Regular testing and quality assurance measures" },
    { standard: "Labeling Requirements", description: "Accurate product labeling and ingredient disclosure" },
    { standard: "Traceability Systems", description: "Food source tracking and recall procedures" },
  ]

  const penaltyRisks = [
    { violation: "Operating without license", penalty: "₹25,000 fine + closure" },
    { violation: "Selling unsafe food", penalty: "₹1 lakh fine + imprisonment" },
    { violation: "Misleading advertisements", penalty: "₹10 lakh fine" },
    { violation: "Non-compliance with standards", penalty: "₹5 lakh fine + license cancellation" },
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">FSSAI Registration</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Food Safety License for Your Business
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              FSSAI stands for Food Safety and Standards Authority of India. It's a license or registration that is
              legally required for any business that deals with food. This includes everything from a small home-based
              food business to a large restaurant, hotel, or food factory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Shield className="mr-2 h-5 w-5" />
                Get FSSAI License
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Check Requirements
              </Button>
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

      {/* What is FSSAI Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is FSSAI Registration?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <ChefHat className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Food Safety License</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    FSSAI (Food Safety and Standards Authority of India) registration is a mandatory license for any
                    business involved in food manufacturing, processing, distribution, or sale.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This license ensures that your food business complies with food safety standards and regulations,
                    protecting both consumers and your business from legal issues.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Required Documents</h3>
              {requiredDocuments.map((doc, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                        <div className="text-[#1E1E1E]">{doc.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">{doc.document}</h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{doc.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FSSAI License Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">FSSAI License Types</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Choose the right FSSAI license based on your business size, annual turnover, and operational scope.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fssaiLicenseTypes.map((license, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                      <div className="text-[#1E1E1E]">{license.icon}</div>
                    </div>
                    <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-2 text-xs">{license.type}</Badge>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{license.title}</h3>
                    <p className="text-[#1E1E1E] opacity-80 mb-4">{license.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">Validity: {license.validity}</Badge>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">Fee: {license.fee}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#1E1E1E] mb-2">Applicable for:</h4>
                    {license.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#F7C430]" />
                        <span className="text-sm text-[#1E1E1E]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Penalty Risks Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Risks of Non-Compliance</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Operating without FSSAI license or violating food safety standards can result in severe penalties and
            business closure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {penaltyRisks.map((risk, index) => (
              <Card key={index} className="border-red-200 bg-red-50 hover:border-red-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Scale className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 mb-2">{risk.violation}</h3>
                      <p className="text-red-700 font-medium">{risk.penalty}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Registration Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our streamlined process ensures your FSSAI license is obtained quickly and efficiently with complete
            compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {registrationProcess.map((process, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center relative">
                <CardContent className="p-6">
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

      {/* Why FSSAI is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is FSSAI Registration Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            FSSAI registration is not just a legal requirement but essential for building customer trust and ensuring
            business sustainability in the food industry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyFSSAICrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-[#FFF0C3] shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8">
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

      {/* Safety Standards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Food Safety Standards</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            FSSAI registration ensures compliance with comprehensive food safety standards and quality requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyStandards.map((standard, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Shield className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{standard.standard}</h3>
                      <p className="text-[#1E1E1E] opacity-80">{standard.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key Compliance Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            FSSAI registration provides comprehensive benefits that enhance food business credibility and market access.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBenefits.map((benefit, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6">
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
            We make FSSAI registration simple and quick, handling all complex processes for seamless license approval.
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Who Needs FSSAI Registration?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Anyone running a food business, including restaurants, cafes, hotels, food trucks, home-based bakers, online
            food sellers, and manufacturers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {foodBusinessTypes.map((business, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6">
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
