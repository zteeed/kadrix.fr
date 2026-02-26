import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Founders } from "@/components/home/Founders";
import { Expertises } from "@/components/home/Expertises";
import { Partners } from "@/components/home/Partners";
import { CtaSection } from "@/components/home/CtaSection";
import { getTranslations } from "@/i18n/request";
import type { Locale } from "@/i18n/config";
import { getRoutePath, buildLocaleUrl } from "@/data/routes";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <>
      <Hero t={t} locale={locale as Locale} />
      <Partners />
      <About t={t} locale={locale as Locale} />
      <Founders t={t} locale={locale as Locale} />
      <Expertises t={t} locale={locale as Locale} />
      <section className="border-y border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-kadrix-muted">{t.home.teamSection.title}</h2>
          <p className="mt-2 text-sm text-kadrix-muted">{t.home.teamSection.body}</p>
          <Link
            href={buildLocaleUrl(locale as "fr" | "en", getRoutePath(locale as "fr" | "en", "team"))}
            className="mt-6 inline-block text-sm font-medium text-kadrix-primary hover:underline"
          >
            {t.home.teamSection.link}
          </Link>
        </div>
      </section>
      <CtaSection t={t} locale={locale as Locale} />
    </>
  );
}
