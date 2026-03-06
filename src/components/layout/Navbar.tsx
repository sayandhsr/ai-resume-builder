import Link from "next/link";
import { Copyleft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                        <Copyleft className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">AI Resume Builder</span>
                </Link>
                <nav className="flex items-center space-x-6">
                    <Link href="/builder" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Create Resume
                    </Link>
                    <Button>Get Started</Button>
                </nav>
            </div>
        </header>
    );
}
