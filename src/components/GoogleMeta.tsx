import {
  Target,
  TrendingUp,
  Zap,
  Building2,
  Calculator,
  Upload,
  AlertTriangle,
  Briefcase,
  Factory,
  Store,
  Search,
  Share2,
  Eye,
  BarChart3,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GoogleMetaAdsLanding() {
  const whyAdsAreCrucial = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Get Results Fast",
      description:
        "Unlike other marketing methods that can take months to show results, ads can bring new customers and sales almost immediately.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Reach the Right People",
      description:
        "You can show your ads to a very specific audience. On Google: target people searching for your exact product. On Meta: target by age, location, interests, and social media behavior.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Control Your Budget",
      description:
        "You decide exactly how much you want to spend every day or month. You have full control, and you only pay when people click on your ad or see it.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "See What Works",
      description:
        "You can easily track how many people saw your ad, clicked on it, and bought something. This helps you understand what is working best and where to put your money for the best results.",
      color: "bg-orange-100 text-orange-600",
    },
  ]

  const serviceSteps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Strategy",
      description:
        "We'll help you decide whether Google Ads, Meta Ads, or a combination of both is right for your business goals and budget.",
    },
    {
      icon: <Upload className="h-6 w-6" />,
      title: "Campaign Setup",
      description:
        "We handle all the technical details of setting up the campaigns, so you don't have to worry about the complex forms or settings.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Creative Ads",
      description:
        "We'll help you create compelling ad text, images, and videos that catch people's attention and make them want to click.",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Budget Management",
      description: "We will manage your ad spend to make sure you get the most out of every rupee you spend.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Ongoing Support",
      description:
        "We don't just set up the ads and leave. We continuously monitor their performance, make changes, and provide you with clear reports so you know how well your ads are doing.",
    },
  ]

  const adPlatforms = [
    {
      platform: "Google Ads",
      description: "Ads on Google Search, YouTube, and partner websites",
      audience: "People actively searching for your products/services",
      adTypes: ["Search Ads", "Display Ads", "YouTube Ads", "Shopping Ads"],
      bestFor: "High-intent customers ready to buy",
      avgCPC: "₹5 - ₹500 per click",
      conversionRate: "2-5% average",
      timeline: "Results in 1-7 days",
    },
    {
      platform: "Meta Ads (Facebook & Instagram)",
      description: "Ads in social media feeds and stories",
      audience: "People based on interests, demographics, and behavior",
      adTypes: ["Feed Ads", "Story Ads", "Reel Ads", "Carousel Ads"],
      bestFor: "Brand awareness and social engagement",
      avgCPC: "₹2 - ₹200 per click",
      conversionRate: "1-3% average",
      timeline: "Results in 3-14 days",
    },
  ]

  const businessTypes = [
    {
      icon: <Store className="h-5 w-5" />,
      title: "E-commerce Stores",
      description: "Online retailers and product sellers",
      adStrategy: "Shopping ads, retargeting, conversion campaigns",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      title: "Local Services",
      description: "Restaurants, salons, clinics, repair services",
      adStrategy: "Local ads, call campaigns, location targeting",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "B2B Companies",
      description: "Software, consulting, professional services",
      adStrategy: "LinkedIn ads, lead generation, remarketing",
    },
    {
      icon: <Factory className="h-5 w-5" />,
      title: "Startups & SMEs",
      description: "Growing businesses seeking quick results",
      adStrategy: "Brand awareness, traffic campaigns, conversions",
    },
  ]

  const adBenefits = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Immediate Results",
      description: "Start getting traffic and leads within hours",
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Precise Targeting",
      description: "Reach exactly the right audience",
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: "Measurable ROI",
      description: "Track every rupee spent and earned",
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Budget Control",
      description: "Set daily/monthly spending limits",
    },
  ]

  const stats = [
    { number: "1000+", label: "Ad Campaigns Managed", icon: <Target className="h-5 w-5" /> },
    { number: "400%", label: "Average ROAS", icon: <TrendingUp className="h-5 w-5" /> },
    { number: "₹50L+", label: "Ad Spend Managed", icon: <DollarSign className="h-5 w-5" /> },
    { number: "24/7", label: "Campaign Monitoring", icon: <Eye className="h-5 w-5" /> },
  ]

  const campaignProcess = [
    {
      step: "Strategy & Research",
      duration: "1-3 Days",
      description: "Analyze business goals, competitors, and target audience",
    },
    {
      step: "Campaign Setup",
      duration: "2-5 Days",
      description: "Create campaigns, ad groups, and targeting parameters",
    },
    {
      step: "Creative Development",
      duration: "3-7 Days",
      description: "Design compelling ad creatives, copy, and landing pages",
    },
    {
      step: "Launch & Optimize",
      duration: "Ongoing",
      description: "Launch campaigns and continuously optimize for better performance",
    },
  ]

  const adMetrics = [
    {
      metric: "Click-Through Rate (CTR)",
      description: "Percentage of people who click your ad",
      goodRange: "2-5% for search, 1-2% for display",
      importance: "Measures ad relevance",
    },
    {
      metric: "Cost Per Click (CPC)",
      description: "Average amount paid for each click",
      goodRange: "Varies by industry",
      importance: "Controls advertising costs",
    },
    {
      metric: "Conversion Rate",
      description: "Percentage of clicks that become customers",
      goodRange: "2-5% average",
      importance: "Measures campaign effectiveness",
    },
    {
      metric: "Return on Ad Spend (ROAS)",
      description: "Revenue generated per rupee spent",
      goodRange: "3:1 to 5:1 ratio",
      importance: "Measures profitability",
    },
  ]

  const targetingOptions = [
    {
      platform: "Google Ads",
      options: [
        "Keywords & Search Terms",
        "Location & Demographics",
        "Device & Time Targeting",
        "Audience Interests",
        "Remarketing Lists",
      ],
    },
    {
      platform: "Meta Ads",
      options: [
        "Age, Gender, Location",
        "Interests & Behaviors",
        "Custom Audiences",
        "Lookalike Audiences",
        "Life Events",
      ],
    },
  ]

  const campaignTypes = [
    {
      type: "Search Campaigns",
      platform: "Google",
      purpose: "Capture high-intent searches",
      bestFor: "Direct sales and leads",
      avgCost: "₹10-500 per click",
    },
    {
      type: "Display Campaigns",
      platform: "Google",
      purpose: "Brand awareness and remarketing",
      bestFor: "Visual products and services",
      avgCost: "₹2-50 per click",
    },
    {
      type: "Social Feed Ads",
      platform: "Meta",
      purpose: "Engagement and conversions",
      bestFor: "B2C products and services",
      avgCost: "₹5-200 per click",
    },
    {
      type: "Video Campaigns",
      platform: "Both",
      purpose: "Brand storytelling",
      bestFor: "Complex products/services",
      avgCost: "₹1-100 per view",
    },
  ]

  const commonMistakes = [
    {
      mistake: "Poor Keyword Selection",
      impact: "Wasted budget on irrelevant clicks",
      solution: "Professional keyword research and negative keywords",
    },
    {
      mistake: "Weak Ad Copy",
      impact: "Low click-through rates",
      solution: "Compelling, benefit-focused ad copy",
    },
    {
      mistake: "No Landing Page Optimization",
      impact: "High bounce rates, low conversions",
      solution: "Optimized landing pages that match ad intent",
    },
    {
      mistake: "Inadequate Tracking",
      impact: "Cannot measure ROI effectively",
      solution: "Proper conversion tracking and analytics setup",
    },
  ]

  const budgetGuidelines = [
    { businessSize: "Small Local Business", suggestedBudget: "₹5,000 - ₹25,000/month", focus: "Local targeting" },
    { businessSize: "Growing SME", suggestedBudget: "₹25,000 - ₹1,00,000/month", focus: "Expansion campaigns" },
    {
      businessSize: "Established Business",
      suggestedBudget: "₹1,00,000 - ₹5,00,000/month",
      focus: "Scale and optimize",
    },
    { businessSize: "Enterprise", suggestedBudget: "₹5,00,000+/month", focus: "Multi-channel strategy" },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF0C3] via-[#FFFFFF] to-[#FFF0C3] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-[#F7C430] rounded-full">
                <Target className="h-12 w-12 text-[#1E1E1E]" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E1E1E] mb-4">Google and Meta Ads</h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1E1E1E] mb-8">
              Grow Your Business with Smart Online Ads
            </h2>
            <p className="text-lg sm:text-xl text-[#1E1E1E] max-w-4xl mx-auto mb-10 leading-relaxed">
              When you want to reach new customers quickly and efficiently, running online ads is a powerful solution.
              Google and Meta (Facebook and Instagram) are the two biggest places to do this. Think of it as a way to
              get your business in front of the right people at the right time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#F7C430] hover:bg-[#E6B429] text-[#1E1E1E] font-semibold px-8 py-4 text-lg"
              >
                <Target className="mr-2 h-5 w-5" />
                Start Ad Campaigns
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#F7C430] text-[#1E1E1E] hover:bg-[#FFF0C3] px-8 py-4 text-lg bg-transparent"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Ad Budget
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

      {/* What are Google and Meta Ads Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-12 text-center">
            What are Google and Meta Ads?
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {adPlatforms.map((platform, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#F7C430] rounded-lg">
                      {platform.platform === "Google Ads" ? (
                        <Search className="h-6 w-6 text-[#1E1E1E]" />
                      ) : (
                        <Share2 className="h-6 w-6 text-[#1E1E1E]" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E]">{platform.platform}</h3>
                  </div>
                  <p className="text-lg text-[#1E1E1E] leading-relaxed mb-6">{platform.description}</p>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-[#1E1E1E] mb-2">Target Audience:</p>
                      <p className="text-sm text-[#1E1E1E] opacity-80">{platform.audience}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#1E1E1E] mb-2">Ad Types:</p>
                      <div className="flex flex-wrap gap-1">
                        {platform.adTypes.map((type, idx) => (
                          <Badge key={idx} className="bg-[#FFF0C3] text-[#1E1E1E] text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-[#1E1E1E] mb-1">Best For:</p>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{platform.bestFor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1E1E1E] mb-1">Timeline:</p>
                        <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{platform.timeline}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-[#1E1E1E] mb-1">Avg. CPC:</p>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{platform.avgCPC}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1E1E1E] mb-1">Conversion Rate:</p>
                        <p className="text-sm text-[#1E1E1E] opacity-80">{platform.conversionRate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Campaign Types</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Different campaign types serve different business objectives. We help you choose the right mix for maximum
            impact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaignTypes.map((campaign, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 bg-[#F7C430] rounded-lg">
                      <Target className="h-6 w-6 text-[#1E1E1E]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-[#1E1E1E]">{campaign.type}</h3>
                        <Badge className="bg-[#1E1E1E] text-[#FFFFFF] text-xs">{campaign.platform}</Badge>
                      </div>
                      <p className="text-[#1E1E1E] opacity-80 mb-4">{campaign.purpose}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">Best For:</p>
                      <p className="text-sm text-[#1E1E1E] opacity-80">{campaign.bestFor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E1E1E] mb-1">Average Cost:</p>
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{campaign.avgCost}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Key Ad Metrics</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            We track important metrics to measure campaign success and optimize your ad spend for better results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adMetrics.map((metric, index) => (
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
                      <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{metric.goodRange}</Badge>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Common Ad Campaign Mistakes
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Many businesses waste money on poorly managed ad campaigns. Our expertise helps you avoid these costly
            mistakes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="bg-[#FFFFFF] border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
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

      {/* Campaign Process Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Campaign Process</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Our systematic approach ensures effective ad campaigns with quick setup and continuous optimization for
            maximum ROI.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {campaignProcess.map((process, index) => (
              <Card key={index} className="border-[#FFF0C3] shadow-lg text-center relative">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-[#F7C430] rounded-full flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[#1E1E1E]">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-[#1E1E1E] text-lg mb-2">{process.step}</h3>
                  <Badge className="bg-[#1E1E1E] text-[#FFFFFF] mb-3 text-xs">{process.duration}</Badge>
                  <p className="text-sm text-[#1E1E1E] opacity-80">{process.description}</p>
                </CardContent>
                {index < campaignProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#F7C430] transform -translate-y-1/2"></div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ads are Crucial Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFF0C3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">
            Why are Google and Meta Ads So Crucial?
          </h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Online advertising provides unmatched opportunities for rapid business growth, precise targeting, and
            measurable results in today's digital marketplace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyAdsAreCrucial.map((reason, index) => (
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

      {/* Ad Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Advertising Benefits</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Professional ad management provides comprehensive benefits that drive immediate results and long-term
            business growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adBenefits.map((benefit, index) => (
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
            Navigating these ad platforms can be complex, but we make it simple. We are your partner in running
            successful ad campaigns.
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
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1E] mb-8 text-center">Who Needs This Service?</h2>
          <p className="text-lg text-[#1E1E1E] text-center mb-12 max-w-3xl mx-auto">
            Any business that wants to get fast results. Whether you want to increase sales for your online store, get
            more calls for your local service, or build brand awareness quickly, Google and Meta Ads can help you
            achieve your goals.
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
                  <Badge className="bg-[#F7C430] text-[#1E1E1E] text-xs">{business.adStrategy}</Badge>
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
