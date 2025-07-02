import React, { useRef } from "react";
import Checkbox from "./Checkbox";

/**
 * Option type for CheckboxList.
 */
export interface CheckboxListOption {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  id?: string;
}

/**
 * Props for CheckboxList component.
 */
export interface CheckboxListProps {
  options: CheckboxListOption[];
  selected: (string | number)[];
  onChange: (value: string | number, checked: boolean) => void;
  name?: string;
  className?: string;
}

/**
 * CheckboxList renders a list of checkboxes with labels.
 * @param {CheckboxListProps} props
 */
export default function CheckboxList({ options, selected, onChange, name, className = "" }: CheckboxListProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % options.length;
      refs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + options.length) % options.length;
      refs.current[prev]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      refs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      refs.current[options.length - 1]?.focus();
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const opt = options[idx];
      if (!opt.disabled) {
        onChange(opt.value, !selected.includes(opt.value));
      }
    }
  };

  return (
    <div className={className} role="group" aria-label={name}>
      {options.map((opt, i) => (
        <Checkbox
          key={opt.id || opt.value}
          id={opt.id || String(opt.value)}
          checked={selected.includes(opt.value)}
          onChange={e => onChange(opt.value, e.target.checked)}
          label={opt.label}
          disabled={opt.disabled}
          tabIndex={i === 0 ? 0 : -1}
          ref={el => { refs.current[i] = el; }}
          onKeyDown={e => handleKeyDown(e, i)}
        />
      ))}
    </div>
  );
} 