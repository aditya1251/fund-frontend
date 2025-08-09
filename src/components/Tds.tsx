import {
  Calculator,
  Shield,
  FileText,
  Phone,
  Building,
  Clock,
  Award,
  AlertTriangle,
  Calendar,
  Target,
  Briefcase,
  Receipt,
  Download,
  Upload,
  CreditCard,
  UserCheck,
  BookOpen,
  Zap,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function TDSReturnFilingLanding() {
  const whyTDSCrucial = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "It's Mandatory",
      description: "Filing TDS returns is a legal requirement for businesses and individuals who deduct tax.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Benefits for Payee",
      description:
        "It allows the person from whom tax was deducted to claim their tax credit, which is crucial for their own tax filing.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Avoids Fines",
      description: "Filing on time is very important to avoid heavy fines and interest payments for late filing.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Builds Trust",
      description: "It shows that your business is compliant and responsible, which builds a good reputation.",
      color: "bg-green-100 text-green-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "TDS Management",
      description: "Manage all your TDS deductions and payments to the government with accuracy and timeliness.",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Return Preparation",
      description: "Prepare the accurate quarterly TDS returns (Form 24Q, 26Q, etc.) for you with zero errors.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Timely Filing",
      description: "File the returns on time with the Income Tax Department to avoid penalties and interest.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Certificate Generation",
      description: "Help you generate and issue TDS certificates (like Form 16 or 16A) to your employees or vendors.",
    },
  ]

  const tdsTypes = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Salary TDS",
      description: "Form 24Q - Employee salary deductions",
      form: "24Q",
    },
    {
      icon: <Building className="h-5 w-5" />,
      title: "Non-Salary TDS",
      description: "Form 26Q - Professional fees, rent, etc.",
      form: "26Q",
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      title: "TCS Returns",
      description: "Form 27Q - Tax Collected at Source",
      form: "27Q",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Lower Deduction",
      description: "Form 27EQ - Lower/Nil deduction certificate",
      form: "27EQ",
    },
  ]

  const complianceFeatures = [
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Quarterly Filing",
      description: "Regular quarterly compliance management",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Zero Penalties",
      description: "Avoid fines with timely submissions",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Auto Reconciliation",
      description: "Automatic matching and verification",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Quick Processing",
      description: "Fast turnaround for urgent filings",
    },
  ]

  const businessTypes = [
    {
      icon: <Building className="h-5 w-5" />,
      title: "Companies",
      description: "Private & public limited companies",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Partnerships",
      description: "Partnership firms & LLPs",
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: "Proprietorships",
      description: "Individual business owners",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Professionals",
      description: "Doctors, lawyers, consultants",
    },
  ]

  const stats = [
    { number: "10K+", label: "TDS Returns Filed", icon: <FileText className="h-5 w-5" /> },
    { number: "100%", label: "On-Time Filing", icon: <Clock className="h-5 w-5" /> },
    { number: "₹50Cr+", label: "TDS Processed", icon: <Calculator className="h-5 w-5" /> },
    { number: "Zero", label: "Penalty Cases", icon: <Shield className="h-5 w-5" /> },
  ]

  const quarters = [
    { quarter: "Q1", period: "Apr-Jun", dueDate: "31st July" },
    { quarter: "Q2", period: "Jul-Sep", dueDate: "31st October" },
    { quarter: "Q3", period: "Oct-Dec", dueDate: "31st January" },
    { quarter: "Q4", period: "Jan-Mar", dueDate: "31st May" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Receipt className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">TDS Return Filing</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Quarterly Compliance Made Simple
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              TDS stands for Tax Deducted at Source. A TDS return is the quarterly report that businesses must file with
              the government. We make TDS compliance simple, accurate, and timely for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                File TDS Return
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate TDS
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

      {/* What is TDS Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is TDS Return Filing?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Receipt className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Quarterly Tax Reporting</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    TDS is a system where a person or company that makes a payment deducts a small amount as tax and
                    pays it directly to the government.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    A TDS return is the report that the person who deducted the tax must file with the government every
                    three months, ensuring proper tax compliance and credit allocation.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {tdsTypes.map((type, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                      <div className="text-[#1E1E1E]">{type.icon}</div>
                    </div>
                    <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-2">{type.form}</Badge>
                    <h3 className="font-semibold text-[#1E1E1E] mb-2">{type.title}</h3>
                    <p className="text-sm text-[#1E1E1E] opacity-80">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quarterly Schedule Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            TDS Filing Schedule 2024-25
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Stay compliant with quarterly TDS return filing deadlines. Missing these dates can result in heavy penalties
            and interest charges.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quarters.map((quarter, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-[#1E1E1E]">{quarter.quarter}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">{quarter.period}</h3>
                  <p className="text-sm text-[#1E1E1E] opacity-80 mb-3">Filing Period</p>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF]">Due: {quarter.dueDate}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why TDS is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Why is TDS Filing Crucial?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            TDS compliance is not optional - it's a legal requirement that affects your business reputation, employee
            relations, and financial standing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyTDSCrucial.map((reason, index) => (
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

      {/* Compliance Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Our Compliance Features</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We provide comprehensive TDS compliance solutions that ensure accuracy, timeliness, and peace of mind for
            your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFeatures.map((feature, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{feature.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{feature.title}</h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{feature.description}</p>
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
            Our experts make TDS compliance simple for you. We handle everything from deduction management to
            certificate generation.
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
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Who Needs This Service?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Businesses and individuals who have deducted tax from payments made to others need to file TDS returns
            quarterly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((type, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
                <CardContent className="p-6">
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
