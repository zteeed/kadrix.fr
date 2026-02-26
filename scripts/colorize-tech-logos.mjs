#!/usr/bin/env node
/**
 * Applique la couleur officielle de chaque marque aux SVG de public/technologies/.
 * Couleurs issues de Simple Icons (brand guidelines) ou marques connues.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TECH_DIR = path.join(__dirname, "..", "public", "technologies");

const BRAND_COLORS = {
  ansible: "EE0000",
  aws: "232F3E",
  azure: "0078D4",
  cisco: "1BA0D7",
  crowdstrike: "FF3D2E",
  datadog: "632CA6",
  docker: "2496ED",
  elastic: "005571",
  fortinet: "EE3124",
  gcp: "4285F4",
  github: "181717",
  gitlab: "FC6D26",
  grafana: "F46800",
  "hashicorp-vault": "7B42BC",
  huggingface: "FFD21E",
  jenkins: "D24939",
  kibana: "005571",
  kubernetes: "326CE5",
  langchain: "1C3C3C",
  nextjs: "111111",
  nodejs: "339933",
  openai: "412991",
  outscale: "002855",
  ovh: "123F6D",
  owasp: "000000",
  pagerduty: "06AC38",
  pandas: "150458",
  postgresql: "4169E1",
  prometheus: "E6522C",
  proxmox: "E57000",
  python: "3776AB",
  pytorch: "EE4C2C",
  react: "61DAFB",
  redis: "DC382D",
  scaleway: "4F0599",
  snyk: "4C4A73",
  tensorflow: "FF6F00",
  terraform: "844FBA",
  typescript: "3178C6",
};

const files = fs.readdirSync(TECH_DIR).filter((f) => f.endsWith(".svg"));
for (const file of files) {
  const id = path.basename(file, ".svg");
  const hex = BRAND_COLORS[id];
  if (!hex) {
    console.warn("Skip (no color):", id);
    continue;
  }
  const filePath = path.join(TECH_DIR, file);
  let svg = fs.readFileSync(filePath, "utf8");
  // Add fill to path: either replace fill="currentColor" or add fill before d="
  const fillValue = `#${hex}`;
  if (svg.includes('fill="currentColor"')) {
    svg = svg.replace(/fill="currentColor"/g, `fill="${fillValue}"`);
  } else if (svg.includes("<path ")) {
    svg = svg.replace(/<path (\s*d=)/, `<path fill="${fillValue}" $1`);
  }
  fs.writeFileSync(filePath, svg);
  console.log("OK", id, fillValue);
}
