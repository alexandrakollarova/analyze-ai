"use client";

import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";
import ChatBox from "@/components/ChatBox";
import DataPreview from "@/components/DataPreview";
import Table from "@/design-system/components/Table";
import Card from "@/design-system/components/Card";
import Button from "@/design-system/components/Button";
import Tag from "@/design-system/components/Tag";
import Search from "@/design-system/components/Search";
import { FileTextIcon, FileSpreadsheetIcon, FileType2Icon, FileIcon, FileJsonIcon, File } from "lucide-react";
import TableToolbar from "@/components/TableToolbar";

const defaultSampleData = [
  {
    title: "Dashboard tech requirements",
    size: "220 KB",
    type: "docx",
    date: "Jan 4, 2024",
    documentType: "Product",
    uploadedBy: "Amélie Laurent",
  },
  {
    title: "Marketing site requirements",
    size: "488 KB",
    type: "docx",
    date: "Jan 4, 2024",
    documentType: "Marketing",
    uploadedBy: "Ammar Foley",
  },
  {
    title: "Q4_2025 Reporting",
    size: "1.2 MB",
    type: "pdf",
    date: "Jan 4, 2024",
    documentType: "Finance",
    uploadedBy: "Amélie Laurent",
  },
  {
    title: "FY_2024-25 Financials",
    size: "628 KB",
    type: "xls",
    date: "Jan 4, 2024",
    documentType: "Finance",
    uploadedBy: "Sienna Hewitt",
  },
];

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

// Map document types to Tag variants
const DOC_TYPE_TAG: Record<string, import("@/design-system/components/Tag").TagVariant> = {
  Product: "primary",
  Customer: "success",
  Marketing: "info",
  Finance: "warning",
  HR: "secondary",
};

interface DashboardProps {
  projectName?: string;
  noSampleData?: boolean;
  sampleData?: Record<string, unknown>[];
}

export default function Dashboard({ projectName, noSampleData, sampleData }: DashboardProps = {}) {
  const [data, setData] = React.useState<Record<string, unknown>[]>(
    noSampleData ? [] : sampleData ? sampleData : defaultSampleData
  );
  const [search, setSearch] = React.useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Table columns
  const columns = React.useMemo(() => [
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
        <Tag variant={DOC_TYPE_TAG[row.documentType] || "gray"} subtle>
          {row.documentType}
        </Tag>
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
  ], []);

  // Handler to merge uploaded data with existing data
  const handleDataParsed = (newData: Record<string, unknown>[]) => {
    setData(prev => {
      // Merge, avoiding duplicate file titles
      const titles = new Set(prev.map(row => row.title));
      const filteredNew = newData.filter(row => !titles.has(row.title));
      return [...prev, ...filteredNew];
    });
  };

  // Filtered data based on tab
  const filteredData = React.useMemo(() => {
    if (activeTab === "all") return data;
    if (activeTab === "documents") return data.filter(row => row.type === "docx");
    if (activeTab === "pdfs") return data.filter(row => row.type === "pdf");
    return data;
  }, [data, activeTab]);

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
