import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

type Role = "OWNER" | "USER" | "ADMIN";

const AUTH_ROUTES = ["/login", "/register"];
const DASHBOARD_PREFIX = "/dashboard";
const OWNER_PREFIX = "/owner";

/**
 * Edge-compatible auth config.
 * Must NOT import Prisma, bcryptjs, or any other Node.js-only modules.
 * Used by both auth.ts and the middleware.
 */
export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const path = nextUrl.pathname;

      // Logged-in user hits an auth route → send to dashboard
      if (isLoggedIn && AUTH_ROUTES.includes(path)) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }

      // Owner-only routes
      if (path.startsWith(OWNER_PREFIX)) {
        if (!isLoggedIn) return false; // triggers redirect to pages.signIn
        if (role !== "OWNER") return NextResponse.redirect(new URL("/dashboard", nextUrl));
        return true;
      }

      // Dashboard routes — any authenticated user
      if (path.startsWith(DASHBOARD_PREFIX)) {
        return isLoggedIn; // false triggers redirect to pages.signIn
      }

      // Everything else — public by default
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
  },
  providers: [],
};
