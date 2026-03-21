import { z } from "zod";
import { Role } from ".prisma/client";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name must be at most 64 characters")
    .trim(),

  email: z.string().email("Invalid email address").toLowerCase().trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"),
  role: z.enum([Role.USER, Role.OWNER], {
    message: "Role must be USER or OWNER",
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
