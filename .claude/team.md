# Équipe Agentique

> Ce fichier est **auto-généré** par `/init-project` en Phase 5.
> Il documente les agents du projet. Ne le modifie pas manuellement.

## Agents core (toujours présents)

### `forge`
**Rôle** : Team Lead — orchestre les agents, décompose les US, gère les feedback loops
**Toujours présent** : oui (c'est l'orchestrateur principal)

### `stabilizer`
**Rôle** : Quality gate — build, tests, lint, type-check
**Toujours présent** : oui (toujours en dernier dans le pipeline)
**Responsabilités** :
- Lancer les checks de stabilité (`bash scripts/stability-check.sh`)
- Corriger les problèmes simples directement
- Renvoyer les problèmes complexes à l'agent dev concerné

### `reviewer`
**Rôle** : Revue de code qualité + sécurité
**Quand l'utiliser** : US de priorité haute ou touchant un domaine critique (auth, payment)
**Responsabilités** :
- Vérifier le respect des règles du projet (`.claude/rules/`)
- Détecter les vulnérabilités (OWASP Top 10)
- Produire un rapport structuré : critiques + suggestions

---

## Agents spécialisés (générés par /init-project)

> Les agents ci-dessous sont créés automatiquement en fonction de la stack et des US du projet.
> Chaque agent est un expert de son domaine dans la stack spécifique du projet.

### `astro-react-dev`
**Rôle** : Développeur frontend principal — Astro 4.13 + React 18
**Skill** : `/astro-react-dev`
**Domaine** : Composants React interactifs, pages Astro, layouts, data layer TypeScript
**US assignées** : US-01 à US-08, US-10, US-11, US-12
**Responsabilités** :
- Créer les composants React (`.tsx`) avec `client:load` ou `client:visible`
- Structurer les pages et layouts Astro
- Implémenter les fichiers de données TypeScript (`src/data/`)
- Gérer la navigation scroll-aware, le terminal interactif, les sections
- Assurer le responsive mobile-first
- Utiliser les composants UI du design system

### `threejs-dev`
**Rôle** : Développeur 3D — Three.js / WebGL
**Skill** : `/threejs-dev`
**Domaine** : Brain 3D neural network, animations WebGL, performance GPU
**US assignées** : US-09
**Responsabilités** :
- Implémenter le réseau de neurones 3D (Brain3D.tsx)
- Gérer la réactivité souris + parallax scroll
- Assurer le lazy-loading de Three.js
- Fournir le fallback CSS si WebGL non supporté
- Maintenir les 60fps et l'opacité 0.3-0.4
- Masquer le Brain sur mobile

### `ui-integrator`
**Rôle** : Spécialiste design system cyber — Tailwind CSS + effets visuels
**Skill** : `/ui-integrator`
**Domaine** : Variables CSS, composants UI réutilisables, animations glitch/glow/néon
**US assignées** : US-01, US-11, US-12
**Responsabilités** :
- Maintenir `cyber-theme.css` et les variables CSS
- Créer et maintenir les composants UI (CyberButton, CyberCard, CyberBadge, etc.)
- Implémenter les effets visuels (glitch, glow, scan lines, néon)
- Assurer la cohérence du design system sur toutes les sections
- Vérifier le contraste WCAG AA et l'accessibilité visuelle

---

## Règles d'équipe

1. Le **stabilizer** intervient TOUJOURS en dernier
2. Les agents de planification (architect, db-architect) interviennent TOUJOURS en premier
3. Au moins un agent de développement (*-dev) est TOUJOURS présent
4. L'ordre d'exécution suit l'ordre défini dans le body de l'issue GitHub
5. Le **forge** évalue le résultat de chaque agent avant de passer au suivant

## Types d'agents

| Catégorie | Pattern de nom | Rôle |
|-----------|---------------|------|
| Planification | `*-architect`, `architect` | Analyse et plan avant implémentation |
| Développement | `*-dev`, `fullstack-dev` | Implémentation du code |
| Test | `*-tester`, `unit-tester`, `e2e-tester` | Écriture et exécution des tests |
| Qualité | `reviewer` | Revue de code |
| Validation | `stabilizer` | Quality gate finale |

## Orchestration : `/forge` vs `/next-feature`

| | `/next-feature` | `/forge` |
|---|---|---|
| **Modèle** | Pipeline linéaire | Team Lead avec feedback loops |
| **Agents** | Agents génériques | Agents spécialisés du projet |
| **Feedback** | Aucun | Boucles dev↔test, dev↔reviewer, stabilizer retry |
| **Décision** | Ordre fixe | Team Lead adapte selon les résultats |
| **Usage** | Features simples | Recommandé par défaut |
