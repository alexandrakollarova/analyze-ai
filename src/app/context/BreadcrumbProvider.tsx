"use client";
import '@/design-system/utils/globals.css';
import React from "react";
import { usePathname } from "next/navigation";
import Appbar from "@/design-system/components/Appbar";
import { SIDEBAR_LINKS } from "@/lib/sidebarLinks";
import AppSidebar from '@/components/AppSidebar';

export default function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const pathnameRaw = usePathname();
    const pathname = pathnameRaw || "/";
    let breadcrumbs: { label: string; href?: string }[] = [{ label: "Home", href: "/" }];
    if (pathname.startsWith("/all")) breadcrumbs.push({ label: "All files", href: "/all" });
    if (pathname.startsWith("/private")) breadcrumbs.push({ label: "Private files", href: "/private" });
    if (pathname.startsWith("/shared")) breadcrumbs.push({ label: "Shared with me", href: "/shared" });
    if (pathname.startsWith("/projects/")) {
        const project = pathname.split("/projects/")[1];
        breadcrumbs.push({ label: "Projects", href: "/projects" });
        if (project) breadcrumbs.push({ label: decodeURIComponent(project) });
    }
    if (pathname === "/") return (
        <>
            <AppSidebar nav={SIDEBAR_LINKS} />
            <Appbar breadcrumbs={[]} />
            <main className="flex-1 ml-64 pt-20 p-8">{children}</main>
        </>
    );
    return (
        <>
            <AppSidebar nav={SIDEBAR_LINKS} />
            <Appbar breadcrumbs={breadcrumbs} />
            <main className="flex-1 ml-64 pt-20 p-8">
                {children}
            </main>
        </>
    );
} 