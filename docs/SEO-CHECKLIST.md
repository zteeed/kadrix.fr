# SEO implementation checklist

This file confirms every SEO item is implemented in the codebase. Use it to verify or audit.

---

## 1. Centralized SEO helper (`src/lib/seo.ts`)

| Item | Status | Location |
|------|--------|----------|
| `fullUrl(locale, path)` – absolute URL for canonical and sitemap | ✅ | Lines 10–13 |
| `alternateUrls(locale, path)` – FR/EN URLs for hreflang | ✅ | Lines 16–25 |
| `truncateDescription(description, 160)` – meta descriptions ~160 chars | ✅ | Lines 28–33 |
| `buildPageMetadata()` with Canonical URL | ✅ | Lines 61, 70 |
| `buildPageMetadata()` with Alternates (hreflang) fr-FR and en-GB | ✅ | Lines 71–75 |
| `buildPageMetadata()` with Open Graph: type, locale, url, siteName, title, description | ✅ | Lines 77–84 |
| `buildPageMetadata()` with Twitter: card, title, description | ✅ | Lines 85–89 |
| `buildPageMetadata()` with Robots: index/follow or noindex | ✅ | Line 69 |
| Title with " \| Kadrix" when title doesn’t contain "Kadrix" | ✅ | Lines 48–51, 64 |

---

## 2. Root layout (`src/app/layout.tsx`)

| Item | Status | Location |
|------|--------|----------|
| Viewport: width=device-width, initialScale=1, themeColor=#0ea5e9 | ✅ | Lines 6–10 |
| metadataBase | ✅ | Line 13 |
| title | ✅ | Line 14 |
| description | ✅ | Lines 15–16 |
| keywords | ✅ | Line 17 |
| authors | ✅ | Line 18 |
| creator | ✅ | Line 19 |
| publisher | ✅ | Line 20 |
| robots | ✅ | Line 21 |
| openGraph: type, siteName, locale, alternateLocale | ✅ | Lines 22–26 |
| twitter: card | ✅ | Lines 27–29 |
| JSON-LD Organization: name, url, description | ✅ | Lines 32–45 |
| JSON-LD contactPoint: email, availableLanguage | ✅ | Lines 39–44 |
| Script injection of JSON-LD in body | ✅ | Lines 55–58 |

---

## 3. Locale layout (`src/app/[locale]/layout.tsx`)

| Item | Status | Location |
|------|--------|----------|
| Open Graph: locale, alternateLocale, title, description | ✅ | Lines 24–28 |
| Twitter: title, description | ✅ | Lines 30–32 |

---

## 4. Per-page metadata (canonical + OG + hreflang)

| Page | File | Title source | Description source | noIndex |
|------|------|--------------|-------------------|--------|
| Home | `[locale]/page.tsx` | t.metadata.title | t.metadata.description | — | ✅ |
| Équipe / Team | `[locale]/equipe/page.tsx` | t.equipe.title | t.equipe.intro | — | ✅ |
| Contact | `[locale]/contact/layout.tsx` | t.contact.title | t.contact.intro | — | ✅ |
| Contact merci / thank-you | `[locale]/contact/merci/page.tsx` | t.contactMerci.title | t.contactMerci.body | **yes** | ✅ |
| Expertises list | `[locale]/expertises/page.tsx` | t.expertises.pageTitle | t.expertises.pageIntro | — | ✅ |
| Expertise [slug] | `[locale]/expertises/[slug]/page.tsx` | slugData.title - subtitle | slugData.description | — | ✅ |
| Références | `[locale]/references/layout.tsx` | t.references.title | t.references.intro | — | ✅ |
| Politique de confidentialité / Privacy | `[locale]/politique-de-confidentialite/page.tsx` | t.privacy.title | t.privacy.intro | — | ✅ |
| Mentions légales / Legal notice | `[locale]/mentions-legales/page.tsx` | t.legal.title | t.legal.title | — | ✅ |

All of the above use `buildPageMetadata()` from `@/lib/seo`, so they get canonical, hreflang, Open Graph, Twitter, and robots.

---

## 5. Sitemap & robots

| Item | Status | File |
|------|--------|------|
| sitemap.xml: home (both locales) | ✅ | `src/app/sitemap.ts` |
| sitemap.xml: contact, thank-you, equipe/team, expertises, expertises/[slug], references, privacy, legal | ✅ | Same file, loop over ROUTE_PATH + thank-you + expertise slugs |
| lastModified, changeFrequency, priority on each entry | ✅ | Same file |
| robots.txt: allow / | ✅ | `src/app/robots.ts` |
| robots.txt: sitemap URL | ✅ | Same file |

---

## 6. Semantic HTML & images

| Item | Status | Location |
|------|--------|----------|
| `<header>` | ✅ | `src/components/Header.tsx` |
| `<nav>` | ✅ | `src/components/Header.tsx` (desktop + mobile) |
| `<main>` | ✅ | `src/app/[locale]/layout.tsx` |
| `<footer>` | ✅ | `src/components/Footer.tsx` |
| One H1 per page: Home (Hero) | ✅ | `src/components/home/Hero.tsx` |
| One H1: Équipe, Contact, Merci, Expertises list, Expertises slug, Références, Privacy, Legal | ✅ | Respective page components |
| Images: descriptive alt (Partners) | ✅ | `src/components/home/Partners.tsx` – alt={partner.name} |
| Images: descriptive alt (ExpertiseTechnologies) | ✅ | `src/components/expertises/ExpertiseTechnologies.tsx` – alt={name} |
| Images: descriptive alt (Founders) | ✅ | `src/components/home/Founders.tsx` – alt={founder.name} |

---

## 7. Verification commands

```bash
npm run build          # Must succeed; outputs include robots.txt and sitemap.xml
npx next lint          # No errors on src/lib/seo.ts, sitemap.ts, robots.ts
```

After build, check:

- `out/robots.txt` – contains `Allow: /` and `Sitemap: https://www.kadrix.fr/sitemap.xml`
- `out/sitemap.xml` – contains URLs for /fr, /en, and all locale routes above

---

*Last verified: all items implemented in codebase.*
