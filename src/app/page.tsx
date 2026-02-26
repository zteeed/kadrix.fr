"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/i18n/config";
import { isValidLocale } from "@/i18n/config";

export default function RootRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const preferred =
      typeof navigator !== "undefined" && navigator.language
        ? navigator.language.toLowerCase().slice(0, 2)
        : "";
    const locale = isValidLocale(preferred) ? preferred : defaultLocale;
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-kadrix-muted">Redirection…</p>
    </div>
  );
}
