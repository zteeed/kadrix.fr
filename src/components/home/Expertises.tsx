import Link from "next/link";
import type { Messages } from "@/i18n/request";
import type { Locale } from "@/i18n/config";
import { getExpertiseUrlSlug } from "@/data/expertise-technologies";
import type { ExpertiseSlug } from "@/data/expertise-technologies";
import { buildLocaleUrl } from "@/data/routes";

export function Expertises({ t, locale }: { t: Messages; locale: Locale }) {
  const localeTyped = locale === "en" ? "en" : "fr";
  const expertises = (t.home.expertises.items as Array<{ title: string; href: string }>).map(
    ({ title, href }) => ({
      title,
      href: buildLocaleUrl(localeTyped, `expertises/${getExpertiseUrlSlug(localeTyped, href as ExpertiseSlug)}`),
    })
  );

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-kadrix-dark sm:text-3xl">
          {t.home.expertises.title}
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {expertises.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-kadrix-primary/50 hover:shadow-md"
            >
              <span className="font-medium text-kadrix-dark group-hover:text-kadrix-primary">
                {title}
              </span>
              <span className="ml-2 text-kadrix-muted group-hover:text-kadrix-primary">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
