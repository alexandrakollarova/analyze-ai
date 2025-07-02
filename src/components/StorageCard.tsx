import React from "react";
import { CloudIcon, MoreVertical } from "lucide-react";
import Card from "@/design-system/components/Card";

interface StorageCardProps {
    storageUsed?: string;
    storageTotal?: string;
    storagePercent?: number;
}

export default function StorageCard({
    storageUsed = "14.4 GB",
    storageTotal = "20 GB",
    storagePercent = 72,
}: StorageCardProps) {
    return (
        <Card>
            <div className="flex items-center justify-between mb-1">
                <span className="flex items-center gap-2 text-gray font-medium text-sm">
                    <CloudIcon size={18} /> STORAGE
                </span>
                <MoreVertical size={18} className="text-gray" />
            </div>
            <div className="w-full h-3 rounded-full bg-gray-light overflow-hidden mb-1">
                <div className="h-3 bg-gray-dark rounded-full" style={{ width: `${storagePercent}%` }} />
            </div>
            <div className="text-xs text-gray mt-1 font-medium">
                {storageUsed} of {storageTotal} used ({storagePercent}%)
            </div>
        </Card>
    );
} 