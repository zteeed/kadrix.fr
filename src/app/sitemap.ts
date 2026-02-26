import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";
import { ROUTE_PATH, ROUTE_CONTACT_THANKYOU } from "@/data/routes";
import { getExpertiseUrlSlugs } from "@/data/expertise-technologies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new Date();
  const locales = ["fr", "en"] as const;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const routes = ROUTE_PATH[locale];
    // Home
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: base,
      changeFrequency: "weekly",
      priority: 1,
    });
    // Main routes (skip home empty)
    for (const [key, segment] of Object.entries(routes)) {
      if (!segment) continue;
      entries.push({
        url: `${BASE_URL}/${locale}/${segment}`,
        lastModified: base,
        changeFrequency: key === "contact" ? "monthly" : "weekly",
        priority: 0.9,
      });
    }
    // Contact thank-you
    const thankYou = ROUTE_CONTACT_THANKYOU[locale];
    entries.push({
      url: `${BASE_URL}/${locale}/contact/${thankYou}`,
      lastModified: base,
      changeFrequency: "monthly",
      priority: 0.3,
    });
    // Expertises detail
    const expertiseSlugs = getExpertiseUrlSlugs(locale);
    for (const slug of expertiseSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/expertises/${slug}`,
        lastModified: base,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
