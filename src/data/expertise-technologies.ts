/**
 * Technologies (logos) affichées par page d'expertise.
 * Les fichiers logos doivent être dans public/technologies/ : {id}.svg ou {id}.png
 */
export const EXPERTISE_SLUGS = [
  "intelligence-artificielle",
  "infrastructure-cloud",
  "disponibilite-monitoring",
  "automatisation",
  "developpement-sur-mesure",
  "cybersecurite",
] as const;

export type ExpertiseSlug = (typeof EXPERTISE_SLUGS)[number];

/** URL slug per locale. FR keeps French slugs; EN uses English slugs for /en/ URLs. */
export const EXPERTISE_URL_SLUG: Record<"fr" | "en", Record<ExpertiseSlug, string>> = {
  fr: {
    "intelligence-artificielle": "intelligence-artificielle",
    "infrastructure-cloud": "infrastructure-cloud",
    "disponibilite-monitoring": "disponibilite-monitoring",
    automatisation: "automatisation",
    "developpement-sur-mesure": "developpement-sur-mesure",
    cybersecurite: "cybersecurite",
  },
  en: {
    "intelligence-artificielle": "artificial-intelligence",
    "infrastructure-cloud": "cloud-infrastructure",
    "disponibilite-monitoring": "availability-monitoring",
    automatisation: "automation",
    "developpement-sur-mesure": "web-development",
    cybersecurite: "cybersecurity",
  },
};

/** All URL slugs that can appear in the route for a locale (for params resolution). */
export function getExpertiseUrlSlugs(locale: "fr" | "en"): string[] {
  return EXPERTISE_SLUGS.map((key) => EXPERTISE_URL_SLUG[locale][key]);
}

/** Resolve (locale, urlSlug) to internal ExpertiseSlug; returns null if unknown. */
export function getExpertiseSlugFromUrl(
  locale: "fr" | "en",
  urlSlug: string
): ExpertiseSlug | null {
  const slugs = EXPERTISE_URL_SLUG[locale];
  const entry = Object.entries(slugs).find(([, s]) => s === urlSlug);
  return entry ? (entry[0] as ExpertiseSlug) : null;
}

/** Get the URL slug for an expertise in a given locale (for building links). */
export function getExpertiseUrlSlug(locale: "fr" | "en", internalSlug: ExpertiseSlug): string {
  return EXPERTISE_URL_SLUG[locale][internalSlug];
}

/** Id technique pour le fichier logo (sans extension). Nom d'affichage dérivé ou via i18n. */
export const EXPERTISE_TECHNOLOGIES: Record<ExpertiseSlug, string[]> = {
  "intelligence-artificielle": [
    "python",
    "tensorflow",
    "pytorch",
    "huggingface",
    "openai",
    "vertex-ai",
    "gemini",
    "anthropic",
    "mistral",
    "langchain",
    "pandas",
  ],
  "infrastructure-cloud": [
    "aws",
    "gcp",
    "azure",
    "ovh",
    "scaleway",
    "outscale",
    "fortinet",
    "cisco",
    "proxmox",
  ],
  "disponibilite-monitoring": [
    "prometheus",
    "grafana",
    "datadog",
    "elastic",
    "pagerduty",
    "kibana",
  ],
  automatisation: [
    "terraform",
    "ansible",
    "gitlab",
    "github",
    "jenkins",
    "docker",
    "kubernetes",
  ],
  "developpement-sur-mesure": [
    "react",
    "nextjs",
    "nodejs",
    "typescript",
    "postgresql",
    "redis",
  ],
  cybersecurite: [
    "owasp",
    "snyk",
    "hashicorp-vault",
    "crowdstrike",
  ],
};

/** Noms d'affichage par défaut (anglais). Utilisés si pas de traduction. */
export const TECH_DISPLAY_NAMES: Record<string, string> = {
  python: "Python",
  tensorflow: "TensorFlow",
  pytorch: "PyTorch",
  huggingface: "Hugging Face",
  openai: "OpenAI",
  "vertex-ai": "Vertex AI",
  gemini: "Gemini",
  anthropic: "Anthropic",
  mistral: "Mistral AI",
  langchain: "LangChain",
  pandas: "Pandas",
  aws: "AWS",
  gcp: "Google Cloud",
  azure: "Microsoft Azure",
  ovh: "OVH",
  scaleway: "Scaleway",
  outscale: "Outscale",
  fortinet: "Fortinet",
  cisco: "Cisco",
  proxmox: "Proxmox",
  prometheus: "Prometheus",
  grafana: "Grafana",
  datadog: "Datadog",
  elastic: "Elastic",
  pagerduty: "PagerDuty",
  kibana: "Kibana",
  terraform: "Terraform",
  ansible: "Ansible",
  gitlab: "GitLab",
  github: "GitHub",
  jenkins: "Jenkins",
  docker: "Docker",
  kubernetes: "Kubernetes",
  react: "React",
  nextjs: "Next.js",
  nodejs: "Node.js",
  typescript: "TypeScript",
  postgresql: "PostgreSQL",
  redis: "Redis",
  owasp: "OWASP",
  snyk: "Snyk",
  "hashicorp-vault": "HashiCorp Vault",
  crowdstrike: "CrowdStrike",
};
