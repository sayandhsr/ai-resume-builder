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
import { motion } from "framer-motion";

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
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
                <div className="flex items-center justify-center h-64">
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
                        <p className="text-sm text-muted-foreground">Loading your history...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
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
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-16 space-y-12">
            <motion.div
                className="flex items-end justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Resumes</h1>
                    <p className="text-muted-foreground">Manage and edit your previous resumes.</p>
                </div>
                <Button onClick={handleCreateNew} className="gap-2">
                    <Plus className="h-4 w-4" /> Create New
                </Button>
            </motion.div>

            {resumes.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <Card className="border-dashed py-16">
                        <CardContent className="flex flex-col items-center justify-center space-y-6">
                            <div className="p-5 bg-secondary rounded-2xl">
                                <History className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="font-semibold text-lg">No resumes yet</p>
                                <p className="text-sm text-muted-foreground max-w-sm">
                                    You haven&apos;t saved any resumes yet. Create your first one to get started.
                                </p>
                            </div>
                            <Button onClick={handleCreateNew} variant="outline">Start Building</Button>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume, i) => (
                        <motion.div
                            key={resume.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                        >
                            <Card className="group hover:border-foreground/15 transition-all duration-300 hover:shadow-md">
                                <CardHeader>
                                    <CardTitle className="text-base truncate">{resume.title || resume.data.personalInfo.fullName || "Untitled Resume"}</CardTitle>
                                    <CardDescription>
                                        Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={() => handleEdit(resume)}>
                                                <FileEdit className="h-3.5 w-3.5" /> Edit
                                            </Button>
                                            <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(resume.id)}>
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                        <Button variant="ghost" size="sm" className="w-full gap-2 text-muted-foreground hover:text-foreground" onClick={() => handleDuplicate(resume)}>
                                            <Copy className="h-3.5 w-3.5" /> Duplicate
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
