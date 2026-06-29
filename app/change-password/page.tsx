"use client";

import { useActionState } from "react";
import { changePassword } from "@/actions/change-password";
import { ShieldAlert, Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-dark-0">
      <div className="w-full max-w-md space-y-6">
        {/* Logo / brand mark */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 shadow-lg shadow-brand-500/30">
            <KeyRound className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Set a new password</h1>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            This is a one-time step before you can access your dashboard.
          </p>
        </div>

        {/* Warning banner */}
        <div className="flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-500/20 dark:bg-orange-500/10">
          <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" />
          <p className="text-sm text-orange-700 dark:text-orange-400">
            Your account was created with a temporary password. Choose a strong password to
            continue.
          </p>
        </div>

        {/* Form */}
        <form action={action} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              New password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPw ? "text" : "password"}
                required
                minLength={8}
                placeholder="Min. 8 characters"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-dark-300 dark:bg-dark-100 dark:text-white dark:placeholder-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm password
            </label>
            <div className="relative">
              <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                required
                placeholder="Repeat your new password"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20 dark:border-dark-300 dark:bg-dark-100 dark:text-white dark:placeholder-slate-500 dark:focus:border-brand-500 dark:focus:ring-brand-500/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {state?.error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600 disabled:opacity-60"
          >
            {pending ? "Saving…" : "Set password & continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
