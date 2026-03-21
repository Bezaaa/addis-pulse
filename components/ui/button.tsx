import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles shared by all variants
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-500 text-white shadow-md shadow-brand-500/30 hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/40 focus-visible:ring-brand-500 dark:focus-visible:ring-offset-dark-0",
        secondary:
          "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-300 dark:hover:bg-dark-200 dark:focus-visible:ring-offset-dark-0",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400 dark:text-slate-400 dark:hover:bg-dark-200 dark:hover:text-slate-200",
        outline:
          "border border-brand-500 text-brand-600 hover:bg-brand-50 focus-visible:ring-brand-500 dark:text-brand-400 dark:hover:bg-brand-500/10",
        danger: "bg-red-500 text-white shadow-sm hover:bg-red-600 focus-visible:ring-red-500",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-11 px-6 text-sm",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  /** Icon rendered before the label (or after if iconPosition="right") */
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      icon,
      iconPosition = "right",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === "left" && <span aria-hidden="true">{icon}</span>}
        {children}
        {!loading && icon && iconPosition === "right" && (
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:translate-x-0.5"
          >
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
