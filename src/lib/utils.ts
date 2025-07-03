import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a human-readable file size string (e.g., '2 MB', '512 KB', '100 B') to bytes as a number.
 * @param {string} size - The file size string to parse.
 * @returns {number} The size in bytes.
 */
export function parseSizeString(size: string): number {
  if (size.endsWith("MB")) return parseFloat(size) * 1024 * 1024;
  if (size.endsWith("KB")) return parseFloat(size) * 1024;
  if (size.endsWith("B")) return parseFloat(size);
  return 0;
}

/**
 * Converts a number of bytes to a human-readable file size string (e.g., '2 MB', '512 KB', '100 B').
 * @param {number} bytes - The size in bytes.
 * @returns {string} The formatted file size string.
 */
export function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + " KB";
  return bytes + " B";
}

export const STORAGE_TOTAL_BYTES = 20 * 1024 * 1024; // 20 MB

/**
 * Calculates the storage percent used given used and total values (as strings or numbers).
 * @param {string|number} used - The used storage (e.g., '2 MB', 1048576).
 * @param {string|number} total - The total storage (e.g., '20 MB', 20971520).
 * @returns {number} The percent used (0-100).
 */
export function getStoragePercent(used: string | number, total: string | number): number {
  let usedBytes = typeof used === 'string' ? parseSizeString(used) : used;
  let totalBytes = typeof total === 'string' ? parseSizeString(total) : total;
  if (!totalBytes) return 0;
  return Math.min(100, Math.round((usedBytes / totalBytes) * 100));
}

/**
 * Example recent files for UI display. Replace or remove when real recent files are implemented.
 */
export const recentFiles = [
  {
    name: "Sample Data.csv",
    size: "2 KB",
    type: "csv",
    uploadedBy: "You",
    date: "Today",
    tag: undefined, // Tag can be set in the consuming component
  },
];

/**
 * Maps document types to Tag variants for consistent UI coloring.
 */
export const DOC_TYPE_TAG: Record<string, import("@/design-system/components/Tag").TagVariant> = {
  Product: "primary",
  Customer: "success",
  Marketing: "info",
  Finance: "warning",
  HR: "secondary",
  Legal: "error",
  Operations: "info",
  Sales: "primary",
  General: "gray",
};

