import React from "react";
import Dashboard from "@/components/Dashboard";
import { privateSampleData } from "@/lib/sampleData";

export default function PrivateFilesPage() {
    return <Dashboard projectName="Private files" sampleData={privateSampleData} />;
} 