# Logos technologies (expertises)

Ajoutez ici les logos des technologies affichés sur chaque page d’expertise.

- **Format** : SVG (recommandé) ou PNG. L’extension est définie par expertise dans `src/components/expertises/ExpertiseTechnologies.tsx` (certaines technologies utilisent `.png`, ex. `python`, `vertex-ai`, `gemini`).
- **Nom du fichier** : `{id}.svg` ou `{id}.png`, où `{id}` est l’identifiant défini dans `src/data/expertise-technologies.ts` (`EXPERTISE_TECHNOLOGIES` et `TECH_DISPLAY_NAMES`).

Si un fichier est absent, le nom de la technologie s’affiche à la place.

**Ids par expertise :**

- **intelligence-artificielle** : python, tensorflow, pytorch, huggingface, openai, vertex-ai, gemini, anthropic, mistral, langchain, pandas
- **infrastructure-cloud** : aws, gcp, azure, ovh, scaleway, outscale, fortinet, cisco, proxmox
- **disponibilite-monitoring** : prometheus, grafana, datadog, elastic, pagerduty, kibana
- **automatisation** : terraform, ansible, gitlab, github, jenkins, docker, kubernetes
- **developpement-sur-mesure** : react, nextjs, nodejs, typescript, postgresql, redis
- **cybersecurite** : owasp, snyk, hashicorp-vault, crowdstrike

Vous pouvez récupérer des icônes officielles (marques) ou utiliser par exemple [Simple Icons](https://simpleicons.org/) en respectant les licences et chartes graphiques.
