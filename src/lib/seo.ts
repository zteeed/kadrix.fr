import type { Metadata } from "next";
import { buildLocaleUrl } from "@/data/routes";
import type { Locale } from "@/data/routes";
import { getPathForOtherLocale } from "@/data/routes";

const BASE_URL = "https://www.kadrix.fr";
const SITE_NAME = "Kadrix";

/** Full URL for a locale path (no trailing slash). */
export function fullUrl(locale: Locale, pathWithoutLocale?: string): string {
  const path = buildLocaleUrl(locale, pathWithoutLocale);
  return `${BASE_URL}${path}`;
}

/** Alternate language URLs for the same logical page (for hreflang). pathWithoutLocale is in current locale's form. */
export function alternateUrls(
  currentLocale: Locale,
  pathWithoutLocale: string
): { fr: string; en: string } {
  const frPath = currentLocale === "fr" ? pathWithoutLocale : getPathForOtherLocale("en", pathWithoutLocale);
  const enPath = currentLocale === "en" ? pathWithoutLocale : getPathForOtherLocale("fr", pathWithoutLocale);
  return {
    fr: fullUrl("fr", frPath),
    en: fullUrl("en", enPath),
  };
}

/** Truncate description for meta (recommended 150–160 chars). */
export function truncateDescription(description: string, maxLength = 160): string {
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const cut = trimmed.slice(0, maxLength - 3).lastIndexOf(" ");
  return (cut > 0 ? trimmed.slice(0, cut) : trimmed.slice(0, maxLength - 3)) + "...";
}

export type PageSeoOptions = {
  locale: Locale;
  pathWithoutLocale: string;
  title: string;
  description: string;
  /** Optional: no index (e.g. thank-you page). */
  noIndex?: boolean;
};

/**
 * Build Next.js Metadata with canonical, Open Graph, Twitter Card and hreflang.
 */
/** Ensure page title includes site name for branding (unless already present). */
function pageTitleWithSite(title: string): string {
  const t = title.trim();
  if (t.includes("Kadrix")) return t;
  return `${t} | Kadrix`;
}

export function buildPageMetadata({
  locale,
  pathWithoutLocale,
  title,
  description,
  noIndex = false,
}: PageSeoOptions): Metadata {
  const canonical = fullUrl(locale, pathWithoutLocale);
  const alternates = alternateUrls(locale, pathWithoutLocale);
  const desc = truncateDescription(description);
  const fullTitle = pageTitleWithSite(title);

  return {
    title: fullTitle,
    description: desc,
    robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        "fr-FR": alternates.fr,
        "en-GB": alternates.en,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
  };
}

export { BASE_URL, SITE_NAME };
