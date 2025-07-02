import React from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const severityMap = {
  success: {
    icon: CheckCircle,
    bg: '#33e6a2',    // success-light
  },
  error: {
    icon: AlertCircle,
    bg: '#ff5a6a',    // error-light
  },
  warning: {
    icon: AlertTriangle,
    bg: '#ff944d',    // warning-light
  },
  info: {
    icon: Info,
    bg: '#33c6ff',    // info-light
  },
};

export type AlertSeverity = keyof typeof severityMap;

/**
 * Props for Alert component.
 * @typedef {Object} AlertProps
 * @property {AlertSeverity} severity - The alert status (success, error, warning, info).
 * @property {React.ReactNode} children - The alert content.
 * @property {string} [className] - Additional class names.
 */
export interface AlertProps {
  severity: AlertSeverity;
  children: React.ReactNode;
}

export default function Alert({ severity, children }: AlertProps) {
  const { icon: Icon, bg } = severityMap[severity];
  return (
    <div className={`flex items-center gap-3 rounded-md px-4 py-3`} style={{ background: bg }}>
      <Icon className={`w-5 h-5`} style={{ color: '#fff' }} aria-hidden="true" />
      <span className={`text-sm font-medium`} style={{ color: '#fff' }}>{children}</span>
    </div>
  );
} 