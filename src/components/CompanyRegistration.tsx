import {
  Building,
  Shield,
  TrendingUp,
  FileText,
  Phone,
  Clock,
  Award,
  Target,
  CreditCard,
  Calculator,
  Briefcase,
  Upload,
  CheckCircle,
  UserCheck,
  Zap,
  Users,
  Lock,
  Banknote,
  Scale,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CompanyRegistrationLanding() {
  const whyCompanyRegistrationCrucial = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Protects You",
      description:
        "It protects you from personal liability. This means if the business has debt, your personal assets like your house or car are safe.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Builds Credibility",
      description:
        "A registered company has more credibility. It makes it easier to get bank loans, attract investors, and do business with other companies.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Easier to Grow",
      description:
        "It allows you to raise money from investors and makes it easier to expand your business in the future.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Legal Identity",
      description: "The company can own property, have a bank account, and enter into contracts in its own name.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Company Type Selection",
      description: "Helping you choose the right type of company for your business needs and goals.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Legal Documentation",
      description: "Handling all the complex legal paperwork and government filings required for registration.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Name Approval & Incorporation",
      description:
        "Getting your company's name approved and obtaining all necessary documents like Certificate of Incorporation.",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Post-Registration Guidance",
      description: "Providing comprehensive guidance on what to do after the company is successfully registered.",
    },
  ]

  const companyTypes = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Private Limited",
      description: "Most popular for startups & SMEs",
      features: ["2-200 shareholders", "Limited liability", "Separate legal entity"],
      minDirectors: "2 Directors",
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: "One Person Company",
      description: "Perfect for solo entrepreneurs",
      features: ["Single member company", "Limited liability", "Professional credibility"],
      minDirectors: "1 Director",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Limited Liability Partnership",
      description: "Ideal for professional services",
      features: ["2+ partners", "Flexible management", "Tax benefits"],
      minDirectors: "2 Partners",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Partnership Firm",
      description: "Simple business structure",
      features: ["2-20 partners", "Easy formation", "Shared profits"],
      minDirectors: "2 Partners",
    },
  ]

  const registrationBenefits = [
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Asset Protection",
      description: "Personal assets remain safe from business liabilities",
    },
    {
      icon: <Banknote className="h-5 w-5" />,
      title: "Easy Funding",
      description: "Attract investors and secure business loans",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Professional Image",
      description: "Enhanced credibility with clients and partners",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Growth Opportunities",
      description: "Easier business expansion and scaling",
    },
  ]

  const businessSectors = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Tech Startups",
      description: "Software, apps, and technology ventures",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Professional Services",
      description: "Consulting, legal, accounting firms",
    },
    {
      icon: <Building className="h-5 w-5" />,
      title: "Manufacturing",
      description: "Production and industrial businesses",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "E-commerce",
      description: "Online retail and digital businesses",
    },
  ]

  const stats = [
    { number: "15K+", label: "Companies Registered", icon: <Building className="h-5 w-5" /> },
    { number: "7 Days", label: "Average Registration Time", icon: <Clock className="h-5 w-5" /> },
    { number: "99%", label: "Success Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "24/7", label: "Expert Support", icon: <UserCheck className="h-5 w-5" /> },
  ]

  const registrationProcess = [
    { step: "Name Reservation", duration: "1-2 Days", description: "Reserve your company name" },
    { step: "Document Preparation", duration: "2-3 Days", description: "Prepare incorporation documents" },
    { step: "Government Filing", duration: "3-5 Days", description: "File with ROC and get approvals" },
    { step: "Certificate Issuance", duration: "1-2 Days", description: "Receive incorporation certificate" },
  ]

  const requiredDocuments = [
    { document: "PAN Card", description: "All directors and shareholders" },
    { document: "Aadhaar Card", description: "Identity proof for all parties" },
    { document: "Address Proof", description: "Registered office address proof" },
    { document: "Passport Photos", description: "Recent photographs of directors" },
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Company Registration</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Start Your Business Legally & Professionally
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              Company registration is the official process of starting your business and making it a legal entity. We
              make company registration simple and quick, giving your business its own identity separate from you as the
              owner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Building className="mr-2 h-5 w-5" />
                Register Company
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Check Name Availability
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

      {/* What is Company Registration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is Company Registration?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Scale className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Legal Business Formation</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    Company registration is the official process of starting your business and making it a legal entity
                    with its own identity, separate from you as the owner.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This could be a Private Limited Company, One Person Company, or LLP, each offering different
                    benefits for business growth and legal protection.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Required Documents</h3>
              {requiredDocuments.map((doc, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-[#1E1E1E]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E1E1E]">{doc.document}</h4>
                          <p className="text-sm text-[#1E1E1E] opacity-80">{doc.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Choose Your Company Type</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We help you choose the right type of company structure based on your business needs, growth plans, and
            operational requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyTypes.map((type, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <div className="text-[#1E1E1E]">{type.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{type.title}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{type.description}</p>
                      <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-4">{type.minDirectors}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {type.features.map((feature, featureIndex) => (
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

      {/* Registration Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Registration Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our streamlined process ensures your company registration is completed quickly and efficiently.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {registrationProcess.map((process, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg text-center relative">
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

      {/* Why Company Registration is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is Company Registration Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Company registration provides legal protection, business credibility, and growth opportunities that are
            essential for long-term success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyCompanyRegistrationCrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
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

      {/* Registration Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key Registration Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Registered companies enjoy numerous advantages that help accelerate business growth and provide legal
            security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {registrationBenefits.map((benefit, index) => (
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
            We make company registration simple and quick, handling all complex legal processes for you.
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
            Entrepreneurs who want to start a new business, protect their personal assets, and grow their company with a
            professional and legal structure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSectors.map((sector, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{sector.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{sector.title}</h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{sector.description}</p>
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
