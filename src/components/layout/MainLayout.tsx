import { Navbar } from "@/components/layout/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen flex-col text-foreground">
            <Navbar />
            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    );
}
