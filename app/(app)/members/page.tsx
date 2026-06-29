import type { Metadata } from "next";
import { UserPlus, Search, Users, UserCheck, Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";

export const metadata: Metadata = { title: "Members" };

const MEMBERS = [
  {
    name: "Yohannes Tadesse",
    email: "ytadesse@email.com",
    role: "Member",
    space: "Bole Creative Hub",
    joined: "Apr 28, 2026",
    status: "active" as const,
    bookings: 12,
  },
  {
    name: "Fatima Ahmed",
    email: "fahmed@email.com",
    role: "Member",
    space: "Kazanchis Tech Space",
    joined: "Apr 20, 2026",
    status: "active" as const,
    bookings: 8,
  },
  {
    name: "Dawit Bekele",
    email: "dbekele@email.com",
    role: "Owner",
    space: "Piassa Desk Co.",
    joined: "Mar 15, 2026",
    status: "active" as const,
    bookings: 3,
  },
  {
    name: "Selam Haile",
    email: "shaile@email.com",
    role: "Member",
    space: "—",
    joined: "Apr 30, 2026",
    status: "inactive" as const,
    bookings: 0,
  },
  {
    name: "Biruk Mekonnen",
    email: "bmekonnen@email.com",
    role: "Member",
    space: "Bole Creative Hub",
    joined: "Apr 10, 2026",
    status: "active" as const,
    bookings: 5,
  },
  {
    name: "Hiwot Girma",
    email: "hgirma@email.com",
    role: "Admin",
    space: "—",
    joined: "Jan 01, 2026",
    status: "active" as const,
    bookings: 0,
  },
];

const STATUS_BADGE: Record<string, "emerald" | "default"> = {
  active: "emerald",
  inactive: "default",
};

const ROLE_BADGE: Record<string, "purple" | "brand" | "default"> = {
  Admin: "purple",
  Owner: "brand",
  Member: "default",
};

export default function MembersPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Members</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            All registered users and their activity
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Users} label="Total Members" value="1,284" accent="blue" />
        <StatCard
          icon={UserCheck}
          label="Active Today"
          value="94"
          accent="emerald"
          trend={{ value: "+18%", direction: "up", label: "vs yesterday" }}
        />
        <StatCard
          icon={Sparkles}
          label="New This Week"
          value="23"
          accent="brand"
          trend={{ value: "+12%", direction: "up", label: "vs last week" }}
        />
      </div>

      {/* Search + filter */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 dark:border-dark-300 dark:bg-dark-100">
          <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
          <input
            placeholder="Search members…"
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500"
          />
        </div>
        <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-dark-300 dark:bg-dark-100">
          {["All", "Active", "Inactive"].map((tab, i) => (
            <button
              key={tab}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                i === 0
                  ? "bg-white text-slate-900 shadow-sm dark:bg-dark-200 dark:text-white"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
        {/* Table header */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-slate-100 px-5 py-3 dark:border-dark-200">
          <div className="w-9" />
          {["Member", "Preferred Space", "Bookings", "Role", "Status"].map((h) => (
            <p
              key={h}
              className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500"
            >
              {h}
            </p>
          ))}
        </div>

        {/* Rows */}
        {MEMBERS.map((m) => (
          <div
            key={m.email}
            className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-slate-50 px-5 py-3.5 last:border-0 transition-colors hover:bg-slate-50/60 dark:border-dark-200 dark:hover:bg-dark-100/50"
          >
            <Avatar name={m.name} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {m.name}
              </p>
              <p className="truncate text-xs text-slate-400 dark:text-slate-500">{m.email}</p>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{m.space}</p>
            <p className="tabular-nums text-sm font-medium text-slate-900 dark:text-white">
              {m.bookings}
            </p>
            <Badge variant={ROLE_BADGE[m.role]}>{m.role}</Badge>
            <Badge variant={STATUS_BADGE[m.status]} dot className="capitalize">
              {m.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
