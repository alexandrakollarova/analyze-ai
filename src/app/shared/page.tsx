import React from "react";
import Dashboard from "@/components/Dashboard";
import { sharedSampleData } from "@/components/sampleData";

export default function SharedWithMePage() {
    return <Dashboard projectName="Shared with me" sampleData={sharedSampleData} />;
} 