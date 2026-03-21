import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, prefix, suffix, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {prefix && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined
            }
            className={cn(
              "w-full rounded-xl border bg-white text-sm text-slate-900 shadow-sm placeholder-slate-400",
              "transition-all duration-150",
              "focus:outline-none focus:ring-2 focus:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "dark:bg-dark-100 dark:text-slate-100 dark:placeholder-slate-500",
              error
                ? "border-red-400 focus:ring-red-400 dark:border-red-500"
                : "border-slate-200 hover:border-slate-300 focus:border-transparent focus:ring-brand-500 dark:border-dark-300 dark:hover:border-dark-400",
              prefix ? "pl-10" : "px-4",
              suffix ? "pr-11 py-2.5" : "px-4 py-2.5",
              className
            )}
            {...props}
          />

          {suffix && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">{suffix}</div>
          )}
        </div>

        {hint && !error && (
          <p id={hintId} className="text-xs text-slate-500 dark:text-slate-400">
            {hint}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
          >
            <span className="h-1 w-1 flex-shrink-0 rounded-full bg-current" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
