import React from "react";
import { forwardRef, useRef } from "react";
import Input from "./Input";
import { SearchIcon, XIcon } from "lucide-react";
import type { ChangeEvent } from "react";

/**
 * Search component for search input with clear button.
 * @param {SearchProps} props - Search properties
 */

// Accept all Input props, but type is always 'search' unless overridden
interface SearchProps extends Omit<React.ComponentProps<typeof Input>, 'type'> {
  type?: string;
}

/**
 * Props for Search component.
 * @typedef {Object} SearchProps
 * @property {string} [type] - Input type (default: search).
 * @property {ReactNode} [leftIcon] - Icon on the left.
 * @property {ReactNode} [rightIcon] - Icon on the right.
 * @property {string|number} [value] - Input value.
 * @property {function} [onChange] - Change handler.
 */

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ type = "search", leftIcon = <SearchIcon size={20} />, rightIcon, value, onChange, ...props }, ref) => {
    const localRef = useRef<HTMLInputElement>(null);
    // Prefer forwarded ref, fallback to local ref
    const inputRef = (ref && typeof ref !== 'function' ? ref : localRef);
    const showClear = Boolean(value);

    const handleClear = (e: React.MouseEvent) => {
      e.preventDefault();
      if (onChange) {
        // Always call onChange with a proper synthetic event
        const syntheticEvent = {
          target: { value: '' }
        } as unknown as ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      // Also clear the native input value if possible
      if (inputRef && 'current' in inputRef && inputRef.current) {
        inputRef.current.value = '';
      }
    };

    // Hide native clear button for search inputs
    const hideNativeClear = `
      input[type="search"]::-webkit-search-decoration,
      input[type="search"]::-webkit-search-cancel-button,
      input[type="search"]::-webkit-search-results-button,
      input[type="search"]::-webkit-search-results-decoration {
        display: none;
      }
      input[type="search"]::-ms-clear {
        display: none;
        width: 0;
        height: 0;
      }
      input[type="search"]::-ms-reveal {
        display: none;
        width: 0;
        height: 0;
      }
    `;

    return (
      <>
        <style>{hideNativeClear}</style>
        <Input
          ref={inputRef}
          type={type}
          leftIcon={leftIcon}
          rightIcon={
            showClear ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClear}
                className="cursor-pointer"
              >
                <XIcon size={20} />
              </button>
            ) : rightIcon
          }
          value={value}
          onChange={onChange}
          {...props}
        />
      </>
    );
  }
);

Search.displayName = "Search";

export default Search; 