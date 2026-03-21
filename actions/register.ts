"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/schemas/auth";

type RegisterResult = { success: true; message: string } | { success: false; error: string };

export async function register(formData: unknown): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
    return { success: false, error: firstError };
  }

  const { name, email, password, role } = parsed.data;

  const existing = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existing) {
    return { success: false, error: "An account with this email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  return { success: true, message: "Account created successfully. You can now sign in." };
}
