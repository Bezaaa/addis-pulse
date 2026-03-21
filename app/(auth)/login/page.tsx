"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BrandPanel } from "@/components/auth/brand-panel";
import { AuthHeader } from "@/components/auth/auth-header";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(1, "Password is required"),
});
type LoginInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register: field,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  function onSubmit(data: LoginInput) {
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(t("errorInvalid"));
        return;
      }

      toast.success(t("successWelcome"));
      router.push(callbackUrl);
      router.refresh();
    });
  }

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-dark-0">
      <BrandPanel variant="login" />

      <div className="flex flex-1 flex-col">
        <AuthHeader
          promptText={t("noAccount")}
          cta={{ label: t("signUpLink"), href: "/register" }}
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
                label={t("emailLabel")}
                type="email"
                autoComplete="email"
                placeholder={t("emailPlaceholder")}
                disabled={isPending}
                error={errors.email?.message}
                {...field("email")}
              />

              {/* Password with inline forgot-password link */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {t("passwordLabel")}
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-brand-600 transition hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                  >
                    {t("forgotPassword")}
                  </Link>
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder={t("passwordPlaceholder")}
                  disabled={isPending}
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
              </div>

              <Button
                type="submit"
                fullWidth
                loading={isPending}
                icon={<ArrowRight className="h-4 w-4" />}
                className="group mt-2"
              >
                {isPending ? t("submitting") : t("submit")}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-dark-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface-50 px-3 text-xs text-slate-400 dark:bg-dark-0 dark:text-slate-600">
                  {t("newTo")}
                </span>
              </div>
            </div>

            <Button variant="secondary" fullWidth onClick={() => router.push("/register")}>
              {t("createAccount")}
            </Button>

            <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-600">
              {t("privacy")}{" "}
              <Link
                href="#"
                className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-400"
              >
                {t("privacyLink")}
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
