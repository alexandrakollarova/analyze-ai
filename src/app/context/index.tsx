import React, { createContext, useState } from "react";
import { parseSizeString, formatSize, STORAGE_TOTAL_BYTES } from "@/lib/utils";

export interface StorageContextType {
  storageUsed: string;
  storageTotal: string;
  storagePercent: number;
  setStorageFromFiles: (files: { size: string }[]) => void;
}

export const StorageContext = createContext<StorageContextType | undefined>(undefined);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const [storageUsed, setStorageUsed] = useState("0 B");
  const [storagePercent, setStoragePercent] = useState(0);
  const storageTotal = formatSize(STORAGE_TOTAL_BYTES);

  const setStorageFromFiles = (files: { size: string }[]) => {
    const totalBytes = files.reduce((sum, f) => sum + (f.size ? parseSizeString(String(f.size)) : 0), 0);
    setStorageUsed(formatSize(totalBytes));
    setStoragePercent(Math.min(100, Math.round((totalBytes / STORAGE_TOTAL_BYTES) * 100)));
  };

  return (
    <StorageContext.Provider value={{ storageUsed, storageTotal, storagePercent, setStorageFromFiles }}>
      {children}
    </StorageContext.Provider>
  );
} 