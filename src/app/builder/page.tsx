"use client";

import { ResumeBuilderStepper } from "@/components/forms/ResumeBuilderStepper";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { AIOptimizer } from "@/components/forms/AIOptimizer";

export default function BuilderPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Resume Builder</h1>
                <p className="text-muted-foreground">Fill in your details below. You can preview changes instantly.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start w-full relative">
                {/* Left Side: Input Form */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <ResumeBuilderStepper />
                    <AIOptimizer />
                </div>

                {/* Right Side: Live Preview (Fixed while scrolling left) */}
                <div className="w-full lg:w-1/2 sticky top-24">
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}
