import "@testing-library/jest-dom";
import { vi } from "vitest";

// ── Next.js navigation mocks ────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => ({ get: vi.fn().mockReturnValue(null) }),
  usePathname: () => "/",
}));

// ── next-themes mock ─────────────────────────────────────────────────────────
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// ── next-intl mock ──────────────────────────────────────────────────────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// ── next-auth/react mock ────────────────────────────────────────────────────
vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));
