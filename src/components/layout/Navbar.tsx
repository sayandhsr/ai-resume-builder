"use client";

import Link from "next/link";
import { UserNav } from "./UserNav";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border dark:border-[#1F2937] bg-white/95 dark:bg-[#111827]/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111827]/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl tracking-tight">AI Resume Builder</span>
                </Link>
                <nav className="flex items-center space-x-6">
                    {user && (
                        <>
                            <Link href="/builder" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Create Resume
                            </Link>
                            <Link href="/history" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                History
                            </Link>
                        </>
                    )}
                    <UserNav />
                    <ThemeSwitcher />
                </nav>
            </div>
        </header>
    );
}
