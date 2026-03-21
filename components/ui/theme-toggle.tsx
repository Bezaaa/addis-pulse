"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full",
        "border border-slate-200 bg-white text-slate-500 shadow-sm",
        "transition hover:bg-slate-50 hover:text-slate-700",
        "dark:border-slate-700 dark:bg-dark-100 dark:text-slate-400",
        "dark:hover:bg-dark-200 dark:hover:text-slate-200",
        className
      )}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
