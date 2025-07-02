import React from 'react';

/**
 * Banner component for full-width announcements.
 * @param {BannerProps} props - Banner properties
 */

interface BannerProps {
  title: string;
  bgColor?: string;
  className?: string;
}

/**
 * Props for Banner component.
 * @typedef {Object} BannerProps
 * @property {string} title - The banner message.
 * @property {string} [bgColor] - Tailwind background color class (default: bg-primary).
 * @property {string} [className] - Additional class names.
 */

export default function Banner({ title, bgColor = 'bg-primary', className = '' }: BannerProps) {
  return (
    <div className={`w-full ${bgColor} text-white text-center py-2 text-sm font-medium fixed top-0 left-0 z-50 ${className}`}>
      {title}
    </div>
  );
} 