import Link from "next/link";
import { getTranslations } from "@/i18n/request";

const linkedinUrls = [
  "https://www.linkedin.com/in/aymeric-du-reau/",
  "https://www.linkedin.com/in/jckourajian/",
  "https://www.linkedin.com/in/aurelien-duboc/",
];

type Props = { params: Promise<{ locale: string }> };

export default async function EquipePage({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const foundersList = t.home.foundersList as Array<{ name: string; role: string; description: string }>;
  const teams = t.equipe.teams as Array<{ name: string; count: string; description: string }>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-kadrix-dark sm:text-4xl">
          {t.equipe.title}
        </h1>
        <p className="mt-4 text-lg text-kadrix-muted">{t.equipe.intro}</p>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-bold text-kadrix-dark">
          {t.equipe.foundersTitle}
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {foundersList.map((f, i) => (
            <div
              key={f.name}
              className="rounded-2xl bg-slate-50 p-8 ring-1 ring-slate-200/80"
            >
              <p className="text-lg font-semibold text-kadrix-dark">{f.name}</p>
              <p className="mt-1 text-kadrix-primary font-medium">{f.role}</p>
              <p className="mt-2 text-sm text-kadrix-muted">{f.description}</p>
              <a
                href={linkedinUrls[i]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center text-kadrix-muted transition hover:text-[#0A66C2]"
                aria-label={`${t.equipe.linkedin} ${f.name}`}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-full bg-kadrix-primary px-6 py-3 text-sm font-medium text-white hover:bg-sky-600"
          >
            {t.common.cta}
          </Link>
        </div>
      </section>

      <section className="mt-20 border-t border-slate-200 pt-16">
        <h2 className="text-xl font-bold text-kadrix-dark">{t.equipe.teamTitle}</h2>
        <p className="mt-4 text-kadrix-muted">{t.equipe.teamIntro}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => (
            <div
              key={team.name}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <p className="text-2xl font-bold text-kadrix-primary">{team.count}</p>
              <p className="mt-2 font-semibold text-kadrix-dark">{team.name}</p>
              <p className="mt-1 text-sm text-kadrix-muted">{team.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-20 text-center">
        <Link
          href={`/${locale}/contact`}
          className="font-medium text-kadrix-primary hover:underline"
        >
          {t.equipe.projectCta}
        </Link>
      </div>
    </div>
  );
}
