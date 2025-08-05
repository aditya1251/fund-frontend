"use client";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const testimonials = [
	{
		id: 1,
		text: "FundsRaize transformed our business! Their loan application process is incredibly smooth and transparent. The team provided exceptional support throughout our funding journey.",
		author: "Mrs. Gautami Bisht",
		role: "Senior Business Strategist",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		id: 2,
		text: "I can't imagine managing our financial needs without FundsRaize. Their platform makes accessing funding so much easier and more transparent than traditional methods.",
		author: "Mrs. Lavanya Singh",
		role: "Operations Manager",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		id: 3,
		text: "FundsRaize saved our business! They have everything we needed for our expansion. We were treated with utmost professionalism and care. Truly wonderful service!",
		author: "Siddeshwar Singh",
		role: "District Business Officer",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		id: 4,
		text: "FundsRaize is incredibly user-friendly and has streamlined our loan application process. The quick approval and competitive rates are unmatched. Highly recommended!",
		author: "Rahul Sharma",
		role: "Financial Consultant",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		id: 5,
		text: "The support team at FundsRaize is fantastic! They helped us navigate complex government funding schemes with ease. Their expertise made all the difference.",
		author: "Priya Verma",
		role: "Startup Founder",
		avatar: "/placeholder.svg?height=40&width=40",
	},
	{
		id: 6,
		text: "A truly transformative service. FundsRaize connected us with the perfect loan for our business expansion. Their personalized approach exceeded our expectations!",
		author: "Amit Patel",
		role: "Small Business Owner",
		avatar: "/placeholder.svg?height=40&width=40",
	},
];

