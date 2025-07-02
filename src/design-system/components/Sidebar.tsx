'use client'

import React, { useState } from "react";
import clsx from "clsx";
import { PlusIcon, ShapesIcon, FolderIcon } from "lucide-react";
import Dialog from "./Dialog";
import StorageCard from "../../components/StorageCard";
import Button from "./Button";
import { usePathname } from "next/navigation";
import Alert from "./Alert";

interface SidebarNavItem {
    label: string;
    href?: string;
    active?: boolean;
    icon?: React.ReactNode;
}


interface SidebarProps {
    nav?: SidebarNavItem[];
    storageUsed?: string;
    storageTotal?: string;
    storagePercent?: number;
    className?: string;
}

export default function Sidebar({
    nav,
    className = "",
    storageUsed = "14.4 GB",
    storageTotal = "20 GB",
    storagePercent = 72,
}: SidebarProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [projects, setProjects] = useState<{ title: string }[]>([]);
    const pathnameRaw = usePathname();
    const pathname = pathnameRaw || "";
    const [showToast, setShowToast] = useState(false);

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (projectTitle.trim()) {
            setProjects((prev) => [...prev, { title: projectTitle.trim() }]);
            setProjectTitle("");
            setDialogOpen(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            // Confetti burst
            const confetti = (await import('canvas-confetti')).default;
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.8 },
                disableForReducedMotion: true
            });
        }
    };

    return (
        <aside className={clsx("w-64 bg-gray-lighter border-r border-gray-light h-screen fixed left-0 top-0 flex flex-col z-30", className)}>
            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                    <Alert severity="success">Project created successfully!</Alert>
                </div>
            )}
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
                                    pathname === item.href
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
                </ul>

                {/* Projects List */}
                {projects.length > 0 && (
                    <div className="mt-6">
                        <div className="font-semibold text-gray-dark mb-2 text-xs uppercase tracking-wide">My Projects</div>
                        <ul className="space-y-1">
                            {projects.map((proj, i) => {
                                const projectHref = `/projects/${encodeURIComponent(proj.title)}`;
                                const isActive = pathname.startsWith(projectHref);
                                return (
                                    <li key={i}>
                                        <a
                                            className={clsx(
                                                "block px-3 py-2 rounded-xl font-medium flex items-center transition",
                                                isActive
                                                    ? "bg-gray-light text-gray-dark font-semibold"
                                                    : "text-gray-dark hover:bg-gray-light"
                                            )}
                                            href={projectHref}
                                        >
                                            <FolderIcon size={18} className="mr-2" />
                                            {proj.title}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                {/* New Project Button */}
                <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<PlusIcon size={18} />}
                    className="mt-6"
                    onClick={() => setDialogOpen(true)}
                >
                    New project
                </Button>
            </nav>
            {/* Storage Card */}
            <div className="px-4 pb-6 mt-auto">
                <StorageCard storageUsed={storageUsed} storageTotal={storageTotal} storagePercent={storagePercent} />
            </div>
            {/* New Project Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} ariaLabel="New project" title="New project">
                <form onSubmit={handleAddProject} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-dark mb-1">Project title</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        value={projectTitle}
                        onChange={e => setProjectTitle(e.target.value)}
                        required
                        placeholder="Enter project title"
                    />
                    <div className="flex justify-end gap-2">
                        <button type="button" className="px-4 py-2 rounded bg-gray-light text-gray-dark" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 rounded bg-primary text-white font-semibold" disabled={!projectTitle.trim()}>
                            Create
                        </button>
                    </div>
                </form>
            </Dialog>
        </aside >
    );
} 