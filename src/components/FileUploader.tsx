"use client";

import React, { useRef, useState } from "react";
import Button from "@/design-system/components/Button";
import Card from "@/design-system/components/Card";
import Dialog from "@/design-system/components/Dialog";
import Input from "@/design-system/components/Input";
import Tag from "@/design-system/components/Tag";
import Alert from "@/design-system/components/Alert";

const DEPARTMENTS = ["Product", "Customer", "Marketing", "Finance", "HR"];

type FileUploaderProps = {
  onDataParsed: (data: Record<string, unknown>[]) => void;
};

export default function FileUploader({ onDataParsed }: FileUploaderProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleButtonClick = () => setOpen(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setFile(files[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const ext = file.name.split(".").pop();
    const newRow = {
      title,
      size: getFileSizeString(file.size),
      type: ext,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      documentType: department,
      uploadedBy: "You",
    };
    onDataParsed([newRow]);
    setOpen(false);
    setFile(null);
    setTitle("");
    setDepartment(DEPARTMENTS[0]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Alert severity="success">File uploaded successfully!</Alert>
        </div>
      )}
      <Button onClick={handleButtonClick} type="button">
        Upload
      </Button>
      <div className="text-xs text-gray text-center mt-1 mb-2">⌘ U to upload</div>
      <Dialog open={open} onClose={() => setOpen(false)} ariaLabel="Upload file" title="Upload file">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-lg font-semibold mb-2">Upload file</h2>
          <div
            className={
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer " +
              (dragActive ? "border-primary bg-primary/10" : "border-gray-light bg-gray-light hover:bg-gray-light")
            }
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {file ? (
              <div className="text-primary font-medium">{file.name}</div>
            ) : (
              <>
                <div className="text-gray">Drag and drop a file here, or click to select</div>
                <div className="text-xs text-gray mt-2">CSV or JSON only</div>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-dark mb-1">File title</label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              placeholder="Enter file title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-dark mb-1">Department</label>
            <div className="flex gap-2 flex-wrap">
              {DEPARTMENTS.map(dep => (
                <button
                  type="button"
                  key={dep}
                  className={
                    "px-3 py-1 rounded-full border text-xs font-semibold " +
                    (department === dep
                      ? "bg-primary text-white border-primary"
                      : "bg-white border-gray-light text-gray-dark hover:bg-gray-light")
                  }
                  onClick={() => setDepartment(dep)}
                >
                  {dep}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file || !title}>
              Upload
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
