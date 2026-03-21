import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  value: "USER" | "OWNER";
  selected: boolean;
  disabled: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  fieldProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export function RoleCard({
  value,
  selected,
  disabled,
  title,
  description,
  icon,
  fieldProps,
}: RoleCardProps) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer flex-col gap-3 rounded-2xl border-2 p-4 transition-all duration-150 select-none",
        disabled && "cursor-not-allowed opacity-50",
        selected
          ? "border-brand-500 bg-brand-50 shadow-sm shadow-brand-500/10 dark:bg-brand-500/10 dark:border-brand-500"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:hover:border-dark-400 dark:hover:bg-dark-200"
      )}
    >
      <input type="radio" value={value} disabled={disabled} className="sr-only" {...fieldProps} />

      {/* Selection ring */}
      <div
        className={cn(
          "absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all",
          selected ? "border-brand-500 bg-brand-500" : "border-slate-300 dark:border-dark-400"
        )}
      >
        {selected && <CheckCircle2 className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </div>

      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
          selected
            ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
            : "bg-slate-100 text-slate-500 dark:bg-dark-200 dark:text-slate-400"
        )}
      >
        {icon}
      </div>

      <div>
        <p
          className={cn(
            "text-sm font-semibold leading-tight",
            selected ? "text-brand-700 dark:text-brand-400" : "text-slate-700 dark:text-slate-300"
          )}
        >
          {title}
        </p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-500">
          {description}
        </p>
      </div>
    </label>
  );
}
