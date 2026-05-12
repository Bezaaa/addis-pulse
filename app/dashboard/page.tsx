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
  MapPin,
  Bookmark,
  Wifi,
  Compass,
  Heart,
  Zap,
  Shield,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Dashboard" };

// ── Shared helpers ────────────────────────────────────────────────────────
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function today() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── Shared mock data ──────────────────────────────────────────────────────
const OWNER_ACTIVITY = [
  {
    icon: UserPlus,
    color: "bg-emerald-500",
    title: "New booking",
    desc: "Yohannes T. — Open Desk, 3 hrs",
    time: "2 min ago",
    badge: "Booking",
  },
  {
    icon: CreditCard,
    color: "bg-blue-500",
    title: "Payment received",
    desc: "ETB 1,200 from Fatima A.",
    time: "18 min ago",
    badge: "Payment",
  },
  {
    icon: Star,
    color: "bg-yellow-500",
    title: "New review",
    desc: "4.9 ★ on Bole Creative Space",
    time: "1 hr ago",
    badge: "Review",
  },
  {
    icon: AlertCircle,
    color: "bg-orange-500",
    title: "Maintenance request",
    desc: "AC issue — Room 4, Piassa Desk",
    time: "3 hrs ago",
    badge: "Alert",
  },
  {
    icon: CheckCircle2,
    color: "bg-emerald-500",
    title: "Booking completed",
    desc: "Kazanchis Tech Hub — 4 hrs",
    time: "5 hrs ago",
    badge: "Done",
  },
];

