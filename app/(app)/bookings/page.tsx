import type { Metadata } from "next";
import { CalendarDays, Clock, Plus, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";

export const metadata: Metadata = { title: "Bookings" };

const BOOKINGS = [
  {
    id: "BK-001",
    member: "Yohannes T.",
    space: "Bole Creative Hub",
    room: "Open Desk",
    date: "Today, 9:00 AM",
    duration: "3 hrs",
    amount: "ETB 450",
    status: "confirmed" as const,
  },
  {
    id: "BK-002",
    member: "Fatima A.",
    space: "Kazanchis Tech",
    room: "Private Office",
    date: "Today, 1:00 PM",
    duration: "2 hrs",
    amount: "ETB 400",
    status: "confirmed" as const,
  },
  {
    id: "BK-003",
    member: "Biruk M.",
    space: "Bole Creative Hub",
    room: "Meeting Room",
    date: "Today, 3:00 PM",
    duration: "1 hr",
    amount: "ETB 200",
    status: "pending" as const,
  },
  {
    id: "BK-004",
    member: "Selam H.",
    space: "Piassa Desk",
    room: "Open Desk",
    date: "Tomorrow, 8:00 AM",
    duration: "4 hrs",
    amount: "ETB 480",
    status: "confirmed" as const,
  },
  {
    id: "BK-005",
    member: "Abebe K.",
    space: "Kazanchis Tech",
    room: "Lounge",
    date: "Tomorrow, 2:00 PM",
    duration: "2 hrs",
    amount: "ETB 300",
    status: "pending" as const,
  },
  {
    id: "BK-006",
    member: "Tigist W.",
    space: "Bole Creative Hub",
    room: "Open Desk",
    date: "May 14, 10:00 AM",
    duration: "5 hrs",
    amount: "ETB 750",
    status: "cancelled" as const,
  },
];

const STATUS_CONFIG = {
  confirmed: { variant: "emerald" as const, icon: CheckCircle2, label: "Confirmed" },
  pending: { variant: "orange" as const, icon: AlertCircle, label: "Pending" },
  cancelled: { variant: "red" as const, icon: XCircle, label: "Cancelled" },
};

export default function BookingsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Bookings</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track and manage all workspace reservations
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600">
          <Plus className="h-4 w-4" />
          New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Total Today"
          value="37"
          accent="brand"
          trend={{ value: "+18%", direction: "up", label: "vs yesterday" }}
        />
        <StatCard icon={CheckCircle2} label="Confirmed" value="28" accent="emerald" />
        <StatCard
          icon={AlertCircle}
          label="Pending"
          value="9"
          accent="purple"
          trend={{ value: "needs action", direction: "neutral" }}
        />
      </div>

      {/* Tabs */}
      <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-dark-300 dark:bg-dark-100">
        {["Today", "Tomorrow", "This Week", "All"].map((tab, i) => (
          <button
            key={tab}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${
              i === 0
                ? "bg-white text-slate-900 shadow-sm dark:bg-dark-200 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
        <div className="border-b border-slate-100 px-5 py-3 dark:border-dark-200">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            6 bookings
          </p>
        </div>
        {BOOKINGS.map((b) => {
          const { variant, label } = STATUS_CONFIG[b.status];
          return (
            <div
              key={b.id}
              className="flex items-center gap-4 border-b border-slate-50 px-5 py-4 last:border-0 transition-colors hover:bg-slate-50/60 dark:border-dark-200 dark:hover:bg-dark-100/50"
            >
              <Avatar name={b.member} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{b.member}</p>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{b.id}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {b.space} · {b.room}
                </p>
              </div>
              <div className="hidden text-right sm:block">
                <p className="flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                  {b.date}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                  <Clock className="h-3 w-3" />
                  {b.duration}
                </p>
              </div>
              <p className="hidden text-sm font-semibold text-slate-900 dark:text-white lg:block">
                {b.amount}
              </p>
              <Badge variant={variant} dot className="capitalize">
                {label}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
