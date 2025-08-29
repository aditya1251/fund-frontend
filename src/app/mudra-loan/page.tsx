import {
    IndianRupee,
    Target,
    Rocket,
    Handshake,
    CheckCircle,
    ClipboardList,
    Users,
    Store,
    Briefcase,
    Factory,
    Wrench,
    GraduationCap,
    Phone,
    Calculator,
  } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import MudraEstimator from "@/components/MudraLoan"
  import NavigationHeader from "@/components/Navbar"
  import Footer from "@/components/Footer"
  import ContactForm from '@/components/ContactForm'
  import Link from 'next/link'
  
  export default function MudraLoanLanding() {
    const categories = [
      {
        name: "Shishu",
        amount: "Up to ₹50,000",
        description: "For businesses that are just starting out.",
        icon: <Rocket className="h-6 w-6" />,
        highlights: ["Early-stage boost", "Start small, grow steadily", "No collateral"],
      },
      {
        name: "Kishore",
        amount: "₹50,001 to ₹5,00,000",
        description: "For growing businesses that need to expand.",
        icon: <Target className="h-6 w-6" />,
        highlights: ["Funds for expansion", "Working capital", "No collateral"],
      },
      {
        name: "Tarun",
        amount: "₹5,00,001 to ₹10,00,000",
        description: "For established businesses ready for bigger growth.",
        icon: <Briefcase className="h-6 w-6" />,
        highlights: ["Scale-up capital", "Equipment purchase", "No collateral"],
      },
    ]
  
    const whyMudra = [
      {
        icon: <CheckCircle className="h-6 w-6" />,
        title: "No Collateral Required",
        description: "MUDRA loans are unsecured, designed to “fund the unfunded.”",
        color: "bg-green-100 text-green-700",
      },
      {
        icon: <IndianRupee className="h-6 w-6" />,
        title: "Right-Sized Support",
        description: "Three categories match your stage and funding needs.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: <Handshake className="h-6 w-6" />,
        title: "Government-Backed Scheme",
        description: "A national initiative to support micro and small businesses.",
        color: "bg-purple-100 text-purple-700",
      },
      {
        icon: <ClipboardList className="h-6 w-6" />,
        title: "Simple, Guided Process",
        description: "We help you understand, prepare, and apply stress-free.",
        color: "bg-orange-100 text-orange-700",
      },
    ]
  
    const howWeHelp = [
      {
        icon: <Users className="h-6 w-6" />,
        title: "Friendly Advice",
        description: "We help you choose the right MUDRA category by understanding your business needs and goals.",
      },
      {
        icon: <ClipboardList className="h-6 w-6" />,
        title: "Simple Application",
        description: "We guide you through forms and documents so your application is smooth and fast.",
      },
      {
        icon: <IndianRupee className="h-6 w-6" />,
        title: "No Hidden Costs",
        description: "Transparent explanation of rates and repayment schedules—no surprise fees, ever.",
      },
      {
        icon: <Handshake className="h-6 w-6" />,
        title: "Ongoing Support",
        description: "Even after sanction, we’re here to help with questions about managing your loan and growth.",
      },
    ]
  
    const whoNeeds = [
      {
        icon: <Store className="h-5 w-5" />,
        title: "Local Shops",
        description: "Kirana stores, retail outlets, small traders",
      },
      {
        icon: <Wrench className="h-5 w-5" />,
        title: "Service Providers",
        description: "Repair services, salons, clinics, freelancers",
      },
      {
        icon: <Factory className="h-5 w-5" />,
        title: "Micro Manufacturing",
        description: "Workshops, artisans, small production units",
      },
      {
        icon: <GraduationCap className="h-5 w-5" />,
        title: "New Entrepreneurs",
        description: "First-time founders turning ideas into businesses",
      },
    ]
  
    const stats = [
      { number: "₹10L", label: "Maximum MUDRA Limit", icon: <IndianRupee className="h-5 w-5" /> },
      { number: "0", label: "Collateral Required", icon: <CheckCircle className="h-5 w-5" /> },
      { number: "3", label: "Categories", icon: <ClipboardList className="h-5 w-5" /> },
      { number: "Fast", label: "Guided Process", icon: <Handshake className="h-5 w-5" /> },
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
                  <IndianRupee className="h-12 w-12 text-[#1E1E1E]" />
                </div>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-[#1E1E1E] sm:text-5xl lg:text-6xl">
                Government’s MUDRA Loan Scheme
              </h1>
              <h2 className="mb-8 text-2xl font-semibold text-[#1E1E1E] sm:text-3xl lg:text-4xl">
                Your First Step to Success
              </h2>
              <p className="mx-auto mb-10 max-w-4xl text-lg leading-relaxed text-[#1E1E1E]">
                If you have a business idea or a small business that needs a boost, the MUDRA loan scheme is designed to
                help. It gives new entrepreneurs and small business owners the financial support they need to start, grow,
                and succeed—without collateral.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                
                
                <Link href='/contact'>
                <Button className="bg-[#F7C430] px-8 py-4 text-lg font-semibold text-[#1E1E1E] hover:bg-[#E6B429]">
                <Phone className="mr-2 h-5 w-5" />
                  Talk to MUDRA Expert
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
  
        {/* What is MUDRA */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">What is a MUDRA Loan?</h2>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
              <div>
                <Card className="border-[#FFF0C3] shadow-lg">
                  <CardContent className="p-8 mt-2">
                    <p className="mb-4 text-lg leading-relaxed text-[#1E1E1E]">
                      MUDRA stands for Micro Units Development and Refinance Agency. It’s a special kind of loan from the
                      government for small businesses. The best part is that you don’t need to provide any collateral or
                      security to get this loan. It’s meant to “fund the unfunded” and give a chance to millions of small
                      businesses that might not get loans from other places.
                    </p>
                    <p className="text-lg leading-relaxed text-[#1E1E1E]">
                      The scheme supports businesses at different stages with right-sized funding through Shishu, Kishore,
                      and Tarun categories.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4">
                <h3 className="mb-4 text-xl font-semibold text-[#1E1E1E]">Why choose MUDRA?</h3>
                {whyMudra.map((item, idx) => (
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
  
        {/* Categories */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">
              Three Ways MUDRA Can Help You
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Choose the category that matches your business stage and funding needs.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {categories.map((cat, idx) => (
                <Card key={idx} className="border-none bg-[#FFFFFF] shadow-lg transition-shadow hover:shadow-xl">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-[#F7C430] p-3 text-[#1E1E1E]">{cat.icon}</div>
                      <div>
                        <CardTitle className="text-xl text-[#1E1E1E]">{cat.name}</CardTitle>
                        <Badge className="mt-1 bg-[#1E1E1E] text-[#FFFFFF]">{cat.amount}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-[#1E1E1E]">{cat.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {cat.highlights.map((h, i) => (
                        <Badge key={i} className="bg-[#FFF0C3] text-[#1E1E1E] text-xs">
                          {h}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
  
            <div className="mt-12">
              <MudraEstimator />
            </div>
          </div>
        </section>
  
        {/* How we help */}
        <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">We Make It Easy for You</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Getting a MUDRA loan can seem like a lot of work, but we’re here to simplify it—every step of the way.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {howWeHelp.map((step, idx) => (
                <Card key={idx} className="border-none bg-[#FFFFFF] shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-[#F7C430] p-3 text-[#1E1E1E]">{step.icon}</div>
                      <div>
                        <CardTitle className="text-xl text-[#1E1E1E]">{step.title}</CardTitle>
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
  
        {/* Who needs this */}
        <section className="bg-[#FFF0C3] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-[#1E1E1E] sm:text-4xl">Who Needs This Service?</h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-[#1E1E1E]">
              Any small business or new entrepreneur who wants to communicate directly with lenders through a guided,
              transparent process and grow with the right funding.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {whoNeeds.map((w, idx) => (
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
  
        {/* CTA */}
        <section className="bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-[#F7C430] p-4">
                <IndianRupee className="h-8 w-8 text-[#1E1E1E]" />
              </div>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-[#FFFFFF] sm:text-4xl">Ready to Start or Grow Your Business?</h2>
            <p className="mb-8 text-lg leading-relaxed text-[#FFFFFF] opacity-90">
              A MUDRA loan can be the key to your success. Get started today by checking your eligibility or talking to
              one of our friendly experts. We’ll help you turn your business dreams into reality with the right category
              and a smooth, transparent process.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href='/contact'>
              <Button
                variant="outline"
                className="border-[#F7C430] bg-transparent px-8 py-4 text-lg text-[#F7C430] hover:bg-[#F7C430] hover:text-[#1E1E1E]"
              >
                <Phone className="mr-2 h-5 w-5" />
                Talk to Expert
              </Button>
              </Link>
            </div>
          </div>
        </section>
        
      </div>
      <ContactForm/>
      <Footer/>
      </>
    )
  }
  