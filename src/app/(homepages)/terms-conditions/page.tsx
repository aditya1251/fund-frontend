import { FileText, Users, Shield, AlertTriangle, Scale, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsConditionsPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: <FileText className="h-5 w-5" />,
      content: `Navi Mudra is a financial services platform that provides consultancy, assistance, and facilitation in areas such as loans, insurance, government schemes, and business compliance. We connect users to verified banks, NBFCs, and service providers. By accessing our platform, you acknowledge that Navi Mudra is not a lender or financial institution but acts as an intermediary between the user and third-party service providers.`,
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      icon: <Users className="h-5 w-5" />,
      content: `To use our services as an individual, you must be at least 18 years old and legally capable of entering into a binding agreement. Channel partners, on the other hand, must be legally registered entities or individuals authorized to promote our services. All users must provide accurate, current, and complete information during registration and usage.`,
    },
    {
      id: "individual-responsibilities",
      title: "3. Responsibilities of Individual Users",
      icon: <Shield className="h-5 w-5" />,
      content: `As an individual user, you agree to use Navi Mudra's services solely for lawful and legitimate purposes. You are responsible for providing truthful information while applying for any services through our platform. Any misuse of tools like the EMI calculator or submission of false documents may result in suspension or denial of services. Users are expected to respect the platform's integrity and avoid any form of tampering, data scraping, or reverse engineering.`,
    },
    {
      id: "partner-responsibilities",
      title: "4. Responsibilities of Channel Partners",
      icon: <Users className="h-5 w-5" />,
      content: `Channel Partners play a key role in expanding Navi Mudra's outreach. As a partner, you agree to act with honesty and professionalism when promoting our services or onboarding clients. You must not make unauthorized promises or misrepresent our offerings. All leads must be sourced ethically and documented correctly using our official platforms or partner portals. Commissions or payouts are provided based on successful conversions, subject to Navi Mudra's internal approval process and partner agreements. Failure to follow proper procedures or involvement in fraudulent activity can result in removal from the partner program and potential legal action.`,
    },
    {
      id: "services-disclaimer",
      title: "5. Services Disclaimer",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: `Navi Mudra provides support in applying for loans, financial products, and government schemes but does not guarantee approval, disbursement, or eligibility. Final decisions rest with the respective financial institutions or regulatory bodies. The EMI calculations provided on our site are indicative and may differ from actual figures offered by lenders. While we strive to ensure the accuracy of information, we do not take responsibility for external policy changes, institutional rejections, or delays caused by third-party partners.`,
    },
    {
      id: "intellectual-property",
      title: "6. Intellectual Property Rights",
      icon: <Shield className="h-5 w-5" />,
      content: `All content, trademarks, graphics, design elements, and software on our platform are the intellectual property of Navi Mudra or its licensors. No part of the website or services may be copied, reproduced, modified, or distributed for commercial purposes without written permission. Users and channel partners must respect all intellectual property rights and avoid any unauthorized use of our branding or materials.`,
    },
    {
      id: "limitation-liability",
      title: "7. Limitation of Liability",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: `Navi Mudra shall not be held liable for any indirect, incidental, special, or consequential damages arising out of or related to the use of our services. This includes, but is not limited to, denial of services by third-party institutions, loss of data, revenue, or goodwill, and any delays caused by external factors. Users agree that their use of the platform is at their own risk and that Navi Mudra cannot guarantee uninterrupted access or error-free performance at all times.`,
    },
    {
      id: "privacy-data",
      title: "8. Privacy and Data Protection",
      icon: <Shield className="h-5 w-5" />,
      content: `We are committed to protecting your privacy. All personal and financial information collected through the website is handled according to our Privacy Policy, in compliance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011. By using our services, you consent to the collection and use of your data in accordance with these policies.`,
    },
    {
      id: "termination",
      title: "9. Termination of Access",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: `Navi Mudra reserves the right to suspend, limit, or terminate access to any user or channel partner found violating these Terms, engaging in fraudulent activity, or disrupting the integrity of the platform. We also reserve the right to withhold payouts or commissions in cases of dispute, misconduct, or breach of agreement. Termination may occur without prior notice in cases involving gross misconduct or legal violations.`,
    },
    {
      id: "governing-law",
      title: "10. Governing Law and Jurisdiction",
      icon: <Scale className="h-5 w-5" />,
      content: `These Terms shall be governed and interpreted in accordance with the laws of India. In case of any disputes, the courts of Noida, Uttar Pradesh shall have exclusive jurisdiction. By using our services, you submit to the jurisdiction of these courts and agree to resolve all disputes in accordance with Indian legal procedures.`,
    },
    {
      id: "updates",
      title: "11. Updates to the Terms",
      icon: <FileText className="h-5 w-5" />,
      content: `Navi Mudra reserves the right to update or revise these Terms at any time. Changes will be posted on this page with an updated effective date. Continued use of the platform after such changes constitutes your acceptance of the revised Terms.`,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[#F7C430] p-4">
              <FileText className="h-8 w-8 text-[#1E1E1E]" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-[#1E1E1E] sm:text-5xl">Terms & Conditions</h1>
          <p className="text-lg text-[#1E1E1E] opacity-80">Effective Date: January 1, 2024</p>
          <p className="mt-4 text-lg text-[#1E1E1E]">
            Please read these terms carefully before using our platform and services.
          </p>
        </div>
      </section>

      {/* Welcome Note */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="mx-auto max-w-4xl">
          <Card className="border-[#F7C430] bg-[#FFFFFF]">
            <CardContent className="p-6">
              <p className="text-lg text-[#1E1E1E] leading-relaxed">
                Welcome to Navi Mudra. These Terms and Conditions ("Terms") govern your access to and use of our website
                and services, available at <span className="font-semibold">https://fundraizer-webdrave.vercel.app</span>
                . Whether you are using our platform as an individual user or as a channel partner, your use of our
                services indicates your agreement to these Terms. Please read them carefully before proceeding.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.id} className="border-[#FFF0C3] shadow-sm">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-[#F7C430] p-2 text-[#1E1E1E]">{section.icon}</div>
                    <h2 className="text-2xl font-semibold text-[#1E1E1E]">{section.title}</h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-[#1E1E1E]">
                    <p className="leading-relaxed">{section.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-[#FFF0C3] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-[#F7C430] bg-[#FFFFFF]">
            <CardContent className="p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-[#1E1E1E]">Important Notice</h3>
              </div>
              <p className="text-[#1E1E1E] leading-relaxed">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these
                Terms and Conditions. If you do not agree with any part of these terms, please do not use our platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1E1E1E]">Questions About These Terms?</h2>
          <p className="mb-8 text-lg text-[#1E1E1E]">
            If you have any questions about these Terms & Conditions, please don't hesitate to contact us.
          </p>
          <Button className="bg-[#F7C430] px-8 py-4 text-lg font-semibold text-[#1E1E1E] hover:bg-[#E6B429]">
            <Phone className="mr-2 h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}
