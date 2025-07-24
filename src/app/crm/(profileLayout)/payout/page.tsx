import { Pencil } from "lucide-react";

export default function Page() {
	return (
		<div className="max-w-5xl mx-auto py-8 rounded-md">
			<div className="flex justify-between items-center mb-6">
				<h4 className="text-xl font-semibold text-black">My Payout</h4>
				<button className="text-[#29a073] flex items-center gap-1 hover:underline cursor-pointer">
					<Pencil size={16} />
					Edit
				</button>
			</div>
		</div>
	);
}
