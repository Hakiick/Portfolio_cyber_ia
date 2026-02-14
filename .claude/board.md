# Board de coordination multi-agents

> Shared board between all Claude Code agents.
> Each agent reads and updates this board to coordinate work.
> Last updated: 2026-02-14

## Current project

**Project** : Portfolio Cyber x IA — Hakick (Maxime)
**Spec** : voir `project.md` à la racine
**Branch** : `claude/cyber-ai-portfolio-pm8j2`
**Status** : initializing
**Priority** : high
**Stack** : Astro 4.13 + React 18 + TailwindCSS + Three.js

## Assigned team

| Agent | Role in this project | Status |
|-------|---------------------|--------|
| orchestrateur | Planning & coordination | idle |
| frontend-dev | Composants UI, sections, animations, Three.js | idle |
| devops | Azure Static Web App + CI/CD | idle |
| testeur | Tests Playwright E2E | idle |
| reviewer | Code review + OWASP security | idle |
| stabilizer | Build/tests/deploy verification | idle |

## Execution plan (by orchestrator)

(waiting for /orchestrateur to produce plan from project.md)

## Technical decisions

- Dark-first design, NO light mode
- One-page scroll avec smooth scroll
- Données centralisées dans src/data/ (TypeScript)
- Fonts : JetBrains Mono (terminal) + Inter (contenu)
- Three.js lazy-loaded, masqué sur mobile
- Déploiement : Azure Static Web Apps

## Inter-agent messages

<!-- Format: [sender -> recipient] Message -->

## Journal

<!-- Format: [HH:MM] [agent] Action performed -->
- [init] [expert-prompteur] Created project.md, CLAUDE.md, configured .claude/ directory

## Completed US history

(none yet)
