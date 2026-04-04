"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ResumeBuilderStepper } from "@/components/forms/ResumeBuilderStepper";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { AIOptimizer } from "@/components/forms/AIOptimizer";
import { Reveal } from "@/components/ui/reveal";
import { motion } from "framer-motion";

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
                <div className="h-8 w-8 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
            {/* Left Side: Form — 45% */}
            <div className="w-full lg:w-[45%] overflow-y-auto bg-background">
                <div className="max-w-2xl mx-auto px-6 sm:px-8 lg:px-10 py-12 space-y-8">
                    <Reveal>
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                                Resume Builder
                            </h1>
                            <p className="text-muted-foreground text-base leading-relaxed">
                                Fill in your details below. Preview changes instantly on the right.
                            </p>
                        </motion.div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <ResumeBuilderStepper />
                    </Reveal>

                    <Reveal delay={0.15}>
                        <AIOptimizer />
                    </Reveal>
                </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-border" />

            {/* Right Side: Preview — 55% */}
            <div className="w-full lg:w-[55%] lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto bg-secondary/50 dark:bg-card/30">
                <div className="p-8 lg:p-12 flex items-start justify-center min-h-full">
                    <Reveal delay={0.2}>
                        <div className="w-full max-w-[640px]">
                            <ResumePreview />
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
}
