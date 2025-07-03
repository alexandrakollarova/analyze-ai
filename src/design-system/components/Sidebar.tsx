'use client'

import React from "react";
import clsx from "clsx";
import { ShapesIcon } from "lucide-react";

export interface SidebarNavItem {
    label: string;
    href?: string;
    active?: boolean;
    icon?: React.ReactNode;
}

export interface SidebarProps {
    nav?: SidebarNavItem[];
    className?: string;
    children?: React.ReactNode; // For custom bottom content (e.g., storage card)
    /**
     * Optional action (e.g., button) to render as the last item in the nav list.
     */
    navAction?: React.ReactNode;
}

export default function Sidebar({ nav, className = "", children, navAction }: SidebarProps) {
    return (
        <aside className={clsx("w-64 bg-gray-lighter border-r border-gray-light h-screen fixed left-0 top-0 flex flex-col z-30", className)}>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <div className="mb-8">
                    <div className="mb-2 flex items-center">
                        <ShapesIcon size={28} className="text-primary" />
                    </div>
                </div>
                <ul className="space-y-1">
                    {nav?.map((item, i) => (
                        <li key={i}>
                            <a
                                className={clsx(
                                    "block px-3 py-2 rounded-xl font-medium flex items-center transition",
                                    item.active
                                        ? "bg-gray-light text-gray-dark font-semibold"
                                        : "text-gray-dark hover:bg-gray-light"
                                )}
                                href={item.href}
                            >
                                {item.icon}
                                {item.label}
                            </a>
                        </li>
                    ))}
                    {navAction && (
                        <li className="mt-2">{navAction}</li>
                    )}
                </ul>
            </nav>
            {children && <div className="px-4 pb-6 mt-auto">{children}</div>}
        </aside>
    );
} 