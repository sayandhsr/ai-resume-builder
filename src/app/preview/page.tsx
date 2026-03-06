"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/button";
import { Download, Edit3, Save } from "lucide-react";
import Link from "next/link";
import { useResumeStore } from "@/store/useResumeStore";

export default function ExportPage() {
    const resumeRef = useRef<HTMLDivElement>(null);
    const { data } = useResumeStore();

    const handlePrint = useReactToPrint({
        contentRef: resumeRef,
        documentTitle: `Resume_${data.personalInfo.fullName.replace(/\s+/g, '_') || 'Builder'}`,
    });

    const handleSave = () => {
        // Placeholder for saving to Supabase DB later
        alert("Saving to your Supabase account (Integration pending)");
    };

    return (
        <div className="flex flex-col gap-6 max-w-5xl mx-auto py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Export Resume</h1>
                    <p className="text-muted-foreground">Download your ATS-optimized resume as a PDF.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" asChild>
                        <Link href="/builder">
                            <Edit3 className="mr-2 h-4 w-4" /> Edit
                        </Link>
                    </Button>
                    <Button variant="outline" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" /> Save to DB
                    </Button>
                    <Button onClick={() => handlePrint()}>
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                </div>
            </div>

            <div className="flex justify-center bg-muted/50 p-8 rounded-xl border border-border">
                {/* A4 Page constraints for the PDF export */}
                <div
                    className="w-full max-w-[210mm] shadow-2xl bg-white"
                    ref={resumeRef}
                >
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}
