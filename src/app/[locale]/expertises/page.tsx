import Link from "next/link";
import { getTranslations } from "@/i18n/request";

type Props = { params: Promise<{ locale: string }> };

export default async function ExpertisesPage({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const list = t.expertises.list as Array<{
    title: string;
    slug: string;
    description: string;
  }>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-kadrix-dark sm:text-4xl">
          {t.expertises.pageTitle}
        </h1>
        <p className="mt-4 text-lg text-kadrix-muted">
          {t.expertises.pageIntro}
        </p>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(({ title, slug, description }) => (
          <Link
            key={slug}
            href={`/${locale}/expertises/${slug}`}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-kadrix-primary/30 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-kadrix-dark group-hover:text-kadrix-primary">
              {title}
            </h2>
            <p className="mt-2 text-sm text-kadrix-muted">{description}</p>
            <span className="mt-4 inline-block text-sm font-medium text-kadrix-primary">
              {t.common.learnMore}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
