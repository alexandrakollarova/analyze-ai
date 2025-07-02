import React from "react";
import { forwardRef, SelectHTMLAttributes } from "react";
import clsx from "clsx";
import { sizeClasses, Size } from "../utils/sizeClasses";
import { baseInputStyle } from "../utils/baseInputStyle";
import { ChevronDownIcon } from "lucide-react";

/**
 * Props for Select component.
 * @typedef {Object} SelectProps
 * @property {string} [size] - Select size.
 * @property {string} [className] - Additional class names.
 * @property {boolean} [disabled] - Disabled state.
 * @property {boolean} [fullWidth] - Full width select.
 * @property {ReactNode} [children] - Select options.
 */

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: Size;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { size = "md", className, disabled, fullWidth = false, children, ...props },
    ref
  ) => (
    <div className={clsx("relative", fullWidth && "w-full")}>
      <select
        ref={ref}
        disabled={disabled}
        className={clsx(
          fullWidth && "w-full",
          "appearance-none pr-12",
          baseInputStyle,
          sizeClasses[size],
          disabled && "bg-gray-light text-gray cursor-not-allowed opacity-60 border-gray-light",
          className,

        )}
        {...props}
      >
        {children}
      </select>
      {/* Chevron icon */}
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <ChevronDownIcon size={20} />
      </span>
    </div>
  )
);
Select.displayName = "Select";

export default Select; 