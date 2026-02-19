# Portfolio Cyber x IA — Hakick

## Project overview

Portfolio professionnel cybersécurité et IA, construit avec Astro + React + Three.js. Design cyber (néon, glitch, CRT, terminal) entièrement responsive mobile-first. Architecture multi-agents Claude Code (18 agents spécialisés coordonnés via tmux).

**Objectif** : Vitrine portfolio pour démontrer la maîtrise du cloud, de la cybersécurité, de l'IA générative et du développement fullstack moderne.

---

## Stack technique

- **Framework** : Astro 4.13.1 (SSG)
- **UI** : React 18.3.1
- **3D** : Three.js 0.182 + React Three Fiber + Drei + Postprocessing
- **Styling** : Tailwind CSS 3.4.3 + CSS custom variables (design system cyber)
- **Tests** : Playwright 1.46
- **Linter** : Prettier 3.2.5 (plugins Astro + Tailwind)
- **TypeScript** : 5.4.5 (strict)
- **i18n** : FR/EN (custom, sans lib)

---

## Architecture

```
src/
├── components/
│   ├── ui/                 # 20 composants cyber (ClassifiedCard, GlitchText, CyberButton, etc.)
│   ├── nav/                # Navigation sticky
│   ├── boot/               # Boot sequence animation
│   ├── brain/              # Brain 3D Three.js
│   ├── hero/               # Hero section + photo + typing bio
│   ├── about/              # About section neofetch-style
│   ├── skills/             # Skills radar chart
│   ├── projects/           # Projects showcase ClassifiedCards
│   ├── certifications/     # Certifications badges
│   ├── timeline/           # Timeline parcours
│   ├── terminal/           # Terminal interactif
│   ├── contact/            # Contact section
│   └── footer/             # Footer
├── data/                   # Données centralisées (projects, skills, certifications, etc.)
├── lib/                    # Hooks et utilitaires (i18n, achievements, konami, sounds, etc.)
├── layouts/                # Layout.astro
├── pages/                  # index.astro, 404.astro
└── styles/                 # Tailwind + cyber-theme.css (design system complet)
```

---

## Projets actuellement intégrés (4)

1. `yolov8-detection` (ia) — Object Detection YOLOv8
2. `portfolio-multi-agent` (ia-meta) — Ce Portfolio
3. `timemanager` (fullstack) — TimeManager (vidéo demo)
4. `chess-fighter` (fullstack) — Chess Fighter (vidéo demo)

---

## User Stories

### Phase 1 — Enrichissement contenu (haute priorité)

- [US-01] Intégrer 6 repos GitHub dans le portfolio | Cloner et analyser en profondeur 6 repos de Hakiick (T-NSA-810-STG_9, T-DEV-600-STG_18, T-CLO-901-STG_10, Bombcrypto_bot_2021, WinOneBitcoin_2022, SWC_Bot_2022). Rédiger des descriptions FR/EN détaillées et valorisantes basées sur l'analyse du code source. Ajouter les entrées dans projects.ts. Créer les nouvelles catégories si nécessaire (type + filtre + i18n). Build doit passer. | haute
  - Team: developer, stabilizer
  - Files: src/data/projects.ts, src/components/projects/Projects.tsx, src/lib/i18n.ts
  - Ref: prompts/portfolio-all-projects-integration.md

---

## SEO & Performance

- Meta tags Open Graph + Twitter Cards
- Viewport meta tag correctement configuré
- Responsive images avec srcset
- Font preload (Inter + JetBrains Mono)
- Score Lighthouse cible : > 90 sur les 4 métriques (mobile)
- Bundle size < 200KB gzipped (initial load)
- LCP < 2.5s, FID < 100ms, CLS < 0.1
