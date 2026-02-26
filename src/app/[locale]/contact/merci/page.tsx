import Link from "next/link";
import { getTranslations } from "@/i18n/request";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactMerciPage({ params }: Props) {
  const { locale } = await params;
  const t = getTranslations(locale);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
      <h1 className="text-3xl font-bold text-kadrix-dark sm:text-4xl">
        {t.contactMerci.title}
      </h1>
      <p className="mt-4 text-lg text-kadrix-muted">{t.contactMerci.body}</p>
      <Link
        href={`/${locale}`}
        className="mt-8 inline-block rounded-full bg-kadrix-primary px-6 py-3 text-base font-medium text-white hover:bg-sky-600"
      >
        {t.common.backToHome}
      </Link>
    </div>
  );
}
