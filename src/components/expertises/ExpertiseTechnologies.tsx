"use client";

import Image from "next/image";
import {
  type ExpertiseSlug,
  EXPERTISE_TECHNOLOGIES,
  TECH_DISPLAY_NAMES,
} from "@/data/expertise-technologies";

type Props = {
  slug: ExpertiseSlug;
  title: string;
  /** Noms affichés par id (optionnel, sinon TECH_DISPLAY_NAMES) */
  techNames?: Record<string, string>;
};

function logoSrc(id: string) {
  return `/technologies/${id}.svg`;
}

export function ExpertiseTechnologies({ slug, title, techNames }: Props) {
  const ids = EXPERTISE_TECHNOLOGIES[slug];
  if (!ids?.length) return null;

  return (
    <div className="mt-16 border-t border-slate-200 pt-16">
      <h2 className="text-xl font-bold text-kadrix-dark">{title}</h2>
      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-12">
        {ids.map((id) => {
          const name = techNames?.[id] ?? TECH_DISPLAY_NAMES[id] ?? id;
          return (
            <li
              key={id}
              className="flex w-28 flex-shrink-0 flex-col items-center justify-center gap-2"
            >
              <span
                className="relative flex h-14 w-full items-center justify-center"
                title={name}
              >
                <Image
                  src={logoSrc(id)}
                  alt={name}
                  width={112}
                  height={56}
                  className="max-h-12 w-full object-contain object-center opacity-90"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "block";
                  }}
                />
                <span
                  className="text-center text-sm font-medium text-kadrix-muted"
                  style={{ display: "none" }}
                  aria-hidden
                >
                  {name}
                </span>
              </span>
              <span className="text-center text-xs font-medium text-kadrix-muted">
                {name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
