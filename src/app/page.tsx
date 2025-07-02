"use client";

import Card from "@/design-system/components/Card";
import Button from "@/design-system/components/Button";
import { FileTextIcon, TableIcon, FolderIcon, UsersIcon, PlusIcon } from "lucide-react";
import Search from "@/design-system/components/Search";
import { useState, useEffect, useCallback } from "react";
import CommandMenu from "@/components/CommandMenu";

const actions = [
  {
    label: "New document",
    icon: <FileTextIcon size={28} className="text-white" />, // dark bg
    iconBg: "bg-gray-dark",
    href: "/new-document",
  },
  {
    label: "New speadsheet",
    icon: <TableIcon size={28} className="text-gray-dark" />, // light bg
    iconBg: "bg-gray-light",
    href: "/new-spreadsheet",
  },
  {
    label: "New project",
    icon: <FolderIcon size={28} className="text-gray-dark" />, // light bg
    iconBg: "bg-gray-light",
    href: "/new-project",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [showCommandMenu, setShowCommandMenu] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setShowCommandMenu(true);
    }
    if (e.key === "Escape") {
      setShowCommandMenu(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col items-center mt-32">
      {showCommandMenu && <CommandMenu />}
      <div className="w-full max-w-md mb-8">
        <Search
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search... (Press ⌘K for quick actions)"
        />
      </div>
      <div className="flex gap-6 justify-center w-full">
        {actions.map((action, i) => (
          <Card key={action.label} className="flex flex-col justify-between min-w-[260px] max-w-[280px] h-40 cursor-pointer group transition relative">
            <div className="flex items-center gap-4 p-4">
              <div className={`rounded-lg p-2 ${action.iconBg} transition`}>{action.icon}</div>
              <span className="text-lg font-semibold text-gray-dark">{action.label}</span>
              <span className="ml-auto">
                <PlusIcon size={22} className="text-gray group-hover:text-primary transition" />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
