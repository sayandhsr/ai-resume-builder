"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Wand2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export function ProjectsForm() {
    const { data, addProject, updateProject, removeProject } = useResumeStore();
    const { projects, settings } = data;
    const [isOptimizing, setIsOptimizing] = useState<string | null>(null);

    const handleOptimizeDescription = async (id: string, description: string) => {
        if (!description.trim()) {
            toast.error("Please enter a description first.");
            return;
        }

        setIsOptimizing(id);
        const loadingToast = toast.loading("Optimizing project description...");
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: 'projects',
                    rawText: description,
                    role: settings.jobRole,
                    tone: settings.tone,
                    model: settings.aiModel,
                    optimizationType: settings.optimizationType
                }),
            });

            if (!res.ok) throw new Error('Optimization failed');
            const dataResult = await res.json();

            if (dataResult.optimizedContent) {
                updateProject(id, { description: dataResult.optimizedContent });
                toast.success("Project description optimized!", { id: loadingToast });
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not optimize at this time.", { id: loadingToast });
        } finally {
            setIsOptimizing(null);
        }
    };

    const handleAdd = () => {
        addProject({
            id: uuidv4(),
            title: "",
            description: "",
            technologies: "",
            github: "",
        });
    };

    return (
        <Card className="border-none shadow-none bg-transparent p-0">
            <CardHeader className="flex flex-row items-center justify-between px-0">
                <div>
                    <CardTitle className="text-xl">Projects</CardTitle>
                    <CardDescription>Highlight your notable projects.</CardDescription>
                </div>
                <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Project
                </Button>
            </CardHeader>
            <CardContent className="space-y-6 px-0">
                {projects.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-4">No projects added yet.</p>
                ) : (
                    projects.map((proj, index) => (
                        <div key={proj.id} className="relative border border-border rounded-xl p-5 space-y-5 bg-background/50">
                            <div className="absolute top-4 right-4 text-xs font-semibold text-muted-foreground">
                                #{index + 1}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Project Title</Label>
                                    <Input
                                        placeholder="E-commerce Platform"
                                        value={proj.title}
                                        onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>GitHub / Live Link</Label>
                                    <Input
                                        placeholder="github.com/my-project"
                                        value={proj.github}
                                        onChange={(e) => updateProject(proj.id, { github: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Technologies Used</Label>
                                    <Input
                                        placeholder="React, Node.js, PostgreSQL (comma separated)"
                                        value={proj.technologies}
                                        onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Description</Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary h-8 px-2 text-xs gap-1"
                                            onClick={() => handleOptimizeDescription(proj.id, proj.description)}
                                            disabled={isOptimizing === proj.id || !proj.description.trim()}
                                        >
                                            <Wand2 className={`h-3 w-3 ${isOptimizing === proj.id ? 'animate-spin' : ''}`} />
                                            {isOptimizing === proj.id ? 'Optimizing...' : 'Optimize with AI'}
                                        </Button>
                                    </div>
                                    <Textarea
                                        placeholder="What did this project achieve?"
                                        className="min-h-[80px]"
                                        value={proj.description}
                                        onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <Button variant="destructive" size="sm" onClick={() => removeProject(proj.id)}>
                                    <Trash2 className="h-4 w-4 mr-2" /> Remove
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
