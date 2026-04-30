import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; direction: "up" | "down" | "neutral"; label?: string };
  accent?: "brand" | "emerald" | "purple" | "blue";
  className?: string;
}

const ACCENTS = {
  brand: { bg: "bg-brand-50 dark:bg-brand-500/10", icon: "text-brand-600 dark:text-brand-400" },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-500/10",
    icon: "text-purple-600 dark:text-purple-400",
  },
  blue: { bg: "bg-blue-50 dark:bg-blue-500/10", icon: "text-blue-600 dark:text-blue-400" },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = "brand",
  className,
}: StatCardProps) {
  const colors = ACCENTS[accent];
  const TrendIcon =
    trend?.direction === "up" ? TrendingUp : trend?.direction === "down" ? TrendingDown : Minus;
  const trendColor =
    trend?.direction === "up"
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
      : trend?.direction === "down"
        ? "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10"
        : "text-slate-400 bg-slate-100 dark:bg-dark-200";

  return (
    <div
      className={cn(
        "group rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md",
        "dark:border-dark-200 dark:bg-dark-50 dark:hover:shadow-black/20",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
            colors.bg
          )}
        >
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
              trendColor
            )}
          >
            <TrendIcon className="h-3 w-3" />
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">{value}</p>
        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{label}</p>
      </div>
      {trend?.label && (
        <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">{trend.label}</p>
      )}
    </div>
  );
}
