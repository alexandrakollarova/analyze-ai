"use client";

import Table from "@/design-system/components/Table";
import Card from "@/design-system/components/Card";

type DataPreviewProps = {
  data: Record<string, unknown>[];
};

export default function DataPreview({ data }: DataPreviewProps) {
  if (!data || data.length === 0) {
    return (
      <p className="text-gray italic text-center">No data to preview</p>
    );
  }

  const columns = Object.keys(data[0]).map((key) => {
    return { id: key, header: key, accessor: (row: Record<string, unknown>) => row[key] as React.ReactNode };
  });
  console.log(data);

  return <Table columns={columns} data={data} />;
}
