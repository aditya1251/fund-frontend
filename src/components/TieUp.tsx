export default function Tieup() {
  return (
    <div className="w-full max mx-auto px-6 py-16 bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
          Our <span className="text-yellow-500">NBFC</span> Tieup (110+)
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          We're proud to collaborate with leading organizations and government bodies who support our mission. Their
          trust and partnership help us deliver reliable and impactful services to our users.
        </p>
      </div>

      {/* Logos Section */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {/* HDFC Bank */}
        <div className="flex items-center justify-center h-16 w-48">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-sm flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-bold text-xl">HDFC BANK</span>
          </div>
        </div>

        {/* Axis Bank */}
        <div className="flex items-center justify-center h-16 w-48">
          <div className="flex items-center gap-2">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-red-600"></div>
            <span className="text-red-600 font-bold text-2xl">AXIS BANK</span>
          </div>
        </div>

        {/* Bajaj Finserv */}
        <div className="flex items-center justify-center h-16 w-48">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="text-blue-600">
              <div className="font-bold text-xl">BAJAJ</div>
              <div className="font-semibold text-sm">FINSERV</div>
            </div>
          </div>
        </div>

        {/* LIC HFL */}
        <div className="flex items-center justify-center h-16 w-48">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-500 rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
              </div>
            </div>
            <div className="text-blue-600">
              <div className="font-bold text-lg">LIC HFL</div>
              <div className="text-xs font-medium">LIC HOUSING FINANCE LTD</div>
            </div>
          </div>
        </div>

        {/* IndusInd Bank */}
        <div className="flex items-center justify-center h-16 w-48">
          <span className="text-red-600 font-bold text-2xl italic">IndusInd Bank</span>
        </div>
      </div>
    </div>
  )
}
