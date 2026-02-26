import type { Metadata } from "next";
import { getTranslations } from "@/i18n/request";
import { getRoutePath } from "@/data/routes";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") return {};
  const t = getTranslations(locale);
  const pathSegment = getRoutePath(locale as "fr" | "en", "privacy");
  return buildPageMetadata({
    locale: locale as "fr" | "en",
    pathWithoutLocale: pathSegment,
    title: t.privacy.title,
    description: t.privacy.intro,
  });
}

export default async function PolitiqueConfidentialitePage({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);
  const s = t.privacy.sections as Record<
    string,
    { title: string; body: string; items?: string[]; cnil?: string }
  >;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-kadrix-dark">{t.privacy.title}</h1>
      <p className="mt-2 text-sm text-kadrix-muted">{t.privacy.updated}</p>

      <p className="mt-6 text-kadrix-muted">{t.privacy.intro}</p>

      <div className="mt-10 space-y-10 text-kadrix-muted">
        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.controller.title}
          </h2>
          <p className="mt-2">
            {s.controller.body}
            <a href="mailto:contact@kadrix.fr" className="text-kadrix-primary hover:underline">
              contact@kadrix.fr
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.data.title}
          </h2>
          <p className="mt-2">{s.data.body}</p>
          {s.data.items && (
            <ul className="mt-2 list-inside list-disc space-y-1">
              {s.data.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.purposes.title}
          </h2>
          <p className="mt-2">{s.purposes.body}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.retention.title}
          </h2>
          <p className="mt-2">{s.retention.body}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.recipients.title}
          </h2>
          <p className="mt-2">{s.recipients.body}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.rights.title}
          </h2>
          <p className="mt-2">
            {s.rights.body}
            <a href="mailto:contact@kadrix.fr" className="text-kadrix-primary hover:underline">
              contact@kadrix.fr
            </a>
            . {s.rights.cnil}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kadrix-primary hover:underline"
            >
              www.cnil.fr
            </a>
            ).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.cookies.title}
          </h2>
          <p className="mt-2">{s.cookies.body}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-kadrix-dark">
            {s.changes.title}
          </h2>
          <p className="mt-2">{s.changes.body}</p>
        </section>
      </div>
    </div>
  );
}
