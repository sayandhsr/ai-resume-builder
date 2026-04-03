"use client";

import { useResumeStore, JobType, ResumeTone } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SettingsForm() {
    const { data, updateSettings } = useResumeStore();
    const { settings } = data;

    return (
        <Card className="border-none shadow-sm bg-card text-card-foreground">
            <CardHeader>
                <CardTitle>Resume Settings</CardTitle>
                <CardDescription>Configure AI generation and layout settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Target Job Role / Domain</Label>
                        <Input
                            placeholder="e.g. Frontend Developer"
                            value={settings.jobRole}
                            onChange={(e) => updateSettings({ jobRole: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Job Type</Label>
                        <Select
                            value={settings.jobType}
                            onValueChange={(val: JobType) => updateSettings({ jobType: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent position="popper" sideOffset={5} className="z-50">
                                <SelectItem value="Internship">Internship</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Resume Tone (AI Prompts)</Label>
                        <Select
                            value={settings.tone}
                            onValueChange={(val: ResumeTone) => updateSettings({ tone: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent position="popper" sideOffset={5} className="z-50">
                                <SelectItem value="Clean">Clean</SelectItem>
                                <SelectItem value="Professional">Professional</SelectItem>
                                <SelectItem value="ATS-optimized">ATS-optimized</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Length Constraint</Label>
                        <Select
                            value={settings.pageCount}
                            onValueChange={(val: "1" | "2") => updateSettings({ pageCount: val })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select max pages" />
                            </SelectTrigger>
                            <SelectContent position="popper" sideOffset={5} className="z-50">
                                <SelectItem value="1">1 Page (Standard)</SelectItem>
                                <SelectItem value="2">2 Pages (Detailed)</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-[10px] text-muted-foreground mt-1 px-1">
                          AI will prioritize content to fit the selected length.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
