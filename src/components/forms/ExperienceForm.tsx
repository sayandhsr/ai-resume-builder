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

export function ExperienceForm() {
    const { data, addExperience, updateExperience, removeExperience } = useResumeStore();
    const { experience, settings } = data;
    const [isOptimizing, setIsOptimizing] = useState<string | null>(null);

    const handleAdd = () => {
        addExperience({
            id: uuidv4(),
            company: "",
            role: "",
            duration: "",
            description: "",
        });
    };

    const handleOptimizeDescription = async (id: string, description: string) => {
        if (!description.trim()) return;

        setIsOptimizing(id);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: 'experience',
                    rawText: description,
                    role: settings.jobRole,
                    tone: settings.tone,
                }),
            });

            if (!res.ok) throw new Error('Optimization failed');
            const data = await res.json();

            if (data.optimizedContent) {
                updateExperience(id, { description: data.optimizedContent });
            }
        } catch (error) {
            console.error(error);
            alert('Failed to optimize with AI. Please check your API key.');
        } finally {
            setIsOptimizing(null);
        }
    };

    return (
        <Card className="border-none shadow-sm bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Add relevant work history and achievements.</CardDescription>
                </div>
                <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Experience
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {experience.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-4">No experience added yet. Click the button above to add one.</p>
                ) : (
                    experience.map((exp, index) => (
                        <div key={exp.id} className="relative border rounded-lg p-4 space-y-4 bg-background">
                            <div className="absolute top-4 right-4 text-xs font-semibold text-muted-foreground">
                                #{index + 1}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Company Name</Label>
                                    <Input
                                        placeholder="Tech Corp Inc."
                                        value={exp.company}
                                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Role / Title</Label>
                                    <Input
                                        placeholder="Software Engineer"
                                        value={exp.role}
                                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Duration</Label>
                                    <Input
                                        placeholder="Jan 2020 - Present"
                                        value={exp.duration}
                                        onChange={(e) => updateExperience(exp.id, { duration: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <div className="flex justify-between items-center">
                                        <Label>Description of Work</Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary h-8 px-2 text-xs gap-1"
                                            onClick={() => handleOptimizeDescription(exp.id, exp.description)}
                                            disabled={isOptimizing === exp.id || !exp.description.trim()}
                                        >
                                            <Wand2 className={`h-3 w-3 ${isOptimizing === exp.id ? 'animate-spin' : ''}`} />
                                            {isOptimizing === exp.id ? 'Optimizing...' : 'Optimize with AI'}
                                        </Button>
                                    </div>
                                    <Textarea
                                        placeholder="Describe your responsibilities and achievements..."
                                        className="min-h-[120px]"
                                        value={exp.description}
                                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeExperience(exp.id)}
                                >
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
