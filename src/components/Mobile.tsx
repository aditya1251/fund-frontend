import { Button } from "@/components/ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Bell,
  Home,
  MessageCircle,
  User,
  CreditCard,
  History,
  Users,
  Building2,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function Mobile() {
  return (
    <div className="min-h-screen bg-[#fff0c3] overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                  FundsRaize Simplifies Finance With Smart Solutions And Growth-Driven Partnerships.
                </h1>
                <div className="flex-shrink-0 mt-2">
                  <Sparkles className="w-12 h-12 text-[#f7c430] fill-[#f7c430]" />
                </div>
              </div>

              <p className="text-lg text-[#141212] opacity-70 max-w-md">
                Empowering Businesses With Seamless Funding Solutions And Strategic Growth Support.
              </p>
            </div>

            <div className="flex gap-16">
              <div>
                <div className="text-3xl font-bold text-black">700+</div>
                <div className="text-[#141212] opacity-70">Financial Advisors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">125+</div>
                <div className="text-[#141212] opacity-70">Lending Partners</div>
              </div>
            </div>
            <Link href="/contact"  >
            <Button className="bg-[#f7c430] hover:bg-[#f7c430]/90 text-black font-semibold px-10 py-6 text-xl rounded-md shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] transition-shadow">
              Contact Us
            </Button>
            </Link>
          </div>

          {/* Right Content - Mobile Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[320px] h-[640px] bg-black rounded-[40px] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-3 bg-white">
                    <span className="text-sm font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black/30 rounded-full"></div>
                      </div>
                      <div className="w-6 h-3 border border-black rounded-sm">
                        <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
                      </div>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="flex justify-between items-center px-6 py-4">
                    <h2 className="text-lg font-semibold">FundRaize</h2>
                    <Bell className="w-5 h-5" />
                  </div>

                  {/* Loan Limit Card */}
                  <div className="mx-6 mb-6">
                    <Card className="bg-gradient-to-r from-[#f7c430] to-[#f7c430]/80 border-0">
                      <CardContent className="p-6">
                        <div className="text-white/90 text-sm mb-1">Loan Limit</div>
                        <div className="text-white text-3xl font-bold mb-2">₦30,000</div>
                        <div className="text-white/90 text-sm mb-4">Loan duration: 30days</div>
                        <div className="flex gap-3">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/20 text-white border-0 hover:bg-white/30"
                          >
                            Apply
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                            Choose amount →
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Navigation Icons */}
                  <div className="flex justify-around px-6 mb-6">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-[#f7c430]/20 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#f7c430]" />
                      </div>
                      <span className="text-xs text-gray-600">Payback</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <History className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-600">History</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-600">Invite</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-gray-600" />
                      </div>
                      <span className="text-xs text-gray-600">Accounts</span>
                    </div>
                  </div>

                  {/* Loan History */}
                  <div className="px-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Loan History</h3>
                      <Button variant="ghost" size="sm" className="p-0">
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs">⚙️</span>
                        </div>
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { status: "Loan Received", desc: "Loan of ₦30,000 wasreceived", icon: "💰" },
                        { status: "Loan Disbursed", desc: "₦30,000 was disbursed to your bank", icon: "💰" },
                        { status: "Loan Approved", desc: "₦30,000 was approved", icon: "💰" },
                        { status: "Loan Received", desc: "Loan of ₦30,000 wasreceived", icon: "💰" },
                        { status: "Loan Declined", desc: "We're sorry! your loan was declined", icon: "💰" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-10 h-10 bg-[#f7c430] rounded-xl flex items-center justify-center">
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{item.status}</div>
                            <div className="text-xs text-gray-600">{item.desc}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t">
                    <div className="flex justify-around py-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 bg-[#f7c430] rounded-lg flex items-center justify-center">
                          <Home className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium">Home</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-600">Loan</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-600">Chat</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="text-xs text-gray-600">Profile</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
