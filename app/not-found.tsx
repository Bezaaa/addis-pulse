import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-50 p-4 dark:bg-dark-0">
      <p className="text-7xl font-bold text-slate-200 dark:text-dark-300">404</p>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Page not found</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Link href="/">
        <Button variant="secondary" icon={<ArrowLeft className="h-4 w-4" />} iconPosition="left">
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
