import React from "react";
import { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export type TagVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "gray";

/**
 * Props for Tag component.
 * @typedef {Object} TagProps
 * @property {string} [className] - Additional class names.
 * @property {ReactNode} children - Tag content.
 * @property {string} [variant] - Tag variant.
 * @property {boolean} [subtle] - Subtle style.
 */

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: TagVariant;
  subtle?: boolean;
}

const variantStyles: Record<TagVariant, { solid: string; subtle: string }> = {
  primary: {
    solid: "bg-primary text-white",
    subtle: "bg-primary-light/20 text-primary",
  },
  secondary: {
    solid: "bg-secondary text-white",
    subtle: "bg-secondary-light/20 text-secondary",
  },
  success: {
    solid: "bg-success text-white",
    subtle: "bg-success-light/20 text-success",
  },
  warning: {
    solid: "bg-warning text-white",
    subtle: "bg-warning-light/20 text-warning",
  },
  error: {
    solid: "bg-error text-white",
    subtle: "bg-error-light/20 text-error",
  },
  info: {
    solid: "bg-info text-white",
    subtle: "bg-info-light/20 text-info",
  },
  gray: {
    solid: "bg-gray-dark text-white",
    subtle: "bg-gray-light text-gray-dark",
  },
};

const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ className, children, variant = "gray", subtle = false, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(
        "px-4 py-1 rounded-lg text-xs font-semibold",
        subtle ? variantStyles[variant].subtle : variantStyles[variant].solid,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);
Tag.displayName = "Tag";

export default Tag; 