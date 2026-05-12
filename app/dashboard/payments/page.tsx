import type { Metadata } from "next";
import { CreditCard, Download, TrendingUp, ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";

export const metadata: Metadata = { title: "Payments" };

const TRANSACTIONS = [
  {
    member: "Yohannes Tadesse",
    desc: "Bole Creative Hub – Open Desk, 3 hrs",
    amount: "+ETB 450",
    type: "credit",
    date: "Today, 9:00 AM",
    status: "completed" as const,
  },
  {
    member: "Fatima Ahmed",
    desc: "Kazanchis Tech – Private Office",
    amount: "+ETB 400",
    type: "credit",
    date: "Today, 1:00 PM",
    status: "completed" as const,
  },
  {
    member: "Biruk Mekonnen",
    desc: "Bole Creative Hub – Meeting Room",
    amount: "+ETB 200",
    type: "credit",
    date: "Today, 3:00 PM",
    status: "pending" as const,
  },
  {
    member: "Selam Haile",
    desc: "Piassa Desk – Open Desk, 4 hrs",
    amount: "+ETB 480",
    type: "credit",
    date: "Yesterday, 8:00 AM",
    status: "completed" as const,
  },
  {
    member: "Platform",
    desc: "Maintenance fee — April 2026",
    amount: "-ETB 2,500",
    type: "debit",
    date: "May 01, 2026",
    status: "completed" as const,
  },
  {
    member: "Abebe Kebede",
    desc: "Kazanchis Tech – Lounge, 2 hrs",
    amount: "+ETB 300",
    type: "credit",
    date: "Apr 30, 2026",
    status: "completed" as const,
  },
];

const STATUS_BADGE: Record<string, "emerald" | "orange" | "red"> = {
  completed: "emerald",
  pending: "orange",
  failed: "red",
};

export default function PaymentsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Payments</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Revenue, transactions, and billing history
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-300 dark:hover:bg-dark-200">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={TrendingUp}
          label="Total Revenue"
          value="ETB 48.2K"
          accent="brand"
          trend={{ value: "+22%", direction: "up", label: "vs last month" }}
        />
        <StatCard
          icon={CreditCard}
          label="This Month"
          value="ETB 12.8K"
          accent="emerald"
          trend={{ value: "+8%", direction: "up", label: "vs last month" }}
        />
        <StatCard icon={ArrowUpRight} label="Pending" value="ETB 680" accent="purple" />
      </div>

      {/* Transactions */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Recent Transactions
          </p>
          <button className="flex items-center gap-1 text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
            View all <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>

        {TRANSACTIONS.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-slate-50 px-5 py-4 last:border-0 transition-colors hover:bg-slate-50/60 dark:border-dark-200 dark:hover:bg-dark-100/50"
          >
            <Avatar name={t.member} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {t.member}
              </p>
              <p className="mt-0.5 truncate text-xs text-slate-400 dark:text-slate-500">{t.desc}</p>
            </div>
            <p className="hidden text-xs text-slate-400 dark:text-slate-500 sm:block">{t.date}</p>
            <Badge variant={STATUS_BADGE[t.status]} dot className="hidden capitalize sm:flex">
              {t.status}
            </Badge>
            <p
              className={`text-sm font-bold tabular-nums ${
                t.type === "credit"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {t.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
