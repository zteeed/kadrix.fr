import Link from "next/link";
import type { Messages } from "@/i18n/request";
import type { Locale } from "@/i18n/config";
import { buildLocaleUrl } from "@/data/routes";

export function Hero({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-kadrix-dark sm:text-5xl lg:text-6xl">
          {t.home.hero.title}
        </h1>
        <p className="mt-4 text-lg text-kadrix-muted sm:text-xl">
          <span className="font-medium text-kadrix-dark">{t.home.hero.subtitle}</span>
        </p>
        <p className="mt-6 max-w-2xl mx-auto text-base text-kadrix-muted sm:text-lg">
          {t.home.hero.body}
        </p>
        <Link
          href={buildLocaleUrl(locale, "contact")}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-kadrix-primary px-8 py-4 text-base font-medium text-white shadow-lg transition hover:bg-sky-600"
        >
          {t.common.cta}
        </Link>
      </div>
    </section>
  );
}
