import React from "react";

interface TableToolbarProps {
    tabs: { label: string; value: string }[];
    activeTab: string;
    onTabChange: (value: string) => void;
    rightContent?: React.ReactNode;
}

export default function TableToolbar({ tabs, activeTab, onTabChange, rightContent }: TableToolbarProps) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex gap-1 bg-gray-lighter rounded-2xl">
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        className={`cursor-pointer px-4 py-2 rounded-2xl font-medium text-sm transition ${activeTab === tab.value ? "bg-white shadow-xs border border-gray-light" : "text-gray hover:bg-gray-light"}`}
                        onClick={() => onTabChange(tab.value)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {rightContent && <div className="flex gap-2 items-center">{rightContent}</div>}
        </div>
    );
} 