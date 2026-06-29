"use server";

import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function changePassword(
  _: unknown,
  formData: FormData
): Promise<{ error: string } | void> {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");

  const newPassword = formData.get("password") as string;
  const confirmPassword = formData.get("confirm") as string;

  if (!newPassword || newPassword.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const hashed = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email: session.user.email },
    data: { password: hashed, mustChangePassword: false },
  });

  // Sign out so the new JWT (without mustChangePassword) is issued on next login.
  await signOut({ redirectTo: "/login?passwordChanged=1" });
}
