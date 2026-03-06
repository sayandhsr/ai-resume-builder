"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function SkillsForm() {
    const { data, addSkill, removeSkill } = useResumeStore();
    const { skills } = data;

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
            <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Add relevant technical and soft skills for the role.</CardDescription>
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
