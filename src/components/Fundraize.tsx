import Image from "next/image";
import ui2 from "../../public/assets/BuildPNG1.png";
import ui3 from "../../public/assets/GrowPNG1.png";
import ui4 from "../../public/assets/Design1.png";

export default function Fund() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            WHAT MAKES <span className="text-yellow-400">FUNDSRAIZE</span>{" "}
            UNIQUE
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Website Builder */}
          <div className="text-center">
            <div className="mb-8 relative h-80 flex items-center justify-center">
              <Image
                src={ui2}
                alt="Website Builder Illustration"
                width={300}
                height={300}
                className="relative z-10"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Transparency</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              DSA Workflow with Real-Time Status Tracking Track the entire loan
              lifecycle—from lead to disbursement—with live dashboards, alerts,
              and borrower updates to boost DSA trust and cut follow-ups.
            </p>
          </div>

          {/* Grow Your Business */}
          <div className="text-center">
            <div className="mb-8 relative h-80 flex items-center justify-center">
              <Image
                src={ui3}
                alt="Business Growth Illustration"
                width={300}
                height={300}
                className="relative z-10"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">
              Timely Payments
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              DSAs get full visibility of their earnings with real-time updates,
              and timely payout options.
            </p>
          </div>

          {/* Design Anything */}
          <div className="text-center">
            <div className="mb-8 relative h-80 flex items-center justify-center">
              <Image
                src={ui4}
                alt="Design Tools Illustration"
                width={300}
                height={300}
                className="relative z-10"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">
              BCP(Business Channel Partner) Plan
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We enable DSAs to become channel partners and build their own
              network by onboarding sub- DSAs under them.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
