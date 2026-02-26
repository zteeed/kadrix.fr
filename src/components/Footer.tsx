import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/request";

const footerLinkKeys = [
  { href: "politique-de-confidentialite", labelKey: "privacy" },
  { href: "mentions-legales", labelKey: "legal" },
] as const;

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const base = `/${locale}`;
  const footerLinks = footerLinkKeys.map(({ href, labelKey }) => ({
    href: `${base}/${href}`,
    label: t.common.footer[labelKey as keyof typeof t.common.footer],
  }));

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-kadrix-dark">kadrix.</p>
            <p className="mt-2 text-sm text-kadrix-muted">{t.common.footer.tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-kadrix-dark">{t.common.footer.contact}</h3>
            <p className="mt-3 text-sm text-kadrix-muted">
              <a href="mailto:contact@kadrix.fr" className="hover:text-kadrix-primary">
                contact@kadrix.fr
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-kadrix-dark">{t.common.footer.links}</h3>
            <ul className="mt-3 space-y-2">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-kadrix-muted hover:text-kadrix-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8 text-center text-sm text-kadrix-muted">
          © {new Date().getFullYear()} Kadrix. {t.common.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
