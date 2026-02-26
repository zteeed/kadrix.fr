import type { Locale } from "./config";
import { defaultLocale, isValidLocale } from "./config";
import fr from "@/messages/fr.json";
import en from "@/messages/en.json";

export type Messages = typeof fr;

const messages: Record<Locale, Messages> = { fr, en };

export function getTranslations(locale: string): Messages {
  const l = isValidLocale(locale) ? locale : defaultLocale;
  return messages[l] ?? messages[defaultLocale];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isValidLocale(segment) ? segment : defaultLocale;
}
