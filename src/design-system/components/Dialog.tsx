import React, { useEffect } from "react";

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
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-card rounded-xl shadow-2xl max-w-lg w-full p-8 relative"
                onClick={e => e.stopPropagation()}
            >
                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
                <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="absolute top-4 right-4 text-gray hover:text-gray-dark"
                >
                    &#10005;
                </button>
                {children}
            </div>
        </div>
    );
} 