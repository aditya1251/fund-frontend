import { Calculator, CheckCircle, CreditCard, DollarSign, FileText, Heart, Home, Shield, Star, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PersonalLoanLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white text-[#1E1E1E] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Personal Loan: <span className="text-[#F7C430]">Flexible Funds</span> for Your Goals
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you're planning a dream wedding, consolidating high-interest debt, or tackling a home 
              renovation project, a personal loan can provide the financial flexibility you need. At our core, we 
              believe in making borrowing simple, transparent, and tailored to your life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-3">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-[#F7C430] text-[#F7C430] hover:bg-[#F7C430] hover:text-[#1E1E1E] px-8 py-3">
                Calculate Payments
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is a Personal Loan Section */}
      <section className="py-16 md:py-20 bg-[#FFF0C3]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
              What Is a Personal Loan?
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                A personal loan is a type of unsecured loan, which means you don't have to put up collateral 
                like a car or a house. It's a lump sum of money you receive and then pay back over a set period 
                of time, typically with a fixed interest rate. This makes your monthly payments predictable and 
                easy to budget for.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Uses Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
              Common Uses for a Personal Loan
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Our personal loans can be used for a wide range of purposes. Some of the most common 
              reasons our customers apply for them include:
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <CreditCard className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Debt Consolidation</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Combine multiple debts, such as credit card balances, into a single, lower-interest loan. 
                        This can simplify your finances and potentially save you money.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Home className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Home Improvement</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Fund repairs, remodels, or upgrades to your home, from a new kitchen to a bathroom renovation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Heart className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Major Life Events</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Cover the costs of a wedding, a significant trip, or other major life milestones.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Shield className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Unexpected Expenses</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Handle unforeseen costs like medical bills or emergency repairs without dipping into your savings.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-20 bg-[#FFF0C3]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
              Key Features of Our Personal Loans
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-[#1E1E1E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E1E1E] mb-3">Competitive Rates</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We offer competitive interest rates designed to save you money over the life of your loan.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calculator className="h-8 w-8 text-[#1E1E1E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E1E1E] mb-3">Flexible Terms</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose a repayment period that fits your budget, with terms ranging from 12 to 60 months.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-[#1E1E1E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E1E1E] mb-3">No Hidden Fees</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We are committed to transparency. You'll know exactly what you're paying with no surprises.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="bg-[#F7C430] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-[#1E1E1E]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E1E1E] mb-3">Simple Application</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fast and easy online process. Get a decision in minutes and funds as soon as next business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help You Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
              How We Help You
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Choosing us for your personal loan means more than just getting a lump sum of money. 
              We're here to support you throughout your financial journey.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="bg-[#F7C430] p-3 rounded-full h-fit">
                  <Users className="h-6 w-6 text-[#1E1E1E]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Dedicated Support</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our team of loan specialists is available to answer your questions, guide you through the 
                    application process, and help you understand your loan terms.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#F7C430] p-3 rounded-full h-fit">
                  <DollarSign className="h-6 w-6 text-[#1E1E1E]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Financial Wellness Resources</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We provide educational content and tools to help you manage your finances, improve your 
                    credit, and make informed financial decisions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#F7C430] p-3 rounded-full h-fit">
                  <Shield className="h-6 w-6 text-[#1E1E1E]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Secure and Easy Management</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our intuitive online portal and mobile app make it simple to track your payments, view your 
                    loan balance, and stay on top of your loan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-[#F7C430] p-3 rounded-full h-fit">
                  <CheckCircle className="h-6 w-6 text-[#1E1E1E]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Proactive Communication</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We'll send you timely reminders for upcoming payments and updates on your loan status, 
                    so you never miss a beat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      

      
    </div>
  )
}
