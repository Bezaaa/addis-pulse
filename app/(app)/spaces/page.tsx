import type { Metadata } from "next";
import { Building2, MapPin, Users, Star, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Spaces" };

const SPACES = [
  {
    name: "Bole Creative Hub",
    location: "Bole, Addis Ababa",
    capacity: 24,
    rating: 4.9,
    reviews: 47,
    status: "active" as const,
    amenities: ["WiFi", "Coffee", "Meeting Room"],
    price: "ETB 150/hr",
    members: 18,
    bg: "bg-amber-900",
    accent: "text-amber-400",
  },
  {
    name: "Kazanchis Tech Space",
    location: "Kazanchis, Addis Ababa",
    capacity: 40,
    rating: 4.7,
    reviews: 33,
    status: "active" as const,
    amenities: ["WiFi", "Standing Desks", "Lounge"],
    price: "ETB 200/hr",
    members: 31,
    bg: "bg-blue-900",
    accent: "text-blue-400",
  },
  {
    name: "Piassa Desk Co.",
    location: "Piassa, Addis Ababa",
    capacity: 16,
    rating: 4.5,
    reviews: 21,
    status: "active" as const,
    amenities: ["WiFi", "Coffee", "Parking"],
    price: "ETB 120/hr",
    members: 12,
    bg: "bg-emerald-900",
    accent: "text-emerald-400",
  },
  {
    name: "Megenagna Workspace",
    location: "Megenagna, Addis Ababa",
    capacity: 32,
    rating: 0,
    reviews: 0,
    status: "pending" as const,
    amenities: ["WiFi", "Cafe", "Event Space"],
    price: "ETB 180/hr",
    members: 0,
    bg: "bg-purple-900",
    accent: "text-purple-400",
  },
  {
    name: "CMC Hub",
    location: "CMC, Addis Ababa",
    capacity: 20,
    rating: 4.2,
    reviews: 14,
    status: "inactive" as const,
    amenities: ["WiFi", "Quiet Zone"],
    price: "ETB 100/hr",
    members: 0,
    bg: "bg-slate-800",
    accent: "text-slate-400",
  },
];

const STATUS_BADGE: Record<string, "emerald" | "orange" | "default"> = {
  active: "emerald",
  inactive: "default",
  pending: "orange",
};

const TABS = ["All", "Active", "Pending", "Inactive"];

export default function SpacesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Spaces</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage and monitor all listed workspaces
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/30 transition hover:bg-brand-600">
          <Plus className="h-4 w-4" />
          Add Space
        </button>
      </div>

      {/* Tabs */}
      <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-dark-300 dark:bg-dark-100">
        {TABS.map((tab, i) => (
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

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SPACES.map((space) => (
          <div
            key={space.name}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg dark:border-dark-200 dark:bg-dark-50 dark:hover:shadow-black/30"
          >
            {/* Card header */}
            <div className={`relative h-28 ${space.bg}`}>
              <Building2
                className={`absolute right-4 top-1/2 h-20 w-20 -translate-y-1/2 opacity-[0.08] ${space.accent}`}
              />
              <Badge
                variant={STATUS_BADGE[space.status]}
                dot
                className="absolute right-3 top-3 capitalize"
              >
                {space.status}
              </Badge>
              <div className="absolute bottom-3 left-4 flex h-9 w-9 items-center justify-center rounded-xl bg-black/25 backdrop-blur-sm">
                <Building2 className={`h-5 w-5 ${space.accent}`} />
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{space.name}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3 w-3" />
                  {space.location}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {space.capacity} seats
                  </span>
                  {space.rating > 0 && (
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      {space.rating}
                      <span className="text-slate-400">({space.reviews})</span>
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                  {space.price}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {space.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400"
                  >
                    {a}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-dark-200">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {space.members} active members
                </span>
                <button className="text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
                  View details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
