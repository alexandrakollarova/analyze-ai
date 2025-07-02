import React, { forwardRef, ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { Loader2Icon } from "lucide-react";
import "../utils/globals.css";

export type IconButtonVariant = "primary" | "secondary";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    variant?: IconButtonVariant;
    loading?: boolean;
}

const variantClasses: Record<IconButtonVariant, string> = {
    primary:
        "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90",
    secondary:
        "border border-gray-light hover:opacity-90",
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        { icon, variant = "primary", loading = false, disabled = false, className, ...props },
        ref
    ) => (
        <button
            type="button"
            ref={ref}
            disabled={disabled || loading}
            className={clsx(
                "inline-flex items-center justify-center rounded-2xl p-2 h-10 w-10 transition focus:outline-none focus:ring-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer",
                variantClasses[variant],
                loading && "opacity-70 cursor-wait",
                className
            )}
            aria-disabled={disabled || loading}
            {...props}
        >
            {loading ? <Loader2Icon size={20} className="animate-spin" /> : icon}
        </button>
    )
);
IconButton.displayName = "IconButton";

export default IconButton; 