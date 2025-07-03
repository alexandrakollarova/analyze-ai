"use client";

import React, { useRef, useState } from "react";
import Button from "@/design-system/components/Button";
import Card from "@/design-system/components/Card";
import Dialog from "@/design-system/components/Dialog";
import Input from "@/design-system/components/Input";
import Tag from "@/design-system/components/Tag";
import { UploadIcon, FileTextIcon, Trash2Icon, Loader2Icon } from "lucide-react";

const DEPARTMENTS = ["Product", "Customer", "Marketing", "Finance", "HR"];

// Simple ProgressBar
function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-2 bg-gray-light rounded-full overflow-hidden">
      <div
        className="h-2 bg-primary transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

type FileUploaderProps = {
  onDataParsed: (data: Record<string, unknown>[]) => void;
};

// Helper to determine documentType from file name
function getDocumentType(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('budget')) return 'Finance';
  if (lower.includes('nda')) return 'Legal';
  if (lower.includes('manual')) return 'Operations';
  if (lower.includes('customer')) return 'Sales';
  return 'General';
}

// Map document types to Tag variants
const DOC_TYPE_TAG: Record<string, import("@/design-system/components/Tag").TagVariant> = {
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

export default function FileUploader({ onDataParsed }: FileUploaderProps) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleButtonClick = () => setOpen(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    setFiles(prev => [...prev, ...selected]);
    setProgress(prev => [...prev, ...selected.map(() => 0)]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...dropped]);
      setProgress(prev => [...prev, ...dropped.map(() => 0)]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const getFileSizeString = (size: number) => {
    if (size > 1024 * 1024) return (size / (1024 * 1024)).toFixed(1) + ' MB';
    if (size > 1024) return (size / 1024).toFixed(0) + ' KB';
    return size + ' B';
  };

  const handleRemoveFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    setProgress(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;
    setUploading(true);
    let newProgress = [...progress];
    for (let i = 0; i < files.length; i++) {
      // Simulate upload progress for each file
      for (let j = 1; j <= 10; j++) {
        await new Promise(res => setTimeout(res, 80));
        newProgress[i] = j * 10;
        setProgress([...newProgress]);
      }
      const file = files[i];
      const ext = file.name.split(".").pop();
      const newRow = {
        title: file.name,
        size: getFileSizeString(file.size),
        type: ext,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        documentType: DEPARTMENTS[0],
        uploadedBy: "You",
      };
      onDataParsed([newRow]);
      // Increment usage stats
      const usageStats = JSON.parse(localStorage.getItem("usageStats") || "{}");
      const newMessages = (usageStats.messages || 0) + 1;
      localStorage.setItem("usageStats", JSON.stringify({ ...usageStats, messages: newMessages }));
    }
    setOpen(false);
    setFiles([]);
    setProgress([]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setUploading(false);
  };

  return (
    <>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Card className="shadow-lg"><div className="px-4 py-2"><span className="text-success font-semibold">File(s) uploaded successfully!</span></div></Card>
        </div>
      )}
      <Button onClick={handleButtonClick} type="button">
        Upload
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} ariaLabel="Upload file" title="Upload file">
        <Card className="p-0 rounded-2xl min-w-[380px] max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <UploadIcon size={24} className="text-primary" />
                <h2 className="text-lg font-semibold">Import file</h2>
              </div>
              <div className="text-gray text-sm mb-4">Upload one or more CSVs to import your data.</div>
            </div>
            <div
              className={
                "flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer " +
                (dragActive ? "border-primary bg-primary/10" : "border-gray-light bg-gray-light hover:bg-gray-light")
              }
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{ minHeight: 120 }}
            >
              <FileTextIcon size={36} className="text-gray mb-2" />
              <div className="font-medium text-gray-dark mb-1">Drag files here to import</div>
              <div className="text-xs text-gray mb-2">or, click to browse (CSV, JSON, PDF, XLS, XLSX, DOC, DOCX, 4 MB max each)</div>
              <Button type="button" variant="secondary" onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                Select files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.json,.pdf,.xls,.xlsx,.doc,.docx"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={uploading}
            />
            {files.length > 0 && (
              <div className="flex flex-col gap-3">
                {files.map((file, idx) => {
                  const docType = getDocumentType(file.name);
                  const tagVariant = DOC_TYPE_TAG[docType] || "gray";
                  return (
                    <div key={file.name + idx} className="flex items-center gap-3 bg-gray-light rounded-lg px-4 py-2">
                      <FileTextIcon size={20} className="text-primary" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium text-gray-dark flex items-center gap-2">
                          {file.name}
                          <Tag variant={tagVariant} subtle>{docType}</Tag>
                        </div>
                        <div className="text-xs text-gray">{getFileSizeString(file.size)}</div>
                        <ProgressBar percent={progress[idx] || 0} />
                      </div>
                      {uploading ? (
                        <Loader2Icon className="animate-spin text-gray" size={20} />
                      ) : (
                        <button type="button" onClick={() => handleRemoveFile(idx)} aria-label="Remove file">
                          <Trash2Icon size={18} className="text-gray hover:text-error" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <Button type="button" variant="secondary" onClick={() => setOpen(false)} disabled={uploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={files.length === 0 || uploading}>
                {uploading ? "Uploading..." : "Import"}
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
