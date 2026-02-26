import Link from "next/link";
import type { Messages } from "@/i18n/request";
import type { Locale } from "@/i18n/config";

export function About({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <section className="border-t border-slate-200 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-2xl font-bold text-kadrix-dark sm:text-3xl">kadrix.</p>
          <h2 className="mt-4 text-2xl font-bold text-kadrix-dark sm:text-3xl">
            {t.home.about.title}
          </h2>
          <p className="mt-6 text-lg text-kadrix-muted">{t.home.about.p1}</p>
          <p className="mt-4 text-lg text-kadrix-muted">{t.home.about.p2}</p>
          <Link
            href={`/${locale}/contact`}
            className="mt-10 inline-block text-kadrix-primary font-medium hover:underline"
          >
            {t.common.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
