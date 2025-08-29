import {
    IndianRupee,
    Building2,
    Rocket,
    Handshake,
    ClipboardList,
    Users,
    MapPin,
    BookOpen,
    Layers3,
    ShieldCheck,
    Target,
    Phone,
    Calculator,
    FileText,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import PMEGPSubsidyCalculator from "@/components/PmegpLoan"
  import Link from "next/link"
  import NavigationHeader from "@/components/Navbar"
  import ContactForm from "@/components/ContactForm"
  
  export default function PMEGPLanding() {
    const stats = [
      { number: "35%", label: "Max Subsidy (Rural Special)", icon: <IndianRupee className="h-5 w-5" /> },
      { number: "18+", label: "Minimum Age", icon: <Users className="h-5 w-5" /> },
      { number: "2", label: "Sectors (Mfg/Service)", icon: <Layers3 className="h-5 w-5" /> },
      { number: "Step-by-step", label: "Guided Process", icon: <ClipboardList className="h-5 w-5" /> },
    ]
  
    const whyPMEGP = [
      {
        icon: <Handshake className="h-6 w-6" />,
        title: "Loan + Government Subsidy",
        description: "Part bank loan, part subsidy you don’t repay—reduces your burden.",
        color: "bg-green-100 text-green-700",
      },
      {
        icon: <Rocket className="h-6 w-6" />,
        title: "Start New Projects",
        description: "Designed to help you launch new units in manufacturing or services.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: <Target className="h-6 w-6" />,
        title: "Job Creation",
        description: "Encourages entrepreneurship and local employment.",
        color: "bg-purple-100 text-purple-700",
      },
      {
        icon: <ClipboardList className="h-6 w-6" />,
        title: "Transparent Guidance",
        description: "We make the steps and documents simple and clear.",
        color: "bg-orange-100 text-orange-700",
      },
    ]
  
    const whoIsItFor = [
      {
        icon: <Users className="h-5 w-5" />,
        title: "Age 18+",
        description: "Anyone 18 years or older can apply for a new project.",
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        title: "Education",
        description: "8th pass required if project cost exceeds ₹10L (manufacturing) or ₹5L (services).",
      },
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "No Other Subsidy",
        description: "You haven’t taken subsidy from another Government scheme.",
      },
      {
        icon: <Building2 className="h-5 w-5" />,
        title: "New Unit Only",
        description: "Meant for new projects in manufacturing or services.",
      },
    ]
  
    const subsidyBands = [
      { audience: "General (Urban)", rate: "15%", detail: "For new projects in urban areas" },
      { audience: "General (Rural)", rate: "25%", detail: "Higher support in rural areas" },
      {
        audience: "Special (Urban)",
        rate: "25%",
        detail: "SC/ST/OBC/Minorities/Women/Ex-Servicemen",
      },
      {
        audience: "Special (Rural)",
        rate: "35%",
        detail: "Highest support for special category in rural areas",
      },
    ]
  
    const howWeHelp = [
      {
        icon: <ClipboardList className="h-6 w-6" />,
        title: "Expert Guidance",
        description:
          "From project report preparation to online application, we answer your questions and prepare you well.",
      },
      {
        icon: <FileText className="h-6 w-6" />,
        title: "Easy Application",
        description: "We help fill forms correctly and collect the required documents to maximize approval chances.",
      },
      {
        icon: <Handshake className="h-6 w-6" />,
        title: "Clear Communication",
        description: "We explain every step in simple terms so you always know what’s next.",
      },
      {
        icon: <ShieldCheck className="h-6 w-6" />,
        title: "Dedicated Help",
        description: "We’re with you from start to sanction to make your entrepreneurial journey smooth and stress-free.",
      },
    ]
  
    const process = [
      {
        step: "Online Registration",
        duration: "Day 1",
        description: "Create profile and initiate your PMEGP application.",
      },
      {
        step: "Project Report (DPR)",
        duration: "3–7 Days",
        description: "Prepare a clear DPR with costs, revenue, and employment plan.",
      },
      {
        step: "Bank Appraisal",
        duration: "1–3 Weeks",
        description: "Bank evaluates viability and processes your loan application.",
      },
      {
        step: "Subsidy & Disbursal",
        duration: "As per bank",
        description: "Margin money subsidy processed; loan disbursed for unit setup.",
      },
    ]
  
    return (
      
      <>
      <NavigationHeader/>
      
      <div className="min-h-screen bg-[#FFFFFF]">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-[#F7C430] p-4">
                  <IndianRupee className="h-12 w-12 text-[#1E1E1E]" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-[#1E1E1E] sm:text-5xl lg:text-6xl">PMEGP Loan</h1>
              <h2 className="mb-8 text-2xl font-semibold text-[#1E1E1E] sm:text-3xl lg:text-4xl">
                Ready to Become an Entrepreneur?
              </h2>
              <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed text-[#1E1E1E]">
                PMEGP is a Government program for new manufacturing and service units. It combines a bank loan with a
                Government subsidy you don’t repay—helping you start strong, create jobs, and build your business with
                confidence.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                
                <Link href='/contact'>
                  <Button className="bg-[#F7C430] px-8 py-4 text-lg font-semibold text-[#1E1E1E] hover:bg-[#E6B429]">
                    <Phone className="mr-2 h-5 w-5" />
                    Talk to PMEGP Expert
                  </Button>
                </Link>
                
               
              </div>
            </div>
          </div>
        </section>
  
        {/* Stats */}
        <section className="bg-[#1E1E1E] px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="rounded-lg bg-[#F7C430] p-2 text-[#1E1E1E]">{s.icon}</div>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-[#F7C430] sm:text-4xl">{s.number}</div>
                  <div className="text-sm text-[#FFFFFF] opacity-80 sm:text-base">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* What is PMEGP */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">What is a PMEGP Loan?</h2>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <Card className="border-[#FFF0C3] shadow-lg">
                  <CardContent className="p-8 mt-2">
                    <p className="mb-4 text-lg leading-relaxed text-[#1E1E1E]">
                      PMEGP is a Government program that supports new projects in manufacturing and services. It’s a blend
                      of bank loan and Government subsidy (margin money) that you don’t repay—encouraging entrepreneurship
                      and job creation.
                    </p>
                    <p className="text-lg leading-relaxed text-[#1E1E1E]">
                      You apply for a new unit, and the subsidy reduces your effective loan burden, helping you start and
                      scale faster.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <h3 className="mb-4 text-xl font-semibold text-[#1E1E1E]">Why choose PMEGP?</h3>
                {whyPMEGP.map((item, idx) => (
                  <Card key={idx} className="transition-colors border-[#FFF0C3] hover:border-[#F7C430]">
                    <CardContent className="p-4 mt-4">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded ${item.color}`}>
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1E1E1E]">{item.title}</h4>
                          <p className="text-sm text-[#1E1E1E] opacity-80">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
  
        {/* Who is it for */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">Who is it For?</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              A great opportunity for students, unemployed youth, and first-time entrepreneurs with a viable business idea
              to launch a new unit.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {whoIsItFor.map((w, idx) => (
                <Card key={idx} className="transition-colors border-[#FFF0C3] hover:border-[#F7C430] text-center">
                  <CardContent className="p-6 mt-4">
                    <div className="mx-auto mb-4 w-fit rounded-full bg-[#F7C430] p-3">
                      <div className="text-[#1E1E1E]">{w.icon}</div>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-[#1E1E1E]">{w.title}</h3>
                    <p className="text-sm leading-relaxed text-[#1E1E1E]">{w.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Subsidy Bands + Calculator */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">How PMEGP Helps You</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Get margin money subsidy based on your category and area—reducing the loan you need to repay.
            </p>
  
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                {subsidyBands.map((band, idx) => (
                  <Card key={idx} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                    <CardContent className="p-5 mt-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-[#F7C430] p-2 text-[#1E1E1E]">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="font-semibold text-[#1E1E1E]">{band.audience}</h4>
                            <Badge className="bg-[#1E1E1E] text-[#FFFFFF]">{band.rate} Subsidy</Badge>
                          </div>
                          <p className="text-sm text-[#1E1E1E] opacity-80">{band.detail}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
  
              <PMEGPSubsidyCalculator />
            </div>
          </div>
        </section>
  
        {/* How we help (with Dedicated Help) */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">We Are Here to Support You</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Dedicated Help: Our team will be with you from the start of your application until you get the loan. We are
              here to make your journey to becoming a business owner as smooth as possible.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howWeHelp.map((step, idx) => (
                <Card key={idx} className="border-none bg-[#FFFFFF] shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-[#F7C430] p-3 text-[#1E1E1E]">{step.icon}</div>
                      <div>
                        <h4 className="text-lg text-[#1E1E1E]">{step.title}</h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-[#1E1E1E]">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* Process Timeline */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">Application Process</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              A clear, step-by-step path—from registration to subsidy and disbursal—for a smooth experience.
            </p>
  
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {process.map((p, idx) => (
                <Card key={idx} className="border-[#FFF0C3] shadow-lg text-center relative">
                  <CardContent className="p-6 mt-4">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7C430]">
                      <span className="text-lg font-bold text-[#1E1E1E]">{idx + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-[#1E1E1E]">{p.step}</h3>
                    <Badge className="mt-2 bg-[#1E1E1E] text-[#FFFFFF]">{p.duration}</Badge>
                    <p className="mt-3 text-sm text-[#1E1E1E] opacity-80">{p.description}</p>
                  </CardContent>
                  {idx < process.length - 1 && (
                    <div className="absolute top-1/2 hidden h-0.5 w-6 -translate-y-1/2 transform bg-[#F7C430] md:block right-[-12px]" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
  
        {/* CTA */}
        <section className="bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-[#F7C430] p-4">
                <IndianRupee className="h-8 w-8 text-[#1E1E1E]" />
              </div>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-[#FFFFFF] sm:text-4xl">Ready to Become an Entrepreneur?</h2>
            <p className="mb-8 text-lg leading-relaxed text-[#FFFFFF] opacity-90">
              Your business dream is a great one, and the PMEGP loan can help you achieve it. Take the first step today by
              talking to our friendly team. We’re ready to help you turn your idea into a successful business.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href='/contact'>
              <Button
                variant="outline"
                className="border-[#F7C430] bg-transparent px-8 py-4 text-lg text-[#F7C430] hover:bg-[#F7C430] hover:text-[#1E1E1E]"
                > 
                <Phone className="mr-2 h-5 w-5" />
                Talk to Our Team
              </Button>
                </Link>
            </div>
          </div>
        </section>
      </div>
      <ContactForm/>
      </>
    )
  }
  