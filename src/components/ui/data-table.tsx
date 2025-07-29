import React from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

export const TableWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
	<div className="py-4">
		<div className={`overflow-x-auto shadow-md rounded-lg bg-white ${className || ''}`}>
			{children}
		</div>
	</div>
);

interface TableHeaderProps {
	children: React.ReactNode;
	onSearch?: (value: string) => void;
}

export const TableHeader = ({ children, onSearch }: TableHeaderProps) => (
	<div className="flex items-center justify-between mb-4">
		<h4 className="text-lg font-semibold text-black">{children}</h4>
		<div className="flex items-center gap-2">
			<div className="relative">
				<input
					type="text"
					placeholder="Search..."
					onChange={(e) => onSearch?.(e.target.value)}
					className="pl-8 pr-3 py-1.5 text-sm text-black rounded border border-gray-300 focus:outline-none"
				/>
				<Search className="absolute left-2 top-2 h-4 w-4 text-gray-500" />
			</div>
			<button className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-200">
				<Filter className="w-4 h-4" />
				Filters
			</button>
			<button className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded text-gray-700 hover:bg-gray-200">
				<SlidersHorizontal className="w-4 h-4" />
				Sort
			</button>
		</div>
	</div>
);

interface TableHeadingsProps {
	columns: string[];
}

export const TableHeadings = ({ columns }: TableHeadingsProps) => (
	<thead>
		<tr className="text-left border-b text-black border-neutral-300 text-xs text-nowrap">
			{columns.map((col, i) => (
				<th className="p-4" key={i}>
					{col}
				</th>
			))}
		</tr>
	</thead>
);

interface TableRowProps {
	row: (string | React.ReactNode)[];
}

export const TableRow = ({ row }: TableRowProps) => (
	<tr className="border-b hover:bg-gray-50 text-neutral-600 text-xs border-neutral-300">
		{row.map((cell, i) => (
			<td className="p-4" key={i}>
				{cell}
			</td>
		))}
	</tr>
);

export const EmailCell = ({ email }: { email: string }) => (
	<a
		href={`mailto:${email}`}
		className="text-blue-600 underline hover:text-blue-800 transition"
	>
		{email}
	</a>
);

interface StatusBadgeProps {
	status: "approved" | "pending" | "rejected";
}

const statusColors = {
	approved: "bg-[#28a745]",
	pending: "bg-[#ffc107]",
	rejected: "bg-[#dc3545]",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => (
	<span
		className={`${statusColors[status]} text-white text-xs px-3 py-1 rounded-sm capitalize`}
	>
		{status}
	</span>
);

interface ViewAllButtonProps {
	onClick?: () => void;
	label?: string;
}

export const ViewAllButton = ({
	onClick,
	label = "View all",
}: ViewAllButtonProps) => (
	<div className="flex justify-end mt-4">
		<button
			onClick={onClick}
			className="bg-black text-white text-sm px-6 py-2 rounded hover:bg-gray-800"
		>
			{label}
		</button>
	</div>
);
