import React from "react";
import { XIcon } from "lucide-react";

/**
 * Props for the Drawer component.
 */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Drawer component for mobile overlays and modals.
 * @param {DrawerProps} props
 */
export default function Drawer({ open, onClose, children, className = "", ariaLabel = "Drawer" }: DrawerProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className={`relative bg-white dark:bg-card w-full max-w-[420px] h-full shadow-xl flex flex-col ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-end px-6 py-6 border-b border-gray-light dark:border-card-border">
          <button onClick={onClose} aria-label="Close drawer">
            <XIcon size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
      {/* Click outside to close */}
      <div className="flex-1" />
    </div>
  );
} 