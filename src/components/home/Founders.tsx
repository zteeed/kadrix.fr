"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Messages } from "@/i18n/request";
import type { Locale } from "@/i18n/config";
import { buildLocaleUrl } from "@/data/routes";

function FounderCard({
  founder,
  linkedinLabel,
}: {
  founder: { name: string; role: string; slug: string; imageFile: string; initials: string; description: string; linkedinUrl: string };
  linkedinLabel: string;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80 text-center">
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-3xl font-semibold text-kadrix-muted">
        {!imgError ? (
          <Image
            src={`/team/${founder.imageFile}`}
            alt={founder.name}
            width={128}
            height={128}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{founder.initials}</span>
        )}
      </div>
      <p className="mt-4 text-lg font-semibold text-kadrix-dark">{founder.name}</p>
      <p className="text-kadrix-primary font-medium">{founder.role}</p>
      <p className="mt-2 text-sm text-kadrix-muted">{founder.description}</p>
      <a
        href={founder.linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center text-kadrix-muted transition hover:text-[#0A66C2]"
        aria-label={`${linkedinLabel} ${founder.name}`}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
}

const slugs = ["aymeric-du-reau", "jean-christophe-kourajian", "aurelien-duboc"];
const imageFiles = ["aymeric-du-reau.jpg", "jean-christophe-kourajian-2.jpg", "aurelien-duboc.jpg"];
const linkedinUrls = [
  "https://www.linkedin.com/in/aymeric-du-reau/",
  "https://www.linkedin.com/in/jckourajian/",
  "https://www.linkedin.com/in/aurelien-duboc/",
];

export function Founders({ t, locale }: { t: Messages; locale: Locale }) {
  const founders = (t.home.foundersList as Array<{ name: string; role: string; description: string }>).map(
    (f, i) => ({
      ...f,
      slug: slugs[i],
      imageFile: imageFiles[i],
      initials: f.name.split(" ").map((n) => n[0]).join("").slice(0, 3),
      linkedinUrl: linkedinUrls[i],
    })
  );

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-kadrix-dark sm:text-3xl">
          {t.home.founders.title}
        </h2>
        <div className="mx-auto mt-12 grid max-w-5xl gap-10 sm:grid-cols-3">
          {founders.map((founder) => (
            <FounderCard
              key={founder.slug}
              founder={founder}
              linkedinLabel={t.home.founders.linkedin}
            />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={buildLocaleUrl(locale, "contact")}
            className="inline-flex items-center justify-center rounded-full bg-kadrix-primary px-6 py-3 text-sm font-medium text-white hover:bg-sky-600"
          >
            {t.common.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
