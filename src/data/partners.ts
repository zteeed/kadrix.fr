/**
 * Liste partagée des partenaires (section Partenaires home + page Références).
 * sectorKey sert au filtrage sur la page Références (voir i18n references.sectorLabels).
 */
export const PARTNER_SECTOR_KEYS = [
  "all",
  "industry",
  "services",
  "finance",
  "retail",
  "tech",
] as const;

export type PartnerSectorKey = (typeof PARTNER_SECTOR_KEYS)[number];

export type Partner = {
  name: string;
  slug: string;
  domain: string;
  url: string;
  sectorKey: PartnerSectorKey;
  logoExt?: "svg" | "png" | "jpg";
  reduceOuterMargin?: "left" | "right";
  reduceInnerMargin?: "left" | "right" | "both";
};

export const PARTNERS: readonly Partner[] = [
  {
    name: "Carrefour",
    slug: "carrefour",
    domain: "carrefour.com",
    url: "https://www.carrefour.com",
    sectorKey: "retail",
    logoExt: "svg",
    reduceOuterMargin: "left",
    reduceInnerMargin: "right",
  },
  {
    name: "Renault",
    slug: "renault",
    domain: "renault.com",
    url: "https://www.renault.com",
    sectorKey: "industry",
    reduceInnerMargin: "both",
  },
  {
    name: "Groupama",
    slug: "groupama",
    domain: "groupama.com",
    url: "https://www.groupama.com",
    sectorKey: "finance",
    logoExt: "png",
    reduceInnerMargin: "both",
  },
  {
    name: "Murex",
    slug: "murex",
    domain: "murex.com",
    url: "https://www.murex.com",
    sectorKey: "finance",
  },
  {
    name: "Cleyrop",
    slug: "cleyrop",
    domain: "cleyrop.com",
    url: "https://www.cleyrop.com",
    sectorKey: "tech",
  },
  {
    name: "Safran",
    slug: "safran",
    domain: "safran-group.com",
    url: "https://www.safran-group.com",
    sectorKey: "industry",
  },
  {
    name: "Thales",
    slug: "thales",
    domain: "thalesgroup.com",
    url: "https://www.thalesgroup.com",
    sectorKey: "industry",
  },
  {
    name: "Ministère des Armées",
    slug: "ministere-armees",
    domain: "defense.gouv.fr",
    url: "https://www.defense.gouv.fr",
    sectorKey: "services",
    logoExt: "jpg",
    reduceInnerMargin: "both",
  },
  {
    name: "Quicksign",
    slug: "quicksign",
    domain: "quicksign.com",
    url: "https://www.quicksign.com",
    sectorKey: "tech",
  },
  {
    name: "FDJ",
    slug: "fdj",
    domain: "fdj.fr",
    url: "https://www.fdj.fr",
    sectorKey: "finance",
  },
  {
    name: "Decathlon",
    slug: "decathlon",
    domain: "decathlon.com",
    url: "https://www.decathlon.com",
    sectorKey: "retail",
    reduceInnerMargin: "both",
  },
  {
    name: "Nexity",
    slug: "nexity",
    domain: "nexity.fr",
    url: "https://www.nexity.fr",
    sectorKey: "services",
    reduceInnerMargin: "both",
  },
  {
    name: "3DS Outscale",
    slug: "outscale",
    domain: "outscale.com",
    url: "https://www.outscale.com",
    sectorKey: "tech",
  },
  {
    name: "Ere Conseils",
    slug: "ere-conseils",
    domain: "ereconseils.com",
    url: "https://www.ereconseils.com",
    sectorKey: "services",
    logoExt: "jpg",
    reduceOuterMargin: "right",
    reduceInnerMargin: "left",
  },
];

export function partnerLogoSrc(partner: Partner): string {
  const ext = partner.logoExt ?? "png";
  return `/partenaires/${partner.slug}.${ext}`;
}
