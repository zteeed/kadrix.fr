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

/** Id technique pour le fichier logo (sans extension). Nom d'affichage dérivé ou via i18n. */
export const EXPERTISE_TECHNOLOGIES: Record<ExpertiseSlug, string[]> = {
  "intelligence-artificielle": [
    "python",
    "tensorflow",
    "pytorch",
    "huggingface",
    "openai",
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
