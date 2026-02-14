# CLAUDE.md — Portfolio Cyber x IA (Hakick)

## Project summary

Portfolio one-page Astro + React + TailwindCSS pour Maxime (Hakick).
Thème cybersécurité / IA générative. Dark-first, animations cyber, Three.js brain 3D.
Specs complètes dans `project.md`.

## Branch

**Toujours travailler sur** : `claude/cyber-ai-portfolio-pm8j2`

## Quick commands

```bash
# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Tests E2E
npx playwright test

# Lint
npx prettier --check src/
```

## Architecture

- `src/components/` — Composants React (.tsx) et Astro (.astro)
- `src/data/` — Données centralisées (profil, projets, skills, timeline, commandes terminal)
- `src/styles/cyber-theme.css` — Variables CSS du design system cyber
- `src/pages/index.astro` — Page unique (one-page scroll)
- `src/layouts/Layout.astro` — Layout principal
- `src/lib/` — Utilitaires

## Code rules

- TypeScript strict partout
- Mobile-first responsive design
- Pas de `console.log` en production
- Pas de code commenté — supprimer ou créer une issue
- Fonctions courtes (< 50 lignes)
- Nommage explicite, pas d'abréviations cryptiques
- Try/catch sur les appels API externes
- Valider les inputs utilisateur (formulaire contact, terminal)
- Sécurité : pas d'injection possible via le terminal interactif

## Commit format

```
type(scope): short description
```

Types : `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `deploy`
Scopes : `frontend`, `data`, `design`, `brain3d`, `terminal`, `boot`, `infra`, `ci`, `tests`

## Design system

- Palette : voir `src/styles/cyber-theme.css`
- Dark only, pas de light mode
- Fonts : JetBrains Mono (code/terminal) + Inter (contenu)
- Composants UI : dans `src/components/ui/`
- Tout ce qui est "technique" en monospace

## Stability

- Après chaque modification : le serveur doit démarrer sans erreur
- Le build (`npm run build`) doit passer
- Les tests Playwright doivent passer
- Ne jamais désactiver un test pour le faire passer
- Chaque US doit être stable AVANT de passer à la suivante

## Data

Toutes les données du portfolio sont dans `src/data/`.
NE PAS hardcoder de données dans les composants — toujours importer depuis `src/data/`.

## Performance targets

- Lighthouse > 90 sur les 4 métriques
- Three.js lazy-loaded, masqué sur mobile
- Animations GPU-accelerated (transform, opacity)
- Pas de layout shift
