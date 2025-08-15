import {
  FileText,
  Scale,
  Shield,
  Building2,
  Phone,
  Clock,
  Calculator,
  Upload,
  CheckCircle,
  AlertTriangle,
  Award,
  TrendingUp,
  Users,
  Briefcase,
  Factory,
  Globe,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ROCFilingLanding() {
  const whyROCCrucial = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Legal Requirement",
      description:
        "Filing with the ROC is a mandatory legal duty for all registered companies. Not doing so can lead to big penalties, and in some cases, the company can be shut down.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Maintains 'Active' Status",
      description: "Regular filing keeps your company's legal status active and in good standing with the government.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Builds Trust",
      description:
        "It shows that your business is transparent and trustworthy to banks, investors, and business partners.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Business Growth",
      description:
        "Compliance with ROC filing requirements enables access to funding, partnerships, and business expansion opportunities.",
      color: "bg-purple-100 text-purple-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Report Preparation",
      description:
        "Preparing all the necessary annual reports, including your balance sheet and profit & loss statement.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Form Completion",
      description: "Making sure all the forms are filled out correctly and on time with accurate information.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "ROC Filing",
      description: "Filing the reports with the ROC on your behalf through the official MCA portal.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Query Handling",
      description: "Handling any queries or notices from the ROC and ensuring complete compliance.",
    },
  ]

  const rocForms = [
    {
      form: "AOC-4",
      title: "Annual Return",
      description: "Annual return with details of company activities",
      dueDate: "Within 60 days of AGM",
      penalty: "₹100 per day",
      applicableTo: "All Companies",
    },
    {
      form: "MGT-7",
      title: "Annual Return",
      description: "Annual return for companies (alternative to AOC-4)",
      dueDate: "Within 60 days of AGM",
      penalty: "₹100 per day",
      applicableTo: "All Companies",
    },
    {
      form: "AOC-4 (XBRL)",
      title: "Financial Statements",
      description: "Balance sheet and profit & loss in XBRL format",
      dueDate: "Within 30 days of AGM",
      penalty: "₹200 per day",
      applicableTo: "All Companies",
    },
    {
      form: "ADT-1",
      title: "Auditor Appointment",
      description: "Notice of appointment of auditor",
      dueDate: "Within 15 days",
      penalty: "₹50 per day",
      applicableTo: "Companies with Auditor",
    },
  ]

  const companyTypes = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Private Limited Companies",
      description: "Private companies with limited liability",
      filingRequirement: "Annual Return + Financial Statements",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Public Limited Companies",
      description: "Public companies listed or unlisted",
      filingRequirement: "Annual Return + Financial Statements + Additional Forms",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Limited Liability Partnerships",
      description: "LLPs registered under LLP Act",
      filingRequirement: "Annual Return + Statement of Accounts",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      title: "One Person Companies",
      description: "Single member private companies",
      filingRequirement: "Annual Return + Financial Statements",
    },
  ]

  const complianceBenefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Legal Protection",
      description: "Avoid penalties and legal complications",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Good Standing",
      description: "Maintain active company status",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Business Credibility",
      description: "Enhanced trust with stakeholders",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Investor Confidence",
      description: "Transparency for funding opportunities",
    },
  ]

  const stats = [
    { number: "10K+", label: "ROC Filings Completed", icon: <FileText className="h-5 w-5" /> },
    { number: "99%", label: "On-Time Filing Rate", icon: <Clock className="h-5 w-5" /> },
    { number: "100%", label: "Compliance Success", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "24/7", label: "Expert Support", icon: <Users className="h-5 w-5" /> },
  ]

  const filingProcess = [
    {
      step: "Document Collection",
      duration: "2-3 Days",
      description: "Gather financial statements and company records",
    },
    { step: "Report Preparation", duration: "3-5 Days", description: "Prepare annual return and financial statements" },
    { step: "Form Completion", duration: "1-2 Days", description: "Fill all required ROC forms accurately" },
    { step: "Online Filing", duration: "1 Day", description: "Submit forms to ROC through MCA portal" },
  ]

  const penaltyStructure = [
    {
      violation: "Late filing of Annual Return",
      penalty: "₹100 per day (min ₹5,000)",
      consequence: "Company may be struck off",
    },
    {
      violation: "Late filing of Financial Statements",
      penalty: "₹200 per day (min ₹10,000)",
      consequence: "Directors disqualification",
    },
    {
      violation: "Non-filing for 3 consecutive years",
      penalty: "Company struck off + ₹10 lakh fine",
      consequence: "Company dissolution",
    },
    {
      violation: "Filing incorrect information",
      penalty: "₹50,000 to ₹25 lakh fine",
      consequence: "Criminal prosecution",
    },
  ]

  const requiredDocuments = [
    {
      document: "Financial Statements",
      description: "Audited balance sheet and profit & loss account",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      document: "Board Resolutions",
      description: "Minutes of board meetings and resolutions",
      icon: <Users className="h-4 w-4" />,
    },
    {
      document: "Auditor's Report",
      description: "Independent auditor's report on financial statements",
      icon: <Award className="h-4 w-4" />,
    },
    {
      document: "Director Details",
      description: "Updated information of directors and their DIN",
      icon: <Building2 className="h-4 w-4" />,
    },
  ]

  const filingDeadlines = [
    { event: "Annual General Meeting", deadline: "Within 6 months of financial year end" },
    { event: "Annual Return Filing", deadline: "Within 60 days of AGM" },
    { event: "Financial Statements Filing", deadline: "Within 30 days of AGM" },
    { event: "Auditor Appointment", deadline: "Within 15 days of appointment" },
  ]

  const nonComplianceRisks = [
    { risk: "Company Strike-off", description: "Company removed from ROC register" },
    { risk: "Director Disqualification", description: "Directors barred from holding positions" },
    { risk: "Criminal Prosecution", description: "Legal action against company and directors" },
    { risk: "Asset Freezing", description: "Company assets may be frozen by authorities" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <FileText className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">ROC Filing</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Annual Compliance for Registered Companies
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              ROC stands for Registrar of Companies. All officially registered companies have to file reports with the
              ROC every year. These reports include details about the company's finances (like its balance sheet) and
              its activities. This keeps the government informed about your company's status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <FileText className="mr-2 h-5 w-5" />
                File ROC Returns
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Check Compliance
              </Button>
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

      {/* What is ROC Filing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">What is ROC Filing?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Building2 className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Annual Corporate Compliance</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    ROC (Registrar of Companies) filing is the mandatory annual submission of financial statements,
                    annual returns, and other statutory documents to maintain corporate compliance.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This process ensures transparency, maintains company's active status, and fulfills legal obligations
                    under the Companies Act, protecting the company from penalties and legal issues.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Required Documents</h3>
              {requiredDocuments.map((doc, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                        <div className="text-[#1E1E1E]">{doc.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">{doc.document}</h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{doc.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROC Forms Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key ROC Forms</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different forms are required for ROC filing, each with specific deadlines and penalty structures for
            non-compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rocForms.map((form, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <FileText className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">{form.form}</Badge>
                        <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{form.applicableTo}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{form.title}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{form.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#1E1E1E]">Due Date:</span>
                      <span className="text-sm text-[#1E1E1E]">{form.dueDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[#1E1E1E]">Penalty:</span>
                      <span className="text-sm text-red-600 font-medium">{form.penalty}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filing Deadlines Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Important Deadlines</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Stay compliant with these critical filing deadlines to avoid penalties and maintain your company's good
            standing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filingDeadlines.map((deadline, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Calendar className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{deadline.event}</h3>
                      <p className="text-[#1E1E1E] opacity-80">{deadline.deadline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Penalty Structure Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Penalty Structure</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Non-compliance with ROC filing requirements can result in severe financial penalties and legal consequences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {penaltyStructure.map((penalty, index) => (
              <Card key={index} className="border-red-200 bg-red-50 hover:border-red-300 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-red-800 mb-2">{penalty.violation}</h3>
                      <p className="text-red-700 font-medium mb-2">{penalty.penalty}</p>
                      <p className="text-red-600 text-sm">{penalty.consequence}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filing Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Filing Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our systematic approach ensures your ROC filing is completed accurately and on time with complete
            compliance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {filingProcess.map((process, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg text-center relative">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{process.step}</h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">{process.duration}</Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">{process.description}</p>
                </CardContent>
                {index < filingProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why ROC Filing is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Why is ROC Filing Crucial?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            ROC filing ensures legal compliance, maintains corporate transparency, and protects your business from
            penalties while building stakeholder trust.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyROCCrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${reason.color.replace("text-", "text-").replace("bg-", "bg-")}`}>
                      {reason.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">{reason.title}</h3>
                      <p className="text-[#1E1E1E] leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Compliance Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Regular ROC filing provides comprehensive benefits that enhance business credibility and operational
            stability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBenefits.map((benefit, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{benefit.title}</h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How We Help You Every Step of the Way
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We make ROC filing simple and stress-free, handling all complexities to ensure complete compliance and
            timely submission.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">{step.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-[#F7C430] mb-1">Step {index + 1}</div>
                      <CardTitle className="text-xl text-[#1E1E1E]">{step.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1E1E1E] leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Needs This Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Who Needs ROC Filing?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            All types of registered companies, including Private Limited Companies, Public Limited Companies, and LLPs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyTypes.map((company, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{company.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{company.title}</h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">{company.description}</p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{company.filingRequirement}</Badge>
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
