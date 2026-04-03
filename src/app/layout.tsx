import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI ATS Resume Builder",
  description: "Create modern, ATS-optimized professional resumes with AI.",
};

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased flex flex-col`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <div className="relative z-0 flex whitespace-normal flex-col flex-1">
            <MainLayout>{children}</MainLayout>
            <Toaster position="top-right" richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
