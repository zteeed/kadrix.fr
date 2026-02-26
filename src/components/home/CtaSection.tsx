import Link from "next/link";
import type { Messages } from "@/i18n/request";
import type { Locale } from "@/i18n/config";

export function CtaSection({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <section className="border-t border-slate-200 bg-kadrix-dark py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t.home.ctaSection.title}
        </h2>
        <p className="mt-4 text-slate-300">{t.home.ctaSection.body}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-kadrix-primary px-8 py-4 text-base font-medium text-white hover:bg-sky-500"
        >
          {t.common.cta}
        </Link>
      </div>
    </section>
  );
}
