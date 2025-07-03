import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";
import { Settings2Icon } from 'lucide-react';
import UserPreferences from '@/components/UserPreferences';

/**
 * Appbar component for top navigation/header bar.
 * @param {AppbarProps} props - Appbar properties
 */

interface AppbarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Props for Appbar component.
 * @typedef {Object} AppbarProps
 * @property {React.ReactNode} [left] - Optional left-side content.
 * @property {React.ReactNode} [right] - Optional right-side content.
 * @property {BreadcrumbItem[]} [breadcrumbs] - Optional array of breadcrumb items.
 */

export default function Appbar({ left, right, breadcrumbs }: AppbarProps) {
  const [prefsOpen, setPrefsOpen] = useState(false);
  return (
    <header
      className="flex items-center justify-between px-6 py-4 fixed top-0 left-64 border-b border-gray-light"
      style={{ width: 'calc(100vw - 16rem)', zIndex: 40 }}
    >
      <div className="flex items-center gap-4">
        {breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : left}
      </div>
      <div className="flex items-center gap-4">
        {right}
        <button
          className="p-2 rounded-full hover:bg-gray-light transition"
          aria-label="Preferences"
          onClick={() => setPrefsOpen(true)}
        >
          <Settings2Icon size={20} />
        </button>
        <ThemeToggle />
        <UserPreferences open={prefsOpen} onClose={() => setPrefsOpen(false)} />
      </div>
    </header>
  );
} 