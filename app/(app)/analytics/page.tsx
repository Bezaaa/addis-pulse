import type { Metadata } from "next";
import { BarChart3, TrendingUp, Users, Building2 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

export const metadata: Metadata = { title: "Analytics" };

const MONTHLY_DATA = [
  { month: "Nov", bookings: 145 },
  { month: "Dec", bookings: 189 },
  { month: "Jan", bookings: 162 },
  { month: "Feb", bookings: 198 },
  { month: "Mar", bookings: 224 },
  { month: "Apr", bookings: 267 },
];

const TOP_SPACES = [
  { name: "Bole Creative Hub", bookings: 94, revenue: "ETB 18,400", growth: "+24%" },
  { name: "Kazanchis Tech Space", bookings: 78, revenue: "ETB 15,600", growth: "+18%" },
  { name: "Piassa Desk Co.", bookings: 61, revenue: "ETB 11,200", growth: "+12%" },
  { name: "Megenagna Workspace", bookings: 34, revenue: "ETB 7,000", growth: "+8%" },
];

const MAX = Math.max(...MONTHLY_DATA.map((d) => d.bookings));
const BAR_MAX_PX = 96;

export default function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Platform performance and insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value="ETB 265K"
          accent="brand"
          trend={{ value: "+22%", direction: "up", label: "vs last period" }}
        />
        <StatCard
          icon={BarChart3}
          label="Total Bookings"
          value="1,185"
          accent="blue"
          trend={{ value: "+31%", direction: "up", label: "vs last period" }}
        />
        <StatCard
          icon={Users}
          label="Avg. Daily Users"
          value="89"
          accent="emerald"
          trend={{ value: "+15%", direction: "up", label: "vs last period" }}
        />
        <StatCard
          icon={Building2}
          label="Space Occupancy"
          value="74%"
          accent="purple"
          trend={{ value: "+5%", direction: "up", label: "vs last period" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bar chart */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Booking Trends
              </h3>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                Monthly bookings — last 6 months
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-brand-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">Bookings</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-end justify-around gap-2" style={{ height: "132px" }}>
              {MONTHLY_DATA.map(({ month, bookings }) => {
                const barH = Math.round((bookings / MAX) * BAR_MAX_PX);
                return (
                  <div key={month} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {bookings}
                    </span>
                    <div
                      className="w-full rounded-t-lg bg-brand-500 transition-all duration-700"
                      style={{ height: `${barH}px` }}
                    />
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top spaces */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
          <div className="border-b border-slate-100 px-5 py-4 dark:border-dark-200">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Top Spaces</h3>
            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
              By bookings this month
            </p>
          </div>
          <div className="divide-y divide-slate-50 dark:divide-dark-200">
            {TOP_SPACES.map(({ name, bookings, revenue, growth }, i) => (
              <div key={name} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-dark-200 dark:text-slate-300">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {name}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">
                    {bookings} bookings · {revenue}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {growth}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
