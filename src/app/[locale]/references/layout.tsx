import type { Metadata } from "next";
import { getTranslations } from "@/i18n/request";
import { buildPageMetadata } from "@/lib/seo";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "fr" && locale !== "en") return {};
  const t = getTranslations(locale);
  return buildPageMetadata({
    locale: locale as "fr" | "en",
    pathWithoutLocale: "references",
    title: t.references.title,
    description: t.references.intro,
  });
}

export default function ReferencesLayout({ children }: Props) {
  return <>{children}</>;
}
