"use client";

import Link from "next/link";
import { UserNav } from "./UserNav";
import { ThemeSwitcher } from "../theme/ThemeSwitcher";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
    const [user, setUser] = useState<any>(null);
    const [scrolled, setScrolled] = useState(false);
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

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"}`}>
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className="font-semibold text-lg tracking-tight text-foreground">AI Resume Builder</span>
                </Link>
                <nav className="flex items-center gap-1">
                    {user && (
                        <>
                            <Link
                                href="/builder"
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary"
                            >
                                Create Resume
                            </Link>
                            <Link
                                href="/history"
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-full hover:bg-secondary"
                            >
                                History
                            </Link>
                        </>
                    )}
                    <div className="flex items-center gap-1 ml-2">
                        <ThemeSwitcher />
                        <UserNav />
                    </div>
                </nav>
            </div>
        </header>
    );
}
