import {
  Home,
  TrendingUp,
  Shield,
  Building2,
  Phone,
  Calculator,
  Upload,
  FileText,
  Users,
  Briefcase,
  Factory,
  Store,
  CreditCard,
  Clock,
  Percent,
  CheckCircle,
  AlertTriangle,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function LoanAgainstPropertyLanding() {
  const keyFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secured Loan",
      description: "Backed by your property as collateral, ensuring lower risk and better terms.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Flexible Loan Amount",
      description: "Generally, 50%–70% of your property's market value, providing substantial funding.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Percent className="h-6 w-6" />,
      title: "Lower Interest Rates",
      description: "More affordable than personal loans or credit cards due to property security.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Longer Tenure",
      description: "Repayment periods can go up to 15–20 years, reducing monthly EMI burden.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Ownership Retained",
      description: "You can still use your property during the loan period while it serves as collateral.",
      color: "bg-red-100 text-red-600",
    },
  ]

  const lapUses = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Business Expansion",
      description: "Invest in new equipment, expand operations, or increase working capital for growth.",
      examples: ["New machinery", "Office expansion", "Inventory purchase", "Market expansion"],
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Debt Consolidation",
      description: "Pay off multiple high-interest loans with a single low-interest LAP.",
      examples: ["Credit card dues", "Personal loans", "Business loans", "Multiple EMIs"],
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Education Funding",
      description: "Cover the cost of higher education in India or abroad without compromising savings.",
      examples: ["MBA programs", "Medical courses", "Engineering degrees", "International education"],
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Medical Emergencies",
      description: "Manage large medical expenses without financial strain or asset liquidation.",
      examples: ["Surgery costs", "Treatment abroad", "Medical equipment", "Long-term care"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Wedding Expenses",
      description: "Fund big events without exhausting your savings or compromising on celebrations.",
      examples: ["Venue booking", "Catering costs", "Jewelry purchase", "Destination weddings"],
    },
    {
      icon: <Home className="h-6 w-6" />,
      title: "Home Renovation",
      description: "Upgrade, repair, or build your property while using it as collateral.",
      examples: ["Interior design", "Structural repairs", "Home extension", "Modern amenities"],
    },
  ]

  const eligibilityCriteria = [
    {
      category: "Age Requirements",
      salaried: "21 to 60 years",
      selfEmployed: "21 to 65 years",
      icon: <Users className="h-5 w-5" />,
    },
    {
      category: "Employment Status",
      salaried: "Private/Public sector employees, Government employees",
      selfEmployed: "Business owners, Professionals, Entrepreneurs",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      category: "Income Requirement",
      salaried: "Stable monthly salary with regular increments",
      selfEmployed: "Consistent business income for 2+ years",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      category: "Property Ownership",
      salaried: "Clear marketable title of residential/commercial property",
      selfEmployed: "Clear marketable title of residential/commercial/industrial property",
      icon: <Home className="h-5 w-5" />,
    },
    {
      category: "Credit Score",
      salaried: "650+ for better approval and interest rates",
      selfEmployed: "700+ preferred for business owners",
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ]

  const documentCategories = [
    {
      category: "Identity Proof",
      subtitle: "Any one document",
      documents: ["Aadhaar Card", "PAN Card", "Passport", "Voter ID", "Driving License"],
      icon: <FileText className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      category: "Address Proof",
      subtitle: "Any one document",
      documents: ["Aadhaar Card", "Passport", "Utility Bills (Electricity/Water)", "Ration Card"],
      icon: <Home className="h-5 w-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      category: "Income Proof",
      subtitle: "Based on employment type",
      documents: [
        "Salaried: Last 3-6 months salary slips, Form 16, ITR",
        "Self-employed: ITR for 2-3 years, P&L statements, Balance sheets",
      ],
      icon: <TrendingUp className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      category: "Property Documents",
      subtitle: "Property verification",
      documents: ["Title Deed/Sale Deed", "Property Tax Receipts", "Approved Building Plan", "Encumbrance Certificate"],
      icon: <Building2 className="h-5 w-5" />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      category: "Other Documents",
      subtitle: "Additional requirements",
      documents: ["Passport-size photographs", "Bank statements (6-12 months)"],
      icon: <Upload className="h-5 w-5" />,
      color: "bg-red-100 text-red-600",
    },
  ]

  const businessTypes = [
    {
      icon: <Store className="h-5 w-5" />,
      title: "Retail Business Owners",
      description: "Shop owners, franchise operators, retail chains",
      lapBenefit: "Inventory expansion, store renovation, new outlets",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      title: "Manufacturing Units",
      description: "Small to medium manufacturing businesses",
      lapBenefit: "Equipment purchase, facility expansion, working capital",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Service Professionals",
      description: "Doctors, lawyers, consultants, architects",
      lapBenefit: "Practice expansion, equipment, office setup",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Property Investors",
      description: "Real estate investors, property developers",
      lapBenefit: "New property purchase, development projects",
    },
  ]

  const lapBenefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Asset Security",
      description: "Property remains in your name during loan tenure",
    },
    {
      icon: <Percent className="h-5 w-5" />,
      title: "Competitive Rates",
      description: "Lower interest rates compared to unsecured loans",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Flexible Tenure",
      description: "Extended repayment periods up to 20 years",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "High Loan Amount",
      description: "Up to 70% of property value as loan amount",
    },
  ]

  const stats = [
    { number: "₹50L+", label: "Maximum Loan Amount", icon: <DollarSign className="h-5 w-5" /> },
    { number: "8.5%", label: "Interest Rates Starting", icon: <Percent className="h-5 w-5" /> },
    { number: "20 Yrs", label: "Maximum Tenure", icon: <Clock className="h-5 w-5" /> },
    { number: "70%", label: "Property Value Coverage", icon: <Home className="h-5 w-5" /> },
  ]

  const applicationProcess = [
    {
      step: "Property Evaluation",
      duration: "2-3 Days",
      description: "Professional valuation of your property by certified valuers",
    },
    {
      step: "Document Verification",
      duration: "3-5 Days",
      description: "Verification of all submitted documents and legal clearances",
    },
    {
      step: "Credit Assessment",
      duration: "2-4 Days",
      description: "Income verification and credit score evaluation",
    },
    {
      step: "Loan Approval & Disbursal",
      duration: "7-10 Days",
      description: "Final approval and fund transfer to your account",
    },
  ]

  const propertyTypes = [
    {
      type: "Residential Property",
      description: "Self-occupied or rented residential properties",
      loanToValue: "Up to 60-65%",
      examples: ["Apartments", "Independent houses", "Villas", "Plots with construction"],
    },
    {
      type: "Commercial Property",
      description: "Income-generating commercial properties",
      loanToValue: "Up to 50-60%",
      examples: ["Office spaces", "Retail shops", "Warehouses", "Commercial complexes"],
    },
    {
      type: "Industrial Property",
      description: "Manufacturing and industrial facilities",
      loanToValue: "Up to 50-55%",
      examples: ["Factories", "Manufacturing units", "Industrial plots", "Godowns"],
    },
  ]

  const interestRateFactors = [
    {
      factor: "Credit Score",
      impact: "Higher score = Lower rates",
      range: "650-750+: 8.5%-12%",
    },
    {
      factor: "Property Type",
      impact: "Residential gets better rates",
      range: "Residential: 8.5%-11%, Commercial: 9%-13%",
    },
    {
      factor: "Loan Amount",
      impact: "Higher amount = Better rates",
      range: "₹10L+: Premium rates, ₹50L+: Best rates",
    },
    {
      factor: "Income Stability",
      impact: "Stable income = Lower rates",
      range: "Salaried: Better rates, Self-employed: Slightly higher",
    },
  ]

  const commonMistakes = [
    {
      mistake: "Incomplete Documentation",
      impact: "Delays in processing and approval",
      solution: "Prepare all documents in advance with proper attestation",
    },
    {
      mistake: "Property Title Issues",
      impact: "Loan rejection or legal complications",
      solution: "Ensure clear title with proper legal verification",
    },
    {
      mistake: "Overestimating Property Value",
      impact: "Lower loan amount than expected",
      solution: "Get professional valuation before applying",
    },
    {
      mistake: "Poor Credit History",
      impact: "Higher interest rates or rejection",
      solution: "Improve credit score before applying",
    },
  ]

  const taxBenefits = [
    {
      benefit: "Interest Deduction",
      section: "Section 24(b)",
      limit: "Up to ₹2 lakh per year",
      condition: "For self-occupied property",
    },
    {
      benefit: "Principal Repayment",
      section: "Section 80C",
      limit: "Up to ₹1.5 lakh per year",
      condition: "Combined with other 80C investments",
    },
    {
      benefit: "Business Purpose",
      section: "Business Income",
      limit: "Full interest deduction",
      condition: "If loan used for business expansion",
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
                <Home className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Loan Against Property</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Unlock Your Property's Value for Financial Freedom
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              A Loan Against Property (LAP) is a secured loan where you pledge your residential, commercial, or
              industrial property as collateral to get substantial funds at attractive interest rates. Your property
              remains in your name while providing the financial flexibility you need for business expansion, debt
              consolidation, education, or any major financial requirement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href='/contact'>
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Apply for LAP
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

      {/* Key Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key Features of LAP</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Loan Against Property offers unique advantages that make it an ideal financing solution for substantial
            funding requirements with flexible terms and competitive rates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-[#FFF0C3] shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8 mt-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${feature.color.replace("text-", "text-").replace("bg-", "bg-")}`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
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

      {/* Property Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Accepted Property Types</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different property types are accepted as collateral with varying loan-to-value ratios based on property
            category and market conditions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {propertyTypes.map((property, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 mt-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <Building2 className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{property.type}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{property.description}</p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] mb-4">{property.loanToValue}</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E1E1E] mb-2">Examples:</p>
                    <div className="flex flex-wrap gap-1">
                      {property.examples.map((example, idx) => (
                        <Badge key={idx} className="bg-[#FFF0C3] text-[#1E1E1E] text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Uses of LAP Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Uses of Loan Against Property
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            LAP provides versatile funding solutions for various personal and business needs, offering the flexibility
            to use funds as per your requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lapUses.map((use, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">{use.icon}</div>
                    <div>
                      <CardTitle className="text-xl text-[#1E1E1E]">{use.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1E1E1E] leading-relaxed mb-4">{use.description}</p>
                  <div>
                    <p className="text-sm font-medium text-[#1E1E1E] mb-2">Common Uses:</p>
                    <div className="flex flex-wrap gap-1">
                      {use.examples.map((example, idx) => (
                        <Badge key={idx} className="bg-[#FFF0C3] text-[#1E1E1E] text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Eligibility Criteria</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Meet these eligibility requirements to qualify for a Loan Against Property with competitive terms and quick
            processing.
          </p>

          <div className="space-y-6">
            {eligibilityCriteria.map((criteria, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 py-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <div className="text-[#1E1E1E]">{criteria.icon}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{criteria.category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-[#1E1E1E] mb-1">Salaried Individuals:</p>
                          <p className="text-sm text-[#1E1E1E] opacity-80">{criteria.salaried}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1E1E1E] mb-1">Self-Employed:</p>
                          <p className="text-sm text-[#1E1E1E] opacity-80">{criteria.selfEmployed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Documents Required</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Prepare these essential documents for smooth and quick processing of your Loan Against Property application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documentCategories.map((category, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-6 mt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-2 rounded-lg ${category.color.replace("text-", "text-").replace("bg-", "bg-")}`}>
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] text-lg mb-1">{category.category}</h3>
                      <p className="text-sm text-[#1E1E1E] opacity-80 mb-3">{category.subtitle}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {category.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <p className="text-sm text-[#1E1E1E]">{doc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Application Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our streamlined process ensures quick approval and disbursal of your Loan Against Property with minimal
            documentation and hassle-free experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {applicationProcess.map((process, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center relative">
                <CardContent className="p-6 mt-6">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{process.step}</h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">{process.duration}</Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">{process.description}</p>
                </CardContent>
                {index < applicationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Rate Factors Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Interest Rate Factors</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Several factors influence your LAP interest rate. Understanding these can help you get better terms and
            lower rates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interestRateFactors.map((factor, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-6 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Percent className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{factor.factor}</h3>
                      <p className="text-sm text-[#1E1E1E] opacity-80 mb-2">{factor.impact}</p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{factor.range}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Common Mistakes to Avoid</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Avoid these common mistakes to ensure smooth processing and better terms for your Loan Against Property
            application.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{mistake.mistake}</h3>
                      <p className="text-sm text-red-600 mb-2 font-medium">Impact: {mistake.impact}</p>
                      <p className="text-sm text-green-600 font-medium">Solution: {mistake.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LAP Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Why Choose LAP?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Loan Against Property offers unique advantages that make it an ideal financing solution for substantial
            funding requirements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lapBenefits.map((benefit, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6 mt-6">
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

      {/* Who Needs This Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Who Needs LAP?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Loan Against Property is ideal for property owners who need substantial funding at competitive rates without
            selling their valuable assets.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((business, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg text-center">
                <CardContent className="p-6 mt-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{business.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{business.title}</h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">{business.description}</p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{business.lapBenefit}</Badge>
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
