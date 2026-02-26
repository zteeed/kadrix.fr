import type { Metadata } from "next";
import { getTranslations } from "@/i18n/request";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  return {
    title: t.legal.title,
    description: t.legal.title,
  };
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const s = t.legal.sections as Record<
    string,
    { title: string; body: string; company?: string; contact?: string }
  >;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-kadrix-dark">{t.legal.title}</h1>
      <p className="mt-2 text-sm text-kadrix-muted">{t.legal.updated}</p>

      <div className="mt-10 space-y-10 text-kadrix-muted">
        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.publisher.title}
          </h2>
          <p className="mt-2">{s.publisher.body}</p>
          <p className="mt-2">
            <strong>{s.publisher.company}</strong>
            <br />
            [Forme juridique : SAS, SARL, etc.]
            <br />
            [Siège social : adresse complète]
            <br />
            [Code postal et ville]
          </p>
          <p className="mt-2">[RCS / SIRET / capital social si applicable]</p>
          <p className="mt-2">
            {s.publisher.contact}
            <a href="mailto:contact@kadrix.fr" className="text-kadrix-primary hover:underline">
              contact@kadrix.fr
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.director.title}
          </h2>
          <p className="mt-2">{s.director.body}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.hosting.title}
          </h2>
          <p className="mt-2">
            {s.hosting.body}
            <br />
            [Nom de l&apos;hébergeur]
            <br />
            [Adresse de l&apos;hébergeur]
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.ip.title}
          </h2>
          <p className="mt-2">{s.ip.body}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.links.title}
          </h2>
          <p className="mt-2">{s.links.body}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.disclaimer.title}
          </h2>
          <p className="mt-2">{s.disclaimer.body}</p>
        </section>
      </div>
    </div>
  );
}
