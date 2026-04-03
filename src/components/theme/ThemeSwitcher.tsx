"use client";

import * as React from "react";
import { Moon, Sun, Palette, Check } from "lucide-react";
import { useTheme, Theme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const themes: { name: Theme; label: string; icon: string; color: string }[] = [
  { name: "light", label: "Light", icon: "☀️", color: "bg-white" },
  { name: "dark", label: "Dark", icon: "🌙", color: "bg-[#0B0F14]" },
  { name: "midnight", label: "Midnight", icon: "🌌", color: "bg-[#0F172A]" },
  { name: "amoled", label: "AMOLED", icon: "⚫", color: "bg-black" },
  { name: "soft", label: "Soft", icon: "☁️", color: "bg-[#111827]" },
  { name: "purple", label: "Purple", icon: "🟣", color: "bg-[#0F0A1F]" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
          <Palette className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 z-[9999]">
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Choose Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`flex items-center justify-between px-2 py-2 mb-1 rounded-lg cursor-pointer transition-colors
              ${theme === t.name ? "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground" : "hover:bg-muted focus:bg-muted"}
            `}
          >
            <div className="flex items-center gap-3">
              <span className={`w-4 h-4 rounded-full border border-border ${t.color}`} />
              <span className="font-medium text-sm">{t.label}</span>
            </div>
            {theme === t.name && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
