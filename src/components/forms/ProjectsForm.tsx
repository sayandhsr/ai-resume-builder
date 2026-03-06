"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function ProjectsForm() {
    const { data, addProject, updateProject, removeProject } = useResumeStore();
    const { projects } = data;

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
        <Card className="border-none shadow-sm bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Highlight your notable projects.</CardDescription>
                </div>
                <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Project
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {projects.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-4">No projects added yet.</p>
                ) : (
                    projects.map((proj, index) => (
                        <div key={proj.id} className="relative border rounded-lg p-4 space-y-4 bg-background">
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
                                    <Label>Description</Label>
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
