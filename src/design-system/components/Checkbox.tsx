import React from "react";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { CheckIcon } from "lucide-react";
import { baseLabelStyle } from "../utils/baseLabelStyle";

/**
 * Props for Checkbox component.
 * @typedef {Object} CheckboxProps
 * @property {string} [id] - Checkbox id.
 * @property {string} [label] - Checkbox label.
 * @property {boolean} [checked] - Checked state.
 * @property {boolean} [disabled] - Disabled state.
 * @property {function} [onChange] - Change handler.
 * @property {string} [className] - Additional class names.
 */

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  indeterminate?: boolean;
  variant?: "primary" | "secondary";
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, disabled, indeterminate, variant = "primary", ...props }, ref) => {
    React.useEffect(() => {
      if (ref && typeof ref !== "function" && ref?.current) {
        ref.current.indeterminate = !!indeterminate;
      }
    }, [ref, indeterminate]);
    return (
      <label className={clsx("inline-flex items-center gap-3 cursor-pointer", disabled && "opacity-60 cursor-not-allowed")}>
        <span className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className={clsx(
              "peer appearance-none w-6 h-6 rounded-md transition-all",
              variant === "primary" && "border border-primary dark:border-primary bg-white dark:bg-primary checked:bg-primary dark:checked:bg-white checked:border-primary dark:checked:border-white",
              variant === "secondary" && "border border-gray-light checked:bg-gray-dark checked:border-gray-dark",
            )}
            {...props}
          />
          {/* Checkmark */}
          <CheckIcon
            className={clsx(
              "pointer-events-none absolute left-1 top-1 w-4 h-4 opacity-0 peer-checked:opacity-100 transition-opacity",
              variant === "primary" && "text-white",
              variant === "secondary" && "text-white"
            )}
            strokeWidth={2}
          />
        </span>
        {label && <span className={baseLabelStyle}>{label}</span>}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox; 