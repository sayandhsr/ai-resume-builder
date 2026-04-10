"use client";

import { useState } from "react";
import { useResumeStore, AIModel, OptimizationType } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FixedSelect, SelectItem } from "@/components/ui/fixed-select";
import { Label } from "@/components/ui/label";
import { Wand2, Save, CheckCircle2, Sparkles, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function AIOptimizer() {
    const { data, setResumeData, updateSettings, currentResumeId } = useResumeStore();
    const { settings } = data;
    const [jobDescription, setJobDescription] = useState("");
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const supabase = createClient();

    const handleDownloadPDF = async () => {
        const element = document.getElementById("resume-preview");
        if (!element) {
            toast.error("Resume preview not found.");
            return;
        }

        setIsDownloading(true);
        const loadingToast = toast.loading("Generating PDF...");
        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * pdfWidth) / canvas.width;

            const finalHeight = imgHeight > pdfHeight ? pdfHeight : imgHeight;
            const finalWidth = imgHeight > pdfHeight ? (canvas.width * pdfHeight) / canvas.height : imgWidth;

            pdf.addImage(imgData, "PNG", (pdfWidth - finalWidth) / 2, 0, finalWidth, finalHeight);

            const fileName = settings.jobRole
                ? `${data.personalInfo.fullName || "Resume"}_${settings.jobRole}.pdf`
                : `${data.personalInfo.fullName || "Resume"}.pdf`;

            pdf.save(fileName);
            toast.success("PDF downloaded!", { id: loadingToast });
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate PDF.", { id: loadingToast });
        } finally {
            setIsDownloading(false);
        }
    };

    const handleTailorResume = async () => {
        const loadingToast = toast.loading("AI is tailoring your resume...");
        setIsOptimizing(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: 'full_resume',
                    rawText: JSON.stringify(data),
                    role: settings.jobRole,
                    tone: settings.tone,
                    jobDescription: jobDescription,
                    model: settings.aiModel,
                    optimizationType: settings.optimizationType
                }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Tailoring failed');
            }
            
            const result = await res.json();

            if (result.optimizedContent) {
                try {
                   const optimizedData = typeof result.optimizedContent === 'string' 
                        ? JSON.parse(result.optimizedContent) 
                        : result.optimizedContent;
                   setResumeData(optimizedData, currentResumeId);
                   toast.success("Resume tailored successfully!", { id: loadingToast });
                } catch (e) {
                    console.error("Failed to parse optimized content", e);
                    toast.error("AI returned invalid data format.", { id: loadingToast });
                }
            } else {
                toast.error("No content generated. Try again.", { id: loadingToast });
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to tailor resume with AI.', { id: loadingToast });
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleSaveToHistory = async () => {
        setIsSaving(true);
        setSaveSuccess(false);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error("Please sign in to save your resume.");
                return;
            }

            const saveData: any = {
                user_id: user.id,
                data: data,
                title: settings.jobRole || "My Resume",
                updated_at: new Date().toISOString(),
            };

            if (currentResumeId) {
                saveData.id = currentResumeId;
            }

            const { error } = await supabase.from("resumes").upsert(saveData);

            if (error) throw error;
            setSaveSuccess(true);
            toast.success("Resume saved to history!");
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error(error);
            toast.error("Failed to save resume.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className="border-border">
            <CardHeader>
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-[#FF5623]/10 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-[#FF5623]" />
                    </div>
                    <div>
                        <CardTitle>AI ATS Optimizer</CardTitle>
                        <CardDescription>Select your preferred AI and optimization task.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-2.5">
                        <Label>AI Model</Label>
                        <FixedSelect 
                            value={settings.aiModel} 
                            onValueChange={(val) => updateSettings({ aiModel: val as AIModel })}
                            placeholder="Select AI Model"
                        >
                            <SelectItem value="google/gemini-flash-1.5:free">Gemini 1.5 Flash (Free)</SelectItem>
                            <SelectItem value="meta-llama/llama-3.1-8b-instruct:free">Llama 3.1 8B (Free)</SelectItem>
                            <SelectItem value="mistralai/mistral-7b-instruct:free">Mistral 7B (Free)</SelectItem>
                        </FixedSelect>
                    </div>

                    <div className="space-y-2.5">
                        <Label>Optimization Task</Label>
                        <FixedSelect 
                            value={settings.optimizationType} 
                            onValueChange={(val) => updateSettings({ optimizationType: val as OptimizationType })}
                            placeholder="Select Task"
                        >
                            <SelectItem value="ATS Rewrite">Full ATS Rewrite</SelectItem>
                            <SelectItem value="Grammar & spelling">Fix Grammar & Spelling</SelectItem>
                            <SelectItem value="Keyword optimization">Add Keywords</SelectItem>
                            <SelectItem value="ATS Score Booster">ATS Score Booster</SelectItem>
                        </FixedSelect>
                    </div>
                </div>

                <div className="space-y-2.5">
                    <Label>Job Description (Optional)</Label>
                    <Textarea 
                        placeholder="Paste the job description here for better tailoring..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="min-h-[120px]"
                    />
                    <Button 
                        onClick={handleTailorResume} 
                        className="w-full gap-2 h-12" 
                        disabled={isOptimizing}
                    >
                        <Wand2 className={`h-4 w-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                        {isOptimizing ? "Optimizing..." : "Apply AI Optimization"}
                    </Button>
                </div>
                
                <div className="pt-4 border-t border-border space-y-3">
                    <Button 
                        variant="outline" 
                        onClick={handleSaveToHistory} 
                        className="w-full gap-2 h-11" 
                        disabled={isSaving}
                    >
                        {saveSuccess ? (
                            <>
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                Saved Successfully
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4" />
                                {isSaving ? "Saving..." : "Save to History"}
                            </>
                        )}
                    </Button>
                    <Button 
                        variant="outline" 
                        onClick={handleDownloadPDF} 
                        className="w-full gap-2 h-11"
                        disabled={isDownloading}
                    >
                        <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
                        {isDownloading ? "Generating PDF..." : "Download as PDF"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
