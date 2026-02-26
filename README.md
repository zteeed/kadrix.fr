# kadrix.fr

Site vitrine de **Kadrix**, agence d'intégration IA, infrastructures cloud et développement web.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **i18n** : français (FR) et anglais (EN), avec URLs traduites par locale

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). La racine `/` redirige vers `/fr` ou `/en` selon la langue du navigateur.

## Structure des pages

Les URLs sont préfixées par la locale : `/fr/...` ou `/en/...`. Certains segments diffèrent (ex. FR `equipe`, EN `team`).

| Page | FR | EN |
|------|----|----|
| Accueil | `/fr` | `/en` |
| Contact | `/fr/contact` | `/en/contact` |
| Après envoi formulaire | `/fr/contact/merci` | `/en/contact/thank-you` |
| Expertises (liste) | `/fr/expertises` | `/en/expertises` |
| Expertise (détail) | `/fr/expertises/[slug]` | `/en/expertises/[slug]` |
| Équipe | `/fr/equipe` | `/en/team` |
| Références | `/fr/references` | `/en/references` |
| Politique de confidentialité | `/fr/politique-de-confidentialite` | `/en/privacy-policy` |
| Mentions légales | `/fr/mentions-legales` | `/en/legal-notice` |

Slugs d’expertises en EN : `artificial-intelligence`, `cloud-infrastructure`, `availability-monitoring`, `automation`, `web-development`, `cybersecurity`.

Contenu : hero, à propos, fondateurs, expertises, CTA sur l’accueil ; formulaire de contact (Formspree) ; page équipe (fondateurs, équipes) ; références avec filtres par secteur.

## Personnalisation

- **Couleurs** : `tailwind.config.ts` (couleurs `kadrix`) et `src/app/globals.css` (variables CSS).
- **Contenu** : textes et traductions dans `src/messages/fr.json` et `src/messages/en.json` ; expertises et technologies dans `src/data/expertise-technologies.ts` ; routes et segments d’URL dans `src/data/routes.ts` ; partenaires dans `src/data/partners.ts`.
- **Formulaire contact** : envoyé via [Formspree](https://formspree.io). Variables d’environnement ci‑dessous.

## Formulaire de contact (Formspree)

Le formulaire `/contact` envoie les données vers Formspree. Pour l’activer :

1. Créer un compte sur [formspree.io](https://formspree.io) et créer un formulaire.
2. Récupérer l’**ID du formulaire** (ex. `xyzwabcd` dans `https://formspree.io/f/xyzwabcd`).
3. Définir au build :
   - `NEXT_PUBLIC_FORMSPREE_ID` = l’ID du formulaire Formspree.
   - `NEXT_PUBLIC_SITE_URL` = l’URL du site (ex. `https://www.kadrix.fr`) pour la redirection après envoi (vers `/contact/merci` ou `/contact/thank-you` selon la locale). Si non défini, Formspree affiche sa page de remerciement par défaut.

En local : créer un fichier `.env.local` à la racine avec ces variables.

## Build (export statique)

Le site est configuré en **export statique** (`output: 'export'` dans `next.config.js`) : le build génère le dossier `out/` (HTML, CSS, JS), sans serveur Node.

```bash
npm run build
# Les fichiers sont dans out/
```

Pour prévisualiser le build en local : `npx serve out` puis ouvrir l’URL indiquée.

### Rebuild à chaque modification

```bash
npm run serve:watch
```

Lance un build initial, sert le dossier `out/` et surveille `src/`, `public/` et les configs ; à chaque sauvegarde un nouveau build est lancé. Rafraîchir le navigateur pour voir les changements. (Utilise `chokidar`, `concurrently` et `serve`.)

Vérifier que le build passe : `npm run test:build`.

## Déploiement

Le build produit le dossier `out/`. Déploiement possible sur tout hébergeur de fichiers statiques (Vercel, Netlify, hébergement mutualisé, etc.).

**GitHub Pages** : le workflow `.github/workflows/deploy-pages.yml` est prévu pour déployer automatiquement sur les GitHub Pages (branche `main`, artifact `out/`). Activer dans le dépôt : Settings → Pages → Source : GitHub Actions.

## Licence

Propriétaire — Kadrix.
