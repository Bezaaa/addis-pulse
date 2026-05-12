import type { Metadata } from "next";
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";

export const metadata: Metadata = { title: "My Bookings" };

const BOOKINGS = [
  {
    id: "BK-003",
    space: "Bole Creative Hub",
    room: "Open Desk",
    location: "Bole, Addis Ababa",
    date: "Today",
    time: "9:00 AM – 12:00 PM",
    duration: "3 hrs",
    amount: "ETB 450",
    status: "upcoming" as const,
    gradient: "from-brand-400 to-brand-600",
  },
  {
    id: "BK-002",
    space: "Kazanchis Tech",
    room: "Private Office",
    location: "Kazanchis",
    date: "Apr 28, 2026",
    time: "1:00 PM – 3:00 PM",
    duration: "2 hrs",
    amount: "ETB 400",
    status: "completed" as const,
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: "BK-001",
    space: "Piassa Desk Co.",
    room: "Open Desk",
    location: "Piassa",
    date: "Apr 20, 2026",
    time: "10:00 AM – 12:00 PM",
    duration: "2 hrs",
    amount: "ETB 240",
    status: "completed" as const,
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    id: "BK-004",
    space: "CMC Hub",
    room: "Meeting Room",
    location: "CMC",
    date: "Apr 15, 2026",
    time: "2:00 PM – 4:00 PM",
    duration: "2 hrs",
    amount: "ETB 260",
    status: "cancelled" as const,
    gradient: "from-slate-400 to-slate-600",
  },
];

const STATUS_CONFIG = {
  upcoming: { variant: "brand" as const, icon: AlertCircle, label: "Upcoming" },
  completed: { variant: "emerald" as const, icon: CheckCircle2, label: "Completed" },
  cancelled: { variant: "red" as const, icon: XCircle, label: "Cancelled" },
};

const TABS = ["All", "Upcoming", "Completed", "Cancelled"];

export default function MyBookingsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Bookings</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your workspace reservation history
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600">
          <Plus className="h-4 w-4" />
          Book a Space
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={CalendarDays} label="Total Bookings" value="4" accent="brand" />
        <StatCard icon={CheckCircle2} label="Completed" value="2" accent="emerald" />
        <StatCard icon={Clock} label="Hours Spent" value="9 hrs" accent="blue" />
      </div>

      {/* Tabs */}
      <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-dark-300 dark:bg-dark-100">
        {TABS.map((tab, i) => (
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

      {/* Booking cards */}
      <div className="space-y-3">
        {BOOKINGS.map((b) => {
          const { variant, label } = STATUS_CONFIG[b.status];
          return (
            <div
              key={b.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50"
            >
              <div className="flex items-stretch gap-0">
                {/* Color strip */}
                <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${b.gradient}`} />

                <div className="flex flex-1 items-center gap-4 px-5 py-4">
                  {/* Space info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900 dark:text-white">{b.space}</p>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{b.id}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{b.room}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {b.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {b.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {b.time}
                      </span>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={variant} dot className="capitalize">
                      {label}
                    </Badge>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{b.amount}</p>
                    {b.status === "completed" && (
                      <button className="text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400">
                        Book again →
                      </button>
                    )}
                    {b.status === "upcoming" && (
                      <button className="text-xs font-medium text-red-500 transition hover:text-red-600 dark:text-red-400">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
