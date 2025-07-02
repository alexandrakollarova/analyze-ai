"use client";
import React from "react";
import Dashboard from "@/components/Dashboard";
import { useParams } from "next/navigation";

export default function ProjectPage() {
    const params = useParams();
    const projectParam = Array.isArray(params?.project) ? params.project.join("-") : params?.project;
    const project = projectParam || "Project";
    return <Dashboard projectName={project} noSampleData />;
} 