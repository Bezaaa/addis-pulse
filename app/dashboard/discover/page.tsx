import type { Metadata } from "next";
import { MapPin, Star, Users, Wifi, Coffee, Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Discover" };

const SPACES = [
  {
    name: "Bole Creative Hub",
    location: "Bole, Addis Ababa",
    rating: 4.9,
    reviews: 47,
    price: "ETB 150/hr",
    seats: 24,
    available: true,
    tags: ["WiFi", "Coffee", "Meeting Room"],
    gradient: "from-brand-400 to-brand-600",
  },
  {
    name: "Kazanchis Tech Space",
    location: "Kazanchis, Addis Ababa",
    rating: 4.7,
    reviews: 33,
    price: "ETB 200/hr",
    seats: 40,
    available: true,
    tags: ["WiFi", "Standing Desks", "Lounge"],
    gradient: "from-blue-400 to-blue-600",
  },
  {
    name: "Piassa Desk Co.",
    location: "Piassa, Addis Ababa",
    rating: 4.5,
    reviews: 21,
    price: "ETB 120/hr",
    seats: 16,
    available: false,
    tags: ["WiFi", "Coffee", "Parking"],
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    name: "CMC Hub",
    location: "CMC, Addis Ababa",
    rating: 4.2,
    reviews: 14,
    price: "ETB 100/hr",
    seats: 20,
    available: true,
    tags: ["WiFi", "Quiet Zone"],
    gradient: "from-teal-400 to-teal-600",
  },
  {
    name: "Sarbet Workspace",
    location: "Sarbet, Addis Ababa",
    rating: 4.6,
    reviews: 28,
    price: "ETB 130/hr",
    seats: 18,
    available: true,
    tags: ["WiFi", "Coffee", "Events"],
    gradient: "from-purple-400 to-purple-600",
  },
  {
    name: "Megenagna Workspace",
    location: "Megenagna, Addis Ababa",
    rating: 0,
    reviews: 0,
    price: "ETB 180/hr",
    seats: 32,
    available: false,
    tags: ["WiFi", "Cafe", "Event Space"],
    gradient: "from-slate-400 to-slate-600",
  },
];

const FILTERS = ["All", "Available Now", "Top Rated", "Nearest", "Price: Low"];

export default function DiscoverPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Discover Spaces</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Find and book workspaces across Addis Ababa
        </p>
      </div>

      {/* Search + filter row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm dark:border-dark-300 dark:bg-dark-100">
          <Search className="h-4 w-4 flex-shrink-0 text-slate-400" />
          <input
            placeholder="Search by name or location…"
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none dark:text-slate-200 dark:placeholder-slate-500"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-300 dark:hover:bg-dark-200">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Filter pills */}
      <div className="flex w-fit gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-dark-300 dark:bg-dark-100">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              i === 0
                ? "bg-white text-slate-900 shadow-sm dark:bg-dark-200 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Space grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SPACES.map((space) => (
          <div
            key={space.name}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg dark:border-dark-200 dark:bg-dark-50 dark:hover:shadow-black/30"
          >
            {/* Gradient header */}
            <div className={`relative h-32 bg-gradient-to-br ${space.gradient}`}>
              <Badge
                variant={space.available ? "emerald" : "default"}
                dot
                className="absolute right-3 top-3 capitalize"
              >
                {space.available ? "Available" : "Full"}
              </Badge>
              <div className="absolute bottom-3 left-4 flex items-center gap-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                  <Wifi className="h-4 w-4 text-white" />
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                  <Coffee className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{space.name}</h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {space.location}
                  </div>
                </div>
                <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                  {space.price}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {space.seats} seats
                </span>
                {space.rating > 0 ? (
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    {space.rating}
                    <span className="text-slate-400">({space.reviews})</span>
                  </span>
                ) : (
                  <span className="text-slate-400 italic">New listing</span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {space.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                disabled={!space.available}
                className="w-full rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-500/20 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {space.available ? "Book Now" : "Join Waitlist"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
