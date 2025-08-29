import {
  Home,
  Shield,
  Users,
  Key,
  Heart,
  Flame,
  Droplets,
  ShieldCheck,
  Phone,
  MessageCircle,
  Calculator,
  FileText,
  CheckCircle,
  Sofa,
  Laptop,
  Car,
  Wind,
  UserX,
  Clock,
  Award,
  Headphones,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomeInsuranceLanding() {
  const homeBenefits = [
    {
      icon: <Home className="h-6 w-6" />,
      title: "Protects the Structure",
      description:
        "It covers the cost of repairing or rebuilding your house if it gets damaged by a fire, natural disaster, or other accidents.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Sofa className="h-6 w-6" />,
      title: "Covers Your Belongings",
      description:
        "It pays to replace your furniture, electronics, clothes, and other items inside your home if they are damaged or stolen.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Peace of Mind",
      description:
        "It gives you the comfort of knowing that even if something bad happens, you have the financial help to get back on your feet quickly.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Liability Coverage",
      description: "It can also protect you if someone gets injured on your property and you are legally responsible.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const serviceFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "We Understand Your Needs",
      description:
        "We'll talk with you to understand your home, its value, and the things you want to protect. We'll help you find a plan that is the perfect fit.",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Simple Explanations",
      description:
        "We will explain all the details of the policy in simple, easy-to-understand language. We'll make sure you know exactly what is covered.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trustworthy Advice",
      description:
        "Our experts give you honest and clear advice, without any pressure. We want you to feel confident and secure in your decision.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Easy to Manage",
      description:
        "Once you have your policy, we are here to help you with any questions or claims, making the process smooth and stress-free.",
    },
  ]

  const protectionTypes = [
    {
      icon: <Flame className="h-5 w-5" />,
      title: "Fire Damage",
      description: "Complete fire protection coverage",
    },
    {
      icon: <Droplets className="h-5 w-5" />,
      title: "Water Damage",
      description: "Flood & water leak protection",
    },
    {
      icon: <Wind className="h-5 w-5" />,
      title: "Natural Disasters",
      description: "Storm & weather damage coverage",
    },
    {
      icon: <UserX className="h-5 w-5" />,
      title: "Theft Protection",
      description: "Burglary & theft coverage",
    },
  ]

  const belongingsCategories = [
    {
      icon: <Sofa className="h-5 w-5" />,
      title: "Furniture",
      items: ["Sofas", "Tables", "Beds", "Cabinets"],
    },
    {
      icon: <Laptop className="h-5 w-5" />,
      title: "Electronics",
      items: ["TV", "Computer", "Phone", "Appliances"],
    },
    {
      icon: <Key className="h-5 w-5" />,
      title: "Personal Items",
      items: ["Jewelry", "Clothes", "Books", "Art"],
    },
    {
      icon: <Car className="h-5 w-5" />,
      title: "Outdoor Items",
      items: ["Garden tools", "Bikes", "Outdoor furniture"],
    },
  ]

  const stats = [
    { number: "24/7", label: "Claim Support", icon: <Headphones className="h-5 w-5" /> },
    { number: "48hrs", label: "Claim Processing", icon: <Clock className="h-5 w-5" /> },
    { number: "99.2%", label: "Customer Satisfaction", icon: <Award className="h-5 w-5" /> },
    { number: "100K+", label: "Homes Protected", icon: <Home className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Home className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">HOME INSURANCE</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Protecting Your Happiest Place
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              Your home is more than just a building; it's a place full of memories, comfort, and security for your
              family. It's where you feel safest. Home insurance is your promise to yourself and your family that your
              home will always be protected, no matter what comes its way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              
              <Link href='/contact'>
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Shield className="mr-2 h-5 w-5" />
                Protect My Home
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

      {/* What is Home Insurance Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">What is Home Insurance?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Shield className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Complete Protection Promise</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    Home insurance is a promise from a company that it will pay to repair or rebuild your home and
                    replace your belongings if they are damaged or lost.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    You pay a small amount of money (called a premium) every year, and in return, you get the peace of
                    mind that your home and everything in it is protected.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {protectionTypes.map((type, index) => (
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

      {/* How Home Insurance Helps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How Home Insurance Helps You
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Having home insurance is a smart way to protect your most valuable asset. It offers several key benefits:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8 mt-4">
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
        </div>
      </section>

      {/* Belongings Coverage Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            What's Covered in Your Home
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Your belongings are precious to you. We make sure they're all protected under your home insurance policy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {belongingsCategories.map((category, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-6 mt-4">
                  <div className="text-center mb-4">
                    <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-3">
                      <div className="text-[#1E1E1E]">{category.icon}</div>
                    </div>
                    <h3 className="font-semibold text-[#1E1E1E] text-lg">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#F7C430] flex-shrink-0" />
                        <span className="text-[#1E1E1E] text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            We Make Finding the Right Plan Easy
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Choosing the right home insurance can feel a little confusing, but we are here to simplify it for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceFeatures.map((feature, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardContent className="p-8 mt-4">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            Simple 3-Step Protection Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#1E1E1E]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Tell Us About Your Home</h3>
              <p className="text-[#1E1E1E]">
                Share details about your home's size, location, and the items you want to protect.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#1E1E1E]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Get Your Custom Quote</h3>
              <p className="text-[#1E1E1E]">
                We'll create a personalized insurance plan that fits your home and budget perfectly.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#F7C430] rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#1E1E1E]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Your Home is Protected</h3>
              <p className="text-[#1E1E1E]">
                Complete the simple application and enjoy peace of mind knowing your home is fully covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
    
    </div>
  )
}
