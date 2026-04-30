"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  CalendarDays,
  CreditCard,
  BarChart3,
  Settings,
  Zap,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { handleSignOut } from "@/actions/sign-out";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/dashboard/spaces", icon: Building2, label: "Spaces", exact: false },
  { href: "/dashboard/members", icon: Users, label: "Members", exact: false },
  { href: "/dashboard/bookings", icon: CalendarDays, label: "Bookings", exact: false },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payments", exact: false },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", exact: false },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  user: { name?: string | null; email?: string | null; role?: string | null };
}

function NavItem({
  href,
  icon: Icon,
  label,
  exact,
  pathname,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  exact: boolean;
  pathname: string;
  onClick: () => void;
}) {
  const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
        isActive
          ? "bg-brand-500 text-white shadow-sm shadow-brand-500/30"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-dark-200 dark:hover:text-white"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 flex-shrink-0 transition-colors",
          isActive
            ? "text-white"
            : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
        )}
      />
      <span className="flex-1 truncate">{label}</span>
      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white/70" />}
    </Link>
  );
}

export function Sidebar({ open, onClose, user }: SidebarProps) {
  const pathname = usePathname();
  const initial = (user.name ?? user.email ?? "U")[0].toUpperCase();
  const displayName = user.name ?? user.email?.split("@")[0] ?? "User";
  const roleLabel = user.role ? user.role[0] + user.role.slice(1).toLowerCase() : "Member";

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-60 flex-col",
          "border-r border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50",
          "transition-transform duration-200 ease-in-out",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5 dark:border-dark-200">
          <Link href="/dashboard" onClick={onClose} className="group flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-sm shadow-brand-500/40 transition-shadow group-hover:shadow-brand-500/60">
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">
                Addis Pulse
              </p>
              <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">Workspace</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-dark-200 dark:hover:text-slate-300 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
            Main Menu
          </p>
          <div className="space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} {...item} pathname={pathname} onClick={onClose} />
            ))}
          </div>

          <div className="mt-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
              System
            </p>
            <NavItem
              href="/dashboard/settings"
              icon={Settings}
              label="Settings"
              exact={false}
              pathname={pathname}
              onClick={onClose}
            />
          </div>
        </nav>

        {/* User card */}
        <div className="border-t border-slate-100 p-3 dark:border-dark-200">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-dark-100">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white shadow-sm shadow-brand-500/30">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {displayName}
              </p>
              <p className="truncate text-xs text-slate-400 dark:text-slate-500">{roleLabel}</p>
            </div>
            <form action={handleSignOut}>
              <button
                type="submit"
                title="Sign out"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      </aside>
    </>
  );
}
