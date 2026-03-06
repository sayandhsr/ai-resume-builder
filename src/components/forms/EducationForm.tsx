"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

export function EducationForm() {
    const { data, addEducation, updateEducation, removeEducation } = useResumeStore();
    const { education } = data;

    const handleAdd = () => {
        addEducation({
            id: uuidv4(),
            degree: "",
            university: "",
            year: "",
            gpa: "",
        });
    };

    return (
        <Card className="border-none shadow-sm bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Add your educational background.</CardDescription>
                </div>
                <Button onClick={handleAdd} size="sm" variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" /> Add Education
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {education.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-4">No education added yet. Click the button above to add one.</p>
                ) : (
                    education.map((edu, index) => (
                        <div key={edu.id} className="relative border rounded-lg p-4 space-y-4 bg-background">
                            <div className="absolute top-4 right-4 text-xs font-semibold text-muted-foreground">
                                #{index + 1}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Degree / Program</Label>
                                    <Input
                                        placeholder="B.S. Computer Science"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>University / College</Label>
                                    <Input
                                        placeholder="Stanford University"
                                        value={edu.university}
                                        onChange={(e) => updateEducation(edu.id, { university: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Graduation Year</Label>
                                    <Input
                                        placeholder="2024"
                                        value={edu.year}
                                        onChange={(e) => updateEducation(edu.id, { year: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>GPA (Optional)</Label>
                                    <Input
                                        placeholder="3.8"
                                        value={edu.gpa}
                                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
                                className="mt-2"
                            >
                                <Trash2 className="h-4 w-4 mr-2" /> Remove
                            </Button>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
