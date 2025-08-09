import {
  Award,
  Shield,
  TrendingUp,
  FileText,
  Phone,
  Clock,
  Target,
  Calculator,
  Briefcase,
  Upload,
  CheckCircle,
  Zap,
  Lock,
  Globe,
  Settings,
  Users,
  Building2,
  Star,
  Gauge,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ISORegistrationLanding() {
  const whyISOCrucial = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Builds Trust",
      description:
        "ISO certification shows your customers that you have a strong commitment to quality and consistency. It builds trust and loyalty in your brand.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Better Business",
      description:
        "Many large companies and government tenders require ISO certification, so it can open up new business opportunities for you.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Gauge className="h-6 w-6" />,
      title: "Improves Efficiency",
      description:
        "Following ISO standards can help you improve your business processes, reduce waste, and increase efficiency.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Recognition",
      description:
        "It's an internationally recognized mark of quality that improves your brand's image and credibility worldwide.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Standard Selection",
      description: "Helping you understand the right ISO standard for your business (e.g., ISO 9001 for quality).",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Process Guidance",
      description: "Guiding you on what changes to make in your business processes to meet the standards.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Documentation & Certification",
      description: "Handling all the paperwork and working with the certification body on your behalf.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Smooth Certification",
      description: "Ensuring a smooth and quick certification process with expert guidance throughout.",
    },
  ]

  const isoStandards = [
    {
      icon: <Award className="h-5 w-5" />,
      standard: "ISO 9001",
      title: "Quality Management",
      description: "Quality management systems for consistent products/services",
      benefits: ["Customer satisfaction", "Process improvement", "Continuous monitoring"],
      industries: "All industries",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      standard: "ISO 14001",
      title: "Environmental Management",
      description: "Environmental management systems for sustainability",
      benefits: ["Environmental compliance", "Waste reduction", "Energy efficiency"],
      industries: "Manufacturing, Construction",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      standard: "ISO 27001",
      title: "Information Security",
      description: "Information security management systems",
      benefits: ["Data protection", "Risk management", "Compliance assurance"],
      industries: "IT, Healthcare, Finance",
    },
    {
      icon: <Users className="h-5 w-5" />,
      standard: "ISO 45001",
      title: "Occupational Health & Safety",
      description: "Workplace health and safety management systems",
      benefits: ["Worker safety", "Risk reduction", "Legal compliance"],
      industries: "Manufacturing, Construction",
    },
  ]

  const certificationBenefits = [
    {
      icon: <Star className="h-5 w-5" />,
      title: "Enhanced Reputation",
      description: "Internationally recognized quality mark",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Business Growth",
      description: "Access to new markets and opportunities",
    },
    {
      icon: <Gauge className="h-5 w-5" />,
      title: "Operational Excellence",
      description: "Improved processes and efficiency",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Risk Management",
      description: "Better risk identification and control",
    },
  ]

  const businessSectors = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Manufacturing",
      description: "Quality control and process optimization",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Service Companies",
      description: "Service quality and customer satisfaction",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "IT & Technology",
      description: "Information security and data protection",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Healthcare",
      description: "Patient safety and quality care standards",
    },
  ]

  const stats = [
    { number: "5K+", label: "ISO Certifications", icon: <Award className="h-5 w-5" /> },
    { number: "90 Days", label: "Average Certification Time", icon: <Clock className="h-5 w-5" /> },
    { number: "98%", label: "Success Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "3 Years", label: "Certificate Validity", icon: <Shield className="h-5 w-5" /> },
  ]

  const certificationProcess = [
    { step: "Gap Analysis", duration: "1-2 Weeks", description: "Assess current processes against ISO standards" },
    { step: "Documentation", duration: "4-6 Weeks", description: "Develop required policies and procedures" },
    { step: "Implementation", duration: "6-8 Weeks", description: "Implement new processes and train staff" },
    { step: "Audit & Certification", duration: "2-3 Weeks", description: "External audit and certificate issuance" },
  ]

  const qualityImprovements = [
    { metric: "Customer Satisfaction", improvement: "+25%", description: "Higher customer retention rates" },
    { metric: "Process Efficiency", improvement: "+30%", description: "Reduced waste and improved productivity" },
    { metric: "Market Access", improvement: "+40%", description: "Access to new business opportunities" },
    { metric: "Brand Value", improvement: "+35%", description: "Enhanced reputation and credibility" },
  ]

  const complianceRequirements = [
    {
      requirement: "Document Control",
      description: "Systematic management of all quality documents",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      requirement: "Process Monitoring",
      description: "Regular monitoring and measurement of processes",
      icon: <Gauge className="h-4 w-4" />,
    },
    {
      requirement: "Continuous Improvement",
      description: "Ongoing improvement of quality management system",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      requirement: "Management Review",
      description: "Regular management review of system effectiveness",
      icon: <Users className="h-4 w-4" />,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Award className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">ISO Registration</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              International Quality Standards Certification
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              ISO stands for International Organization for Standardization. It's a set of international standards that
              shows your business follows high-quality processes and practices. When you get an ISO certification, it
              means an outside expert has verified that your business meets these high standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Award className="mr-2 h-5 w-5" />
                Get ISO Certified
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Check Readiness
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

      {/* What is ISO Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">What is ISO Registration?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Star className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">International Quality Standards</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    ISO (International Organization for Standardization) certification demonstrates that your business
                    follows internationally recognized quality management systems and best practices.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    An independent certification body verifies that your organization meets specific ISO standards,
                    providing third-party validation of your commitment to quality and excellence.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Key Compliance Requirements</h3>
              {complianceRequirements.map((req, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                        <div className="text-[#1E1E1E]">{req.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">{req.requirement}</h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{req.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ISO Standards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Popular ISO Standards</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Choose the right ISO standard for your business needs. Each standard focuses on specific aspects of quality
            management and operational excellence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isoStandards.map((standard, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <div className="text-[#1E1E1E]">{standard.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">{standard.standard}</Badge>
                        <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{standard.industries}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{standard.title}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{standard.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#1E1E1E] mb-2">Key Benefits:</h4>
                    {standard.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#F7C430]" />
                        <span className="text-sm text-[#1E1E1E]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Improvements Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Proven Quality Improvements
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            ISO certified organizations consistently demonstrate measurable improvements across key business metrics and
            operational performance indicators.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityImprovements.map((improvement, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <TrendingUp className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{improvement.metric}</h3>
                  <div className="text-3xl font-bold text-[#F7C430] mb-2">{improvement.improvement}</div>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{improvement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Certification Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our structured approach ensures your ISO certification is achieved efficiently with minimal disruption to
            your business operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {certificationProcess.map((process, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center relative">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{process.step}</h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">{process.duration}</Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">{process.description}</p>
                </CardContent>
                {index < certificationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why ISO is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is ISO Registration Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            ISO certification provides comprehensive benefits that enhance business credibility, operational efficiency,
            and market competitiveness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyISOCrucial.map((reason, index) => (
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

      {/* Certification Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key Certification Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            ISO certification delivers measurable improvements across all aspects of business operations and market
            positioning.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationBenefits.map((benefit, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How We Help You Every Step of the Way
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We make the ISO registration process simple for you, providing expert guidance and comprehensive support
            throughout your certification journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Who Needs ISO Certification?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Businesses that want to improve their quality, gain customer trust, and get a competitive edge in the
            market.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSectors.map((sector, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
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
