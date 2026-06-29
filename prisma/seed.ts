import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const [adminHash, ownerHash] = await Promise.all([
    bcrypt.hash("Admin@2026!", 12),
    bcrypt.hash("TempPass@123", 12),
  ]);

  await prisma.user.upsert({
    where: { email: "admin@addispulse.com" },
    update: {},
    create: {
      name: "Platform Admin",
      email: "admin@addispulse.com",
      password: adminHash,
      role: "ADMIN",
    },
  });

  await prisma.user.upsert({
    where: { email: "owner@addispulse.com" },
    update: {},
    create: {
      name: "Space Owner",
      email: "owner@addispulse.com",
      password: ownerHash,
      role: "OWNER",
      mustChangePassword: true,
    },
  });

  console.log("Seed complete.");
  console.log("  admin@addispulse.com  /  Admin@2026!");
  console.log("  owner@addispulse.com  /  TempPass@123  (must change password on first login)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
