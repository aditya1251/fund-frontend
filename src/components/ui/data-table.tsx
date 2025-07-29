"use client";

import React from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react"; // Retaining these imports as they might be used elsewhere

// TableWrapper - Provides a scrollable container for tables on small screens
interface TableWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const TableWrapper = ({ children, className }: TableWrapperProps) => (
  // overflow-x-auto enables horizontal scrolling when table content is wider than its container
  <div className={`py-4`}> {/* py-4 wrapper as per your original */}
    <div className={`overflow-x-auto shadow-md rounded-lg bg-white ${className || ''}`}>
      {children}
    </div>
  </div>
);

// TableHeader - This component previously contained search/filter/sort controls.
// For better state management, it's often best to control these directly in the page component.
// I'm keeping a simplified version if it's used elsewhere, but the actual controls will be
// moved into the Page component itself for direct state interaction.
interface TableHeaderProps {
    children: React.ReactNode; // Title
    // Removed onSearch as it will be managed by the parent directly
}

export const TableHeader = ({ children }: TableHeaderProps) => (
    <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-black">{children}</h4>
        {/* Search, Filter, Sort controls will be rendered directly in the Page component */}
    </div>
);


// TableHeadings - Renders the <thead> section of the table
interface TableHeadingsProps {
    columns: string[];
    className?: string; // Added className prop
}

export const TableHeadings = ({ columns, className }: TableHeadingsProps) => (
    // IMPORTANT FIX: Ensure this component ONLY returns a <thead> element directly.
    <thead className={className || ''}>
        <tr className="text-left border-b text-black border-neutral-300 text-xs text-nowrap">
            {columns.map((col, i) => (
                <th className="p-4" key={i}>
                    {col}
                </th>
            ))}
        </tr>
    </thead>
);

// TableRow - Renders a single <tr> for the table body
interface TableRowProps {
    row: (string | React.ReactNode)[];
    className?: string; // Added className prop
}

export const TableRow = ({ row, className }: TableRowProps) => (
    <tr className={`border-b hover:bg-gray-50 text-neutral-600 text-xs border-neutral-300 ${className || ''}`}>
        {row.map((cell, i) => (
            <td className="p-4" key={i}>
                {cell}
            </td>
        ))}
    </tr>
);

// EmailCell - Renders an email address as a clickable link
interface EmailCellProps {
    email: string;
    className?: string;
}

export const EmailCell = ({ email, className }: EmailCellProps) => (
    <a
        href={`mailto:${email}`}
        className={`text-blue-600 underline hover:text-blue-800 transition ${className || ''}`}
    >
        {email}
    </a>
);

// StatusBadge - Renders a status with a colored badge
interface StatusBadgeProps {
    status: "approved" | "pending" | "rejected";
    className?: string; // Added className prop
}

const statusColors = {
    approved: "bg-[#28a745]",
    pending: "bg-[#ffc107]",
    rejected: "bg-[#dc3545]",
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => (
    <span
        className={`${statusColors[status]} text-white text-xs px-3 py-1 rounded-sm capitalize ${className || ''}`}
    >
        {status}
    </span>
);

// ViewAllButton - A simple button for viewing all items
interface ViewAllButtonProps {
    onClick?: () => void;
    label?: string;
    className?: string; // Added className prop
}

export const ViewAllButton = ({
    onClick,
    label = "View all",
    className,
}: ViewAllButtonProps) => (
    <div className={`flex justify-end mt-4 ${className || ''}`}>
        <button
            onClick={onClick}
            className="bg-black text-white text-sm px-6 py-2 rounded hover:bg-gray-800"
        >
            {label}
        </button>
    </div>
);