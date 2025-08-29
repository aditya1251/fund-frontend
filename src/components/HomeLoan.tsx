import { Calculator, CheckCircle, CreditCard, DollarSign, FileText, Heart, Home, Shield, Star, Users, Building, TrendingUp, Briefcase, Target, Lock, Unlock, Key, MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

export default function HomeLoanLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white text-[#1E1E1E] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Dream Home is <span className="text-[#F7C430]">Closer Than You Think</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Buying a home is one of life's biggest and most exciting steps. It's more than just a place to live; 
              it's where memories are made, families grow, and futures are built. We know this journey can 
              seem a little overwhelming, but we're here to be your guide. Our home loans are designed to 
              make the process simple and stress-free, so you can focus on finding the perfect place to call your own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link href='/contact'>
              
              <Button size="lg" className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-3">
                <Home className="mr-2 h-5 w-5" />
                Apply for Home Loan
              </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* What Is a Home Loan Section */}
      <section className="py-16 md:py-20 bg-[#FFF0C3]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
              What is a Home Loan?
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                A home loan is simply a loan you take to buy a house. You borrow a large amount of money 
                from a bank or lender and then pay it back in small, easy monthly payments over many years. 
                This allows you to buy your home now, instead of saving for decades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Make It Easy Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
              How We Make It Easy for You
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              We believe that getting a home loan should feel supportive, not stressful. We're with you every 
              step of the way to make things easy.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Users className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Friendly Experts</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Our team of home loan experts are not just here to process paperwork. They are here to 
                        listen to your needs, answer all your questions (no matter how small), and help you find a 
                        loan that fits your budget perfectly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <FileText className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Simple Process</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We've made our application process as easy as possible. You can apply online from the 
                        comfort of your home, and we'll guide you through each step. We'll handle the complex 
                        parts so you don't have to.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Shield className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Clear and Fair</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We believe in being completely open with you. We'll explain all the interest rates, fees, 
                        and payment plans in simple language. You'll know exactly what you're paying, with no 
                        hidden surprises.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Target className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Customized for You</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Everyone's situation is different. We'll work with you to find a loan that is just right for 
                        your unique financial situation and future plans. We offer different kinds of home loans, 
                        so you have choices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Home Loan CTA Section */}
      <section className="py-16 md:py-20 bg-[#FFF0C3]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-6">Ready to Find Your New Home?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's start this journey together. Our home loan calculator can give you an idea of your monthly 
              payments, and our friendly team is always ready to help you take the next step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              
              <Link href='/contact'>
              <Button size="lg" className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-3">
                <Users className="mr-2 h-5 w-5" />
                Talk to a Home Loan Expert
              </Button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Loan Against Property Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1E1E1E] mb-6 leading-tight">
              Loan Against Property: <span className="text-[#F7C430]">Unlock the Value</span> of Your Property
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your property is more than just a home or a building; it's a valuable asset that can help you 
              achieve your bigger dreams. If you need a large sum of money for things like your child's 
              education, a business expansion, or a wedding, a Loan Against Property (LAP) can be the 
              perfect solution. We're here to help you get the most out of your property, with a process that is 
              easy, friendly, and supportive.
            </p>
          </div>

          {/* What is LAP */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-[#FFF0C3] rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-6 text-center">
                What is a Loan Against Property?
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                A Loan Against Property is a loan where you use your property as security. This could be your 
                house, an office, or a shop. In return, the bank gives you a large amount of money. Since the 
                loan is secured by your property, you can get a bigger loan amount and a lower interest rate 
                compared to other loans. You can then pay back the loan in small, easy monthly payments over 
                a long period.
              </p>
            </div>
          </div>

          {/* How We Help You - LAP */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-[#1E1E1E] mb-8 text-center">How We Help You</h3>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              We know that taking a loan is a big decision. That's why we are committed to making the 
              process simple and transparent. When you choose us, you get:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center mt-6">
                  <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-[#1E1E1E]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-3">Your Trusted Partner</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Our team is here to guide you, not just sell you a loan. We listen to your needs and help you 
                    understand how your property can work for you.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center mt-6">
                  <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-[#1E1E1E]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-3">Best Value for Your Property</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We make sure you get the best possible loan amount based on the value of your property, 
                    so you can achieve your goals without any compromise.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center mt-6">
                  <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-[#1E1E1E]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-3">Simple Paperwork</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We've made our application process easy to follow. We'll help you with all the documents 
                    and make sure the process is smooth and quick.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center mt-6">
                  <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-[#1E1E1E]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-3">Low and Clear Interest Rates</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Because your loan is secured by your property, you get the benefit of a low interest rate. 
                    We will explain all the charges clearly, with no hidden fees.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
                <CardContent className="p-6 text-center mt-6">
                  <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Calculator className="h-8 w-8 text-[#1E1E1E]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#1E1E1E] mb-3">Flexible Payments</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We offer flexible repayment plans that suit your financial situation. You can choose a loan 
                    tenure that is comfortable for you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      

      {/* Footer */}
   
    </div>
  )
}
