# Portfolio Cyber x IA (Hakick)

Tu es un orchestrateur de projet. Workflow strict et séquentiel.

Contexte du projet : @project.md

## Règles IMPORTANTES

- **YOU MUST** stabiliser (build + tests + lint) avant de passer à la feature suivante
- **YOU MUST** travailler sur une seule feature à la fois
- **YOU MUST** nettoyer le contexte (`/compact`) entre chaque feature
- **YOU MUST** utiliser l'équipe agentique assignée à chaque US
- **YOU MUST** faire des commits au format `type(scope): description` (ex: `feat(frontend): add cyber button`)
- **YOU MUST** nommer les branches au format `type/scope/description-courte` (ex: `feat/frontend/boot-sequence`)
- **YOU MUST** nommer les PR au format `type(scope): description` (même format que les commits)
- **YOU MUST** utiliser `rebase` — JAMAIS `merge` pour intégrer les changements de `main`
- **YOU MUST** créer la branche sur GitHub dès le début (`git push -u origin <branch>`)
- **YOU MUST** créer une PR via `gh pr create` après stabilisation
- **YOU MUST** lancer `bash scripts/stability-check.sh` AVANT tout push
- **YOU MUST** re-lancer le stability check APRÈS chaque rebase
- **YOU MUST** vérifier l'éligibilité d'une US avant de la démarrer (`bash scripts/check-us-eligibility.sh <numero>`)
- **YOU MUST NOT** démarrer une US dont les dépendances ne sont pas satisfaites
- **YOU MUST NOT** merger une PR si le stability check échoue
- **YOU MUST NOT** utiliser `git push --force` — utilise `--force-with-lease` uniquement

## Skills disponibles

### Skills core (toujours présents)

| Skill | Usage |
|-------|-------|
| `/init-project` | **Setup automatique** : analyse le projet, brainstorm les US, génère agents + règles + issues |
| `/forge` | **Team Lead** : décompose une US, délègue aux agents spécialisés, feedback loops, livre stable |
| `/next-feature` | Pipeline linéaire simple (alternative à /forge pour les features simples) |
| `/reviewer` | Revue de code qualité + sécurité |
| `/stabilizer` | Vérifie build + tests + lint + type-check |

### Skills générés par /init-project (spécifiques au projet)

Les agents spécialisés sont **auto-générés** en fonction de la stack et des US.
Exemples : `/frontend-dev`, `/ui-dev`, `/e2e-tester`...

Après `/init-project`, consulte `.claude/team.md` pour voir les agents disponibles.

### Skills fallback (génériques, utilisés si pas d'agents générés)

| Skill | Usage |
|-------|-------|
| `/architect` | Planifie l'architecture d'une feature |
| `/developer` | Implémente une feature |
| `/tester` | Écrit et lance les tests |

## Commandes

```bash
npm run dev                           # Dev server
npm run build                         # Build
npm run preview                       # Preview build
npx playwright test                   # Tests E2E
npx prettier --check src/             # Lint/format check
npx tsc --noEmit                      # Type check
bash scripts/stability-check.sh       # Check complet de stabilité
bash scripts/pre-merge-check.sh       # Vérification pré-merge d'une branche
bash scripts/check-us-eligibility.sh --list     # US éligibles (dépendances vérifiées)
bash scripts/check-us-eligibility.sh <numero>   # Vérifier une US spécifique
bash scripts/search-skills.sh --stack           # Chercher des skills communautaires
bash scripts/install-skill.sh <owner/repo>      # Installer un skill depuis GitHub
gh issue list                         # Voir les issues
gh pr list                            # Voir les PRs ouvertes
gh pr view <numero>                   # Détail d'une PR
```

## Workflow

1. `/init-project` — Analyse le projet, brainstorm, génère agents + règles, crée les issues
2. `/forge` — Pour chaque US (par priorité) :
   analyse, décompose, délègue aux agents, feedback loops, stabilize, PR, done, clean context
3. Répète 2 jusqu'à ce que toutes les US soient done

> `/next-feature` reste disponible comme alternative linéaire pour les features simples.

## Stratégie Git

```
main ─────────────────────────────────────────────
  │                                        ↑
  └── feat/scope/feature ──── rebase ──── PR ── squash merge ── delete branch
```

- **Rebase only** : `git fetch origin main && git rebase origin/main`
- **Push** : `git push --force-with-lease origin <branch>`
- **PR** : `gh pr create --base main`
- **Après merge** : vérifier que main est stable

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
- Pas de `any` en TypeScript — utilise des types stricts

## Design system

- Palette : voir `src/styles/cyber-theme.css`
- Dark only, pas de light mode
- Fonts : JetBrains Mono (code/terminal) + Inter (contenu)
- Composants UI : dans `src/components/ui/`
- Tout ce qui est "technique" en monospace

## Data

Toutes les données du portfolio sont dans `src/data/`.
NE PAS hardcoder de données dans les composants — toujours importer depuis `src/data/`.

## Performance targets

- Lighthouse > 90 sur les 4 métriques
- Three.js lazy-loaded, masqué sur mobile
- Animations GPU-accelerated (transform, opacity)
- Pas de layout shift

## Stability

- Après chaque modification : le serveur doit démarrer sans erreur
- Le build (`npm run build`) doit passer
- Les tests Playwright doivent passer
- Ne jamais désactiver un test pour le faire passer
- Chaque US doit être stable AVANT de passer à la suivante
