import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mock Prisma before importing the action ──────────────────────────────────
vi.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// ── Mock bcryptjs ────────────────────────────────────────────────────────────
vi.mock("bcryptjs", () => ({
  default: {
    hash: vi.fn().mockResolvedValue("hashed_password"),
  },
}));

import { register } from "@/actions/register";
import { prisma } from "@/lib/prisma";

const mockFindUnique = vi.mocked(prisma.user.findUnique);
const mockCreate = vi.mocked(prisma.user.create);

const validPayload = {
  name: "Abebe Girma",
  email: "abebe@example.com",
  password: "securepass123",
  role: "USER" as const,
};

describe("register action", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFindUnique.mockResolvedValue(null); // no duplicate by default
    mockCreate.mockResolvedValue({} as never); // successful create by default
  });

  it("returns success for valid new user", async () => {
    const result = await register(validPayload);
    expect(result.success).toBe(true);
    if (result.success) expect(result.message).toBeTruthy();
  });

  it("calls prisma.user.create with hashed password", async () => {
    await register(validPayload);
    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ password: "hashed_password" }),
      })
    );
  });

  it("never stores the plain-text password", async () => {
    await register(validPayload);
    const call = mockCreate.mock.calls[0][0] as { data: Record<string, unknown> };
    expect(call.data.password).not.toBe(validPayload.password);
  });

  it("returns error when email already exists", async () => {
    mockFindUnique.mockResolvedValue({ id: "existing-id" } as never);
    const result = await register(validPayload);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toMatch(/already exists/i);
  });

  it("does not call bcrypt when email already exists", async () => {
    mockFindUnique.mockResolvedValue({ id: "existing-id" } as never);
    const bcrypt = await import("bcryptjs");
    await register(validPayload);
    expect(bcrypt.default.hash).not.toHaveBeenCalled();
  });

  it("returns validation error for invalid email", async () => {
    const result = await register({ ...validPayload, email: "bad-email" });
    expect(result.success).toBe(false);
  });

  it("returns validation error for short password", async () => {
    const result = await register({ ...validPayload, password: "short" });
    expect(result.success).toBe(false);
  });

  it("returns validation error for ADMIN role", async () => {
    const result = await register({ ...validPayload, role: "ADMIN" as never });
    expect(result.success).toBe(false);
  });

  it("returns error for completely invalid input shape", async () => {
    const result = await register(null);
    expect(result.success).toBe(false);
  });

  it("does not call prisma.user.create when validation fails", async () => {
    await register({ ...validPayload, email: "bad" });
    expect(mockCreate).not.toHaveBeenCalled();
  });
});
