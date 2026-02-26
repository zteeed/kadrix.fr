"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getTranslations } from "@/i18n/request";
import type { Locale } from "@/i18n/config";
import { PARTNERS } from "@/data/partners";
import type { PartnerSectorKey } from "@/data/partners";

export default function ReferencesPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) ?? "fr";
  const t = getTranslations(locale);
  const sectors = t.references.sectors as PartnerSectorKey[];
  const sectorLabels = t.references.sectorLabels as Record<PartnerSectorKey, string>;
  const partnerDescriptions = t.references.partnerDescriptions as Record<string, string>;
  const [selectedSector, setSelectedSector] = useState<PartnerSectorKey>(sectors[0]);
  const filteredPartners =
    selectedSector === "all"
      ? PARTNERS
      : PARTNERS.filter((p) => p.sectorKey === selectedSector);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-kadrix-dark sm:text-4xl">
          {t.references.title}
        </h1>
        <p className="mt-4 text-lg text-kadrix-muted">{t.references.intro}</p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {sectors.map((sectorKey) => (
          <button
            key={sectorKey}
            type="button"
            onClick={() => setSelectedSector(sectorKey)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              selectedSector === sectorKey
                ? "border-kadrix-primary bg-kadrix-primary/10 text-kadrix-primary"
                : "border-slate-300 bg-white text-kadrix-muted hover:border-kadrix-primary hover:text-kadrix-primary"
            }`}
          >
            {sectorLabels[sectorKey]}
          </button>
        ))}
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredPartners.map((partner) => (
          <div
            key={partner.slug}
            className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center"
          >
            <p className="font-semibold text-kadrix-dark">{partner.name}</p>
            <p className="mt-1 text-sm text-kadrix-muted">
              {sectorLabels[partner.sectorKey]}
            </p>
            <p className="mt-2 text-xs text-kadrix-muted">
              {partnerDescriptions[partner.slug] ?? ""}
            </p>
          </div>
        ))}
      </div>

      <section className="mt-20 border-t border-slate-200 pt-16 text-center">
        <h2 className="text-lg font-semibold text-kadrix-dark">
          {t.references.trust}
        </h2>
        <p className="mt-4 text-sm text-kadrix-muted">
          {t.references.trustBody}
        </p>
      </section>
    </div>
  );
}
