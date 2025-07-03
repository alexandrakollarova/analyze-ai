"use client";

import React, { useState, useEffect, useMemo } from "react";
import FileUploader from "@/components/FileUploader";
import ChatBox from "@/components/ChatBox";
import Table from "@/design-system/components/Table";
import Card from "@/design-system/components/Card";
import Button from "@/design-system/components/Button";
import Tag from "@/design-system/components/Tag";
import Search from "@/design-system/components/Search";
import { FileTextIcon, FileSpreadsheetIcon, FileType2Icon, FileIcon, FileJsonIcon, File, Loader2Icon } from "lucide-react";
import TableToolbar from "@/components/TableToolbar";
import { parseSizeString, formatSize, DOC_TYPE_TAG } from "@/lib/utils";


// TODO: Remove this once we have a real recent files
const recentFiles = [
  {
    name: "Sample Data.csv",
    size: "2 KB",
    type: "csv",
    uploadedBy: "You",
    date: "Today",
    tag: <Tag variant="info">CSV</Tag>,
  },
];

interface DashboardProps {
  projectName?: string;
  noSampleData?: boolean;
  sampleData?: Record<string, unknown>[];
}

export default function Dashboard({ projectName, noSampleData, sampleData }: DashboardProps = {}) {
  // --- State ---
  const [data, setData] = useState<Record<string, unknown>[]>(
    noSampleData ? [] : sampleData ? sampleData : []
  );
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [pendingCategories, setPendingCategories] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // --- Derived Values ---
  const columns = useMemo(() => [
    {
      id: "title",
      header: "File name",
      accessor: (row: any) => {
        let icon = <FileIcon size={18} className="text-gray" />;
        if (row.type === "docx") icon = <FileTextIcon size={18} className="text-gray" />;
        else if (row.type === "pdf") icon = <FileType2Icon size={18} className="text-gray" />;
        else if (row.type === "xls" || row.type === "xlsx") icon = <FileSpreadsheetIcon size={18} className="text-gray" />;
        else if (row.type === "csv" || row.type === "json") icon = <FileJsonIcon size={18} className="text-gray" />;
        return (
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium text-gray-dark">{row.title}</span>
            <span className="text-xs text-gray">{row.type}</span>
          </div>
        );
      },
      className: "font-medium",
    },
    {
      id: "size",
      header: "Size",
      accessor: (row: any) => row.size,
    },
    {
      id: "documentType",
      header: "Document type",
      accessor: (row: any) => (
        pendingCategories[row.title] ? (
          <Tag variant="gray" subtle>
            <Loader2Icon className="animate-spin w-3 h-3" />
          </Tag>
        ) : (
          <Tag variant={DOC_TYPE_TAG[row.documentType] || "gray"} subtle>
            {row.documentType}
          </Tag>
        )
      ),
    },
    {
      id: "uploadedBy",
      header: "Uploaded by",
      accessor: (row: any) => row.uploadedBy,
    },
    {
      id: "date",
      header: "Last modified",
      accessor: (row: any) => row.date,
    },
  ], [pendingCategories]);

  const filteredData = useMemo(() => {
    if (activeTab === "all") return data;
    if (activeTab === "documents") return data.filter(row => row.type === "docx");
    if (activeTab === "pdfs") return data.filter(row => row.type === "pdf");
    return data;
  }, [data, activeTab]);

  // --- Handlers ---
  /**
   * Merge uploaded data with existing data and store File objects
   */
  const handleDataParsed = (newData: Record<string, unknown>[], files?: File[]) => {
    setData(prev => {
      // Merge, avoiding duplicate file titles
      const titles = new Set((prev as Record<string, unknown>[]).map((row: Record<string, unknown>) => String(row.title)));
      const filteredNew = (newData as Record<string, unknown>[]).filter((row: Record<string, unknown>) => !titles.has(String(row.title)));
      return [...prev, ...filteredNew];
    });
    if (files) {
      setUploadedFiles(prev => {
        const next: Record<string, File> = { ...prev };
        files.forEach((f: File) => { next[f.name] = f; });
        return next;
      });
    }
  };

  /**
   * AI category detection for table rows with missing/General documentType
   */
  useEffect(() => {
    (data as Record<string, unknown>[]).forEach((row: Record<string, unknown>, idx: number) => {
      const title = String(row.title);
      if (!row.documentType || row.documentType === "General") {
        if (!pendingCategories[title] && uploadedFiles[title]) {
          setPendingCategories(prev => ({ ...prev, [title]: true }));
          const file = uploadedFiles[title];
          const reader = new FileReader();
          reader.onload = async () => {
            const text = reader.result as string;
            const prompt = `Classify this file content into a business category (Finance, Legal, Operations, Sales, Product, HR, General):\n\n${text}`;
            try {
              const res = await fetch("/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: prompt, data: [] }),
              });
              const { answer } = await res.json();
              setData(prev =>
                (prev as Record<string, unknown>[]).map((r: Record<string, unknown>) =>
                  String(r.title) === title
                    ? { ...r, documentType: answer.trim() }
                    : r
                )
              );
            } catch {
              setData(prev =>
                (prev as Record<string, unknown>[]).map((r: Record<string, unknown>) =>
                  String(r.title) === title
                    ? { ...r, documentType: "General" }
                    : r
                )
              );
            } finally {
              setPendingCategories(prev => ({ ...prev, [title]: false }));
            }
          };
          reader.readAsText(file.slice(0, 2048));
        }
      }
    });
  }, [data, uploadedFiles]);

  const totalBytes = data.reduce((sum, row) => sum + (row.size ? parseSizeString(String(row.size)) : 0), 0);
  const storageTotalBytes = 20 * 1024 * 1024; // 20 MB
  const storagePercent = Math.min(100, Math.round((totalBytes / storageTotalBytes) * 100));
  const storageUsed = formatSize(totalBytes);
  const storageTotal = formatSize(storageTotalBytes);

  // --- Render ---
  return (
    <>
      {/* Recent section */}
      <section className="mb-8 mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent</h2>
        <div className="flex gap-4">
          {noSampleData ? (
            <Card className="flex items-center gap-4 min-w-[260px] text-gray">No recent files</Card>
          ) : (
            recentFiles.map((file, i) => (
              <Card key={i} className="flex items-center gap-4 min-w-[260px]">
                <div className="flex-1">
                  <div className="font-medium text-gray-dark flex items-center gap-2">
                    {file.name} {file.tag}
                  </div>
                  <div className="text-xs text-gray mt-1">
                    {file.size} • Uploaded by {file.uploadedBy} • {file.date}
                  </div>
                </div>
                <Button size="sm" variant="secondary">Open</Button>
              </Card>
            ))
          )}
        </div>
      </section>
      {/* All files and Chat side by side */}
      <div className="flex gap-8 items-start">
        <section className="w-[70%]">
          <h2 className="text-lg font-semibold mb-4">All files</h2>
          <TableToolbar
            tabs={[
              { label: "View all", value: "all" },
              { label: "Documents", value: "documents" },
              { label: "PDFs", value: "pdfs" },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            rightContent={
              <>
                <Search value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
                <FileUploader onDataParsed={handleDataParsed} />
              </>
            }
          />
          <Table columns={columns} data={filteredData ?? []} />
        </section>
        <aside className="w-[30%] sticky top-24 self-start">
          <ChatBox data={data ?? []} />
        </aside>
      </div>
    </>
  );
}
