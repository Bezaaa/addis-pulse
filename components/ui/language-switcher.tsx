"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { setLocale } from "@/actions/locale";
import { type Locale } from "@/i18n/request";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

const LABELS: Record<Locale, { label: string; ariaLabel: string }> = {
  en: { label: "EN", ariaLabel: "Switch to Amharic" },
  am: { label: "አማ", ariaLabel: "Switch to English" },
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const next: Locale = locale === "en" ? "am" : "en";
  const { label, ariaLabel } = LABELS[locale];

  return (
    <button
      onClick={() => startTransition(() => setLocale(next))}
      disabled={isPending}
      aria-label={ariaLabel}
      className={cn(
        "flex h-9 min-w-[2.25rem] items-center justify-center rounded-full px-2",
        "border border-slate-200 bg-white text-xs font-semibold text-slate-600 shadow-sm",
        "transition hover:bg-slate-50 hover:text-slate-800",
        "dark:border-slate-700 dark:bg-dark-100 dark:text-slate-300",
        "dark:hover:bg-dark-200 dark:hover:text-slate-100",
        "disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
    >
      {isPending ? (
        <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
      ) : (
        label
      )}
    </button>
  );
}
