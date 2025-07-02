import { HomeIcon, FoldersIcon, BriefcaseIcon, UsersIcon, FolderLockIcon } from "lucide-react";

export const SIDEBAR_LINKS = [
    { label: "Home", href: "/", icon: <HomeIcon size={18} className="mr-2" /> },
    { label: "All projects", href: "/all", icon: <FoldersIcon size={18} className="mr-2" /> },
    { label: "Private projects", href: "/private", icon: <FolderLockIcon size={18} className="mr-2" /> },
    { label: "Shared with me", href: "/shared", icon: <BriefcaseIcon size={18} className="mr-2" /> },
]; 