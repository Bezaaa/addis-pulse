"use client";

import { useTranslations } from "next-intl";
import { Zap, Wifi, MapPin, Star, Users, TrendingUp } from "lucide-react";

/* ─── Login variant ────────────────────────────────────────────────────────── */
function LoginBrandContent() {
  const t = useTranslations("brand.login");

  const stats = [
    { icon: MapPin, value: "200+", key: "statsSpaces" },
    { icon: Users, value: "8,000+", key: "statsMembers" },
    { icon: Star, value: "4.9", key: "statsRating" },
    { icon: TrendingUp, value: "12", key: "statsNew" },
  ] as const;

  const workspaces = [
    { name: "Tomoca Coffee – Bole", badge: "Power ✓", time: "2 min ago" },
    { name: "Seedspace Addis", badge: "Fast WiFi ✓", time: "5 min ago" },
    { name: "Kaldi's Coffee – Sarbet", badge: "Open ✓", time: "8 min ago" },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white">
          {t("headline")}{" "}
          <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            {t("headlineAccent")}
          </span>
        </h2>
        <p className="text-base leading-relaxed text-slate-400">{t("description")}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ icon: Icon, value, key }) => (
          <div
            key={key}
            className="flex items-center gap-3 rounded-2xl border border-white/5 bg-dark-100/60 px-4 py-3.5 backdrop-blur-sm"
          >
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-dark-200 ring-1 ring-white/5">
              <Icon className="h-4 w-4 text-brand-400" />
            </div>
            <div>
              <p className="text-base font-bold leading-none text-white">{value}</p>
              <p className="mt-0.5 text-xs text-slate-500">{t(key)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Live feed */}
      <div className="space-y-2.5">
        <p className="text-xs font-medium uppercase tracking-widest text-slate-600">
          {t("recentlyActive")}
        </p>
        {workspaces.map((w) => (
          <div
            key={w.name}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-dark-100/40 px-4 py-2.5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <span className="text-sm font-medium text-slate-300">{w.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                {w.badge}
              </span>
              <span className="text-xs text-slate-600">{w.time}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-600">{t("trusted")}</p>
    </div>
  );
}

/* ─── Register variant ─────────────────────────────────────────────────────── */
function RegisterBrandContent() {
  const t = useTranslations("brand.register");

  const features = [
    { icon: Wifi, titleKey: "feat1Title", descKey: "feat1Desc" },
    { icon: Zap, titleKey: "feat2Title", descKey: "feat2Desc" },
    { icon: MapPin, titleKey: "feat3Title", descKey: "feat3Desc" },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          {t("badge")}
        </div>
        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white">
          {t("headline")}{" "}
          <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
            {t("headlineAccent")}
          </span>
        </h2>
        <p className="text-base leading-relaxed text-slate-400">{t("description")}</p>
      </div>

      <ul className="space-y-4">
        {features.map(({ icon: Icon, titleKey, descKey }) => (
          <li key={titleKey} className="flex items-start gap-4">
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-dark-200 ring-1 ring-white/5">
              <Icon className="h-4 w-4 text-brand-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">{t(titleKey)}</p>
              <p className="text-sm text-slate-500">{t(descKey)}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Testimonial */}
      <div className="rounded-2xl border border-white/5 bg-dark-100/60 p-5 backdrop-blur-sm">
        <p className="text-sm italic leading-relaxed text-slate-400">
          &ldquo;{t("testimonialQuote")}&rdquo;
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
          <div>
            <p className="text-xs font-semibold text-slate-300">{t("testimonialAuthor")}</p>
            <p className="text-xs text-slate-500">{t("testimonialRole")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shell (shared layout) ────────────────────────────────────────────────── */
interface BrandPanelProps {
  variant: "login" | "register";
}

export function BrandPanel({ variant }: BrandPanelProps) {
  return (
    <div className="relative hidden lg:flex lg:w-[52%] flex-col justify-between overflow-hidden bg-dark-0 p-12 dark:bg-dark-50">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl" />
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 shadow-lg shadow-brand-500/30">
          <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Addis Pulse</span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {variant === "login" ? <LoginBrandContent /> : <RegisterBrandContent />}
      </div>

      {/* Bottom spacer (keeps content vertically balanced) */}
      <div />
    </div>
  );
}
