"use client";

import { usePathname } from "next/navigation";
import { Menu, Search, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/dashboard": { title: "Dashboard", description: "Your workspace overview" },
  // Owner pages
  "/dashboard/spaces": { title: "My Spaces", description: "Manage your workspace listings" },
  "/dashboard/bookings": { title: "Bookings", description: "Track all reservations" },
  "/dashboard/payments": { title: "Payments", description: "Billing and transactions" },
  "/dashboard/analytics": { title: "Analytics", description: "Performance insights" },
  // User pages
  "/dashboard/discover": { title: "Discover", description: "Find your next workspace" },
  "/dashboard/my-bookings": { title: "My Bookings", description: "Your reservation history" },
  "/dashboard/saved": { title: "Saved Spaces", description: "Your favorited workspaces" },
  // Admin pages
  "/dashboard/members": { title: "Members", description: "View and manage all users" },
  // Shared
  "/dashboard/settings": { title: "Settings", description: "Account and preferences" },
};

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const page = PAGE_META[pathname] ?? { title: "Dashboard", description: "" };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-md dark:border-dark-200 dark:bg-dark-50/90 lg:px-6">
      <button
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-dark-200 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden sm:block">
        <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">
          {page.title}
        </p>
        {page.description && (
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{page.description}</p>
        )}
      </div>
      <p className="text-sm font-bold text-slate-900 dark:text-white sm:hidden">{page.title}</p>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition hover:border-slate-300 dark:border-dark-300 dark:bg-dark-100 dark:hover:border-dark-400 md:flex">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Search anything…</span>
          <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-dark-300 dark:bg-dark-200">
            ⌘K
          </kbd>
        </div>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400 dark:hover:bg-dark-200">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-500 ring-1 ring-white dark:ring-dark-50" />
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
