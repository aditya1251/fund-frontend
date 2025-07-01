import { User, PresentationIcon as PresentationChart, Trophy } from "lucide-react"

export default function Journey() {
  return (
    <section className="bg-[#f3f3f1] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] mb-6">
            OUR JOURNEY IN <span className="text-[#f7c430]">NUMBERS</span>
          </h2>
          <p className="text-[#141212] text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Fund Raizer Helps Individuals And Businesses Access Trusted Loans And Government-Backed Funding With Ease.
            We Simplify The Process, Offering Quick Tools And Expert Support To Fuel Your Financial Growth.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 - Active Clients */}
          <div className="bg-[#f7c430] rounded-2xl p-8 text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-[#000000]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">1800+ Active Clients</h3>
            <p className="text-[#141212] text-base md:text-lg">
              Egestas elit dui scelerisque ut eu purus aliquam vitae.
            </p>
          </div>

          {/* Card 2 - Projects Completed */}
          <div className="bg-[#f7c430] rounded-2xl p-8 text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <PresentationChart className="w-8 h-8 text-[#000000]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">850+ Project Completed</h3>
            <p className="text-[#141212] text-base md:text-lg">Reports customized to your metrics.</p>
          </div>

          {/* Card 3 - Years */}
          <div className="bg-[#f7c430] rounded-2xl p-8 text-center">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-[#000000]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">2 Glorious Years</h3>
            <p className="text-[#141212] text-base md:text-lg">
              Egestas elit dui scelerisque ut eu purus aliquam vitae.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
