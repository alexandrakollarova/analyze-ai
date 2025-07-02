import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
    return (
        <nav className={className} aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-dark">
                {items.map((item, idx) => (
                    <li key={item.label} className="flex items-center gap-2">
                        {item.href && idx !== items.length - 1 ? (
                            <Link href={item.href} className="hover:underline text-gray-dark">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold text-gray-dark">{item.label}</span>
                        )}
                        {idx < items.length - 1 && (
                            <ChevronRight size={16} className="text-gray-light" />
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb; 