export default function Testimonials() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const router = useRouter();

	// Responsive configuration
	const getSlidesConfig = () => {
		if (typeof window !== "undefined") {
			if (window.innerWidth >= 1024)
				return { slidesToShow: 3, cardWidth: 33.333 }; // Desktop: 3 cards
			if (window.innerWidth >= 768) return { slidesToShow: 1, cardWidth: 70 }; // Tablet: 1 centered card
			return { slidesToShow: 1, cardWidth: 85 }; // Mobile: 1 centered card
		}
		return { slidesToShow: 3, cardWidth: 33.333 }; // Default for SSR
	};

	const [config, setConfig] = useState(getSlidesConfig());

	// Handle resize
	useEffect(() => {
		const handleResize = () => {
			setConfig(getSlidesConfig());
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Calculate max slides
	const maxSlides =
		config.slidesToShow === 1
			? testimonials.length
			: testimonials.length - config.slidesToShow + 1;

	// Auto-play functionality
	useEffect(() => {
		if (!isAutoPlaying) return;

		const interval = setInterval(() => {
			setCurrentSlide((prev) => {
				const nextSlide = prev + 1;
				return nextSlide >= maxSlides ? 0 : nextSlide;
			});
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(interval);
	}, [isAutoPlaying, maxSlides]);

	const nextSlide = () => {
		setCurrentSlide((prev) => {
			const nextSlide = prev + 1;
			return nextSlide >= maxSlides ? 0 : nextSlide;
		});
		setIsAutoPlaying(false); // Stop auto-play when user interacts
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => {
			const prevSlideIndex = prev - 1;
			return prevSlideIndex < 0 ? maxSlides - 1 : prevSlideIndex;
		});
		setIsAutoPlaying(false); // Stop auto-play when user interacts
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
		setIsAutoPlaying(false); // Stop auto-play when user interacts
	};

	// Calculate transform for centering
	const getTransform = () => {
		if (config.slidesToShow === 1) {
			// Center mode: center the active card
			const centerOffset = (100 - config.cardWidth) / 2;
			const slideOffset = currentSlide * config.cardWidth;
			return `translateX(${centerOffset - slideOffset}%)`;
		} else {
			// Grid mode: normal carousel
			const slideWidth = 100 / config.slidesToShow;
			return `translateX(-${currentSlide * slideWidth}%)`;
		}
	};

	return (
		<section className="py-16 px-4 bg-gray-50">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						What Our Customers Say{" "}
						<span className="text-[#FFD439]">About Us</span>
					</h2>
					<p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
						Join thousands of satisfied customers who have transformed their
						financial future with FundsRaize. Here's what they have to say about
						their experience.
					</p>
				</div>

				{/* Carousel Container */}
				<div className="relative">
					{/* Navigation Buttons */}
					<button
						onClick={prevSlide}
						className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#FFD439] border-4 border-gray-300 hover:border-black rounded-full p-2 md:p-3 shadow-lg hover:shadow-[4px_4px_0_0_#000] transition-all duration-300 group"
						aria-label="Previous testimonial"
					>
						<ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-black" />
					</button>

					<button
						onClick={nextSlide}
						className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#FFD439] border-4 border-gray-300 hover:border-black rounded-full p-2 md:p-3 shadow-lg hover:shadow-[4px_4px_0_0_#000] transition-all duration-300 group"
						aria-label="Next testimonial"
					>
						<ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-black" />
					</button>

					{/* Carousel Wrapper */}
					<div className="overflow-hidden rounded-3xl mx-4 md:mx-16">
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{
								transform: getTransform(),
							}}
						>
							{testimonials.map((testimonial, index) => (
								<div
									key={testimonial.id}
									className="flex-shrink-0 px-3 md:px-4"
									style={{
										width:
											config.slidesToShow === 1
												? `${config.cardWidth}%`
												: `${100 / config.slidesToShow}%`,
									}}
								>
									<div
										className={`transition-all duration-300 ${
											config.slidesToShow === 1 && currentSlide === index
												? "scale-100 opacity-100"
												: config.slidesToShow === 1
												? "scale-95 opacity-50"
												: "scale-100 opacity-100"
										}`}
									>
										<TestimonialCard testimonial={testimonial} />
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Dot Indicators */}
					<div className="flex justify-center mt-8 gap-2 md:gap-3">
						{Array.from({ length: maxSlides }).map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300 ${
									currentSlide === index
										? "bg-[#FFD439] border-[#FFD439] shadow-[2px_2px_0_0_#000]"
										: "bg-white border-gray-300 hover:border-[#FFD439]"
								}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>

				{/* Call to Action */}
				<div className="text-center mt-16">
					<p className="text-gray-600 mb-6">
						Ready to join our success stories?
					</p>
					<button
						onClick={() => router.push("/contact")}
						className="bg-[#FFD439] hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all duration-300"
					>
						Get Started Today
					</button>
				</div>
			</div>
		</section>
	);
}

// Testimonial Card Component - Smaller and more compact
function TestimonialCard({
	testimonial,
}: {
	testimonial: (typeof testimonials)[0];
}) {
	return (
		<div className="bg-white border-3 border-gray-200 hover:border-[#FFD439] rounded-2xl p-4 md:p-5 shadow-md hover:shadow-[4px_4px_0_0_#000] transition-all duration-300 h-full flex flex-col max-w-sm mx-auto mb-2">
			{/* Quote Icon */}
			<div className="text-[#FFD439] text-3xl md:text-4xl font-bold mb-2 md:mb-3 leading-none">
				"
			</div>

			{/* Stars */}
			<div className="flex gap-1 mb-3 md:mb-4">
				{Array.from({ length: 5 }).map((_, i) => (
					<Star
						key={i}
						className="w-3 h-3 md:w-4 md:h-4 fill-[#FFD439] text-[#FFD439]"
					/>
				))}
			</div>

			{/* Testimonial Text */}
			<div className="text-gray-700 text-xs md:text-sm lg:text-base leading-relaxed mb-3 md:mb-4 flex-grow italic line-clamp-4">
				{testimonial.text}
			</div>

			{/* Author Info */}
			<div className="flex items-center gap-2 md:gap-3 mt-auto">
				<div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FFD439] flex items-center justify-center flex-shrink-0">
					<span className="text-black font-bold text-xs md:text-sm">
						{testimonial.author
							.split(" ")
							.map((name) => name[0])
							.join("")}
					</span>
				</div>
				<div>
					<div className="font-bold text-gray-900 text-md md:text-lg lg:text-base">
						{testimonial.author}
					</div>
					<div className="text-gray-600 text-sm">{testimonial.role}</div>
				</div>
			</div>
		</div>
	);
}
