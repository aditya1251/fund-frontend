import {
  Heart,
  Shield,
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  Phone,
  MessageCircle,
  FileText,
  Calculator,
  Baby,
  GraduationCap,
  Home,
  Banknote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LifeInsuranceLanding() {
  const insuranceTypes = [
    {
      type: "Term Life Insurance",
      icon: <Clock className="h-8 w-8" />,
      description:
        "The most straightforward and affordable type. It gives you life cover for a specific period of time, like 10, 20, or 30 years.",
      features: [
        "Most affordable option",
        "Large coverage for small price",
        "Perfect for specific time periods",
        "Ideal for loan protection",
      ],
      idealFor:
        "Young families, people with loans, or anyone who wants large cover for a small price for a limited time.",
      badge: "Most Popular",
    },
    {
      type: "Whole Life Insurance",
      icon: <TrendingUp className="h-8 w-8" />,
      description:
        "This type gives you cover for your entire life. It also builds a small amount of money over time, which you can sometimes use while you are still alive.",
      features: [
        "Lifetime coverage guarantee",
        "Builds cash value over time",
        "Can borrow against policy",
        "Premium stays the same",
      ],
      idealFor:
        "People who want lifetime cover and also want to use their policy as a way to save money for the future.",
      badge: "Lifetime Protection",
    },
  ]

  const helpFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "We Listen to You",
      description:
        "We don't just sell policies. We sit down with you to understand your family's needs, your future goals, and your budget.",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Simple Explanations",
      description:
        "We'll explain everything in simple, easy-to-understand language. We'll help you compare different plans and find the one that fits your life perfectly.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trustworthy Advice",
      description:
        "Our experts will give you honest and fair advice, without any pressure. We want you to feel confident in your choice.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Easy to Manage",
      description:
        "Once you have your policy, we'll be here to help you with any questions or changes you need to make.",
    },
  ]

  const protectionAreas = [
    {
      icon: <Home className="h-5 w-5" />,
      title: "Daily Expenses",
      description: "Mortgage, utilities, groceries",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Children's Education",
      description: "School fees, college tuition",
    },
    {
      icon: <Banknote className="h-5 w-5" />,
      title: "Outstanding Debts",
      description: "Loans, credit cards, medical bills",
    },
    {
      icon: <Baby className="h-5 w-5" />,
      title: "Future Security",
      description: "Long-term financial stability",
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
                <Heart className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Life Insurance</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              A Promise of Care for Your Loved Ones
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              Life is a beautiful journey filled with special moments. As you build your life, you also want to make
              sure the people you care about the most are always protected, no matter what happens. Life insurance is
              not just a financial product; it's a promise you make to your family that their future will be secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Shield className="mr-2 h-5 w-5" />
                Get Protected Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Coverage
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What is Life Insurance Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">What is Life Insurance?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    In simple terms, life insurance is a contract between you and an insurance company. You pay a small
                    amount of money (called a premium) every month or year. If something happens to you, the company
                    will give a large sum of money to your family.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This money can help them pay for daily expenses, children's education, or other important costs,
                    ensuring they can continue their lives without financial stress.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {protectionAreas.map((area, index) => (
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

      {/* Types of Life Insurance Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Main Types of Life Insurance
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            There are two main types of life insurance, and understanding them can help you choose the one that's right
            for you.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {insuranceTypes.map((insurance, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-xl hover:shadow-2xl transition-shadow relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] hover:bg-[#E6B429]">{insurance.badge}</Badge>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">{insurance.icon}</div>
                    <CardTitle className="text-2xl text-[#1E1E1E]">{insurance.type}</CardTitle>
                  </div>
                  <p className="text-[#1E1E1E] leading-relaxed">{insurance.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-[#1E1E1E] mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {insurance.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#F7C430] flex-shrink-0" />
                          <span className="text-[#1E1E1E] text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#FFF0C3] p-4 rounded-lg">
                    <h4 className="font-semibold text-[#1E1E1E] mb-2">Who is it for?</h4>
                    <p className="text-[#1E1E1E] text-sm leading-relaxed">{insurance.idealFor}</p>
                  </div>

                  <Button className="w-full bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold">
                    Learn More About {insurance.type}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help You Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">How We Help You</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Choosing the right life insurance can feel confusing, but we are here to be your friendly guide.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {helpFeatures.map((feature, index) => (
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

      {/* CTA Section */}
      
            
    </div>
  )
}
