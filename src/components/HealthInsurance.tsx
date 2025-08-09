import {
  Heart,
  Shield,
  Users,
  Stethoscope,
  Cross,
  CreditCard,
  FileText,
  CheckCircle,
  Phone,
  MessageCircle,
  Calculator,
  Hospital,
  Ambulance,
  PiggyBank,
  Receipt,
  UserCheck,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HealthInsuranceLanding() {
  const healthBenefits = [
    {
      icon: <Hospital className="h-6 w-6" />,
      title: "Covers Hospital Bills",
      description:
        "It pays for your hospital stay, surgery, and other treatments, so you don't have to worry about huge bills.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <PiggyBank className="h-6 w-6" />,
      title: "Saves Your Money",
      description: "It protects your hard-earned savings from being used up by unexpected medical emergencies.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Cashless Treatment",
      description:
        "With many policies, you can get treated at a hospital without paying anything upfront. The insurance company settles the bill directly.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Receipt className="h-6 w-6" />,
      title: "Tax Benefits",
      description: "You can also get tax benefits on the premium you pay for your health insurance.",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const serviceFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "We Understand Your Needs",
      description:
        "We listen to your family's health needs, age, and budget to find a plan that is the perfect fit for you.",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Simple Language",
      description:
        "We'll explain everything in simple, easy-to-understand language. We'll help you compare different plans, so you can make a smart choice.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trustworthy Advice",
      description:
        "Our experts give you honest and clear advice, without any pressure. We want you to feel confident and secure in your decision.",
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Easy to Manage",
      description:
        "Once you have your policy, we are here to help you with any questions or claims, making sure the process is smooth and stress-free.",
    },
  ]

  const coverageAreas = [
    {
      icon: <Stethoscope className="h-5 w-5" />,
      title: "Doctor Consultations",
      description: "Regular checkups & specialist visits",
    },
    {
      icon: <Hospital className="h-5 w-5" />,
      title: "Hospitalization",
      description: "Room charges & medical procedures",
    },
    {
      icon: <Ambulance className="h-5 w-5" />,
      title: "Emergency Care",
      description: "Ambulance & emergency treatments",
    },
    {
      icon: <Cross className="h-5 w-5" />,
      title: "Medicines",
      description: "Prescribed medications & pharmacy",
    },
  ]

  const stats = [
    { number: "24/7", label: "Medical Support" },
    { number: "5000+", label: "Network Hospitals" },
    { number: "98%", label: "Claim Settlement" },
    { number: "2 Mins", label: "Policy Approval" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Cross className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Health Insurance</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Protecting Your Family's Health and Happiness
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              Your family's health is the most important thing. When a medical emergency happens, the last thing you
              should have to worry about is money. Health insurance gives you the peace of mind that you can get the
              best medical care without it becoming a financial burden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Shield className="mr-2 h-5 w-5" />
                Get Protected Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Compare Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1E1E1E]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-[#FFFFFF]">
                <div className="text-3xl sm:text-4xl font-bold text-[#F7C430] mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is Health Insurance Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">What is Health Insurance?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Heart className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">A Promise of Protection</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    Health insurance is a promise from a company that it will pay for your medical bills if you or your
                    family get sick or have an accident.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    You pay a small amount of money (called a premium) every year, and in return, the company covers
                    your hospital costs, doctor fees, and other medical expenses. It's a small investment to protect
                    your family from very large and unexpected medical bills.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {coverageAreas.map((area, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                      <div className="text-[#1E1E1E]">{area.icon}</div>
                    </div>
                    <h3 className="font-semibold text-[#1E1E1E] mb-2">{area.title}</h3>
                    <p className="text-sm text-[#1E1E1E] opacity-80">{area.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How Health Insurance Helps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How Health Insurance Helps You
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Having health insurance is a smart decision for many reasons:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {healthBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${benefit.color.replace("text-", "text-").replace("bg-", "bg-")}`}>
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">{benefit.title}</h3>
                      <p className="text-[#1E1E1E] leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-[#FFFFFF] border-[#F7C430] shadow-lg inline-block">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-[#F7C430]" />
                  <span className="text-lg font-semibold text-[#1E1E1E]">All benefits in one comprehensive plan</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            We Make Finding the Right Plan Easy
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            With so many plans available, choosing the right one can be confusing. We are here to simplify it for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceFeatures.map((feature, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">{feature.title}</h3>
                      <p className="text-[#1E1E1E] leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">Simple 3-Step Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#1E1E1E]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Tell Us Your Needs</h3>
              <p className="text-[#1E1E1E]">Share your family size, age, and health requirements with our experts.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#1E1E1E]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Compare Plans</h3>
              <p className="text-[#1E1E1E]">We'll show you the best plans that match your needs and budget.</p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#1E1E1E]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Get Protected</h3>
              <p className="text-[#1E1E1E]">
                Complete the simple application and get instant coverage for your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
       
    </div>
  )
}
