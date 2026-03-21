"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AuthError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to an error reporting service in production
    if (process.env.NODE_ENV === "production") {
      console.error("[Auth Error]", error.digest ?? error.message);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-50 p-4 dark:bg-dark-0">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
        <span className="text-2xl">⚠️</span>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred."}
        </p>
      </div>
      <Button
        variant="secondary"
        icon={<RotateCcw className="h-4 w-4" />}
        iconPosition="left"
        onClick={reset}
      >
        Try again
      </Button>
    </div>
  );
}
