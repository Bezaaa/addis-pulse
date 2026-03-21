"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Laptop, Building2, ArrowRight } from "lucide-react";

import { registerSchema, type RegisterInput } from "@/lib/schemas/auth";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandPanel } from "@/components/auth/brand-panel";
import { AuthHeader } from "@/components/auth/auth-header";
import { RoleCard } from "@/components/auth/role-card";

import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tc = useTranslations("common");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: field,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "USER" },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedRole = watch("role");

  async function onSubmit(data: RegisterInput) {
    const result = await register(data);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success(result.message);
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-dark-0">
      <BrandPanel variant="register" />

      <div className="flex flex-1 flex-col">
        <AuthHeader
          promptText={t("alreadyHave")}
          cta={{ label: t("signInLink"), href: "/login" }}
        />

        <main className="flex flex-1 items-center justify-center px-6 py-10 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t("title")}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{t("subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <Input
                label={t("nameLabel")}
                type="text"
                autoComplete="name"
                placeholder={t("namePlaceholder")}
                error={errors.name?.message}
                {...field("name")}
              />

              <Input
                label={t("emailLabel")}
                type="email"
                autoComplete="email"
                placeholder={t("emailPlaceholder")}
                error={errors.email?.message}
                {...field("email")}
              />

              <Input
                label={t("passwordLabel")}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder={t("passwordPlaceholder")}
                error={errors.password?.message}
                suffix={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                {...field("password")}
              />

              {/* Role selection */}
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t("roleLabel")}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <RoleCard
                    value="USER"
                    selected={selectedRole === "USER"}
                    title={t("userRoleTitle")}
                    description={t("userRoleDesc")}
                    icon={<Laptop className="h-5 w-5" />}
                    fieldProps={field("role")}
                  />
                  <RoleCard
                    value="OWNER"
                    selected={selectedRole === "OWNER"}
                    title={t("ownerRoleTitle")}
                    description={t("ownerRoleDesc")}
                    icon={<Building2 className="h-5 w-5" />}
                    fieldProps={field("role")}
                  />
                </div>
                {errors.role && (
                  <p role="alert" className="flex items-center gap-1.5 text-xs text-red-500">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-red-500" />
                    {errors.role.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                fullWidth
                icon={<ArrowRight className="h-4 w-4" />}
                className="group mt-2"
              >
                {t("submit")}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
              {t("termsPrefix")}{" "}
              <Link
                href="#"
                className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-400"
              >
                {t("termsLink")}
              </Link>{" "}
              {tc("and")}{" "}
              <Link
                href="#"
                className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-400"
              >
                {t("privacyLink")}
              </Link>
              .
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
