// --- AppSidebar: Main App Custom Sidebar ---
'use client'

// --- Imports ---
import React, { useState, useContext } from "react";
import Sidebar, { SidebarNavItem } from "@/design-system/components/Sidebar";
import StorageCard from "@/components/StorageCard";
import { getStoragePercent } from "@/lib/utils";
import { StorageContext } from "@/app/context";
import Button from "@/design-system/components/Button";
import Dialog from "@/design-system/components/Dialog";
import Alert from "@/design-system/components/Alert";
import { PlusIcon, FolderIcon } from "lucide-react";
import { motion } from "framer-motion";

// --- Types ---
// (SidebarNavItem imported)

// --- Component ---
export default function AppSidebar({ nav }: { nav: SidebarNavItem[] }) {
  // --- State ---
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projects, setProjects] = useState<{ title: string }[]>([]);
  const [showToast, setShowToast] = useState(false);

  // --- Context ---
  const storage = useContext(StorageContext);
  const storageUsed = storage?.storageUsed || "0 B";
  const storageTotal = storage?.storageTotal || "20 MB";
  const storagePercent = getStoragePercent(storageUsed, storageTotal);

  // --- Handlers ---
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

  // --- Render ---
  return (
    <Sidebar nav={nav}
      navAction={
        // New Project Button as last nav item
        <Button
          variant="primary"
          fullWidth
          leftIcon={<PlusIcon size={18} />}
          onClick={() => setDialogOpen(true)}
        >
          New project
        </Button>
      }
    >
      {/* Custom bottom content: StorageCard, project list, dialogs */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Alert severity="success">Project created successfully!</Alert>
        </div>
      )}
      <StorageCard storageUsed={storageUsed} storageTotal={storageTotal} storagePercent={storagePercent} />
      {/* Projects List */}
      {projects.length > 0 && (
        <div className="mt-6">
          <div className="font-semibold text-gray-dark mb-2 text-xs uppercase tracking-wide">My Projects</div>
          <ul className="space-y-1">
            {projects.map((proj, i) => (
              <motion.li key={proj.title} layoutId={proj.title}>
                <a
                  className="block px-3 py-2 rounded-xl font-medium flex items-center transition text-gray-dark hover:bg-gray-light"
                  href={`/projects/${encodeURIComponent(proj.title)}`}
                >
                  <FolderIcon size={18} className="mr-2" />
                  {proj.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
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
    </Sidebar>
  );
} 