"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ResumeBuilderStepper } from "@/components/forms/ResumeBuilderStepper";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { AIOptimizer } from "@/components/forms/AIOptimizer";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function BuilderPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/");
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        checkUser();
    }, [supabase, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-muted-foreground">Checking authentication...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Resume Builder</h1>
                <p className="text-muted-foreground">Fill in your details below. You can preview changes instantly.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start w-full relative">
                {/* Left Side: Input Form */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <ResumeBuilderStepper />
                    <AIOptimizer />
                </div>

                {/* Right Side: Live Preview (Fixed while scrolling left) */}
                <div className="w-full lg:w-1/2 sticky top-24">
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
}
