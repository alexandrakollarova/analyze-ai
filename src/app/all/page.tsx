import React from "react";
import Dashboard from "@/components/Dashboard";
import { allSampleData } from "@/components/sampleData";

export default function AllFilesPage() {
    return <Dashboard projectName="All files" sampleData={allSampleData} />;
} 