const ADMIN_ACTIVITY = [
  {
    icon: UserPlus,
    color: "bg-emerald-500",
    title: "New member joined",
    desc: "Yohannes T. registered as a member",
    time: "2 min ago",
    badge: "Member",
  },
  {
    icon: Building2,
    color: "bg-brand-500",
    title: "Space submitted",
    desc: "Megenagna Workspace awaiting review",
    time: "25 min ago",
    badge: "Approval",
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
    title: "Review posted",
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
    icon: Shield,
    color: "bg-purple-500",
    title: "Role changed",
    desc: "Dawit B. promoted to Owner",
    time: "Yesterday",
    badge: "Admin",
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

// ── Shared sub-components ─────────────────────────────────────────────────
function WelcomeBanner({
  name,
  subtitle,
  badge,
}: {
  name: string;
  subtitle: string;
  badge: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-dark-0 p-6 sm:p-8 dark:bg-dark-100">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-1/2 h-48 w-48 rounded-full bg-brand-600/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-400">{greeting()} 👋</p>
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <p className="text-sm text-slate-500">{today()}</p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          {badge}
          <p className="max-w-xs text-xs text-slate-500 sm:text-right">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function ActivityFeed({ items }: { items: typeof OWNER_ACTIVITY }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">Latest events</p>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400">
          View all <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
      <ul className="divide-y divide-slate-50 dark:divide-dark-200">
        {items.map(({ icon: Icon, color, title, desc, time, badge }, i) => (
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
              <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{desc}</p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end gap-1.5">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400">
                {badge}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                <Clock className="h-2.5 w-2.5" />
                {time}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WeeklyChart({
  title = "This Week",
  subtitle = "Bookings per day",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+18%</span>
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
                  className="h-full rounded-full bg-brand-500 transition-all"
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
  );
}

// ── Owner Dashboard ───────────────────────────────────────────────────────
const OWNER_QUICK = [
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

function OwnerDashboard({ name }: { name: string }) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      <WelcomeBanner
        name={name}
        subtitle="Manage your spaces and track performance."
        badge={
          <span className="inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/20">
            <Building2 className="h-4 w-4" />
            Workspace Owner
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Building2} label="My Spaces" value="3" accent="brand" />
        <StatCard
          icon={Users}
          label="Visitors Today"
          value="48"
          accent="blue"
          trend={{ value: "+22%", direction: "up", label: "vs yesterday" }}
        />
        <StatCard
          icon={Star}
          label="Avg. Rating"
          value="4.8"
          accent="brand"
          trend={{ value: "+0.2", direction: "up", label: "vs last week" }}
        />
        <StatCard
          icon={CreditCard}
          label="Revenue (Month)"
          value="ETB 12.8K"
          accent="emerald"
          trend={{ value: "+8%", direction: "up", label: "vs last month" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed items={OWNER_ACTIVITY} />
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
            <div className="border-b border-slate-100 px-5 py-4 dark:border-dark-200">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Quick Actions
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              {OWNER_QUICK.map(({ icon: Icon, label, desc, iconCn, bgCn }) => (
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
          <WeeklyChart />
        </div>
      </div>
    </div>
  );
}

// ── User Dashboard ────────────────────────────────────────────────────────
const FEATURED_SPACES = [
  {
    name: "Bole Creative Hub",
    location: "Bole, Addis Ababa",
    rating: 4.9,
    price: "ETB 150/hr",
    gradient: "from-brand-400 to-brand-600",
    available: true,
    seats: 24,
  },
  {
    name: "Kazanchis Tech Space",
    location: "Kazanchis",
    rating: 4.7,
    price: "ETB 200/hr",
    gradient: "from-blue-400 to-blue-600",
    available: true,
    seats: 40,
  },
  {
    name: "Piassa Desk Co.",
    location: "Piassa",
    rating: 4.5,
    price: "ETB 120/hr",
    gradient: "from-emerald-400 to-emerald-600",
    available: false,
    seats: 16,
  },
];

const MY_BOOKINGS = [
  {
    space: "Bole Creative Hub",
    room: "Open Desk",
    date: "Today, 9:00 AM",
    duration: "3 hrs",
    status: "upcoming" as const,
  },
  {
    space: "Kazanchis Tech",
    room: "Private Office",
    date: "Apr 28, 2026",
    duration: "2 hrs",
    status: "completed" as const,
  },
];

const USER_QUICK = [
  {
    icon: Compass,
    label: "Discover",
    desc: "Find spaces near you",
    href: "/dashboard/discover",
    iconCn: "text-brand-600 dark:text-brand-400",
    bgCn: "bg-brand-50 dark:bg-brand-500/10",
  },
  {
    icon: CalendarDays,
    label: "My Bookings",
    desc: "View your history",
    href: "/dashboard/my-bookings",
    iconCn: "text-blue-600 dark:text-blue-400",
    bgCn: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    icon: Heart,
    label: "Saved",
    desc: "Your favourites",
    href: "/dashboard/saved",
    iconCn: "text-pink-600 dark:text-pink-400",
    bgCn: "bg-pink-50 dark:bg-pink-500/10",
  },
  {
    icon: Headphones,
    label: "Help",
    desc: "Get support",
    href: "#",
    iconCn: "text-purple-600 dark:text-purple-400",
    bgCn: "bg-purple-50 dark:bg-purple-500/10",
  },
];

function UserDashboard({ name }: { name: string }) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      <WelcomeBanner
        name={name}
        subtitle="Discover and book your perfect workspace in Addis Ababa."
        badge={
          <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
            <Zap className="h-4 w-4" />
            Member
          </span>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={MapPin}
          label="Spaces Nearby"
          value="24"
          accent="blue"
          trend={{ value: "+3", direction: "up", label: "new this week" }}
        />
        <StatCard icon={Wifi} label="Online Now" value="11" accent="emerald" />
        <StatCard icon={Bookmark} label="Saved Spaces" value="6" accent="brand" />
        <StatCard icon={CalendarDays} label="My Bookings" value="2" accent="purple" />
      </div>

      {/* Featured spaces */}
      <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Spaces For You</h3>
            <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
              Available near you right now
            </p>
          </div>
          <button className="flex items-center gap-1 text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400">
            Browse all <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-3">
          {FEATURED_SPACES.map((space) => (
            <div
              key={space.name}
              className="group overflow-hidden rounded-xl border border-slate-100 transition-all hover:border-slate-200 hover:shadow-md dark:border-dark-200 dark:hover:border-dark-300"
            >
              <div className={`relative h-20 bg-gradient-to-br ${space.gradient}`}>
                <Badge
                  variant={space.available ? "emerald" : "default"}
                  dot
                  className="absolute right-2 top-2 text-[10px]"
                >
                  {space.available ? "Available" : "Full"}
                </Badge>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{space.name}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="h-3 w-3" />
                  {space.location}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="flex items-center gap-0.5 text-xs text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    {space.rating}
                  </span>
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    {space.price}
                  </span>
                </div>
                {space.available && (
                  <button className="mt-2.5 w-full rounded-lg bg-brand-500 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600">
                    Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* My upcoming bookings */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-dark-200">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">My Bookings</h3>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                Your upcoming and recent visits
              </p>
            </div>
            <button className="flex items-center gap-1 text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          {MY_BOOKINGS.length > 0 ? (
            <ul className="divide-y divide-slate-50 dark:divide-dark-200">
              {MY_BOOKINGS.map((b, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50/60 dark:hover:bg-dark-100/50"
                >
                  <div
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${b.status === "upcoming" ? "bg-brand-50 dark:bg-brand-500/10" : "bg-slate-100 dark:bg-dark-200"}`}
                  >
                    <CalendarDays
                      className={`h-4 w-4 ${b.status === "upcoming" ? "text-brand-500" : "text-slate-400"}`}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{b.space}</p>
                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                      {b.room} · {b.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 dark:text-slate-300">{b.date}</p>
                    <Badge
                      variant={b.status === "upcoming" ? "brand" : "default"}
                      dot
                      className="mt-1 capitalize text-[10px]"
                    >
                      {b.status}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-dark-200">
                <CalendarDays className="h-5 w-5 text-slate-400" />
              </div>
              <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white">
                No bookings yet
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Browse spaces and make your first booking.
              </p>
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
          <div className="border-b border-slate-100 px-5 py-4 dark:border-dark-200">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            {USER_QUICK.map(({ icon: Icon, label, desc, iconCn, bgCn }) => (
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
      </div>
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────
const ADMIN_QUICK = [
  {
    icon: Plus,
    label: "Add Space",
    desc: "List a workspace",
    iconCn: "text-brand-600 dark:text-brand-400",
    bgCn: "bg-brand-50 dark:bg-brand-500/10",
  },
  {
    icon: UserPlus,
    label: "Add Member",
    desc: "Create account",
    iconCn: "text-emerald-600 dark:text-emerald-400",
    bgCn: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    icon: FileText,
    label: "Reports",
    desc: "Platform insights",
    iconCn: "text-blue-600 dark:text-blue-400",
    bgCn: "bg-blue-50 dark:bg-blue-500/10",
  },
  {
    icon: Shield,
    label: "Permissions",
    desc: "Manage roles",
    iconCn: "text-purple-600 dark:text-purple-400",
    bgCn: "bg-purple-50 dark:bg-purple-500/10",
  },
];

function AdminDashboard({ name }: { name: string }) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      <WelcomeBanner
        name={name}
        subtitle="Full platform access — manage users, spaces, and operations."
        badge={
          <span className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 ring-1 ring-purple-200 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400 dark:ring-purple-500/20">
            <Shield className="h-4 w-4" />
            Admin
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value="1,284"
          accent="blue"
          trend={{ value: "+12%", direction: "up", label: "vs last month" }}
        />
        <StatCard
          icon={Building2}
          label="Listed Spaces"
          value="312"
          accent="brand"
          trend={{ value: "+5%", direction: "up", label: "vs last month" }}
        />
        <StatCard
          icon={CalendarDays}
          label="Bookings Today"
          value="94"
          accent="emerald"
          trend={{ value: "+18%", direction: "up", label: "vs yesterday" }}
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Reviews"
          value="7"
          accent="purple"
          trend={{ value: "-2", direction: "down", label: "vs yesterday" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed items={ADMIN_ACTIVITY} />
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white dark:border-dark-200 dark:bg-dark-50">
            <div className="border-b border-slate-100 px-5 py-4 dark:border-dark-200">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Quick Actions
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              {ADMIN_QUICK.map(({ icon: Icon, label, desc, iconCn, bgCn }) => (
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
          <WeeklyChart title="Platform Activity" subtitle="Bookings across all spaces" />
        </div>
      </div>
    </div>
  );
}

// ── Page entry point ──────────────────────────────────────────────────────
export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { user } = session;
  const role = user.role ?? "USER";
  const name = user.name ?? user.email?.split("@")[0] ?? "there";

  if (role === "OWNER") return <OwnerDashboard name={name} />;
  if (role === "ADMIN") return <AdminDashboard name={name} />;
  return <UserDashboard name={name} />;
}
