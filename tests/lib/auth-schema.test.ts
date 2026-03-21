import { describe, it, expect } from "vitest";
import { registerSchema } from "@/lib/schemas/auth";

describe("registerSchema", () => {
  const valid = {
    name: "Abebe Girma",
    email: "abebe@example.com",
    password: "securepass123",
    role: "USER" as const,
  };

  it("accepts a fully valid payload", () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts OWNER role", () => {
    expect(registerSchema.safeParse({ ...valid, role: "OWNER" }).success).toBe(true);
  });

  it("rejects ADMIN role (not self-registerable)", () => {
    expect(registerSchema.safeParse({ ...valid, role: "ADMIN" }).success).toBe(false);
  });

  it("rejects name shorter than 2 characters", () => {
    const r = registerSchema.safeParse({ ...valid, name: "A" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toContain("name");
  });

  it("rejects name longer than 64 characters", () => {
    const r = registerSchema.safeParse({ ...valid, name: "A".repeat(65) });
    expect(r.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const r = registerSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues[0].path).toContain("email");
  });

  it("normalises email to lower-case", () => {
    const r = registerSchema.safeParse({ ...valid, email: "ABEBE@EXAMPLE.COM" });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("abebe@example.com");
  });

  it("rejects password shorter than 8 characters", () => {
    const r = registerSchema.safeParse({ ...valid, password: "short" });
    expect(r.success).toBe(false);
  });

  it("rejects password longer than 72 characters", () => {
    const r = registerSchema.safeParse({ ...valid, password: "a".repeat(73) });
    expect(r.success).toBe(false);
  });

  it("rejects missing required fields", () => {
    expect(registerSchema.safeParse({}).success).toBe(false);
  });
});
