"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, FileText, CheckCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { motion, Variants } from "framer-motion";

export default function Home() {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            {/* Hero Section — Split Layout */}
            <section className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 sm:px-10 lg:px-20 py-20 gap-16 max-w-7xl mx-auto w-full">
                {/* LEFT — Typography */}
                <motion.div
                    className="flex-1 max-w-xl space-y-8"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={fadeUp}
                        custom={0}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium uppercase tracking-wider"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-[#FF5623]" /> AI Powered
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        custom={1}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]"
                    >
                        Build resumes<br />
                        that get you<br />
                        <span className="text-[#FF5623]">hired.</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        custom={2}
                        className="text-lg text-muted-foreground max-w-md leading-relaxed"
                    >
                        Create clean, ATS-optimized professional resumes in minutes. Let AI transform your experience into opportunities.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        custom={3}
                        className="flex flex-col sm:flex-row items-start gap-4 pt-2"
                    >
                        {user ? (
                            <Button size="lg" className="h-14 px-8 text-base gap-2" asChild>
                                <Link href="/builder">
                                    Go to Builder <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        ) : (
                            <Button size="lg" className="h-14 px-8 text-base gap-2" onClick={handleLogin}>
                                Sign In with Google <ArrowRight className="h-4 w-4" />
                            </Button>
                        )}
                        <Button size="lg" variant="outline" className="h-14 px-8 text-base" asChild>
                            <Link href="#features">
                                Learn More
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* RIGHT — Glassmorphism Card */}
                <motion.div
                    className="flex-1 max-w-md w-full"
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#FF5623]/10 via-transparent to-[#FF5623]/5 rounded-[28px] blur-2xl opacity-60" />

                        <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[20px] border border-white/20 dark:border-white/10 shadow-2xl p-10 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                                    Get started free
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Sign in to create your first resume
                                </p>
                            </div>

                            {user ? (
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Welcome back, <span className="text-foreground font-medium">{user.email}</span>
                                    </p>
                                    <Button className="w-full h-12 text-base gap-2" asChild>
                                        <Link href="/builder">
                                            Open Builder <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Button
                                        onClick={handleLogin}
                                        variant="outline"
                                        className="w-full h-12 text-base gap-3 bg-white dark:bg-white/10 border-border hover:bg-secondary"
                                    >
                                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                        </svg>
                                        Continue with Google
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        Free forever. No credit card required.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-24">
                <motion.div
                    className="text-center mb-16 space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                        Everything you need
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Professional tools to create resumes that stand out
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Sparkles className="h-5 w-5" />,
                            title: "AI Optimization",
                            description: "Instantly rewrite your job descriptions into impactful, professional bullet points tailored to your sector.",
                        },
                        {
                            icon: <CheckCircle className="h-5 w-5" />,
                            title: "ATS-Friendly",
                            description: "Generate designs and structures specifically tested to pass through automated Applicant Tracking Systems.",
                        },
                        {
                            icon: <FileText className="h-5 w-5" />,
                            title: "PDF Export",
                            description: "Preview your resume live as you build it, and export directly to a flawless PDF file ready to send.",
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-foreground/10 hover:shadow-lg"
                        >
                            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center mb-6 text-foreground group-hover:bg-[#FF5623]/10 group-hover:text-[#FF5623] transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-foreground tracking-tight">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
