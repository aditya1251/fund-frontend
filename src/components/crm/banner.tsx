import Image from "next/image";

const images = [
	{ src: "/banner/banner1.png", alt: "Carousel 1", span: 2 },
	{ src: "/banner/banner2.png", alt: "Carousel 2", span: 3 },
	{ src: "/banner/banner3.png", alt: "Carousel 3", span: 2 },
];

export default function Banner() {
	return (
		<section className="mb-6">
			{/* Hero Banners */}
			<div className="grid grid-cols-7 gap-2 items-stretch">
				{images.map((img, i) => (
					<div
						key={i}
						className={`col-span-${img.span} relative aspect-[5/2] rounded-xl overflow-hidden`}
					>
						<Image
							src={img.src}
							alt={img.alt}
							fill
							className="object-cover rounded-xl"
							sizes="(max-width: 768px) 100vw, 33vw"
							priority={i === 1} // center image loads first
						/>
					</div>
				))}
			</div>

			{/* Pagination Dots */}
			<div className="flex justify-center gap-2 py-3">
				{Array.from({ length: 6 }, (_, i) => (
					<div
						key={i}
						className={`h-2 rounded-full transition-all duration-300 ${
							i === 2 ? "bg-black w-8" : "bg-[#cbcccc] w-2"
						}`}
					/>
				))}
			</div>
		</section>
	);
}
