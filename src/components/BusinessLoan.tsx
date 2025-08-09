import { Calculator, CheckCircle, CreditCard, DollarSign, FileText, Heart, Home, Shield, Star, Users, Building, TrendingUp, Briefcase, Target, Lock, Unlock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function BusinessLoanLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white text-[#1E1E1E] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Business Loans: <span className="text-[#F7C430]">Money for Your Business Growth</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Every business, from a new one to an old one, needs money to grow. A business loan is a good 
              way to get this money. It helps you take new chances, fix problems, and reach your goals. We 
              are here to give you the money and help you need to start and grow your business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-3">
                Apply Now
              </Button>
              <Button size="lg" variant="outline" className="border-[#F7C430] text-[#F7C430] hover:bg-[#F7C430] hover:text-[#1E1E1E] px-8 py-3">
                Calculate Loan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is a Business Loan Section */}
      <section className="py-16 md:py-20 bg-[#FFF0C3]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
              What is a Business Loan?
            </h2>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                A business loan is money given for business use. It's different from a personal loan. You use it 
                to buy things for your business, manage your daily money, or make your business bigger. You 
                get a set amount of money and pay it back over time, with a fixed interest rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kinds of Business Loans Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
              Kinds of Business Loans
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              There are two main kinds of business loans: secured and unsecured. Knowing the difference 
              helps you choose the right one for your business.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Secured Business Loans */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Lock className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1E1E1E]">Secured Business Loans</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    A secured business loan asks you to give something you own as security. This could be a 
                    building, a machine, or a company car. If you can't pay back the loan, the lender can take this 
                    security. Because there is less risk for the lender, you often get:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#F7C430]" />
                      <span className="text-gray-700">Lower interest rates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#F7C430]" />
                      <span className="text-gray-700">Bigger loan amounts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#F7C430]" />
                      <span className="text-gray-700">More time to pay back the loan</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-6 text-sm">
                    This loan is good for businesses that have valuable things and need a lot of money for 
                    long-term plans.
                  </p>
                </CardContent>
              </Card>

              {/* Unsecured Business Loans */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#F7C430] p-3 rounded-full">
                      <Unlock className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1E1E1E]">Unsecured Business Loans</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    An unsecured business loan does not ask for any security. The lender decides based on your 
                    business's past money history and credit score. Since there is no security, the risk is higher for 
                    the lender. This means you might get:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-[#F7C430]" />
                      <span className="text-gray-700">Higher interest rates</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-[#F7C430]" />
                      <span className="text-gray-700">Smaller loan amounts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Calculator className="h-5 w-5 text-[#F7C430]" />
                      <span className="text-gray-700">Less time to pay back the loan</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-6 text-sm">
                    This loan is a good choice for new businesses or those without big assets. It's often used for 
                    daily business needs or to cover short-term money problems.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help You Section */}
      <section className="py-16 md:py-20 bg-[#FFF0C3]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
              How We Help You
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              When you choose us for your business loan, we are more than just a lender. We are your 
              partner in success.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F7C430] p-3 rounded-full">
                    <Users className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Expert Help</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our team of experts will help you understand your choices and pick the best loan for your needs. 
                      We will guide you step-by-step, answer your questions, and make sure you make a smart choice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F7C430] p-3 rounded-full">
                    <FileText className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Easy Application</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our online form is simple and fast. You can apply and get a quick answer, so you get the 
                      money you need without waiting too long.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F7C430] p-3 rounded-full">
                    <Calculator className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Flexible Payments</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We offer payment plans that can be changed to match your business's money flow. This helps 
                      you manage your money easily without stress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F7C430] p-3 rounded-full">
                    <Shield className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">Clear Terms</h3>
                    <p className="text-gray-600 leading-relaxed">
                      We are fully open and honest. Our loan rules have no hidden fees or extra charges for paying 
                      early. You can focus on growing your business with a clear mind.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg md:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="bg-[#F7C430] p-3 rounded-full">
                    <Target className="h-6 w-6 text-[#1E1E1E]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">On-going Support</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Even after the loan, we give you access to business tips and a support team to help you 
                      manage your loan and keep your business running smoothly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      
    </div>
  )
}
