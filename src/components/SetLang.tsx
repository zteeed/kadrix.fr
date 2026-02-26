"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export function SetLang({ lang }: { lang: Locale }) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  return null;
}
