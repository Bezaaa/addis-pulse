import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      mustChangePassword?: boolean;
    } & DefaultSession["user"];
  }

  /** The shape returned by the `authorize` callback and stored in the JWT. */
  interface User {
    role: Role;
    mustChangePassword?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    mustChangePassword?: boolean;
  }
}
