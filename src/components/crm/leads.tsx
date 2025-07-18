"use client";
import Image from "next/image";
import { Eye, Plus, ArrowUpRight } from "lucide-react";

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
    buttonIcon: <Plus className="h-4 w-4" />,
    bgImage: "/all-leads.svg",
  },
  {
    title: "Active Leads",
    type: "metric",
    count: 40,
    buttonLabel: "View Leads",
    buttonIcon: <Eye className="h-4 w-4" />,
    bgImage: "/active-leads.svg",
  },
];

export default function LeadOverview() {
  return (
    <section className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, index) => {
        if (card.type === "plan") {
          return (
            <div
              key={index}
              className="relative aspect-[16/9] md:aspect-auto md:h-36 bg-center bg-cover rounded-lg flex flex-col justify-end shadow-sm shadow-neutral-400"
              style={{ backgroundImage: `url(${card.bgImage})` }}
            >
              <h5 className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-inter text-black drop-shadow">
                {card.title}
              </h5>
              <div className="bg-gradient-to-br from-[#121212] to-[#353535] px-3 py-2 md:px-4 md:py-3 rounded-b-lg flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-white text-[10px] md:text-xs">
                    Renewal On {card.renewal}
                  </span>
                  <span className="text-white text-xs md:text-sm">{card.user}</span>
                </div>
                <button className="bg-[#f5d949] text-black text-[10px] md:text-xs px-2 py-1 md:px-2.5 md:py-1 rounded-md flex items-center gap-1 shadow-md">
                  <span>UPGRADE</span>
                  <div className="bg-black rounded p-0.5">
                    <ArrowUpRight className="w-3 h-3 text-white" />
                  </div>
                </button>
              </div>
            </div>
          );
        }

        return (
          <div
            key={index}
            className="relative aspect-[16/9] md:aspect-auto md:h-36 bg-cover bg-center rounded-lg flex flex-col justify-between p-3 md:p-4 shadow-sm shadow-neutral-400"
            style={{ backgroundImage: `url(${card.bgImage})` }}
          >
            <h4 className="text-lg md:text-xl font-bold text-black drop-shadow">
              {card.title}
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-xl md:text-2xl font-bold text-black drop-shadow">
                {card.count}
              </span>
              <button className="text-xs md:text-sm bg-black text-white px-3 py-1 md:px-4 md:py-1 rounded-md flex items-center gap-1 shadow-sm">
                <span>{card.buttonLabel}</span>
                {card.buttonIcon}
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}