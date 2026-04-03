"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Wand2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function SkillsForm() {
    const { data, addSkill, removeSkill, setResumeData } = useResumeStore();
    const { skills, settings } = data;
    const [isOptimizing, setIsOptimizing] = useState(false);

    const handleOptimizeSkills = async () => {
        const skillsText = skills.map(s => s.name).join(", ");
        setIsOptimizing(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: 'skills',
                    rawText: skillsText,
                    role: settings.jobRole,
                    tone: settings.tone,
                    model: settings.aiModel,
                    optimizationType: settings.optimizationType
                }),
            });

            if (!res.ok) throw new Error('Optimization failed');
            const dataResult = await res.json();

            if (dataResult.optimizedContent) {
                const optimizedSkills = dataResult.optimizedContent.split(',').map((s: string) => s.trim()).filter(Boolean);
                // Clear and repopulate skills (simple version: overwrite data with new skills)
                // For a more robust version, we'd need a clearSkills action, but we'll use setResumeData for now
                const newSkills = optimizedSkills.map((name: string) => ({
                    id: uuidv4(),
                    name,
                    category: 'technical' as const
                }));
                setResumeData({ ...data, skills: newSkills });
            }
        } catch (error) {
            console.error(error);
            alert('Failed to optimize skills with AI.');
        } finally {
            setIsOptimizing(false);
        }
    };

    const [techInput, setTechInput] = useState("");
    const [softInput, setSoftInput] = useState("");

    const handleAddTech = () => {
        if (!techInput.trim()) return;
        addSkill({ id: uuidv4(), name: techInput.trim(), category: "technical" });
        setTechInput("");
    };

    const handleAddSoft = () => {
        if (!softInput.trim()) return;
        addSkill({ id: uuidv4(), name: softInput.trim(), category: "soft" });
        setSoftInput("");
    };

    const handleTechKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTech();
        }
    };

    const handleSoftKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddSoft();
        }
    };

    const techSkills = skills.filter((s) => s.category === "technical");
    const softSkills = skills.filter((s) => s.category === "soft");

    return (
        <Card className="border-none shadow-sm bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>Add relevant technical and soft skills for the role.</CardDescription>
                </div>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 text-primary" 
                    onClick={handleOptimizeSkills}
                    disabled={isOptimizing || skills.length === 0}
                >
                    <Wand2 className={`h-4 w-4 ${isOptimizing ? 'animate-spin' : ''}`} />
                    {isOptimizing ? 'Optimizing...' : 'Optimize with AI'}
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* Technical Skills */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold">Technical Skills</h3>
                    <div className="flex gap-2 items-center">
                        <Input
                            placeholder="e.g. JavaScript, React, Python..."
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={handleTechKeyDown}
                        />
                        <Button onClick={handleAddTech} type="button" size="icon" className="shrink-0">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {techSkills.map((s) => (
                            <Badge key={s.id} variant="secondary" className="px-3 py-1 flex gap-2 items-center text-sm rounded-full">
                                {s.name}
                                <X
                                    className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                                    onClick={() => removeSkill(s.id)}
                                />
                            </Badge>
                        ))}
                        {techSkills.length === 0 && <span className="text-xs text-muted-foreground italic tracking-wide">No technical skills added.</span>}
                    </div>
                </div>

                {/* Soft Skills */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold">Soft Skills</h3>
                    <div className="flex gap-2 items-center">
                        <Input
                            placeholder="e.g. Leadership, Communication..."
                            value={softInput}
                            onChange={(e) => setSoftInput(e.target.value)}
                            onKeyDown={handleSoftKeyDown}
                        />
                        <Button onClick={handleAddSoft} type="button" size="icon" className="shrink-0 bg-primary/80 hover:bg-primary">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {softSkills.map((s) => (
                            <Badge key={s.id} variant="outline" className="px-3 py-1 flex gap-2 items-center text-sm rounded-full bg-background">
                                {s.name}
                                <X
                                    className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                                    onClick={() => removeSkill(s.id)}
                                />
                            </Badge>
                        ))}
                        {softSkills.length === 0 && <span className="text-xs text-muted-foreground italic tracking-wide">No soft skills added.</span>}
                    </div>
                </div>

            </CardContent>
        </Card>
    );
}
