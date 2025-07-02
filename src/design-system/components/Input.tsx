import React from "react";
import { forwardRef, ReactNode, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { sizeClasses, Size } from "../utils/sizeClasses";
import { baseInputStyle } from "../utils/baseInputStyle";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

interface InputProps extends NativeInputProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: Size;
  fullWidth?: boolean;
}

const hideNumberArrows =
  "[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; } [type=number] { -moz-appearance: textfield; }";

/**
 * Input component for text and number input fields.
 * @param {InputProps} props - Input properties
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, size = "sm", disabled, type, fullWidth = false, ...props }, ref) => (
    <div className={clsx("relative", fullWidth && "w-full")}>
      <style>{type === 'number' ? hideNumberArrows : ''}</style>
      {leftIcon && (
        <span className={clsx(
          "absolute left-2 top-1/2 -translate-y-1/2 text-gray pointer-events-none",
          size === "lg" && "left-4"
        )}>
          {leftIcon}
        </span>
      )}
      {rightIcon && (
        <span className={clsx(
          "absolute inset-y-0 right-2 flex items-center text-gray",
          size === "lg" && "right-4"
        )}>
          {rightIcon}
        </span>
      )}
      <input
        ref={ref}
        className={clsx(
          fullWidth && "w-full",
          "placeholder-gray",
          baseInputStyle,
          sizeClasses[size],
          disabled && "bg-gray-light text-gray cursor-not-allowed opacity-60",
          className,
          leftIcon && "pl-8",
        )}
        disabled={disabled}
        aria-disabled={disabled}
        type={type}
        {...props}
      />
    </div>
  )
);
Input.displayName = "Input";

/**
 * Props for Input component.
 * @typedef {Object} InputProps
 * @property {string} [className] - Additional class names.
 * @property {ReactNode} [leftIcon] - Icon on the left.
 * @property {ReactNode} [rightIcon] - Icon on the right.
 * @property {string} [size] - Input size.
 * @property {boolean} [disabled] - Disabled state.
 * @property {string} [type] - Input type.
 * @property {boolean} [fullWidth] - Full width input.
 */

export default Input;