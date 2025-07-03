"use client";

import { Star } from "lucide-react";
import React from "react";

interface Testimonial {
	id: number;
	text: string;
	author: string;
	role: string;
	avatar: string;
}

const testimonials: Testimonial[] = [
	{
		id: 1,
		text: "Dude, your stuff is the bomb! House rent is the real deal! I STRONGLY recommend house rent to EVERYONE interested in running a successful online business!",
		author: "Mrs. Gautami Bisht",
		role: "Senior Paradigm Strategist",
		avatar: "/placeholder.svg",
	},
	{
		id: 2,
		text: "I like Infinity Estate more and more each day because it makes my life a lot easier. We can't understand how we've been living without Infinity Estate. Infinity Estate has got everything I need. The service was excellent.",
		author: "Mrs. Lavanya Singh",
		role: "Legacy Usability Manager",
		avatar: "/placeholder.svg",
	},
	{
		id: 3,
		text: "You've saved our business! Infinity Estate has got everything I need. We were treated like royalty. It's really wonderful.",
		author: "Siddeshwar Singh",
		role: "District Assurance Officer",
		avatar: "/placeholder.svg",
	},
];

const Testimonials: React.FC = () => {
	return (
		<div className="bg-white shadow-md rounded-lg mb-6 py-6 px-8">
			<h4 className="text-center font-semibold text-lg mb-8 text-black">
				What Our Clients Are Saying
			</h4>

			<div className="grid md:grid-cols-3 gap-4">
				{testimonials.map(({ id, text, author, role, avatar }) => (
					<div
						key={id}
						className="flex flex-col gap-4 justify-between border-black border-1 rounded-2xl p-6"
					>
						{/* Rating */}
						<div className="flex gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									className="w-4 h-4 fill-[#f7c430] text-[#f7c430]"
								/>
							))}
						</div>

						{/* Testimonial Text */}
						<div className="text-black text-xs">{text}</div>

						{/* Author */}
						<div className="flex items-center gap-2">
							<div className="w-8 h-8 rounded-full overflow-hidden bg-[#cbcccc]">
								<img
									src={avatar || "/placeholder.svg"}
									alt={author}
									className="w-full h-full object-cover"
								/>
							</div>
							<div>
								<div className="font-semibold text-black text-sm">{author}</div>
								<div className="text-[#505050] text-xs">{role}</div>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Pagination Dots */}
			<div className="flex justify-center gap-2 pt-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className={`h-2 rounded-full ${
							i === 2 ? "bg-[#000] w-8" : "bg-[#cbcccc] w-2"
						}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Testimonials;
