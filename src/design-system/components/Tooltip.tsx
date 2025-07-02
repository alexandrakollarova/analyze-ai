import React from "react";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

/**
 * Props for Tooltip component.
 * @typedef {Object} TooltipProps
 * @property {boolean} show - Whether the tooltip is visible.
 * @property {ReactNode} children - Tooltip content.
 * @property {string} [className] - Additional class names.
 */

interface TooltipProps {
  show: boolean;
  children: ReactNode;
  className?: string;
}

export default function Tooltip({ show, children, className }: TooltipProps) {
  // By default, Tooltip is absolutely positioned. To place it at the bottom inside a parent, pass 'bottom-0 left-0 w-full' via className.
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          className={clsx(
            "absolute z-20 bg-black text-white text-sm px-2 py-2 shadow-lg whitespace-nowrap pointer-events-none",
            className
          )}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 