import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
    title?: string;
}

export default function Dialog({ open, onClose, children, ariaLabel = "Dialog", title }: DialogProps) {
    useEffect(() => {
        if (open) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [open]);

    if (!open) return null;
    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="w-full max-w-lg"
                >
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {title && <div className="px-6 py-4 border-b border-gray-light text-lg font-semibold">{title}</div>}
                        <div>{children}</div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
} 