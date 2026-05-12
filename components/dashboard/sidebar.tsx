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
  Compass,
  Bookmark,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { handleSignOut } from "@/actions/sign-out";

// ── Role-based nav configs ─────────────────────────────────────────────────
type NavItem = {
  href: string;
  icon: React.ElementType;
  label: string;
  exact: boolean;
  count?: number;
};

const OWNER_NAV: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/dashboard/spaces", icon: Building2, label: "My Spaces", exact: false },
  { href: "/dashboard/bookings", icon: CalendarDays, label: "Bookings", exact: false, count: 9 },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payments", exact: false, count: 2 },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", exact: false },
];

const USER_NAV: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/dashboard/discover", icon: Compass, label: "Discover", exact: false },
  {
    href: "/dashboard/my-bookings",
    icon: CalendarDays,
    label: "My Bookings",
    exact: false,
    count: 2,
  },
  { href: "/dashboard/saved", icon: Bookmark, label: "Saved Spaces", exact: false },
];

const ADMIN_NAV: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/dashboard/spaces", icon: Building2, label: "Spaces", exact: false },
  { href: "/dashboard/members", icon: Users, label: "Members", exact: false },
  { href: "/dashboard/bookings", icon: CalendarDays, label: "Bookings", exact: false, count: 9 },
  { href: "/dashboard/payments", icon: CreditCard, label: "Payments", exact: false, count: 2 },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics", exact: false },
];

function getNav(role?: string | null) {
  if (role === "OWNER") return OWNER_NAV;
  if (role === "ADMIN") return ADMIN_NAV;
  return USER_NAV;
}

// ── Components ────────────────────────────────────────────────────────────
interface SidebarProps {
  open: boolean;
  onClose: () => void;
  user: { name?: string | null; email?: string | null; role?: string | null };
}

function NavLink({
  item,
  pathname,
  onClick,
}: {
  item: NavItem;
  pathname: string;
  onClick: () => void;
}) {
  const { href, icon: Icon, label, exact, count } = item;
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
          "h-4 w-4 flex-shrink-0",
          isActive
            ? "text-white"
            : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
        )}
      />
      <span className="flex-1 truncate">{label}</span>
      {count !== undefined && (
        <span
          className={cn(
            "flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
            isActive
              ? "bg-white/25 text-white"
              : "bg-brand-100 text-brand-700 dark:bg-brand-500/20 dark:text-brand-400"
          )}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────
export function Sidebar({ open, onClose, user }: SidebarProps) {
  const pathname = usePathname();
  const nav = getNav(user.role);
  const initial = (user.name ?? user.email ?? "U")[0].toUpperCase();
  const displayName = user.name ?? user.email?.split("@")[0] ?? "User";
  const roleLabel = user.role
    ? user.role[0].toUpperCase() + user.role.slice(1).toLowerCase()
    : "Member";

  const RoleIcon = user.role === "ADMIN" ? Shield : user.role === "OWNER" ? Building2 : Compass;

  return (
    <>
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
          "transition-transform duration-200 ease-in-out lg:translate-x-0",
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

        {/* Role badge */}
        <div className="mx-3 mt-3 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 dark:border-dark-200 dark:bg-dark-100">
          <RoleIcon className="h-3.5 w-3.5 text-brand-500" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {roleLabel} Portal
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
            Menu
          </p>
          <div className="space-y-0.5">
            {nav.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onClick={onClose} />
            ))}
          </div>

          <div className="mt-5">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600">
              System
            </p>
            <NavLink
              item={{
                href: "/dashboard/settings",
                icon: Settings,
                label: "Settings",
                exact: false,
              }}
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
