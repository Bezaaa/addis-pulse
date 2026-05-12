import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { User, Bell, Shield, CreditCard } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export const metadata: Metadata = { title: "Settings" };

const NOTIFICATION_PREFS = [
  { label: "New bookings", desc: "When someone books your space", enabled: true },
  { label: "Payment received", desc: "When a payment is processed", enabled: true },
  { label: "New reviews", desc: "When someone reviews your space", enabled: false },
  { label: "Platform updates", desc: "Product news and announcements", enabled: false },
];

const TABS = [
  { icon: User, label: "Profile" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Security" },
  { icon: CreditCard, label: "Billing" },
];

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { user } = session;

  const displayName = user.name ?? user.email?.split("@")[0] ?? "User";

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-5 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-dark-300 dark:bg-dark-100">
        {TABS.map(({ icon: Icon, label }, i) => (
          <button
            key={label}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              i === 0
                ? "bg-white text-slate-900 shadow-sm dark:bg-dark-200 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Profile card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-dark-200">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Profile Information
          </h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            Update your personal details
          </p>
        </div>
        <div className="space-y-6 p-6">
          {/* Avatar row */}
          <div className="flex items-center gap-4">
            <Avatar name={displayName} size="lg" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{displayName}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">{user.email}</p>
            </div>
            <button className="ml-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400 dark:hover:bg-dark-200">
              Change photo
            </button>
          </div>

          {/* Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Full Name", value: user.name ?? "", placeholder: "Your full name" },
              { label: "Email Address", value: user.email ?? "", placeholder: "your@email.com" },
            ].map(({ label, value, placeholder }) => (
              <div key={label}>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {label}
                </label>
                <input
                  defaultValue={value}
                  placeholder={placeholder}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-500/20 dark:border-dark-300 dark:bg-dark-100 dark:text-white dark:placeholder-slate-500 dark:focus:border-brand-500 dark:focus:bg-dark-200"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Role
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 dark:border-dark-300 dark:bg-dark-100">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {user.role ?? "Member"}
              </span>
              <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">
                Cannot be changed
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-dark-200">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400 dark:hover:bg-dark-200">
              Cancel
            </button>
            <button className="rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Notifications card */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
        <div className="border-b border-slate-100 px-6 py-4 dark:border-dark-200">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            Choose what you want to be notified about
          </p>
        </div>
        <div className="divide-y divide-slate-50 dark:divide-dark-200">
          {NOTIFICATION_PREFS.map(({ label, desc, enabled }) => (
            <div key={label} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{desc}</p>
              </div>
              {/* Toggle pill (static UI) */}
              <div
                className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${
                  enabled ? "bg-brand-500" : "bg-slate-200 dark:bg-dark-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
                    enabled ? "right-0.5" : "left-0.5"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
