import React from "react";
import Dashboard from "@/components/Dashboard";
import { sharedSampleData } from "@/lib/sampleData";

export default function SharedWithMePage() {
    return <Dashboard projectName="Shared with me" sampleData={sharedSampleData} />;
} 