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
    pathWithoutLocale: "contact",
    title: t.contact.title,
    description: t.contact.intro,
  });
}

export default function ContactLayout({ children }: Props) {
  return <>{children}</>;
}
