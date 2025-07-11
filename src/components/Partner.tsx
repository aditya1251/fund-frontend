import Image from "next/image";

export default function TrustedPartners() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-[#111111]">Our Trusted </span>
          <span className="text-[#f7c430]">Partners</span>
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
          We're proud to collaborate with leading organizations and government
          bodies who support our mission. Their trust and partnership help us
          deliver reliable and impactful services to our users.
        </p>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <div className="flex items-center justify-center h-16 w-40">
            <Image
              src="/placeholder.svg?height=64&width=160"
              alt="HDFC Bank"
              width={160}
              height={64}
              className="max-h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center justify-center h-16 w-40">
            <Image
              src="/placeholder.svg?height=64&width=160"
              alt="Axis Bank"
              width={160}
              height={64}
              className="max-h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center justify-center h-16 w-40">
            <Image
              src="/placeholder.svg?height=64&width=160"
              alt="Bajaj Finserv"
              width={160}
              height={64}
              className="max-h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center justify-center h-16 w-40">
            <Image
              src="/placeholder.svg?height=64&width=160"
              alt="LIC HFL"
              width={160}
              height={64}
              className="max-h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center justify-center h-16 w-40">
            <Image
              src="/placeholder.svg?height=64&width=160"
              alt="IndusInd Bank"
              width={160}
              height={64}
              className="max-h-16 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
