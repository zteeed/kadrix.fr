import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SetLang } from "@/components/SetLang";
import { CanonicalUrlRedirect } from "@/components/CanonicalUrlRedirect";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getTranslations, type Messages } from "@/i18n/request";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getTranslations(locale);
  return {
    title: t.metadata.title,
    description: t.metadata.description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getTranslations(locale) as Messages;
  return (
    <>
      <CanonicalUrlRedirect />
      <SetLang lang={locale as Locale} />
      <Header locale={locale as Locale} t={t} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale as Locale} t={t} />
    </>
  );
}
