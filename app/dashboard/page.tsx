import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  Building2,
  Users,
  CalendarDays,
  CreditCard,
  TrendingUp,
  Plus,
  UserPlus,
  FileText,
  Headphones,
  Clock,
  CheckCircle2,
  Star,
  AlertCircle,
  ArrowUpRight,
  Wifi,
  MapPin,
  Bookmark,
  Shield,
  User,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

export const metadata: Metadata = { title: "Dashboard" };

const ROLE_CONFIG = {
  ADMIN: {
    label: "Admin",
    icon: Shield,
    bg: "bg-purple-50 dark:bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-400",
    ring: "ring-purple-200 dark:ring-purple-500/20",
    description: "Full platform access. Manage users, workspaces, and settings.",
  },
  OWNER: {
    label: "Workspace Owner",
    icon: Building2,
    bg: "bg-brand-50 dark:bg-brand-500/10",
    text: "text-brand-700 dark:text-brand-400",
    ring: "ring-brand-200 dark:ring-brand-500/20",
    description: "List and manage your workspaces. Track visitors and reviews.",
  },
  USER: {
    label: "Member",
    icon: User,
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    ring: "ring-emerald-200 dark:ring-emerald-500/20",
    description: "Discover and bookmark workspaces across Addis Ababa.",
  },
} as const;

const ROLE_STATS = {
  ADMIN: [
    {
      icon: Users,
      label: "Total Users",
      value: "1,284",
      accent: "blue" as const,
      trend: { value: "+12%", direction: "up" as const, label: "vs last month" },
    },
    {
      icon: Building2,
      label: "Listed Spaces",
      value: "312",
      accent: "brand" as const,
      trend: { value: "+5%", direction: "up" as const, label: "vs last month" },
    },
    {
      icon: CalendarDays,
      label: "Bookings Today",
      value: "94",
      accent: "emerald" as const,
      trend: { value: "+18%", direction: "up" as const, label: "vs yesterday" },
    },
    {
      icon: AlertCircle,
      label: "Pending Reviews",
      value: "7",
      accent: "purple" as const,
      trend: { value: "-2", direction: "down" as const, label: "vs yesterday" },
    },
  ],
  OWNER: [
    { icon: Building2, label: "My Spaces", value: "3", accent: "brand" as const, trend: undefined },
    {
      icon: Users,
      label: "Visitors Today",
      value: "48",
      accent: "blue" as const,
      trend: { value: "+22%", direction: "up" as const, label: "vs yesterday" },
    },
    {
      icon: Star,
      label: "Avg. Rating",
      value: "4.8",
      accent: "brand" as const,
      trend: { value: "+0.2", direction: "up" as const, label: "vs last week" },
    },
    {
      icon: TrendingUp,
      label: "Views This Week",
      value: "320",
      accent: "emerald" as const,
      trend: { value: "+15%", direction: "up" as const, label: "vs last week" },
    },
  ],
  USER: [
    {
      icon: MapPin,
      label: "Spaces Nearby",
      value: "24",
      accent: "blue" as const,
      trend: { value: "+3", direction: "up" as const, label: "new this week" },
    },
    { icon: Wifi, label: "Online Now", value: "11", accent: "emerald" as const, trend: undefined },
    {
      icon: Bookmark,
      label: "Saved Spaces",
      value: "6",
      accent: "brand" as const,
      trend: undefined,
    },
    {
      icon: CalendarDays,
      label: "My Bookings",
      value: "2",
      accent: "purple" as const,
      trend: undefined,
    },
  ],
} as const;

const ACTIVITY = [
  {
    icon: UserPlus,
    color: "bg-emerald-500",
    title: "New member joined",
    desc: "Yohannes T. registered as a member",
    time: "2 min ago",
    badge: "Member",
  },
  {
    icon: CalendarDays,
    color: "bg-brand-500",
    title: "Booking confirmed",
    desc: "Kebele Hub – Private Office, 3 hrs",
    time: "18 min ago",
    badge: "Booking",
  },
  {
    icon: CreditCard,
    color: "bg-blue-500",
    title: "Payment received",
    desc: "ETB 1,200 from Fatima A.",
    time: "1 hr ago",
    badge: "Payment",
  },
  {
    icon: Star,
    color: "bg-yellow-500",
    title: "New review posted",
    desc: "4.9 ★ for Bole Creative Space",
    time: "3 hrs ago",
    badge: "Review",
  },
  {
    icon: AlertCircle,
    color: "bg-orange-500",
    title: "Maintenance request",
    desc: "AC issue at Piassa Desk — Room 4",
    time: "5 hrs ago",
    badge: "Maintenance",
  },
  {
    icon: CheckCircle2,
    color: "bg-emerald-500",
    title: "Space approved",
    desc: "Kazanchis Tech Hub is now live",
    time: "Yesterday",
    badge: "Approval",
  },
];

