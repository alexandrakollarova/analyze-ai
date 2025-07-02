import React from "react";
import Dashboard from "@/components/Dashboard";
import { privateSampleData } from "@/components/sampleData";

export default function PrivateFilesPage() {
    return <Dashboard projectName="Private files" sampleData={privateSampleData} />;
} 