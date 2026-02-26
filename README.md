# kadrix.fr

Site vitrine de **Kadrix**, agence d'intégration IA, infrastructures cloud et développement web.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Structure des pages

| Page | Description |
|------|-------------|
| `/` | Accueil : hero, à propos, fondateurs, expertises, CTA |
| `/contact` | Formulaire de contact (prénom, nom, email, tél, société, budget, message) |
| `/expertises` | Liste des expertises avec liens vers les sous-pages |
| `/expertises/[slug]` | Page détaillée par expertise (IA, dev sur mesure, mobile, e-commerce, UX/UI, cybersécurité) |
| `/equipe` | Fondateurs, équipes, bureaux |
| `/references` | Références clients, filtres par secteur, études de cas |
| `/politique-de-confidentialite` | Placeholder |
| `/mentions-legales` | Placeholder |

## Personnalisation

- **Couleurs** : modifier `tailwind.config.ts` (couleurs `kadrix`) et `src/app/globals.css` (variables CSS).
- **Contenu** : textes, témoignages, fondateurs et références sont dans les composants et pages correspondants ; les expertises détaillées dans `src/app/expertises/[slug]/page.tsx`.
- **Formulaire contact** : envoyé via [Formspree](https://formspree.io). Configurer les variables d’environnement (voir ci‑dessous).

## Formulaire de contact (Formspree)

Le formulaire `/contact` envoie les données vers Formspree. Pour l’activer :

1. Créer un compte sur [formspree.io](https://formspree.io) et créer un formulaire.
2. Récupérer l’**ID du formulaire** (ex. `xyzwabcd` dans `https://formspree.io/f/xyzwabcd`).
3. Définir au build :
   - `NEXT_PUBLIC_FORMSPREE_ID` = l’ID du formulaire Formspree.
   - `NEXT_PUBLIC_SITE_URL` = l’URL du site (ex. `https://www.kadrix.fr`) pour la redirection après envoi vers `/contact/merci`. Si non défini, Formspree affiche sa page de remerciement par défaut.

En local : créer un fichier `.env.local` à la racine avec ces variables.

## Build (export statique)

Le site est configuré en **export statique** (`output: 'export'`) : le build génère le dossier `out/` (HTML, CSS, JS), sans serveur Node.

```bash
npm run build
# Les fichiers sont dans out/
```

Pour prévisualiser le build en local : `npx serve out` puis ouvrir l’URL indiquée.

### `mise serve` (rebuild à chaque modification)

Avec **mise**, `mise run serve` lance un build initial, sert le dossier `out/`, puis surveille `src/`, `public/` et les configs : à chaque sauvegarde, un nouveau build est lancé. Rafraîchir le navigateur pour voir les changements.

**Vérifier que ça marche :** lancer `mise serve`, modifier un fichier (ex. texte dans `src/components/home/Hero.tsx`), sauvegarder, attendre la fin du build dans le terminal, puis rafraîchir la page. Avec Node ≥ 18, lancer `npm run test:build` pour vérifier que le build passe.

## Déploiement

Le build produit le dossier `out/` (export statique). Déploie le contenu de `out/` sur l’hébergeur de ton choix (Vercel, Netlify, hébergement mutualisé, etc.).

## Licence

Propriétaire — Kadrix.
