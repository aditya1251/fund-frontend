import {
    Shield,
    Building,
    Users,
    FileText,
    CheckCircle,
    Banknote,
    Target,
    Handshake,
    Phone,
    Calculator,
    TrendingUp,
    Clock,
    Award,
    Zap,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent } from "@/components/ui/card"
  import CGTMSEEligibilityChecker from "@/components/cgtmse-eligibility-checker"
  import Link from "next/link"
  import NavigationHeader from "@/components/Navbar"
  import Footer from "@/components/Footer"
import ContactForm from "@/components/ContactForm"


  export default function CGTMSELoanLanding() {
    const benefits = [
      {
        icon: <Shield className="h-6 w-6" />,
        title: "No Collateral Needed",
        description: "Get loans up to ₹5 Crore without pledging any personal or business assets as security.",
        color: "bg-green-100 text-green-700",
      },
      {
        icon: <Zap className="h-6 w-6" />,
        title: "Easy Access to Funds",
        description: "Government guarantee makes banks more willing to lend to small businesses.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: <TrendingUp className="h-6 w-6" />,
        title: "Support for New Businesses",
        description: "Perfect for new entrepreneurs who are just starting out and building their assets.",
        color: "bg-purple-100 text-purple-700",
      },
      {
        icon: <Clock className="h-6 w-6" />,
        title: "Faster Processing",
        description: "Reduced documentation and faster approval process with government backing.",
        color: "bg-orange-100 text-orange-700",
      },
    ]
  
    const howWeHelp = [
      {
        icon: <Users className="h-6 w-6" />,
        title: "Expert Guidance",
        description: "Our team knows all CGTMSE scheme details and will ensure your business is eligible.",
      },
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Smooth Application Process",
        description: "We guide you through paperwork and work with banks for fast, smooth processing.",
      },
      {
        icon: <CheckCircle className="h-6 w-6" />,
        title: "Clear Communication",
        description: "Complete transparency about guarantee fees and loan terms with no hidden surprises.",
      },
      {
        icon: <Handshake className="h-6 w-6" />,
        title: "Dedicated Support",
        description: "From initial contact to loan disbursement, our team supports you every step.",
      },
    ]
  
    const whoCanApply = [
      {
        icon: <Building className="h-5 w-5" />,
        title: "Manufacturing Units",
        description: "Up to 50 employees and ₹25 Crore annual turnover",
      },
      {
        icon: <Users className="h-5 w-5" />,
        title: "Service Enterprises",
        description: "Up to 10 employees and ₹10 Crore annual turnover",
      },
      {
        icon: <Target className="h-5 w-5" />,
        title: "New Entrepreneurs",
        description: "Starting fresh with innovative business ideas",
      },
      {
        icon: <TrendingUp className="h-5 w-5" />,
        title: "Existing MSMEs",
        description: "Looking to expand operations and grow business",
      },
    ]
  
    const keyFeatures = [
      "Loan amount up to ₹5 Crore",
      "No collateral or third-party guarantee required",
      "Covers 85% guarantee for loans up to ₹5 Lakh",
      "75% guarantee for loans above ₹5 Lakh",
      "Annual guarantee fee of 0.75% to 1.5%",
      "Suitable for both new and existing businesses",
    ]
  
    return (
        <>
        <NavigationHeader />
      <div className="min-h-screen bg-[#FFFFFF]">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[#F7C430] p-4">
                  <Shield className="h-12 w-12 text-[#1E1E1E]" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-[#1E1E1E] sm:text-5xl lg:text-6xl">CGTMSE Loan</h1>
              <h2 className="mb-8 text-2xl font-semibold text-[#1E1E1E] sm:text-3xl lg:text-4xl">
                Your Collateral‑Free Path to Success
              </h2>
              <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed text-[#1E1E1E]">
                Starting or growing a business can be tough, especially when you don't have assets to offer as security.
                CGTMSE is a government-backed guarantee that helps small businesses get loans without collateral. Build
                your business dreams with confidence.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                
               <Link href="/contact" >
                <Button className="bg-[#F7C430] px-8 py-4 text-lg font-semibold text-[#1E1E1E] hover:bg-[#E6B429]">
                <Phone className="mr-2 h-5 w-5" />
                Talk to Expert
                </Button>
               </Link> 
                
              </div>
            </div>
          </div>
        </section>
  
        {/* What is CGTMSE */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">What is a CGTMSE Loan?</h2>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <div>
                <Card className="border-[#FFF0C3] shadow-lg">
                  <CardContent className="p-8 mt-4">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-[#F7C430] p-2">
                        <Award className="h-6 w-6 text-[#1E1E1E]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E]">Government-Backed Guarantee</h3>
                    </div>
                    <p className="mb-4 text-lg leading-relaxed text-[#1E1E1E]">
                      CGTMSE stands for Credit Guarantee Fund Trust for Micro and Small Enterprises. Think of it as a
                      government-backed guarantee for your loan that encourages banks to lend without collateral.
                    </p>
                    <p className="text-lg leading-relaxed text-[#1E1E1E]">
                      This reduces risk for banks, which means you have a better chance of getting the money you need to
                      start or grow your business.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <h3 className="mb-4 text-xl font-semibold text-[#1E1E1E]">Key Features</h3>
                <div className="space-y-3">
                  {keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 text-green-600 flex-shrink-0" />
                      <span className="text-[#1E1E1E]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Why Choose CGTMSE */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">Why Choose a CGTMSE Loan?</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              This loan is a game-changer for many small businesses, offering great benefits that traditional loans can't
              match.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, idx) => (
                <Card key={idx} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 mt-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${benefit.color}`}>{benefit.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{benefit.title}</h3>
                        <p className="text-[#1E1E1E] leading-relaxed">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Eligibility Checker */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">Check Your Eligibility</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Use our eligibility checker to see if your business qualifies for a CGTMSE loan and estimate the guarantee
              fees.
            </p>
            <CGTMSEEligibilityChecker />
          </div>
        </section>
  
        {/* Who Can Apply */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">Who Can Apply?</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              CGTMSE loans are designed for micro and small enterprises across various sectors.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {whoCanApply.map((applicant, idx) => (
                <Card
                  key={idx}
                  className="transition-colors border-[#FFF0C3] hover:border-[#F7C430] text-center bg-[#FFFFFF]"
                >
                  <CardContent className="p-6 mt-4">
                    <div className="mx-auto mb-4 w-fit rounded-full bg-[#F7C430] p-3">
                      <div className="text-[#1E1E1E]">{applicant.icon}</div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-[#1E1E1E]">{applicant.title}</h3>
                    <p className="text-sm leading-relaxed text-[#1E1E1E]">{applicant.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* How We Help */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">How We Help You</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Navigating government schemes can feel complicated. We make it simple and easy for you.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howWeHelp.map((help, idx) => (
                <Card key={idx} className="transition-colors border-[#FFF0C3] hover:border-[#F7C430]">
                  <CardContent className="p-6 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded bg-[#F7C430] text-[#1E1E1E]">
                        {help.icon}
                      </div>
                      <div>
                        <h4 className="mb-2 font-semibold text-[#1E1E1E]">{help.title}</h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{help.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA */}
        <ContactForm/>
        <Footer />
      </div>
      </>
    )
  }
  