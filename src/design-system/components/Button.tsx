import React from "react";
import { forwardRef, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import clsx from "clsx";
import { sizeClasses, Size } from "../utils/sizeClasses";
import { baseInputStyle } from "../utils/baseInputStyle";
import '../utils/globals.css'
import { Loader2Icon } from "lucide-react";

type Variant =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "success"
  | "info";

type ButtonProps = (
  {
    as?: "button";
    variant?: Variant;
    size?: Size;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    loading?: boolean;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    tabIndex?: number;
    fullWidth?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) | (
    {
      as: "a";
      variant?: Variant;
      size?: Size;
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
      loading?: boolean;
      children: ReactNode;
      className?: string;
      disabled?: boolean;
      tabIndex?: number;
      fullWidth?: boolean;
    } & AnchorHTMLAttributes<HTMLAnchorElement>
  );

const base =
  "inline-flex items-center justify-center font-semibold rounded-2xl transition hover:-translate-y-0.5 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer";

const variantClasses: Record<Variant, string> = {
  primary:
    "text-white hover:opacity-90 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]",
  secondary:
    `${baseInputStyle}`,
  error:
    "bg-error text-white border border-transparent focus:ring-error-light hover:bg-error-dark",
  warning:
    "bg-warning text-white border border-transparent focus:ring-warning-light hover:bg-warning-dark",
  success:
    "bg-success text-white border border-transparent focus:ring-success-light hover:bg-success-dark",
  info:
    "bg-info text-white border border-transparent focus:ring-info-light hover:bg-info-dark",
};

const buttonSizeClasses = sizeClasses;

const iconSpacing: Record<Size, string> = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-8",
};

/**
 * Button component with token-driven variants and sizes.
 * @param {ButtonProps} props - Button properties
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = "button",
      variant = "primary",
      size = "sm",
      leftIcon,
      rightIcon,
      loading = false,
      disabled = false,
      className,
      children,
      tabIndex,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {(loading || leftIcon) && (
          <span className="inline-flex items-center" aria-hidden>
            {loading ? (
              <Loader2Icon size={20} className="animate-spin mr-1" />
            ) : (
              leftIcon
            )}
          </span>
        )}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex items-center" aria-hidden>{rightIcon}</span>}
      </>
    );

    const sharedProps = {
      className: clsx(
        base,
        variantClasses[variant],
        buttonSizeClasses[size],
        iconSpacing[size],
        loading && "opacity-70 cursor-wait",
        fullWidth && "w-full",
        className,
      ),
      "aria-disabled": disabled || loading,
      tabIndex: disabled ? -1 : tabIndex,
      ref,
      ...props,
    };

    if (as === "a") {
      return (
        <a {...(sharedProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>{content}</a>
      );
    }
    return (
      <button
        type="button"
        disabled={disabled || loading}
        {...(sharedProps as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";

/**
 * Props for Button component.
 * @typedef {Object} ButtonProps
 * @property {"button"|"a"} [as] - Render as button or anchor.
 * @property {Variant} [variant] - Button style variant.
 * @property {Size} [size] - Button size.
 * @property {ReactNode} [leftIcon] - Icon on the left.
 * @property {ReactNode} [rightIcon] - Icon on the right.
 * @property {boolean} [loading] - Show loading spinner.
 * @property {ReactNode} children - Button content.
 * @property {string} [className] - Additional class names.
 * @property {boolean} [disabled] - Disabled state.
 * @property {number} [tabIndex] - Tab index.
 * @property {boolean} [fullWidth] - Full width button.
 */

export default Button; 