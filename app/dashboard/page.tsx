import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import type { Metadata } from "next";
import {
  Zap,
  User,
  Shield,
  Building2,
  Mail,
  Hash,
  CheckCircle2,
  LogOut,
  MapPin,
  Wifi,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = { title: "Dashboard" };

// ── Role badge ────────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  ADMIN: {
    label: "Admin",
    icon: Shield,
    bg: "bg-purple-50 dark:bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-400",
    ring: "ring-purple-200 dark:ring-purple-500/20",
    dot: "bg-purple-500",
    description: "Full platform access. Manage users, workspaces, and settings.",
  },
  OWNER: {
    label: "Workspace Owner",
    icon: Building2,
    bg: "bg-brand-50 dark:bg-brand-500/10",
    text: "text-brand-700 dark:text-brand-400",
    ring: "ring-brand-200 dark:ring-brand-500/20",
    dot: "bg-brand-500",
    description: "List and manage your workspaces. Track visitors and reviews.",
  },
  USER: {
    label: "Member",
    icon: User,
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    ring: "ring-emerald-200 dark:ring-emerald-500/20",
    dot: "bg-emerald-500",
    description: "Discover and bookmark workspaces across Addis Ababa.",
  },
} as const;

// ── Mock stats per role ───────────────────────────────────────────────────────
const ROLE_STATS = {
  ADMIN: [
    { icon: User, label: "Total Users", value: "1,284" },
    { icon: Building2, label: "Listed Spaces", value: "312" },
    { icon: TrendingUp, label: "Active Today", value: "94" },
    { icon: Shield, label: "Pending Reviews", value: "7" },
  ],
  OWNER: [
    { icon: Building2, label: "My Spaces", value: "3" },
    { icon: User, label: "Visitors Today", value: "48" },
    { icon: Wifi, label: "Avg. Rating", value: "4.8" },
    { icon: TrendingUp, label: "Views This Week", value: "320" },
  ],
  USER: [
    { icon: MapPin, label: "Spaces Nearby", value: "24" },
    { icon: Wifi, label: "Online Now", value: "11" },
    { icon: Building2, label: "Saved Spaces", value: "6" },
    { icon: TrendingUp, label: "New This Week", value: "4" },
  ],
} as const;

// ── Sign-out action ───────────────────────────────────────────────────────────
async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { user } = session;
  const role = (user.role ?? "USER") as keyof typeof ROLE_CONFIG;
  const config = ROLE_CONFIG[role];
  const stats = ROLE_STATS[role];
  const RoleIcon = config.icon;

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-0">
      {/* ── Top nav ── */}
      <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-dark-200 dark:bg-dark-50/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-sm shadow-brand-500/30">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Addis Pulse</span>
            <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400 sm:block">
              Dashboard
            </span>
          </div>

          <form action={handleSignOut}>
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-red-600 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400 dark:hover:bg-dark-200 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* ── Welcome banner ── */}
        <div className="relative overflow-hidden rounded-2xl bg-dark-0 p-8 dark:bg-dark-50">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-brand-600/10 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Welcome back</p>
              <h1 className="text-2xl font-bold text-white">{user.name ?? user.email}</h1>
              <p className="text-sm text-slate-400">{config.description}</p>
            </div>
            <div
              className={`inline-flex items-center gap-2 self-start rounded-xl px-4 py-2.5 ring-1 sm:self-auto ${config.bg} ${config.text} ${config.ring}`}
            >
              <RoleIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">{config.label}</span>
            </div>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-dark-200 dark:bg-dark-50"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-dark-200">
                  <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* ── Session info card ── */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
          <div className="border-b border-slate-100 px-6 py-4 dark:border-dark-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                Authentication verified
              </h2>
              <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                Active session
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-dark-200">
            {[
              { icon: Hash, label: "User ID", value: user.id, mono: true },
              { icon: User, label: "Name", value: user.name ?? "—", mono: false },
              { icon: Mail, label: "Email", value: user.email ?? "—", mono: false },
              { icon: RoleIcon, label: "Role", value: role, mono: true },
            ].map(({ icon: Icon, label, value, mono }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-3.5">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-dark-200">
                  <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-slate-400 dark:text-slate-500">{label}</p>
                  <p
                    className={`mt-0.5 truncate text-sm font-medium text-slate-800 dark:text-slate-200 ${mono ? "font-mono" : ""}`}
                  >
                    {value}
                  </p>
                </div>
                {label === "Role" && (
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${config.bg} ${config.text} ${config.ring}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                    {config.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Role-specific notice ── */}
        {role === "OWNER" && (
          <div className="flex items-start gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-5 dark:border-brand-500/20 dark:bg-brand-500/10">
            <Building2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600 dark:text-brand-400" />
            <div>
              <p className="text-sm font-semibold text-brand-700 dark:text-brand-400">
                Owner access confirmed
              </p>
              <p className="mt-0.5 text-sm text-brand-600/80 dark:text-brand-400/70">
                You can list and manage workspaces. The /owner routes are accessible to your
                account.
              </p>
            </div>
          </div>
        )}

        {role === "ADMIN" && (
          <div className="flex items-start gap-4 rounded-2xl border border-purple-200 bg-purple-50 p-5 dark:border-purple-500/20 dark:bg-purple-500/10">
            <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                Admin access confirmed
              </p>
              <p className="mt-0.5 text-sm text-purple-600/80 dark:text-purple-400/70">
                You have full platform access. All routes including /owner and /admin are
                accessible.
              </p>
            </div>
          </div>
        )}

        {role === "USER" && (
          <div className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Member access confirmed
              </p>
              <p className="mt-0.5 text-sm text-emerald-600/80 dark:text-emerald-400/70">
                You are signed in and can browse all public workspaces across Addis Ababa.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