const QUICK_ACTIONS = [
  {
    icon: Plus,
    label: "Add Space",
    desc: "List a workspace",
    iconCn: "text-brand-600 dark:text-brand-400",
    bgCn: "bg-brand-50 dark:bg-brand-500/10",
  },
  {
    icon: UserPlus,
    label: "Invite Member",
    desc: "Send invitation",
    iconCn: "text-emerald-600 dark:text-emerald-400",
    bgCn: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    icon: FileText,
    label: "New Report",
    desc: "Generate insights",
    iconCn: "text-blue-600 dark:text-blue-400",
    bgCn: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    icon: Headphones,
    label: "Support",
    desc: "Contact the team",
    iconCn: "text-purple-600 dark:text-purple-400",
    bgCn: "bg-purple-50 dark:bg-purple-500/10",
  },
];

const WEEKLY_BARS = [
  { day: "Mon", value: 28, max: 50 },
  { day: "Tue", value: 34, max: 50 },
  { day: "Wed", value: 29, max: 50 },
  { day: "Thu", value: 31, max: 50 },
  { day: "Fri", value: 40, max: 50 },
  { day: "Sat", value: 18, max: 50 },
  { day: "Sun", value: 12, max: 50 },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { user } = session;
  const role = (user.role ?? "USER") as keyof typeof ROLE_CONFIG;
  const config = ROLE_CONFIG[role];
  const stats = ROLE_STATS[role];
  const RoleIcon = config.icon;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-dark-0 p-6 sm:p-8 dark:bg-dark-100">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 left-1/2 h-48 w-48 rounded-full bg-brand-600/10 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-400">{getGreeting()} 👋</p>
            <h2 className="text-2xl font-bold text-white">
              {user.name ?? user.email?.split("@")[0] ?? "there"}
            </h2>
            <p className="text-sm text-slate-500">{formatDate()}</p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <div
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 ring-1 ${config.bg} ${config.text} ${config.ring}`}
            >
              <RoleIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">{config.label}</span>
            </div>
            <p className="max-w-xs text-xs text-slate-500 sm:text-right">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ icon, label, value, accent, trend }) => (
          <StatCard
            key={label}
            icon={icon}
            label={label}
            value={value}
            accent={accent}
            trend={trend}
          />
        ))}
      </div>

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity feed */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Recent Activity
              </h3>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                Latest events across the platform
              </p>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <ul className="divide-y divide-slate-50 dark:divide-dark-200">
            {ACTIVITY.map(({ icon: Icon, color, title, desc, time, badge }, i) => (
              <li
                key={i}
                className="flex items-start gap-4 px-5 py-3.5 transition-colors hover:bg-slate-50/60 dark:hover:bg-dark-100/50"
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg shadow-sm ${color}`}
                >
                  <Icon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                    {desc}
                  </p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400">
                    {badge}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                    <Clock className="h-2.5 w-2.5" />
                    {time}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
            <div className="border-b border-slate-100 px-5 py-4 dark:border-dark-200">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Quick Actions
              </h3>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Common tasks</p>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              {QUICK_ACTIONS.map(({ icon: Icon, label, desc, iconCn, bgCn }) => (
                <button
                  key={label}
                  className="group flex flex-col items-start gap-2.5 rounded-xl border border-slate-100 p-3.5 text-left transition-all hover:border-slate-200 hover:shadow-sm dark:border-dark-200 dark:hover:border-dark-300"
                >
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${bgCn}`}
                  >
                    <Icon className={`h-4 w-4 ${iconCn}`} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{label}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Weekly bookings bar chart */}
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">This Week</h3>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  Bookings per day
                </p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  +18%
                </span>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="space-y-2.5">
                {WEEKLY_BARS.map(({ day, value, max }) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-7 text-xs font-medium text-slate-400 dark:text-slate-500">
                      {day}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-dark-200">
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: `${(value / max) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs tabular-nums text-slate-400 dark:text-slate-500">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-dark-100">
                <span className="text-xs text-slate-500 dark:text-slate-400">Total this week</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">192</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
