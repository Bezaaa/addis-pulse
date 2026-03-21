import Link from "next/link";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface AuthHeaderProps {
  /** Prompt text shown before the CTA button (hidden on mobile) */
  promptText: string;
  cta: { label: string; href: string };
}

export function AuthHeader({ promptText, cta }: AuthHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-5 lg:px-10">
      {/* Mobile logo */}
      <Link href="/" className="flex items-center gap-2.5 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
          <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-slate-900 dark:text-white">Addis Pulse</span>
      </Link>

      {/* Desktop spacer */}
      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
          {promptText}
        </span>
        <Link
          href={cta.href}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-300 dark:hover:bg-dark-200"
        >
          {cta.label}
        </Link>
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
