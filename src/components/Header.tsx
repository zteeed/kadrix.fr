"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/request";
import { getRoutePath, getPathForOtherLocale, normalizePathSegment, buildLocaleUrl } from "@/data/routes";

const navKeys = [
  { routeKey: "home", labelKey: "nav.home" },
  { routeKey: "expertises", labelKey: "nav.expertises" },
  { routeKey: "references", labelKey: "nav.references" },
  { routeKey: "team", labelKey: "nav.team" },
  { routeKey: "contact", labelKey: "nav.contact" },
] as const;

export function Header({
  locale,
  t,
}: {
  locale: Locale;
  t: Messages;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const localeTyped = locale === "en" ? "en" : "fr";
  const navLinks = navKeys.map(({ routeKey, labelKey }) => {
    const path = routeKey === "home" ? "" : getRoutePath(localeTyped, routeKey);
    return {
      href: buildLocaleUrl(localeTyped, path),
      label: t.common.nav[labelKey.split(".")[1] as keyof typeof t.common.nav],
    };
  });

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={buildLocaleUrl(localeTyped)} className="text-xl font-bold tracking-tight text-kadrix-dark">
          kadrix.
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors hover:text-kadrix-primary ${
                pathname === href ? "text-kadrix-primary" : "text-kadrix-muted"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <LocaleSwitcher locale={locale} pathname={pathname} t={t} />
          <Link
            href={buildLocaleUrl(localeTyped, "contact")}
            className="inline-flex items-center justify-center rounded-full bg-kadrix-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-sky-600"
          >
            {t.common.cta}
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.common.menu}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <LocaleSwitcher locale={locale} pathname={pathname} t={t} className="mt-2" />
            <Link
              href={buildLocaleUrl(localeTyped, "contact")}
              className="mt-2 rounded-full bg-kadrix-primary px-4 py-2.5 text-center text-sm font-medium text-white"
              onClick={() => setMenuOpen(false)}
            >
              {t.common.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function LocaleSwitcher({
  locale,
  pathname,
  t,
  className = "",
}: {
  locale: Locale;
  pathname: string;
  t: Messages;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Strip locale and any number of slashes so /en////equipe => equipe
  const rawPath = pathname.replace(/^\/[a-z]{2}\/*/, "") || "";
  const pathWithoutLocale = normalizePathSegment(rawPath);
  const frPathNorm = getPathForOtherLocale("en", pathWithoutLocale);
  const enPathNorm = getPathForOtherLocale("fr", pathWithoutLocale);
  const frHref = buildLocaleUrl("fr", frPathNorm);
  const enHref = buildLocaleUrl("en", enPathNorm);
  const currentFlag = locale === "fr" ? "🇫🇷" : "🇺🇸";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg transition hover:border-kadrix-primary hover:bg-slate-50 md:h-8 md:w-8"
        aria-label={locale === "fr" ? t.common.switchToEnglish : t.common.switchToFrench}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {currentFlag}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          <Link
            href={frHref}
            className={`flex items-center gap-2 px-3 py-2 text-sm transition hover:bg-slate-50 ${
              locale === "fr" ? "bg-slate-50 font-medium text-kadrix-primary" : "text-slate-700"
            }`}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden>🇫🇷</span>
            {t.common.langFrench}
          </Link>
          <Link
            href={enHref}
            className={`flex items-center gap-2 px-3 py-2 text-sm transition hover:bg-slate-50 ${
              locale === "en" ? "bg-slate-50 font-medium text-kadrix-primary" : "text-slate-700"
            }`}
            onClick={() => setOpen(false)}
          >
            <span aria-hidden>🇺🇸</span>
            {t.common.langEnglish}
          </Link>
        </div>
      )}
    </div>
  );
}
