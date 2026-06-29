import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

type Role = "OWNER" | "USER" | "ADMIN";

const AUTH_ROUTES = ["/login", "/register"];
const DASHBOARD_PREFIX = "/dashboard";

// Routes restricted to specific roles
const ADMIN_ONLY = ["/members"];
const OWNER_ADMIN = ["/spaces", "/bookings", "/payments", "/analytics"];
const USER_ONLY = ["/discover", "/my-bookings", "/saved"];
const ANY_AUTH = ["/settings"];

function matchesPrefix(path: string, prefixes: string[]) {
  return prefixes.some((p) => path === p || path.startsWith(p + "/"));
}

/**
 * Edge-compatible auth config.
 * Must NOT import Prisma, bcryptjs, or any other Node.js-only modules.
 * Used by both auth.ts and the middleware.
 */
export const authConfig: NextAuthConfig = {
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role as Role | undefined;
      const mustChangePassword = auth?.user?.mustChangePassword;
      const path = nextUrl.pathname;

      // Force password change before anything else
      if (isLoggedIn && mustChangePassword && path !== "/change-password") {
        return NextResponse.redirect(new URL("/change-password", nextUrl));
      }

      // Auth pages → redirect logged-in users to dashboard
      if (isLoggedIn && AUTH_ROUTES.includes(path)) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      // /change-password requires login
      if (path === "/change-password") return isLoggedIn;

      // Admin-only routes
      if (matchesPrefix(path, ADMIN_ONLY)) {
        if (!isLoggedIn) return false;
        if (role !== "ADMIN") return NextResponse.redirect(new URL("/dashboard", nextUrl));
        return true;
      }

      // Owner + Admin routes
      if (matchesPrefix(path, OWNER_ADMIN)) {
        if (!isLoggedIn) return false;
        if (role !== "OWNER" && role !== "ADMIN")
          return NextResponse.redirect(new URL("/dashboard", nextUrl));
        return true;
      }

      // User-only routes
      if (matchesPrefix(path, USER_ONLY)) {
        if (!isLoggedIn) return false;
        if (role !== "USER") return NextResponse.redirect(new URL("/dashboard", nextUrl));
        return true;
      }

      // Any authenticated user (settings, dashboard)
      if (matchesPrefix(path, ANY_AUTH) || path.startsWith(DASHBOARD_PREFIX)) {
        return isLoggedIn;
      }

      // Public by default
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.mustChangePassword = user.mustChangePassword ?? false;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      session.user.mustChangePassword = token.mustChangePassword as boolean | undefined;
      return session;
    },
  },
  providers: [],
};
