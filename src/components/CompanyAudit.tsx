import {
  FileSearch,
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
  FileText,
  Eye,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CompanyAuditLanding() {
  const whyAuditCrucial = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Legal Requirement",
      description:
        "Audits are a mandatory legal requirement for almost all registered companies every year under the Companies Act.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Builds Trust",
      description:
        "An audit gives a seal of approval to your financial statements. This builds immense trust with investors, banks, and stakeholders, showing that your business is transparent and financially healthy.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Detects Problems",
      description:
        "An audit can help you find any mistakes or weak spots in your financial processes, allowing you to fix them before they become a big problem.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Business Insights",
      description:
        "An audit report gives you valuable insights into your company's performance and helps in strategic decision making.",
      color: "bg-green-100 text-green-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <FileSearch className="h-6 w-6" />,
      title: "Professional Audit",
      description: "Conduct a professional and thorough check of your company's books and financial records.",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Compliance Verification",
      description: "Ensure all your financial reports are accurate and compliant with legal requirements.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Report Filing",
      description: "Prepare and file the official audit report with the ROC on time.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Clear Explanation",
      description: "Explain our findings to you in simple terms so you can make informed decisions.",
    },
  ]

  const auditTypes = [
    {
      type: "Statutory Audit",
      description: "Mandatory annual audit for all registered companies",
      applicability: "All Companies",
      timeline: "Within 30 days of AGM",
      auditor: "Chartered Accountant",
      penalty: "₹50,000 - ₹25 lakh",
    },
    {
      type: "Internal Audit",
      description: "Internal control and process evaluation",
      applicability: "Large Companies",
      timeline: "Quarterly/Annual",
      auditor: "CA/Internal Auditor",
      penalty: "₹25,000 - ₹1 lakh",
    },
    {
      type: "Tax Audit",
      description: "Income tax compliance audit",
      applicability: "Turnover > ₹1 Cr",
      timeline: "By 30th September",
      auditor: "Chartered Accountant",
      penalty: "₹1,50,000",
    },
    {
      type: "Cost Audit",
      description: "Cost records and cost accounting audit",
      applicability: "Specified Industries",
      timeline: "Within 180 days",
      auditor: "Cost Accountant",
      penalty: "₹50,000 - ₹5 lakh",
    },
  ]

  const companyCategories = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Private Limited Companies",
      description: "All private companies regardless of turnover",
      auditRequirement: "Statutory Audit Mandatory",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Public Limited Companies",
      description: "Listed and unlisted public companies",
      auditRequirement: "Statutory + Internal Audit",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      title: "Manufacturing Companies",
      description: "Companies with production activities",
      auditRequirement: "Statutory + Cost Audit",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Service Companies",
      description: "IT, consulting, and service providers",
      auditRequirement: "Statutory + Tax Audit",
    },
  ]

  const auditBenefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Legal Compliance",
      description: "Meet statutory requirements and avoid penalties",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Credibility Enhancement",
      description: "Build trust with investors and stakeholders",
    },
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Risk Detection",
      description: "Identify financial risks and control weaknesses",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Performance Insights",
      description: "Gain valuable business performance insights",
    },
  ]

  const stats = [
    { number: "15K+", label: "Audits Completed", icon: <FileSearch className="h-5 w-5" /> },
    { number: "100%", label: "Compliance Rate", icon: <CheckCircle className="h-5 w-5" /> },
    { number: "30 Days", label: "Report Delivery", icon: <Clock className="h-5 w-5" /> },
    { number: "500+", label: "CA Partners", icon: <Users className="h-5 w-5" /> },
  ]

  const auditProcess = [
    {
      step: "Planning & Preparation",
      duration: "3-5 Days",
      description: "Understand business, assess risks, and plan audit approach",
    },
    {
      step: "Fieldwork & Testing",
      duration: "10-15 Days",
      description: "Examine records, test controls, and verify transactions",
    },
    {
      step: "Review & Analysis",
      duration: "5-7 Days",
      description: "Analyze findings, review conclusions, and prepare draft report",
    },
    {
      step: "Report & Filing",
      duration: "3-5 Days",
      description: "Finalize audit report and file with regulatory authorities",
    },
  ]

  const auditStandards = [
    {
      standard: "Companies Act 2013",
      description: "Statutory audit requirements for companies",
      compliance: "Mandatory for all companies",
      icon: <Scale className="h-4 w-4" />,
    },
    {
      standard: "Auditing Standards (SAs)",
      description: "Professional auditing standards and procedures",
      compliance: "ICAI prescribed standards",
      icon: <Award className="h-4 w-4" />,
    },
    {
      standard: "Accounting Standards",
      description: "Financial reporting and accounting standards",
      compliance: "Ind AS/AS compliance",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      standard: "SEBI Regulations",
      description: "Additional requirements for listed companies",
      compliance: "Listed companies only",
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ]

  const penaltyStructure = [
    {
      violation: "Non-appointment of auditor",
      penalty: "₹25,000 - ₹5 lakh fine",
      consequence: "Director disqualification",
    },
    {
      violation: "Late filing of audit report",
      penalty: "₹50,000 - ₹25 lakh fine",
      consequence: "Company strike-off risk",
    },
    {
      violation: "Qualified audit opinion",
      penalty: "Regulatory scrutiny",
      consequence: "Investor confidence loss",
    },
    {
      violation: "Fraudulent financial reporting",
      penalty: "₹1 crore - ₹10 crore fine",
      consequence: "Criminal prosecution",
    },
  ]

  const auditDocuments = [
    {
      document: "Financial Statements",
      description: "Balance sheet, P&L, cash flow statements",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      document: "Books of Accounts",
      description: "General ledger, journals, and subsidiary books",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      document: "Supporting Documents",
      description: "Invoices, contracts, bank statements, receipts",
      icon: <Upload className="h-4 w-4" />,
    },
    {
      document: "Statutory Records",
      description: "Board resolutions, minutes, statutory registers",
      icon: <Building2 className="h-4 w-4" />,
    },
  ]

  const auditTimeline = [
    { milestone: "Financial Year End", deadline: "31st March", action: "Close books of accounts" },
    { milestone: "Auditor Appointment", deadline: "Within 30 days", action: "Appoint statutory auditor" },
    { milestone: "Annual General Meeting", deadline: "Within 6 months", action: "Approve financial statements" },
    { milestone: "Audit Report Filing", deadline: "Within 30 days of AGM", action: "File audit report with ROC" },
  ]

  const auditOpinions = [
    {
      opinion: "Unqualified Opinion",
      description: "Clean audit report with no material issues",
      impact: "Positive stakeholder confidence",
      color: "bg-green-100 text-green-600",
    },
    {
      opinion: "Qualified Opinion",
      description: "Issues identified but not material to overall view",
      impact: "Minor concerns for stakeholders",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      opinion: "Adverse Opinion",
      description: "Material misstatements affecting true and fair view",
      impact: "Significant stakeholder concerns",
      color: "bg-red-100 text-red-600",
    },
    {
      opinion: "Disclaimer of Opinion",
      description: "Insufficient evidence to form an opinion",
      impact: "Major stakeholder concerns",
      color: "bg-gray-100 text-gray-600",
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
                <FileSearch className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Company Audit</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Financial Compliance & Transparency
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              A company audit is an official check of your business's financial records by an independent expert called
              an auditor. The auditor verifies that all your financial reports are accurate, complete, and follow all
              legal rules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <FileSearch className="mr-2 h-5 w-5" />
                Schedule Audit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Check Requirements
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

      {/* What is Company Audit Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">What is Company Audit?</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Eye className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Independent Financial Verification</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    A company audit is an independent examination of financial statements and records by a qualified
                    auditor to ensure accuracy, completeness, and compliance with applicable laws and standards.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This process provides stakeholders with confidence in the financial information and helps identify
                    areas for improvement in financial controls and processes.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Required Documents</h3>
              {auditDocuments.map((doc, index) => (
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

      {/* Audit Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Types of Audits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different types of audits are required based on company size, turnover, and industry, each with specific
            requirements and timelines.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {auditTypes.map((audit, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <FileSearch className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{audit.type}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{audit.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{audit.applicability}</Badge>
                        <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">{audit.auditor}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">Timeline</p>
                      <span className="text-sm text-[#1E1E1E]">{audit.timeline}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">Penalty</p>
                      <span className="text-xs text-red-600 font-medium">{audit.penalty}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Standards Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Audit Standards</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Company audits must comply with various professional standards and regulatory requirements to ensure quality
            and consistency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditStandards.map((standard, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <div className="text-[#1E1E1E]">{standard.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{standard.standard}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-2">{standard.description}</p>
                      <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">{standard.compliance}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Opinions Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Types of Audit Opinions</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Auditors provide different types of opinions based on their findings, each having different implications for
            stakeholders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditOpinions.map((opinion, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${opinion.color.replace("text-", "text-").replace("bg-", "bg-")}`}>
                      <FileSearch className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{opinion.opinion}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-2 text-sm">{opinion.description}</p>
                      <p className="text-[#1E1E1E] text-sm font-medium">{opinion.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Penalty Structure Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Penalty for Non-Compliance</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Non-compliance with audit requirements can result in severe financial penalties and legal consequences for
            companies and directors.
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

      {/* Audit Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Audit Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our systematic audit approach ensures thorough examination of financial records with timely delivery of
            audit reports.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {auditProcess.map((process, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center relative">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{process.step}</h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">{process.duration}</Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">{process.description}</p>
                </CardContent>
                {index < auditProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Audit is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is Company Audit Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Company audit ensures legal compliance, builds stakeholder trust, and provides valuable insights for
            business improvement and risk management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyAuditCrucial.map((reason, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
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

      {/* Audit Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Audit Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Professional audit services provide comprehensive benefits that enhance business credibility and operational
            efficiency.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {auditBenefits.map((benefit, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            How We Help You Every Step of the Way
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our team of experienced auditors will make the audit process simple and efficient for you, ensuring complete
            compliance and valuable insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Who Needs Company Audit?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            All registered companies in India are required to get an audit done every financial year under the Companies
            Act 2013.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyCategories.map((company, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{company.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{company.title}</h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">{company.description}</p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{company.auditRequirement}</Badge>
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
