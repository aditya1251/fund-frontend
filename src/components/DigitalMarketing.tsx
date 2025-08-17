import {
  Megaphone,
  TrendingUp,
  Target,
  Building2,
  Phone,
  Calculator,
  Upload,
  AlertTriangle,
  Award,
  Users,
  Briefcase,
  Factory,
  Store,
  Search,
  Share2,
  Globe,
  Smartphone,
  Eye,
  MousePointer,
  BarChart3,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DigitalMarketingLanding() {
  const whyDigitalMarketingCrucial = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Reach More People",
      description:
        "Digital marketing allows you to reach a much larger audience than traditional methods. You can connect with people not just in your city, but all over the country and even the world.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Cost-Effective",
      description:
        "It is often more affordable than traditional advertising and gives you more control over your budget. You can start with a small amount and increase it as you see results.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Targeted Customers",
      description:
        "You can show your ads and content to a very specific group of people who are most likely to be interested in your business. For example, you can target people based on their age, location, or interests.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Measure Results Easily",
      description:
        "Unlike a newspaper ad, with digital marketing, you can see exactly how many people saw your ad, clicked on it, and became a customer. This helps you understand what is working and what is not.",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Build Your Brand",
      description: "Having a strong online presence helps you build trust and a good reputation for your brand.",
      color: "bg-red-100 text-red-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Social Media Marketing",
      description:
        "We help you build a strong community on platforms like Facebook, Instagram, and WhatsApp. We create interesting content and run ads that connect you with your ideal customers and build a loyal following.",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Search Engine Optimization (SEO)",
      description:
        "We make sure your website shows up on the first page of Google when people search for products or services you offer. This brings in free, targeted traffic to your business.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Content Marketing",
      description:
        "We help you create valuable content like blog posts, videos, or guides that answer your customers' questions. This shows that you are an expert in your field and builds trust.",
    },
    {
      icon: <MousePointer className="h-6 w-6" />,
      title: "Paid Advertising",
      description:
        "We run smart, targeted ad campaigns on Google and social media to get quick results. We manage your ads to make sure you get the best return on your money.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Website Design",
      description:
        "We can help you build a simple, clean, and professional website that works perfectly on phones and computers, giving your customers a great experience.",
    },
  ]

  const digitalChannels = [
    {
      channel: "Social Media Marketing",
      platforms: ["Facebook", "Instagram", "WhatsApp", "LinkedIn"],
      purpose: "Community building and engagement",
      results: "Brand awareness, customer loyalty",
      investment: "₹5,000 - ₹50,000/month",
      timeline: "2-4 weeks to see engagement",
    },
    {
      channel: "Search Engine Optimization",
      platforms: ["Google", "Bing", "Local Search"],
      purpose: "Organic visibility and traffic",
      results: "Free targeted traffic, leads",
      investment: "₹10,000 - ₹1,00,000/month",
      timeline: "3-6 months for results",
    },
    {
      channel: "Paid Advertising",
      platforms: ["Google Ads", "Facebook Ads", "Instagram Ads"],
      purpose: "Quick results and conversions",
      results: "Immediate traffic, sales",
      investment: "₹10,000 - ₹5,00,000/month",
      timeline: "1-2 weeks for optimization",
    },
    {
      channel: "Content Marketing",
      platforms: ["Blog", "YouTube", "Email", "WhatsApp"],
      purpose: "Authority building and trust",
      results: "Expert positioning, leads",
      investment: "₹8,000 - ₹80,000/month",
      timeline: "1-3 months for traction",
    },
  ]

  const businessTypes = [
    {
      icon: <Store className="h-5 w-5" />,
      title: "Local Businesses",
      description: "Shops, restaurants, salons, clinics",
      digitalNeeds: "Local SEO, Google My Business, Social Media",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Service Providers",
      description: "Consultants, agencies, professionals",
      digitalNeeds: "Website, Content Marketing, LinkedIn",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      title: "Manufacturing & B2B",
      description: "Manufacturers, suppliers, distributors",
      digitalNeeds: "B2B Marketing, Lead Generation, Industry SEO",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "E-commerce & Online",
      description: "Online stores, digital products, apps",
      digitalNeeds: "Performance Marketing, Conversion Optimization",
    },
  ]

  const digitalBenefits = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Business Growth",
      description: "Increase sales and revenue through digital channels",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Customer Acquisition",
      description: "Attract new customers cost-effectively",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Brand Building",
      description: "Build trust and reputation online",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Measurable Results",
      description: "Track ROI and optimize performance",
    },
  ]

  const stats = [
    { number: "500+", label: "Businesses Grown", icon: <TrendingUp className="h-5 w-5" /> },
    { number: "300%", label: "Average ROI", icon: <Target className="h-5 w-5" /> },
    { number: "50K+", label: "Leads Generated", icon: <Users className="h-5 w-5" /> },
    { number: "24/7", label: "Campaign Monitoring", icon: <Eye className="h-5 w-5" /> },
  ]

  const marketingProcess = [
    {
      step: "Strategy & Planning",
      duration: "1-2 Weeks",
      description: "Understand business goals, target audience, and create digital strategy",
    },
    {
      step: "Setup & Implementation",
      duration: "2-4 Weeks",
      description: "Set up campaigns, create content, and launch marketing activities",
    },
    {
      step: "Optimization & Testing",
      duration: "Ongoing",
      description: "Monitor performance, A/B test, and optimize for better results",
    },
    {
      step: "Reporting & Growth",
      duration: "Monthly",
      description: "Provide detailed reports and scale successful campaigns",
    },
  ]

  const digitalTools = [
    {
      tool: "Google Analytics",
      purpose: "Website traffic and user behavior analysis",
      benefit: "Data-driven decision making",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      tool: "Facebook Business Manager",
      purpose: "Social media advertising and management",
      benefit: "Targeted audience reach",
      icon: <Share2 className="h-4 w-4" />,
    },
    {
      tool: "Google Ads",
      purpose: "Search and display advertising",
      benefit: "Immediate visibility and traffic",
      icon: <Search className="h-4 w-4" />,
    },
    {
      tool: "SEO Tools",
      purpose: "Search engine optimization and ranking",
      benefit: "Organic traffic growth",
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ]

  const marketingMetrics = [
    {
      metric: "Website Traffic",
      description: "Number of visitors to your website",
      importance: "Measures online visibility",
      target: "20-50% monthly growth",
    },
    {
      metric: "Conversion Rate",
      description: "Percentage of visitors who become customers",
      importance: "Measures effectiveness",
      target: "2-5% for most industries",
    },
    {
      metric: "Cost Per Lead",
      description: "Average cost to acquire one potential customer",
      importance: "Measures efficiency",
      target: "Varies by industry",
    },
    {
      metric: "Return on Ad Spend",
      description: "Revenue generated per rupee spent on advertising",
      importance: "Measures profitability",
      target: "3:1 to 5:1 ratio",
    },
  ]

  const commonChallenges = [
    {
      challenge: "Low Online Visibility",
      impact: "Missing potential customers",
      solution: "SEO and content marketing strategy",
    },
    {
      challenge: "High Customer Acquisition Cost",
      impact: "Reduced profitability",
      solution: "Targeted campaigns and optimization",
    },
    {
      challenge: "Poor Website Performance",
      impact: "High bounce rates",
      solution: "Website optimization and user experience",
    },
    {
      challenge: "Inconsistent Brand Message",
      impact: "Confused customers",
      solution: "Integrated marketing strategy",
    },
  ]

  const digitalTrends = [
    { trend: "Mobile-First Marketing", adoption: "85% of users on mobile", impact: "Critical for success" },
    { trend: "Video Content", adoption: "80% prefer video content", impact: "Higher engagement rates" },
    { trend: "Local Search", adoption: "46% of searches are local", impact: "Essential for local businesses" },
    { trend: "Social Commerce", adoption: "Growing 30% annually", impact: "Direct sales opportunity" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Megaphone className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Digital Marketing</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Growing Your Business in the Digital World
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              In today's world, almost everyone is online, whether they are shopping, looking for information, or
              connecting with friends. Digital marketing is the simple and smart way to reach these people and grow your
              business. It's all about meeting your customers where they are: on their phones, on social media, and on
              search engines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Megaphone className="mr-2 h-5 w-5" />
                Start Digital Marketing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Get Marketing Audit
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

      {/* What is Digital Marketing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What is Digital Marketing?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <Smartphone className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">Online Business Promotion</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">
                    Digital marketing is the use of digital tools and online channels to promote your products or
                    services. Instead of using traditional methods like newspaper ads or flyers, you use the internet to
                    connect with potential customers.
                  </p>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed">
                    This includes things like having a good website, being active on social media, and showing up when
                    people search for your services online.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">Digital Marketing Tools</h3>
              {digitalTools.map((tool, index) => (
                <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#F7C430] rounded-full flex items-center justify-center">
                        <div className="text-[#1E1E1E]">{tool.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E1E1E]">{tool.tool}</h4>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{tool.purpose}</p>
                        <p className="text-xs text-green-600 font-medium">{tool.benefit}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digital Channels Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Digital Marketing Channels</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different digital channels serve different purposes and deliver varying results. We help you choose the
            right mix for your business goals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {digitalChannels.map((channel, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <Megaphone className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">{channel.channel}</h3>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{channel.purpose}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {channel.platforms.map((platform, idx) => (
                          <Badge key={idx} className="bg-[#FFF0C3] text-[#1E1E1E] text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">Expected Results</p>
                      <p className="text-sm text-[#1E1E1E] opacity-80">{channel.results}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">Timeline</p>
                      <p className="text-sm text-[#1E1E1E] opacity-80">{channel.timeline}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">Investment Range</p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{channel.investment}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key Marketing Metrics</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We track important metrics to measure success and optimize your digital marketing campaigns for better
            results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketingMetrics.map((metric, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      <BarChart3 className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{metric.metric}</h3>
                      <p className="text-sm text-[#1E1E1E] opacity-80 mb-2">{metric.description}</p>
                      <p className="text-sm text-[#1E1E1E] mb-2">{metric.importance}</p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{metric.target}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Challenges Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Common Digital Marketing Challenges
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Many businesses face digital marketing challenges that prevent growth. Our expert solutions help overcome
            these obstacles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonChallenges.map((challenge, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1E1E] mb-2">{challenge.challenge}</h3>
                      <p className="text-sm text-red-600 mb-2 font-medium">Impact: {challenge.impact}</p>
                      <p className="text-sm text-green-600 font-medium">Solution: {challenge.solution}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Marketing Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our systematic approach ensures effective digital marketing campaigns with measurable results and continuous
            optimization.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {marketingProcess.map((process, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg text-center relative">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{process.step}</h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">{process.duration}</Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">{process.description}</p>
                </CardContent>
                {index < marketingProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Digital Marketing is Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why is Digital Marketing So Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Digital marketing provides unprecedented opportunities for business growth, customer engagement, and
            measurable results in today's connected world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyDigitalMarketingCrucial.map((reason, index) => (
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

      {/* Digital Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Digital Marketing Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Professional digital marketing services provide comprehensive benefits that drive business growth and
            competitive advantage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalBenefits.map((benefit, index) => (
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
            We break down the complexities of digital marketing into simple, effective steps. Our services are designed
            to help your business stand out and succeed online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceSteps.map((step, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#F7C430] rounded-lg text-[#1E1E1E]">{step.icon}</div>
                    <div>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Who Needs Digital Marketing?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Every business, big or small, that wants to grow. Whether you run a small local shop, a home-based business,
            a clinic, or a large company, digital marketing is essential to reach new customers and stay ahead of the
            competition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessTypes.map((business, index) => (
              <Card key={index} className="border-[#FFF0C3] hover:border-[#F7C430] transition-colors text-center">
                <CardContent className="p-6">
                  <div className="mx-auto p-3 bg-[#F7C430] rounded-full w-fit mb-4">
                    <div className="text-[#1E1E1E]">{business.icon}</div>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-3">{business.title}</h3>
                  <p className="text-[#1E1E1E] text-sm mb-3 leading-relaxed">{business.description}</p>
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{business.digitalNeeds}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  )
}
