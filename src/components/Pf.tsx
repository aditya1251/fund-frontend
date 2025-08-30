import { Calendar } from "@/components/ui/calendar"
import {
  Shield,
  Users,
  Scale,
  FileText,
  Phone,
  Clock,
  Target,
  Calculator,
  Upload,
  CheckCircle,
  Heart,
  Building2,
  Banknote,
  Award,
  AlertTriangle,
  UserCheck,
  Briefcase,
  Factory,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PFESICRegistrationLanding() {
  const whyPFESICCrucial = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "It's the Law",
      description:
        "It is a legal requirement for businesses with a certain number of employees to register with PF and ESIC. Non-compliance can result in serious legal consequences.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Employee Welfare",
      description:
        "It shows that you care for your employees' well-being and future, which helps in building a loyal and motivated team.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Avoids Penalties",
      description: "Not registering or filing on time can lead to serious fines and legal problems for your business.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Business Credibility",
      description:
        "Demonstrates your commitment to employee welfare and regulatory compliance, enhancing your business reputation.",
      color: "bg-green-100 text-green-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Registration Setup",
      description: "Helping you get your business registered for PF and ESIC with proper documentation.",
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Contribution Calculation",
      description: "Calculating the monthly contributions for all your employees accurately and on time.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Monthly Returns Filing",
      description: "Preparing and filing the monthly returns for you with complete accuracy.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Compliance Management",
      description: "Ensuring you stay compliant with all the rules and regulations continuously.",
    },
  ]

  const pfesicSchemes = [
    {
      icon: <Banknote className="h-5 w-5" />,
      scheme: "Provident Fund (PF)",
      description: "Retirement savings scheme for employees",
      features: [
        "12% employee contribution + 12% employer contribution",
        "Tax-free retirement corpus",
        "Loan facility against PF balance",
        "Pension scheme (EPS) included",
      ],
      eligibility: "Businesses with 20+ employees",
      benefits: "Retirement Security",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      scheme: "ESIC (Medical Benefits)",
      description: "Medical and cash benefits for employees",
      features: [
        "0.75% employee + 3.25% employer contribution",
        "Free medical treatment",
        "Sickness benefit (70% of wages)",
        "Maternity and disability benefits",
      ],
      eligibility: "Businesses with 10+ employees",
      benefits: "Healthcare Coverage",
    },
  ]

  const complianceRequirements = [
    {
      requirement: "Monthly Returns",
      description: "File monthly PF and ESIC returns by 15th of next month",
      penalty: "₹25,000 fine for late filing",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      requirement: "Annual Returns",
      description: "Submit annual returns and compliance certificates",
      penalty: "₹50,000 fine + legal action",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      requirement: "Contribution Payment",
      description: "Pay employee and employer contributions on time",
      penalty: "12% interest on delayed payments",
      icon: <Banknote className="h-4 w-4" />,
    },
    {
      requirement: "Employee Registration",
      description: "Register new employees within 10 days of joining",
      penalty: "₹1,500 per employee penalty",
      icon: <UserCheck className="h-4 w-4" />,
    },
  ]

  const businessTypes = [
    {
      icon: <Factory className="h-5 w-5" />,
      title: "Manufacturing Units",
      description: "Production and manufacturing businesses",
      threshold: "20+ employees for PF, 10+ for ESIC",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Service Companies",
      description: "IT, consulting, and service providers",
      threshold: "20+ employees for PF, 10+ for ESIC",
    },
    {
      icon: <Store className="h-5 w-5" />,
      title: "Retail Businesses",
      description: "Shops, showrooms, and retail chains",
      threshold: "20+ employees for PF, 10+ for ESIC",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Corporate Offices",
      description: "Head offices and branch operations",
      threshold: "20+ employees for PF, 10+ for ESIC",
    },
  ]

  const employeeBenefits = [
    {
      icon: <Banknote className="h-5 w-5" />,
      title: "Retirement Corpus",
      description: "Tax-free retirement savings with employer contribution",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Medical Coverage",
      description: "Free medical treatment for employee and family",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Maternity Benefits",
      description: "26 weeks paid maternity leave and medical care",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Disability Support",
      description: "Financial support in case of work-related injuries",
    },
  ]

  const stats = [
    { number: "5K+", label: "Companies Registered", icon: <Building2 className="h-5 w-5" /> },
    { number: "15 Days", label: "Registration Time", icon: <Clock className="h-5 w-5" /> },
    { number: "99%", label: "Compliance Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "24/7", label: "Support Available", icon: <Users className="h-5 w-5" /> },
  ]

  const registrationProcess = [
    { step: "Eligibility Assessment", duration: "1 Day", description: "Check employee count and business eligibility" },
    {
      step: "Document Collection",
      duration: "2-3 Days",
      description: "Gather required business and employee documents",
    },
    { step: "Online Registration", duration: "5-7 Days", description: "Submit applications to PF and ESIC offices" },
    { step: "Code Allocation", duration: "7-10 Days", description: "Receive PF and ESIC registration codes" },
  ]

  const contributionRates = [
    {
      scheme: "Provident Fund",
      employee: "12% of Basic Salary",
      employer: "12% of Basic Salary",
      total: "24% of Basic Salary",
    },
    {
      scheme: "ESIC",
      employee: "0.75% of Gross Salary",
      employer: "3.25% of Gross Salary",
      total: "4% of Gross Salary",
    },
  ]

  const penaltyRisks = [
    { violation: "Late PF return filing", penalty: "₹25,000 + ₹100 per day" },
    { violation: "Non-payment of contributions", penalty: "12% annual interest + damages" },
    { violation: "Non-registration of eligible business", penalty: "₹1 lakh fine + imprisonment" },
    { violation: "False information in returns", penalty: "₹50,000 fine + legal action" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Users className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">PF/ESIC Registration</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Employee Social Security & Welfare
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              PF (Provident Fund) and ESIC (Employees' State Insurance Corporation) are two government social security
              schemes for your employees. PF helps your employees save money for their retirement, and ESIC provides
              them with medical benefits and financial support in case of illness or injury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link href='/contact'>
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Register for PF/ESIC
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

      {/* What is PF/ESIC Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is PF/ESIC Registration?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Heart className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Employee Social Security</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    PF and ESIC are mandatory government social security schemes that provide retirement savings and
                    medical benefits to employees, ensuring their financial security and healthcare needs.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    These schemes are legally required for businesses exceeding specific employee thresholds and
                    demonstrate your commitment to employee welfare and regulatory compliance.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Contribution Rates</h3>
              {contributionRates.map((rate, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E] mb-1">{rate.scheme}</h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">
                          Employee: {rate.employee} | Employer: {rate.employer}
                        </p>
                      </div>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E]">{rate.total}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PF/ESIC Schemes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">PF & ESIC Schemes</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Comprehensive social security coverage providing retirement savings and medical benefits for your employees.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pfesicSchemes.map((scheme, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <div className="text-[#1E1E1E]">{scheme.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{scheme.scheme}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{scheme.description}</p>
                      <div className="flex gap-2 mb-4">
                        <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">{scheme.eligibility}</Badge>
                        <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{scheme.benefits}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-[#1E1E1E] mb-2">Key Features:</h4>
                    {scheme.features.map((feature, featureIndex) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Compliance Penalties</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Non-compliance with PF/ESIC regulations can result in severe financial penalties and legal consequences for
            your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {penaltyRisks.map((risk, index) => (
              <Card key={index} className="border-red-200 bg-red-50 hover:border-red-300 transition-colors">
                <CardContent className="p-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
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
            Our streamlined process ensures your PF/ESIC registration is completed efficiently with complete compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* Why PF/ESIC is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is PF/ESIC Registration Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            PF/ESIC registration ensures legal compliance, demonstrates employee care, and protects your business from
            penalties while building a motivated workforce.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyPFESICCrucial.map((reason, index) => (
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

      {/* Employee Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Employee Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            PF/ESIC registration provides comprehensive social security benefits that enhance employee satisfaction and
            retention.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employeeBenefits.map((benefit, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How We Help You Every Step of the Way
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We handle all the complexities of PF and ESIC, ensuring complete compliance and seamless management of your
            employee social security obligations.
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
            Who Needs PF/ESIC Registration?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Businesses that have reached the employee count required by the government for mandatory registration
            (usually 10 or 20 employees, depending on the scheme).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((business, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{business.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{business.title}</h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">{business.description}</p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{business.threshold}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1E1E1E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#FFFFFF] mb-6">
            Ready to Register for PF/ESIC?
          </h2>
          <p className="text-lg text-[#FFFFFF] opacity-80 mb-8 max-w-2xl mx-auto">
            Don't risk penalties or compromise your employees' welfare. Get your PF/ESIC registration done by experts
            and ensure complete compliance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link href='/contact'>
            <Button
              size="lg"
              variant="outline"
              className="border-[#F7C430] text-[#F7C430] hover:bg-[#F7C430] hover:text-[#1E1E1E] px-8 py-4 text-lg bg-transparent"
            >
              <Phone className="mr-2 h-5 w-5" />
              Speak to Expert
            </Button>

            </Link>
          </div>
          <p className="text-sm text-[#FFFFFF] opacity-60 mt-6">
            ✓ Expert guidance ✓ Complete compliance ✓ Ongoing support ✓ Penalty protection
          </p>
        </div>
      </section>
    </div>
  )
}
