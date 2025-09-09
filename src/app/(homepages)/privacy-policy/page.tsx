import { Shield, Eye, Lock, Users, FileText, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: <Shield className="h-5 w-5" />,
      content: `Welcome to Navi Mudra ("we," "our," or "us"). We are committed to protecting your privacy and safeguarding your personal data. This Privacy Policy outlines how we collect, use, store, and protect the information you provide when using our website or services.

By accessing or using our platform, you acknowledge and accept the practices described in this policy. If you do not agree with any part of this policy, we kindly request that you refrain from using our services.`,
    },
    {
      id: "information-collection",
      title: "2. What Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: `We collect various types of information to provide and improve our services effectively. This includes:

**Personal Information:** When you register on our site, apply for any services, or contact us, we may collect personal details such as your name, email address, phone number, business information, and other relevant details necessary for service eligibility and processing.

**Financial Information:** For processing loan applications and using financial tools such as EMI calculators, we may collect data such as preferred loan amounts, interest rates, tenure, and other finance-related inputs.

**Usage and Device Data:** We may automatically collect certain technical data about your device and browsing behavior, including your IP address, browser type, operating system, pages visited, time spent, and interactions on our website. This helps us enhance functionality and user experience through cookies and analytics tools.`,
    },
    {
      id: "information-usage",
      title: "3. How We Use Your Information",
      icon: <FileText className="h-5 w-5" />,
      content: `We use the information we collect to deliver, personalize, and improve our services. Specifically, we may use your data to:

• Process applications related to loans, insurance, government schemes, and other financial services.
• Offer personalized service plans such as Standard, Premium, or Professional packages based on your needs.
• Enable the use of tools such as EMI calculators and financial planning features.
• Communicate with you regarding your applications, service updates, or support inquiries.
• Analyze website usage to improve performance, security, and user experience.
• Fulfill legal or regulatory requirements as mandated by applicable laws.`,
    },
    {
      id: "information-sharing",
      title: "4. How We Share Your Information",
      icon: <Users className="h-5 w-5" />,
      content: `We treat your data with confidentiality and share it only when necessary to provide our services effectively.

We may share your information with our partners, such as verified banks and NBFCs (e.g., HDFC, Axis Bank, ICICI, SBI) for the purpose of processing your loan or service applications.

We may also work with trusted third-party service providers for technical support, website hosting, analytics, and customer service.

In rare instances, we may disclose your information to legal authorities if required by law or if it is necessary to protect our legal rights or respond to lawful requests.

We do not sell or rent your personal information to any third parties for advertising or marketing purposes.`,
    },
    {
      id: "cookies",
      title: "5. Cookies and Tracking Technologies",
      icon: <Lock className="h-5 w-5" />,
      content: `Our website uses cookies and similar technologies to enhance your browsing experience, analyze traffic, and personalize content. Cookies are small files stored on your device that help us remember your preferences and understand site usage. You can manage or disable cookies through your browser settings, although doing so may affect some site functionality.`,
    },
    {
      id: "data-security",
      title: "6. Data Security",
      icon: <Shield className="h-5 w-5" />,
      content: `We follow industry-standard security measures to protect your personal data from unauthorized access, disclosure, or misuse. These include encrypted communication, secure servers, firewalls, and regular audits. However, no method of data transmission over the internet or electronic storage is completely secure. Therefore, the use of our services is at your own risk.`,
    },
    {
      id: "data-retention",
      title: "7. Data Retention",
      icon: <FileText className="h-5 w-5" />,
      content: `We retain your personal information only for as long as it is necessary to provide services, comply with legal obligations, resolve disputes, or enforce agreements. Once your information is no longer required for these purposes, we securely delete or anonymize it in accordance with our internal policies.`,
    },
    {
      id: "your-rights",
      title: "8. Your Rights",
      icon: <Users className="h-5 w-5" />,
      content: `Depending on the laws in your jurisdiction, you may have certain rights regarding your personal data. These may include the right to access, correct, or delete your information, restrict or object to certain types of processing, or withdraw consent where processing is based on consent.

To exercise any of these rights, you can contact us at info@navi-mudra.com, and we will respond in accordance with applicable legal requirements.`,
    },
    {
      id: "policy-changes",
      title: "9. Changes to This Policy",
      icon: <FileText className="h-5 w-5" />,
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices, services, or legal obligations. When we make significant changes, we will revise the "Effective Date" and may notify you through our platform. Your continued use of the website or services after such updates constitutes your acceptance of the revised policy.`,
    },
    {
      id: "contact",
      title: "10. Contact Us",
      icon: <Phone className="h-5 w-5" />,
      content: `If you have any questions, concerns, or complaints regarding this Privacy Policy or how we handle your data, please feel free to contact us.

We take your privacy seriously and will do our best to respond to your queries promptly.`,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[#F7C430] p-4">
              <Shield className="h-8 w-8 text-[#1E1E1E]" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-[#1E1E1E] sm:text-5xl">Privacy Policy</h1>
          <p className="text-lg text-[#1E1E1E] opacity-80">Effective Date: January 1, 2024</p>
          <p className="mt-4 text-lg text-[#1E1E1E]">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
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
                    {section.content.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="mb-4 leading-relaxed">
                        {paragraph.split("\n").map((line, lineIdx) => (
                          <span key={lineIdx}>
                            {line.startsWith("**") && line.endsWith("**") ? (
                              <strong>{line.slice(2, -2)}</strong>
                            ) : line.startsWith("• ") ? (
                              <span className="block ml-4">• {line.slice(2)}</span>
                            ) : (
                              line
                            )}
                            {lineIdx < paragraph.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#FFF0C3] py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#1E1E1E]">Questions About Your Privacy?</h2>
          <p className="mb-8 text-lg text-[#1E1E1E]">
            We're here to help. Contact us if you have any questions about how we handle your data.
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
