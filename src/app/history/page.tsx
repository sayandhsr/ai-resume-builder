"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Trash2, FileEdit, Plus, Copy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function HistoryPage() {
    const [resumes, setResumes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const { setResumeData, resetResumeData } = useResumeStore();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data, error } = await supabase
                    .from("resumes")
                    .select("*")
                    .order("updated_at", { ascending: false });

                if (!error) {
                    setResumes(data);
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [supabase]);

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from("resumes").delete().eq("id", id);
        if (!error) {
            setResumes(resumes.filter((r) => r.id !== id));
        }
    };

    const handleEdit = (resume: any) => {
        setResumeData(resume.data, resume.id);
        router.push("/builder");
    };

    const handleDuplicate = (resume: any) => {
        // Load data but don't pass the ID, effectively making it a new resume
        setResumeData(resume.data, null);
        router.push("/builder");
        toast.success("Resume duplicated! You are now editing a new copy.");
    };

    const handleCreateNew = () => {
        resetResumeData();
        router.push("/builder");
    };

    if (loading) {
        return (
            <div className="container mx-auto py-10 px-4">
                <div className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground animate-pulse">Loading your history...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto py-10 px-4">
                <Card className="max-w-md mx-auto text-center">
                    <CardHeader>
                        <CardTitle>Sign in Required</CardTitle>
                        <CardDescription>You need to be signed in to view your resume history.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/">Go to Home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">Your Resumes</h1>
                    <p className="text-muted-foreground">Manage and edit your previous resumes.</p>
                </div>
                <Button onClick={handleCreateNew} className="gap-2">
                    <Plus className="h-4 w-4" /> Create New
                </Button>
            </div>

            {resumes.length === 0 ? (
                <Card className="border-dashed py-12">
                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                        <div className="p-4 bg-muted rounded-full">
                            <History className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="text-center">
                            <p className="font-semibold">No resumes found</p>
                            <p className="text-sm text-muted-foreground">You haven't saved any resumes yet.</p>
                        </div>
                        <Button onClick={handleCreateNew} variant="outline">Start Building</Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <Card key={resume.id} className="group hover:border-primary/50 transition-colors">
                            <CardHeader>
                                <CardTitle className="text-lg truncate">{resume.title || resume.data.personalInfo.fullName || "Untitled Resume"}</CardTitle>
                                <CardDescription>
                                    Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1 gap-2 border-primary/20 hover:border-primary/50" onClick={() => handleEdit(resume)}>
                                            <FileEdit className="h-4 w-4" /> Edit
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(resume.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-foreground" onClick={() => handleDuplicate(resume)}>
                                        <Copy className="h-4 w-4" /> Duplicate
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
