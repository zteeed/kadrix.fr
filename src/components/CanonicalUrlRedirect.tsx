"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { buildLocaleUrl, getCanonicalPathForLocale } from "@/data/routes";
import type { Locale } from "@/data/routes";

/**
 * Redirects to the canonical URL when the current path uses the wrong locale segment
 * (e.g. /en/equipe -> /en/team) or has multiple slashes (/en////equipe -> /en/team).
 */
export function CanonicalUrlRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const locale = segments[0];
    if (locale !== "fr" && locale !== "en") return;
    const pathWithoutLocale = segments.slice(1).join("/");
    const canonicalPath = getCanonicalPathForLocale(locale as Locale, pathWithoutLocale);
    const canonicalUrl = buildLocaleUrl(locale as Locale, canonicalPath);
    const currentNormalized = "/" + segments.join("/");
    if (currentNormalized !== canonicalUrl) {
      router.replace(canonicalUrl);
    }
  }, [pathname, router]);

  return null;
}
