import React from "react";
import { Loader2Icon } from "lucide-react";

/**
 * Spinner component for loading indicators.
 */
export default function Spinner() {
  return (
    <div className="flex justify-center items-center py-32">
      <Loader2Icon size={32} className="text-gray animate-spin mr-1" role="status" aria-label="Loading" />
    </div>
  );
} 