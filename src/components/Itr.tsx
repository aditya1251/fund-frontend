import {
  Calculator,
  Shield,
  Users,
  FileText,
  CheckCircle,
  Phone,
  DollarSign,
  Clock,
  Award,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Plane,
  Building,
  Receipt,
  Target,
  Briefcase,
  PiggyBank,
  Search,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ITRServicesLanding() {
  const whyITRCrucial = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "It's the Law",
      description:
        "Filing your ITR is a legal duty for every eligible person. Not filing can lead to fines and legal issues.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Get Your Refund",
      description:
        "If you have paid more tax than required, filing an ITR is the only way to get that extra money back as a refund.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Proof of Income",
      description:
        "Your ITR acts as a very important document that proves your income. It is often required when you apply for a loan, a credit card, or a visa.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Avoids Penalties",
      description: "Filing your ITR on time helps you avoid paying interest and penalties on unpaid taxes.",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Document Collection",
      description:
        "Collect all the necessary documents from you, such as Form 16, salary slips, and investment proofs.",
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "Income Calculation",
      description: "Calculate your total income and figure out all the deductions you can claim to save tax.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "ITR Preparation & Filing",
      description: "Prepare and file your ITR correctly and on time, making sure there are no mistakes.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Status Tracking",
      description: "Help you track the status of your filing and your tax refund.",
    },
  ]

  const incomeTypes = [
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Salary Income",
      description: "Employment & professional income",
    },
    {
      icon: <Building className="h-5 w-5" />,
      title: "Business Income",
      description: "Business profits & professional fees",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Investment Income",
      description: "Capital gains & dividend income",
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      title: "Rental Income",
      description: "Property rental & house income",
    },
  ]

  const useCases = [
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Loan Applications",
      description: "Required for home, car, and personal loans",
    },
    {
      icon: <Plane className="h-5 w-5" />,
      title: "Visa Applications",
      description: "Essential for foreign visa processing",
    },
    {
      icon: <PiggyBank className="h-5 w-5" />,
      title: "Tax Refunds",
      description: "Claim excess tax paid during the year",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Legal Compliance",
      description: "Avoid penalties and legal complications",
    },
  ]

  const stats = [
    { number: "50K+", label: "ITRs Filed", icon: <FileText className="h-5 w-5" /> },
    { number: "₹2Cr+", label: "Refunds Processed", icon: <DollarSign className="h-5 w-5" /> },
    { number: "99.8%", label: "Accuracy Rate", icon: <Target className="h-5 w-5" /> },
    { number: "24hrs", label: "Turnaround Time", icon: <Clock className="h-5 w-5" /> },
  ]

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">ITR Services</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Income Tax Return Made Simple
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              ITR stands for Income Tax Return. It's a form you must file every year with the Income Tax Department of
              India. We take the stress out of filing your taxes with our expert services, ensuring compliance and
              maximizing your refunds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href='/contact'>
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                File My ITR Now
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

      {/* What is ITR Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">What is ITR?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <FileText className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Annual Tax Declaration</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    ITR is a form where you provide details of all your income from different sources, like your salary,
                    business, rent, or investments.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    It's how you officially report your earnings and the tax you've paid to the government, ensuring
                    legal compliance and claiming rightful refunds.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {incomeTypes.map((type, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-6 text-center mt-4">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                      <div className="text-[#1E1E1E]">{type.icon}</div>
                    </div>
                    <h3 className="font-semibold text-[#1E1E1E] mb-2">{type.title}</h3>
                    <p className="text-sm text-[#1E1E1E] opacity-80">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why ITR is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Why is ITR Crucial?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Filing your Income Tax Return is not just about compliance - it's about protecting your financial interests
            and securing your future opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyITRCrucial.map((reason, index) => (
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

      {/* Use Cases Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">When You Need Your ITR</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Your ITR serves as crucial documentation for various financial and legal requirements throughout the year.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{useCase.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{useCase.title}</h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{useCase.description}</p>
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
            We take the stress out of filing your taxes. Our experts will handle everything for you with precision and
            care.
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8">Who Needs This Service?</h2>
          <Card className="border-[#FFF0C3] shadow-lg">
            <CardContent className="p-8 mt-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-2 bg-[#F7C430] rounded-lg">
                  <Users className="h-6 w-6 text-[#1E1E1E]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E1E1E]">Eligible Taxpayers</h3>
              </div>
              <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                Anyone whose total income is above the basic exemption limit, or someone who needs to apply for a loan
                or visa, even if their income is below the limit.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-[#FFF0C3] rounded-lg">
                  <h4 className="font-semibold text-[#1E1E1E] mb-2">Salaried Employees</h4>
                  <p className="text-sm text-[#1E1E1E]">Income above ₹2.5 lakhs</p>
                </div>
                <div className="p-4 bg-[#FFF0C3] rounded-lg">
                  <h4 className="font-semibold text-[#1E1E1E] mb-2">Business Owners</h4>
                  <p className="text-sm text-[#1E1E1E]">Any business income</p>
                </div>
                <div className="p-4 bg-[#FFF0C3] rounded-lg">
                  <h4 className="font-semibold text-[#1E1E1E] mb-2">Investors</h4>
                  <p className="text-sm text-[#1E1E1E]">Capital gains & dividends</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
    
     
    </div>
  )
}
