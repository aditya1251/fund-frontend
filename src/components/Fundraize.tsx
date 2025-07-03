import Image from "next/image";

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
              <div className="absolute inset-0 bg-yellow-400 rounded-full w-64 h-64 mx-auto opacity-20"></div>
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Website Builder Illustration"
                width={300}
                height={300}
                className="relative z-10"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">
              Website Builder
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Easily Create Stunning, Responsive Websites Without Coding Using
              Our Intuitive Builder.
            </p>
          </div>

          {/* Grow Your Business */}
          <div className="text-center">
            <div className="mb-8 relative h-80 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Business Growth Illustration"
                width={300}
                height={300}
                className="relative z-10"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">
              Grow Your Business
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Grow Your Business Online With Powerful Tools And Smart Digital
              Solutions.
            </p>
          </div>

          {/* Design Anything */}
          <div className="text-center">
            <div className="mb-8 relative h-80 flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Design Tools Illustration"
                width={300}
                height={300}
                className="relative z-10"
              />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">
              Design Anything.
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Design Anything You Imagine With Flexible Tools And Creative
              Freedom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
