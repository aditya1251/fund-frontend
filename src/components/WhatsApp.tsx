import {
  MessageCircle,
  TrendingUp,
  Zap,
  Building2,
  Phone,
  Calculator,
  Upload,
  Users,
  Briefcase,
  Factory,
  Store,
  Send,
  Eye,
  BarChart3,
  Heart,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function WhatsAppCampaignLanding() {
  const whyWhatsAppCrucial = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "High Read Rate",
      description:
        "People open and read messages on WhatsApp much more often than emails or text messages, so your message is almost certain to be seen.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Personal Connection",
      description:
        "A message on WhatsApp feels more personal and direct. It helps you build a strong, trusting relationship with your customers, which leads to repeat business.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Cost-Effective",
      description:
        "Sending a message to a large group of customers through a WhatsApp campaign is very affordable and can bring great results.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Communication",
      description:
        "Your messages are delivered instantly, so you can share a last-minute offer or an important update right away.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Two-Way Talk",
      description:
        "WhatsApp allows your customers to reply instantly with questions, orders, or feedback. This makes it an excellent tool for customer service and sales.",
      color: "bg-red-100 text-red-600",
    },
  ];

  const serviceSteps = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Smart Strategy",
      description:
        "We'll help you plan what kind of messages to send and when to send them to get the best response from your customers.",
    },
    {
      icon: <Send className="h-6 w-6" />,
      title: "Message Creation",
      description:
        "We'll help you craft clear, engaging, and friendly messages that get your customers excited about your offers.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "List Management",
      description:
        "We'll help you manage your customer lists securely and correctly, making sure you only send messages to people who want to hear from you.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Campaign Execution",
      description:
        "We handle all the technical parts of sending the messages, making sure your campaign runs smoothly and efficiently.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Performance Reports",
      description:
        "We provide you with simple reports on how many people read your messages and responded, so you know exactly how well your campaign performed.",
    },
  ];

  const campaignTypes = [
    {
      type: "Promotional Campaigns",
      purpose: "Share special offers and discounts",
      bestFor: "Sales and revenue generation",
      examples: [
        "Flash sales",
        "New product launches",
        "Seasonal offers",
        "Exclusive discounts",
      ],
      readRate: "95%+ open rate",
      responseRate: "15-25% response rate",
    },
    {
      type: "Informational Updates",
      purpose: "Keep customers informed about business news",
      bestFor: "Customer engagement and retention",
      examples: [
        "New store openings",
        "Service updates",
        "Policy changes",
        "Event announcements",
      ],
      readRate: "90%+ open rate",
      responseRate: "10-20% response rate",
    },
    {
      type: "Customer Service",
      purpose: "Provide support and assistance",
      bestFor: "Customer satisfaction and loyalty",
      examples: [
        "Order confirmations",
        "Delivery updates",
        "Support tickets",
        "Feedback requests",
      ],
      readRate: "98%+ open rate",
      responseRate: "30-50% response rate",
    },
    {
      type: "Reminder Messages",
      purpose: "Remind customers about important actions",
      bestFor: "Reducing no-shows and cart abandonment",
      examples: [
        "Appointment reminders",
        "Payment due dates",
        "Cart abandonment",
        "Renewal notices",
      ],
      readRate: "92%+ open rate",
      responseRate: "20-35% response rate",
    },
  ];

  const businessTypes = [
    {
      icon: <Store className="h-5 w-5" />,
      title: "Local Shops & Retailers",
      description: "Clothing stores, electronics, grocery stores",
      whatsappUse: "Product updates, sales alerts, customer support",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Restaurants & Food Services",
      description: "Restaurants, cafes, food delivery services",
      whatsappUse: "Menu updates, special offers, order confirmations",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Service Providers",
      description: "Salons, clinics, repair services, consultants",
      whatsappUse: "Appointment reminders, service updates, follow-ups",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      title: "E-commerce Businesses",
      description: "Online stores, marketplace sellers",
      whatsappUse: "Order updates, shipping notifications, customer care",
    },
  ];

  const whatsappBenefits = [
    {
      icon: <Eye className="h-5 w-5" />,
      title: "High Visibility",
      description: "95%+ message open rates vs 20% email open rates",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Personal Touch",
      description: "Direct, intimate communication channel",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Delivery",
      description: "Messages delivered in real-time",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Cost Effective",
      description: "Lower cost per message than SMS or email",
    },
  ];

  const stats = [
    {
      number: "2B+",
      label: "WhatsApp Users Globally",
      icon: <Users className="h-5 w-5" />,
    },
    {
      number: "95%",
      label: "Message Open Rate",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      number: "25%",
      label: "Average Response Rate",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      number: "3 Sec",
      label: "Average Read Time",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  const campaignProcess = [
    {
      step: "Strategy Planning",
      duration: "1-2 Days",
      description:
        "Define campaign goals, target audience, and message strategy",
    },
    {
      step: "List Preparation",
      duration: "1-3 Days",
      description: "Clean and segment customer database with proper consent",
    },
    {
      step: "Message Creation",
      duration: "2-4 Days",
      description: "Craft compelling messages with clear call-to-actions",
    },
    {
      step: "Campaign Launch",
      duration: "Same Day",
      description: "Execute campaign and monitor real-time performance",
    },
  ];

  const messageTypes = [
    {
      type: "Text Messages",
      description: "Simple, clear text communications",
      bestFor: "Quick updates, offers, reminders",
      engagement: "High readability",
    },
    {
      type: "Image Messages",
      description: "Visual content with product images",
      bestFor: "Product showcases, visual offers",
      engagement: "Higher engagement rates",
    },
    {
      type: "Document Messages",
      description: "PDFs, catalogs, price lists",
      bestFor: "Detailed information sharing",
      engagement: "Professional communication",
    },
    {
      type: "Interactive Messages",
      description: "Buttons, quick replies, lists",
      bestFor: "Customer service, surveys",
      engagement: "Highest response rates",
    },
  ];

  const campaignMetrics = [
    {
      metric: "Delivery Rate",
      description: "Percentage of messages successfully delivered",
      benchmark: "98-99% for valid numbers",
      importance: "Ensures message reach",
    },
    {
      metric: "Read Rate",
      description: "Percentage of delivered messages that were read",
      benchmark: "90-95% average",
      importance: "Measures message visibility",
    },
    {
      metric: "Response Rate",
      description: "Percentage of recipients who replied",
      benchmark: "15-30% depending on content",
      importance: "Measures engagement level",
    },
    {
      metric: "Conversion Rate",
      description: "Percentage who took desired action",
      benchmark: "5-15% for promotional messages",
      importance: "Measures campaign effectiveness",
    },
  ];

  const bestPractices = [
    {
      practice: "Get Proper Consent",
      importance: "Legal compliance and trust building",
      implementation: "Clear opt-in process with consent records",
    },
    {
      practice: "Personalize Messages",
      importance: "Higher engagement and response rates",
      implementation: "Use customer names and relevant offers",
    },
    {
      practice: "Optimal Timing",
      importance: "Better read and response rates",
      implementation: "Send during business hours, avoid late nights",
    },
    {
      practice: "Clear Call-to-Action",
      importance: "Drive desired customer actions",
      implementation: "Specific, actionable instructions",
    },
  ];

  const complianceFeatures = [
    {
      feature: "Consent Management",
      description: "Track and manage customer opt-ins and opt-outs",
      benefit: "Legal compliance and trust",
    },
    {
      feature: "Message Scheduling",
      description: "Send messages at optimal times automatically",
      benefit: "Better engagement rates",
    },
    {
      feature: "List Segmentation",
      description: "Target specific customer groups with relevant messages",
      benefit: "Higher conversion rates",
    },
    {
      feature: "Performance Analytics",
      description: "Detailed reports on campaign performance",
      benefit: "Data-driven optimization",
    },
  ];

  const industryUseCases = [
    {
      industry: "Retail & E-commerce",
      useCases: [
        "Order confirmations",
        "Shipping updates",
        "Abandoned cart recovery",
        "New arrivals",
      ],
      results: "30% increase in repeat purchases",
    },
    {
      industry: "Healthcare & Wellness",
      useCases: [
        "Appointment reminders",
        "Health tips",
        "Prescription refills",
        "Follow-up care",
      ],
      results: "50% reduction in no-shows",
    },
    {
      industry: "Food & Restaurants",
      useCases: [
        "Daily specials",
        "Order confirmations",
        "Delivery updates",
        "Loyalty rewards",
      ],
      results: "25% increase in repeat orders",
    },
    {
      industry: "Education & Training",
      useCases: [
        "Class reminders",
        "Assignment deadlines",
        "Results notifications",
        "Course updates",
      ],
      results: "40% improvement in attendance",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <MessageCircle className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">
              WhatsApp Campaign Ads
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Connect Directly with Your Customers
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              In a country where millions of people use WhatsApp every day, it's
              a powerful tool to connect with your customers. A WhatsApp
              Campaign is a smart and personal way to send special offers,
              important updates, and useful information directly to your
              customers' phones. It's like having a one-on-one conversation with
              everyone who loves your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href='/contact'>
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start WhatsApp Campaign
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
                  <div className="p-2 bg-[#F7C430] rounded-lg text-[#1E1E1E]">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-[#F7C430] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-[#FFFFFF] opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is WhatsApp Campaign Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is a WhatsApp Campaign?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8 mt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Send className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">
                      Direct Customer Communication
                    </h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    A WhatsApp campaign is a marketing message sent to a list of
                    customers who have given you permission to contact them.
                    It's a direct and personal way to share information.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    Instead of a general ad that anyone might see, a WhatsApp
                    message goes straight to your customer's chat, making it
                    much more likely they will read and respond to it.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">
                Message Types
              </h3>
              {messageTypes.map((type, index) => (
                <Card
                  key={index}
                  className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors"
                >
                  <CardContent className="p-4 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-[#1E1E1E]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">
                          {type.type}
                        </h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">
                          {type.description}
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                          {type.engagement}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Campaign Types
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different campaign types serve different business objectives. We
            help you choose the right approach for maximum engagement and
            results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaignTypes.map((campaign, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <MessageCircle className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                        {campaign.type}
                      </h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">
                        {campaign.purpose}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {campaign.examples.map((example, idx) => (
                          <Badge
                            key={idx}
                            className="bg-[#FFF0C3] text-[#1E1E1E] text-xs"
                          >
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        Best For:
                      </p>
                      <p className="text-sm text-[#1E1E1E] opacity-80">
                        {campaign.bestFor}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        Read Rate:
                      </p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">
                        {campaign.readRate}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">
                        Response Rate:
                      </p>
                      <Badge className="bg-green-100 text-green-600 text-xs">
                        {campaign.responseRate}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Campaign Metrics
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We track important metrics to measure campaign success and optimize
            your WhatsApp marketing for better results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaignMetrics.map((metric, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors"
              >
                <CardContent className="p-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <BarChart3 className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">
                        {metric.metric}
                      </h3>
                      <p className="text-sm text-[#1E1E1E] opacity-80 mb-2">
                        {metric.description}
                      </p>
                      <p className="text-sm text-[#1E1E1E] mb-2">
                        {metric.importance}
                      </p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">
                        {metric.benchmark}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            WhatsApp Campaign Best Practices
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Following best practices ensures higher engagement rates, legal
            compliance, and better customer relationships.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bestPractices.map((practice, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Shield className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">
                        {practice.practice}
                      </h3>
                      <p className="text-sm text-[#1E1E1E] opacity-80 mb-2">
                        {practice.importance}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {practice.implementation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Campaign Process
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our systematic approach ensures effective WhatsApp campaigns with
            proper consent management and optimal message delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {campaignProcess.map((process, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] shadow-lg text-center relative"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">
                    {process.step}
                  </h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">
                    {process.duration}
                  </Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">
                    {process.description}
                  </p>
                </CardContent>
                {index < campaignProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why WhatsApp is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is WhatsApp So Crucial for Your Business?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            WhatsApp provides unmatched opportunities for direct customer
            communication, personal connection, and immediate engagement in
            today's mobile-first world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyWhatsAppCrucial.map((reason, index) => (
              <Card
                key={index}
                className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <CardContent className="p-8 mt-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-lg ${reason.color
                        .replace("text-", "text-")
                        .replace("bg-", "bg-")}`}
                    >
                      {reason.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-[#1E1E1E] leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            WhatsApp Benefits
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Professional WhatsApp campaign management provides comprehensive
            benefits that drive customer engagement and business growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatsappBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{benefit.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
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
            We simplify the process of running a WhatsApp campaign, so you can
            focus on your business. We are your partner in building a strong
            customer connection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">
                      {step.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-[#1E1E1E]">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-[#1E1E1E] leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Needs This Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Who Needs This Service?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Any business that has a customer database and wants to communicate
            with them directly and personally. It's perfect for local shops,
            restaurants, small e-commerce businesses, and service providers who
            want to build loyalty and drive sales.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((business, index) => (
              <Card
                key={index}
                className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center"
              >
                <CardContent className="p-6 mt-4">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{business.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">
                    {business.title}
                  </h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">
                    {business.description}
                  </p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">
                    {business.whatsappUse}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  );
}
