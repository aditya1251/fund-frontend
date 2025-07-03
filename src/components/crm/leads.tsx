import { Eye, Plus, ArrowUpRight } from "lucide-react";

const LeadOverview = () => {
	const cards = [
		{
			title: "Funds Raize's Gold Plan",
			type: "plan",
			bgImage: "/plan.svg",
			renewal: "02/2026",
			user: "Ruth Mishra",
		},
		{
			title: "All Leads",
			type: "metric",
			count: 100,
			buttonLabel: "Add Leads",
			buttonIcon: <Plus className="h-4 aspect-square" />,
			bgImage: "/all-leads.svg",
		},
		{
			title: "Active Leads",
			type: "metric",
			count: 40,
			buttonLabel: "View Leads",
			buttonIcon: <Eye className="h-4 aspect-square" />,
			bgImage: "/active-leads.svg",
		},
	];

	return (
		<section className="mb-6 grid grid-cols-3 gap-4 h-36 text-black">
			{cards.map((card, index) => {
				if (card.type === "plan") {
					return (
						<div
							key={index}
							className="bg-center rounded-lg flex flex-col justify-end shadow-sm shadow-neutral-400"
							style={{ backgroundImage: `url(${card.bgImage})` }}
						>
							<h5 className="px-4 py-2 font-inter">{card.title}</h5>
							<div className="bg-gradient-to-br from-[#121212] to-[#353535] px-4 py-3 rounded-b-lg flex items-end justify-between">
								<div className="flex flex-col">
									<span className="text-white text-[0.5rem]">
										Renewal On {card.renewal}
									</span>
									<span className="text-white text-[0.75rem]">{card.user}</span>
								</div>
								<button className="bg-[#f5d949] text-black text-xs px-2 py-1 rounded-md flex items-center gap-2 shadow-md shadow-black">
									<span>UPGRADE PLAN</span>
									<div className="bg-gradient-to-br from-[#000] to-[#666666] rounded-xs">
										<ArrowUpRight className="h-5 aspect-square text-white p-1" />
									</div>
								</button>
							</div>
						</div>
					);
				}

				return (
					<div
						key={index}
						className="bg-center rounded-lg py-3 px-4 flex flex-col justify-between shadow-sm shadow-neutral-400"
						style={{ backgroundImage: `url(${card.bgImage})` }}
					>
						<h4 className="text-xl font-bold">{card.title}</h4>
						<div className="flex items-center justify-between">
							<h4 className="text-2xl font-bold">{card.count}</h4>
							<button className="text-sm bg-black text-white px-4 py-1 rounded-md flex items-center gap-0.5 shadow-sm shadow-black">
								<span>{card.buttonLabel}</span>
								{card.buttonIcon}
							</button>
						</div>
					</div>
				);
			})}
		</section>
	);
};

export default LeadOverview;
