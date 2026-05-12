import type { Metadata } from "next";
import { MapPin, Star, Users, Heart, Compass } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Saved Spaces" };

const SAVED = [
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
    savedAgo: "2 days ago",
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
    savedAgo: "1 week ago",
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
    savedAgo: "2 weeks ago",
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
    savedAgo: "1 month ago",
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
    savedAgo: "1 month ago",
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
    gradient: "from-orange-400 to-orange-600",
    savedAgo: "1 month ago",
  },
];

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Saved Spaces</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Workspaces you&apos;ve favourited
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 dark:border-dark-300 dark:bg-dark-100 dark:text-slate-300 dark:hover:bg-dark-200">
          <Compass className="h-4 w-4" />
          Discover More
        </button>
      </div>

      {/* Summary pill */}
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 w-fit dark:border-dark-300 dark:bg-dark-100">
        <Heart className="h-4 w-4 text-pink-500" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {SAVED.length} saved spaces
        </span>
        <span className="mx-1 text-slate-300 dark:text-dark-400">·</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {SAVED.filter((s) => s.available).length} available now
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {SAVED.map((space) => (
          <div
            key={space.name}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-lg dark:border-dark-200 dark:bg-dark-50 dark:hover:shadow-black/30"
          >
            {/* Gradient header */}
            <div className={`relative h-28 bg-gradient-to-br ${space.gradient}`}>
              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-pink-500 shadow-sm backdrop-blur-sm transition hover:bg-white dark:bg-dark-100/90">
                <Heart className="h-4 w-4 fill-current" />
              </button>
              <Badge
                variant={space.available ? "emerald" : "default"}
                dot
                className="absolute bottom-3 right-3 capitalize text-[10px]"
              >
                {space.available ? "Available" : "Full"}
              </Badge>
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
                  <span className="italic text-slate-400">New listing</span>
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

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 dark:border-dark-200">
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  Saved {space.savedAgo}
                </span>
                <button
                  disabled={!space.available}
                  className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {space.available ? "Book Now" : "Notify Me"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
