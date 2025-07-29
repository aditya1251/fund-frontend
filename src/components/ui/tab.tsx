"use client";

import React, { createContext, useContext, useState } from "react";

interface TabsContextType {
    value: string;
    setValue: (val: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) throw new Error("Tabs components must be used inside <Tabs>");
    return context;
}

interface TabsProps {
    defaultValue?: string;
    children: React.ReactNode;
    className?: string;
}

export function Tabs({ defaultValue = "", children, className }: TabsProps) {
    const [value, setValue] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ value, setValue }}>
            <div className={`w-full ${className}`}>{children}</div>
        </TabsContext.Provider>
    );
}

interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
    return (
        <div
            // *** IMPORTANT CHANGE FOR RESPONSIVENESS ***
            // Changed hardcoded grid-cols-4 to responsive grid classes.
            // This ensures 1 column on smallest screens, 2 on small, and 4 on large.
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-6 rounded-lg shadow-sm
                ${className}`}
        >
            {children}
        </div>
    );
}

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export function TabsTrigger({ value, children, className }: TabsTriggerProps) {
    const { value: active, setValue } = useTabsContext();
    const isActive = value === active;

    return (
        <button
            onClick={() => setValue(value)}
            // min-h-[50px] is retained as per your update for consistent height
            className={`w-full flex items-center gap-4 text-left px-4 py-3 rounded-md border border-neutral-600 text-sm transition-all hover:shadow-md min-h-[50px]
                ${isActive ? "bg-[#f5d949] border-yellow-300 font-semibold" : "bg-white"},
                ${className}`}
        >
            {children}
        </button>
    );
}

interface TabsIconProps {
    children: React.ReactNode;
    className?: string;
}

export function TabsIcon({ children, className }: TabsIconProps) {
    return <div className={`text-black w-5 h-5 ${className}`}>{children}</div>;
}

interface TabsLabelProps {
    children: React.ReactNode;
    className?: string;
}

export function TabsLabel({ children, className }: TabsLabelProps) {
    return (
        <div className={`font-medium text-xs text-gray-800 px-2 ${className}`}>
            {children}
        </div>
    );
}

interface TabsDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function TabsDescription({ children, className }: TabsDescriptionProps) {
    return (
        // h-6 overflow-hidden is retained as per your update for consistent height
        <div className={`text-[0.5rem] text-gray-600 mt-1 h-6 overflow-hidden ${className}`}>
            {children}
        </div>
    );
}