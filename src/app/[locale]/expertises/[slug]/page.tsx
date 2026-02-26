import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "@/i18n/request";
import { EXPERTISE_SLUGS, type ExpertiseSlug } from "@/data/expertise-technologies";
import { ExpertiseTechnologies } from "@/components/expertises/ExpertiseTechnologies";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  const slugs = EXPERTISE_SLUGS.map((slug) => ({ slug }));
  return slugs.flatMap(({ slug }) => [
    { locale: "fr", slug },
    { locale: "en", slug },
  ]);
}

export default async function ExpertisePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!EXPERTISE_SLUGS.includes(slug as ExpertiseSlug)) {
    notFound();
  }
  const t = getTranslations(locale);
  const slugData = (t.expertises.slug as Record<string, { title: string; subtitle: string; description: string; services?: Array<{ title: string; text: string }> }>)[slug];
  if (!slugData) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-kadrix-dark sm:text-4xl">
          {slugData.title}
        </h1>
        <p className="mt-4 text-xl text-kadrix-muted">{slugData.subtitle}</p>
        <p className="mt-6 text-kadrix-muted">{slugData.description}</p>
        <Link
          href={`/${locale}/contact`}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-kadrix-primary px-6 py-3 text-sm font-medium text-white hover:bg-sky-600"
        >
          {t.common.cta}
        </Link>
      </div>

      {slugData.services && slugData.services.length > 0 && (
        <div className="mt-20 border-t border-slate-200 pt-16">
          <h2 className="text-xl font-bold text-kadrix-dark">
            {t.common.ourServices}
          </h2>
          <ul className="mt-8 space-y-8">
            {slugData.services.map((service) => (
              <li
                key={service.title}
                className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200/80"
              >
                <h3 className="font-semibold text-kadrix-dark">
                  {service.title}
                </h3>
                <p className="mt-2 text-kadrix-muted">{service.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ExpertiseTechnologies
        slug={slug as ExpertiseSlug}
        title={t.expertises.technologiesTitle}
        techNames={t.expertises.techNames as Record<string, string>}
      />

      <div className="mt-20 text-center">
        <Link
          href={`/${locale}/expertises`}
          className="text-kadrix-primary font-medium hover:underline"
        >
          {t.common.allExpertises}
        </Link>
      </div>
    </div>
  );
}
