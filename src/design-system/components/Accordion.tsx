import React from "react";
import { useState, ReactNode } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";

/**
 * Accordion component for expanding/collapsing content panels.
 * @param {AccordionProps} props - Accordion properties
 */

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

/**
 * Props for Accordion component.
 * @typedef {Object} AccordionProps
 * @property {ReactNode} title - The title of the accordion.
 * @property {ReactNode} children - The content inside the accordion.
 * @property {boolean} [defaultOpen] - Whether the accordion is open by default.
 * @property {string} [className] - Additional class names.
 */

export default function Accordion({ title, children, defaultOpen = false, className }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={clsx(className)}>
      <button
        type="button"
        className="w-full flex items-center justify-between gap-2 py-2 text-left text-xs font-bold uppercase tracking-wider bg-transparent transition"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ borderRadius: 0 }}
      >
        <span className="text-sm font-semibold uppercase tracking-wider">{title}</span>
        <span className={clsx("transition-transform", open ? "rotate-180" : "rotate-0")}
          aria-hidden="true"
        >
          <ChevronDownIcon size={20} />
        </span>
      </button>
      <div className={clsx("overflow-hidden transition-all", open ? "max-h-96" : "max-h-0 p-0")}
        aria-hidden={!open}
      >
        {open && children}
      </div>
    </div>
  );
} 