import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import clsx from "clsx";
import { baseInputStyle } from "../utils/baseInputStyle";
import { baseLabelStyle } from "../utils/baseLabelStyle";

interface Option {
  value: string;
  label: string;
}

/**
 * Props for CustomSelect component.
 * @typedef {Object} CustomSelectProps
 * @property {string|number} value - Selected value.
 * @property {function} onChange - Change handler.
 * @property {Array} options - Dropdown options.
 * @property {string} [placeholder] - Placeholder text.
 * @property {string} [className] - Additional class names.
 * @property {boolean} [disabled] - Disabled state.
 * @property {string} [size] - Size variant.
 * @property {boolean} [fullWidth] - Full width select.
 * @property {string} [optionsAlign] - Options alignment.
 */
interface CustomSelectProps {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  optionsAlign?: "left" | "right";
}

const sizeClasses = {
  sm: "py-2 px-3 text-sm min-h-[36px]",
  md: "py-3 px-4 text-base min-h-[44px]",
  lg: "py-4 px-6 text-lg min-h-[52px]",
};

/**
 * CustomSelect component for accessible custom dropdowns.
 * @param {CustomSelectProps} props - CustomSelect properties
 */
export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className,
  disabled = false,
  size = "md",
  fullWidth = false,
  optionsAlign = "left",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        buttonRef.current && !buttonRef.current.contains(e.target as Node) &&
        listRef.current && !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function handle(e: KeyboardEvent) {
      if (e.key === "ArrowDown") {
        setHighlighted((h) => Math.min(h + 1, options.length - 1));
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setHighlighted((h) => Math.max(h - 1, 0));
        e.preventDefault();
      } else if (e.key === "Enter" && highlighted >= 0) {
        onChange(options[highlighted].value);
        setOpen(false);
        e.preventDefault();
      } else if (e.key === "Escape") {
        setOpen(false);
        e.preventDefault();
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open, highlighted, options, onChange]);

  useEffect(() => {
    if (open && highlighted >= 0 && listRef.current) {
      const el = listRef.current.children[highlighted] as HTMLElement;
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted, open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={clsx("relative min-w-[200px]", fullWidth && "w-full", className)}>
      <button
        ref={buttonRef}
        type="button"
        className={clsx(
          "flex items-center justify-between w-full font-semibold",
          baseInputStyle,
          sizeClasses[size],
          disabled && "bg-gray-light text-gray cursor-not-allowed opacity-60 border-gray-light"
        )}
        onClick={() => !disabled && setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={clsx(!selected && "text-gray")}>{selected ? selected.label : placeholder}</span>
        <ChevronDownIcon size={20} className={clsx("ml-2 transition-transform", open && "-rotate-180")} />
      </button>
      {open && (
        <ul
          ref={listRef}
          className={clsx(
            "absolute z-20 mt-2 bg-background border border-gray-light dark:border-gray-dark rounded-lg shadow-lg max-h-72 overflow-auto",
            optionsAlign === "right" ? "right-0 left-auto" : "left-0 right-auto"
          )}
          role="listbox"
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              tabIndex={-1}
              className={clsx(
                baseLabelStyle,
                "px-6 py-3 cursor-pointer transition",
                value === opt.value && "font-bold bg-gray-light dark:bg-gray-dark",
                highlighted === i && value !== opt.value && "bg-gray-light dark:bg-gray-dark",
                !disabled && "hover:bg-gray-light dark:hover:bg-gray-dark",
                disabled && "opacity-60 cursor-not-allowed",
                optionsAlign === "right" ? "text-right" : "text-left",
                "dark:text-yellow-500"
              )}
              onClick={() => {
                if (!disabled) {
                  onChange(opt.value);
                  setOpen(false);
                }
              }}
              onMouseEnter={() => setHighlighted(i)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 