/**
 * Locale-specific URL path segments.
 * EN routes use English keywords; FR use French.
 * Use these for all hrefs so /en/... never shows French paths.
 */

import {
  getExpertiseSlugFromUrl,
  getExpertiseUrlSlug,
} from "@/data/expertise-technologies";

export type Locale = "fr" | "en";

/** First path segment for main nav pages. Key is logical id, value is the URL segment. */
export const ROUTE_PATH: Record<Locale, Record<string, string>> = {
  fr: {
    home: "",
    expertises: "expertises",
    references: "references",
    team: "equipe",
    contact: "contact",
    privacy: "politique-de-confidentialite",
    legal: "mentions-legales",
  },
  en: {
    home: "",
    expertises: "expertises",
    references: "references",
    team: "team",
    contact: "contact",
    privacy: "privacy-policy",
    legal: "legal-notice",
  },
};

/** Contact sub-path: thank-you page (after form submit). */
export const ROUTE_CONTACT_THANKYOU: Record<Locale, string> = {
  fr: "merci",
  en: "thank-you",
};

/** Pairs of path segments that are the same page in FR vs EN (for locale switcher). */
const SEGMENT_PAIRS: [string, string][] = [
  ["equipe", "team"],
  ["politique-de-confidentialite", "privacy-policy"],
  ["mentions-legales", "legal-notice"],
  ["merci", "thank-you"],
];

const SEGMENT_TO_OTHER = new Map<string, string>(
  SEGMENT_PAIRS.flatMap(([a, b]) => [
    [a, b],
    [b, a],
  ])
);

/** French path segments (so we can detect "path is already in FR" and not double-translate). */
const FR_SEGMENTS = new Set(SEGMENT_PAIRS.map(([fr]) => fr));
/** English path segments (so we can detect "path is already in EN"). */
const EN_SEGMENTS = new Set(SEGMENT_PAIRS.map(([, en]) => en));

/**
 * Normalize path: no leading/trailing slashes, no repeated slashes.
 */
export function normalizePathSegment(path: string): string {
  return path.replace(/\/+/g, "/").replace(/^\/+|\/+$/g, "").trim();
}

/**
 * Build a locale URL with exactly one slash between segments. Never produces // or trailing/leading slashes.
 * e.g. buildLocaleUrl("en") => "/en", buildLocaleUrl("en", "team") => "/en/team", buildLocaleUrl("en", "contact/thank-you") => "/en/contact/thank-you"
 */
export function buildLocaleUrl(locale: Locale, pathWithoutLocale?: string): string {
  const segments = pathWithoutLocale
    ? normalizePathSegment(pathWithoutLocale).split("/").filter(Boolean)
    : [];
  return ["", locale, ...segments].join("/");
}

/**
 * Return the URL path segment for a route key in the given locale (no leading/trailing slashes).
 * e.g. getRoutePath("en", "team") => "team", getRoutePath("fr", "team") => "equipe"
 */
export function getRoutePath(locale: Locale, key: keyof (typeof ROUTE_PATH)["fr"]): string {
  return ROUTE_PATH[locale][key];
}

/**
 * Build full path (without locale) for a route. No leading slash.
 * e.g. getRoutePathSegment("en", "team") => "team", getRoutePathSegment("en", "contactThankYou") => "contact/thank-you"
 */
export function getRoutePathSegment(locale: Locale, key: string): string {
  if (key === "contactThankYou") {
    return `contact/${ROUTE_CONTACT_THANKYOU[locale]}`;
  }
  const seg = ROUTE_PATH[locale][key];
  return seg === "" ? "" : seg;
}

/**
 * Given pathWithoutLocale (e.g. "equipe" or "contact/merci") and current locale,
 * return the equivalent path in the other locale (for locale switcher links).
 * Path is normalized (no leading/trailing or repeated slashes).
 * If path is already in the other locale's format (e.g. /en/equipe with path "equipe"), returns it as-is so the link points to the correct FR URL.
 */
export function getPathForOtherLocale(
  currentLocale: Locale,
  pathWithoutLocale: string
): string {
  const normalized = normalizePathSegment(pathWithoutLocale);
  const segments = normalized.split("/").filter(Boolean);
  if (segments.length === 0) return "";

  const other: Locale = currentLocale === "en" ? "fr" : "en";
  const translated = [...segments];

  // If path is already in the other locale's format, return as-is (avoids wrong links when user is on e.g. /en/equipe).
  const firstIsOtherLocale =
    other === "fr" ? FR_SEGMENTS.has(translated[0]) : EN_SEGMENTS.has(translated[0]);
  const contactSubpathIsOtherLocale =
    translated[0] === "contact" &&
    translated[1] &&
    ((other === "fr" && translated[1] === "merci") || (other === "en" && translated[1] === "thank-you"));
  if (firstIsOtherLocale || contactSubpathIsOtherLocale) {
    return normalized;
  }

  const first = SEGMENT_TO_OTHER.get(translated[0]);
  if (first) {
    translated[0] = first;
  } else if (translated[0] === "expertises" && translated[1]) {
    const internalSlug = getExpertiseSlugFromUrl(currentLocale, translated[1]);
    if (internalSlug) {
      translated[1] = getExpertiseUrlSlug(other, internalSlug);
    }
  }
  if (translated[0] === "contact" && translated[1]) {
    const second = SEGMENT_TO_OTHER.get(translated[1]);
    if (second) translated[1] = second;
  }
  return translated.join("/");
}

/**
 * Return the path in the given locale’s canonical form (for redirects).
 * e.g. getCanonicalPathForLocale("en", "equipe") => "team", getCanonicalPathForLocale("fr", "team") => "equipe"
 */
export function getCanonicalPathForLocale(locale: Locale, pathWithoutLocale: string): string {
  const other: Locale = locale === "en" ? "fr" : "en";
  return getPathForOtherLocale(other, pathWithoutLocale);
}
