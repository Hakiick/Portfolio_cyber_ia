# Portfolio Cyber x IA — Hakick

## Project overview

Portfolio one-page avec scroll animé pour **Maxime (alias Hakick)**, étudiant en dernière année à Epitech, spécialisé cloud computing, cybersécurité et IA générative. Le portfolio cible des postes de type **AI Security Engineer / GenAI Consultant**.

**Objectif** : créer un effet WAOW en entretien d'embauche. Le portfolio doit **prouver** les compétences, pas juste les lister.

**URL repo** : `github.com/juninhomax/Portfolio_cyber_ia`
**Branche de travail** : `claude/cyber-ai-portfolio-pm8j2`
**Langue** : Français (V1). Toggle FR/EN prévu en V2.
**Déploiement** : Azure Static Web Apps

---

## Tech stack

- **Framework** : Astro 4.13 (SSG) — déjà en place
- **UI** : React 18 (composants interactifs) — déjà en place
- **Styling** : TailwindCSS 3.4 + design system cyber custom — à refondre
- **3D** : Three.js (brain neural network interactif)
- **Animations** : CSS animations + Intersection Observer pour scroll reveals
- **Tests** : Playwright (E2E) — déjà configuré
- **Typo** : Monospace (terminal vibes) = `JetBrains Mono` ou `Fira Code` + Sans-serif (contenu) = `Inter`
- **Icons** : Lucide React (déjà en place)

---

## Design system — Thème Cyber

### Palette de couleurs

```
--cyber-bg-primary:    #0a0a0f       /* Noir profond, quasi-black */
--cyber-bg-secondary:  #12121a       /* Gris très sombre pour les cards */
--cyber-bg-terminal:   #0d1117       /* Fond terminal style GitHub dark */
--cyber-accent-green:  #00ff41       /* Vert néon Matrix — accent principal */
--cyber-accent-blue:   #00d4ff       /* Bleu électrique — accent secondaire */
--cyber-accent-purple: #b44aff       /* Violet — accent tertiaire (IA) */
--cyber-accent-red:    #ff3e3e       /* Rouge alerte — destructive/danger */
--cyber-text-primary:  #e0e0e0       /* Texte principal — gris clair */
--cyber-text-secondary:#8a8a8a       /* Texte secondaire — gris moyen */
--cyber-text-accent:   #00ff41       /* Texte accentué — vert néon */
--cyber-border:        #1e1e2e       /* Bordures subtiles */
--cyber-glow-green:    0 0 20px rgba(0, 255, 65, 0.3)   /* Glow effect vert */
--cyber-glow-blue:     0 0 20px rgba(0, 212, 255, 0.3)  /* Glow effect bleu */
```

### Principes visuels

- **Dark-first** : pas de light mode. Le dark EST le design.
- **Glow effects** : lueur subtile sur les éléments interactifs (hover, focus)
- **Glitch effects** : micro-glitchs CSS sur les transitions et hovers (subtils, pas épileptiques)
- **Scan lines** : overlay très léger sur les images (effet écran CRT)
- **Monospace** : tout ce qui est "technique" en font monospace
- **Bordures néon** : `border: 1px solid var(--cyber-accent-green)` avec glow au hover
- **Animations** : fluides, 60fps, pas de surcharge — le contenu reste lisible

### Composants UI de base à créer

- `CyberButton` : bouton avec bordure néon, glow au hover, effet "push"
- `CyberCard` : card sombre avec bordure subtile, glow au hover
- `CyberBadge` : badge/tag pour les technos et certifications
- `CyberSection` : wrapper de section avec titre style terminal (`> section_name_`)
- `GlitchText` : texte avec effet glitch CSS intermittent
- `TerminalBlock` : bloc de texte avec apparence terminal (header avec dots, font mono)
- `ClassifiedCard` : card projet style dossier classifié (tampon, ouverture au clic)

---

## Architecture du projet

```
src/
├── components/
│   ├── boot/
│   │   └── BootSequence.tsx        # Animation de boot terminal
│   ├── hero/
│   │   └── Hero.tsx                # Hero post-boot (ASCII art + titre + CTA)
│   ├── about/
│   │   └── About.tsx               # Section profil / whoami
│   ├── skills/
│   │   └── Skills.tsx              # Radar chart interactif compétences
│   ├── projects/
│   │   └── Projects.tsx            # Dossiers classifiés (cards projets)
│   ├── certifications/
│   │   └── Certifications.tsx      # Badge wall certifications
│   ├── timeline/
│   │   └── Timeline.tsx            # Parcours professionnel animé
│   ├── brain/
│   │   └── Brain3D.tsx             # Neural network Three.js interactif
│   ├── terminal/
│   │   └── Terminal.tsx            # Terminal interactif embarqué
│   ├── contact/
│   │   └── Contact.tsx             # Formulaire contact cyber-style
│   ├── nav/
│   │   └── Nav.tsx                 # Navigation sticky scroll-aware
│   ├── footer/
│   │   └── Footer.tsx              # Footer minimaliste
│   └── ui/
│       ├── CyberButton.tsx
│       ├── CyberCard.tsx
│       ├── CyberBadge.tsx
│       ├── CyberSection.tsx
│       ├── GlitchText.tsx
│       ├── TerminalBlock.tsx
│       └── ClassifiedCard.tsx
├── data/
│   ├── profile.ts                  # Données profil centralisées
│   ├── projects.ts                 # Liste des projets
│   ├── skills.ts                   # Compétences par catégorie
│   ├── timeline.ts                 # Parcours/expériences
│   └── terminal-commands.ts        # Commandes du terminal interactif
├── layouts/
│   └── Layout.astro                # Layout principal (meta, fonts, global styles)
├── pages/
│   └── index.astro                 # Page unique one-page
├── lib/
│   ├── utils.ts                    # Utilitaires (cn, etc.)
│   └── animations.ts              # Helpers animation (intersection observer)
└── styles/
    └── cyber-theme.css             # Variables CSS + styles globaux cyber
```

---

## Données du profil (source de vérité)

### Identité

```
pseudo: "Hakick"
prenom: "Maxime"
titre: "AI Security Engineer in the making"
sousTitre: "Cloud · Cyber · IA Générative"
bio: "Étudiant en dernière année à Epitech, spécialisé cloud computing et cybersécurité. Administrateur systèmes et réseaux avec un rôle de tech lead (backup, supervision, environnements critiques). Passionné par la sécurité des LLM, leur industrialisation et leur intégration en entreprise."
github: "https://github.com/juninhomax"
email: (placeholder — à définir par l'utilisateur)
localisation: "France"
```

### Compétences (4 axes)

```
cloud_devops:
  label: "Cloud / DevOps"
  level: 85
  items:
    - { name: "Kubernetes (k0s)", level: 80 }
    - { name: "GitLab CI/CD", level: 85 }
    - { name: "Terraform", level: 65 }
    - { name: "Docker", level: 90 }
    - { name: "AWS (eu-west-1)", level: 70 }
    - { name: "Azure", level: 60 }
    - { name: "Proxmox VE", level: 80 }

monitoring:
  label: "Monitoring / Observabilité"
  level: 90
  items:
    - { name: "Nagios Core / XI", level: 95 }
    - { name: "Zabbix", level: 85 }
    - { name: "Prometheus", level: 75 }
    - { name: "Checks custom multi-hosts", level: 90 }

cybersecurite:
  label: "Cybersécurité"
  level: 75
  items:
    - { name: "Pentest (eJPTv2)", level: 70 }
    - { name: "CTF", level: 75 }
    - { name: "Sécurité applicative", level: 70 }
    - { name: "LLM Security (OWASP Top 10)", level: 65 }
    - { name: "Prompt Injection / Jailbreaks", level: 70 }
    - { name: "NFC Hacking", level: 60 }

ia_generative:
  label: "IA / IA Générative"
  level: 70
  items:
    - { name: "YOLOv8 / Computer Vision", level: 75 }
    - { name: "LLM (Claude, GPT, LLaMA)", level: 70 }
    - { name: "Agents IA (n8n)", level: 65 }
    - { name: "Dataset building", level: 70 }
    - { name: "Guardrails / Output control", level: 60 }
```

### Projets

```
projects:
  - id: "yolov8-detection"
    titre: "Object Detection YOLOv8"
    description: "IA de détection d'objets spécifiques (blé, eau, ressources) dans des captures d'écran de jeu 3D. Entraînement custom, dataset building, détection temps réel."
    stack: ["Python", "YOLOv8", "Computer Vision", "PyTorch"]
    categorie: "ia"
    status: "completed"
    github: ""

  - id: "agent-discord-n8n"
    titre: "Agent IA Discord — Résumés automatiques"
    description: "Agent automatisé qui résume les vidéos quotidiennes d'un YouTuber Pokémon. Pipeline : scraping vidéos → résumé LLM → publication Discord. Scalable à 20-30 chaînes."
    stack: ["n8n", "LLM API", "Discord Bot", "Node.js"]
    categorie: "ia"
    status: "in-progress"
    github: ""

  - id: "chatbot-cyber"
    titre: "Chatbot IA Cybersécurité"
    description: "Assistant IA spécialisé hacking/pentest. Support technique intelligent pour le contexte cyber : méthodologies, outils, exploitation."
    stack: ["Python", "LLM", "RAG", "Cybersecurity"]
    categorie: "ia-cyber"
    status: "in-progress"
    github: ""

  - id: "nfc-hack"
    titre: "NFC Reader Exploit"
    description: "Projet scolaire Epitech : exploitation d'un lecteur NFC pour intercepter et retransmettre des identifiants. Analyse de protocole, reverse engineering."
    stack: ["Hardware", "NFC", "Reverse Engineering", "C"]
    categorie: "cyber"
    status: "completed"
    github: ""

  - id: "iot-domotique"
    titre: "Domotique Cloud-Native"
    description: "Architecture domotique personnelle : capteurs Zigbee2MQTT, broker MQTT cloud (AWS IoT Core), analyse présence via capteurs de mouvement. Raspberry Pi + cloud."
    stack: ["Home Assistant", "Zigbee2MQTT", "MQTT", "AWS IoT Core", "Raspberry Pi"]
    categorie: "cloud-iot"
    status: "in-progress"
    github: ""

  - id: "infra-k8s"
    titre: "Cluster Kubernetes Production"
    description: "Conception et déploiement de clusters k0s virtualisés. Pipelines GitLab CI/CD complètes, monitoring Prometheus, déploiement containerisé."
    stack: ["Kubernetes", "k0s", "GitLab CI/CD", "Prometheus", "Docker"]
    categorie: "devops"
    status: "completed"
    github: ""

  - id: "portfolio-multi-agent"
    titre: "Ce Portfolio (Meta-projet)"
    description: "Ce portfolio lui-même : construit par une architecture multi-agents Claude Code (9 agents spécialisés coordonnés via tmux). Preuve de maîtrise des workflows IA."
    stack: ["Astro", "React", "Three.js", "Claude Code", "Multi-Agent"]
    categorie: "ia-meta"
    status: "in-progress"
    github: "https://github.com/juninhomax/Portfolio_cyber_ia"
```

### Certifications

```
certifications:
  - { nom: "eJPTv2", organisme: "INE Security", status: "obtained", description: "Junior Penetration Tester" }
  - { nom: "AZ-900", organisme: "Microsoft", status: "preparing", description: "Azure Fundamentals" }
  - { nom: "AWS Cloud Practitioner", organisme: "AWS", status: "preparing", description: "Cloud Fundamentals" }
  - { nom: "AWS AI Practitioner", organisme: "AWS", status: "in-progress", description: "AI/ML Fundamentals" }
```

### Parcours (timeline)

```
timeline:
  - date: "2020 - présent"
    titre: "Epitech"
    description: "Formation en informatique, spécialisation cloud computing et cybersécurité. Dernière année."
    type: "formation"

  - date: "En poste"
    titre: "Administrateur Systèmes & Réseaux — Tech Lead"
    description: "Backup, supervision, environnements critiques. Expertise Nagios, Zabbix, Prometheus. Gestion d'équipe technique."
    type: "experience"

  - date: "2024"
    titre: "Certification eJPTv2"
    description: "Junior Penetration Tester — validation des compétences en pentest et sécurité offensive."
    type: "certification"

  - date: "2025 - présent"
    titre: "Spécialisation IA Générative & LLM Security"
    description: "Projets personnels autour de YOLOv8, agents IA, sécurité des LLM. Orientation vers AI Security Engineer."
    type: "pivot"
```

### Commandes du terminal interactif

```
terminal_commands:
  whoami: "Hakick (Maxime) — AI Security Engineer in the making"
  help: "Commandes disponibles : whoami, skills, projects, certifs, contact, cv, clear, sudo hire-me"
  skills: (affiche les 4 axes de compétences formatés en tableau ASCII)
  projects: (liste les projets avec description courte)
  ls: "about.txt  skills/  projects/  certifs.md  contact.sh  .secret"
  cat about.txt: (affiche la bio complète)
  cat .secret: "Nice try ;) — But there's nothing hidden here... or is there?"
  certifs: (affiche les certifications en tableau)
  contact: (affiche les liens GitHub + email)
  cv: "Downloading CV... → ouvre/télécharge le PDF du CV"
  clear: (vide le terminal)
  sudo hire-me: "Permission granted. Sending CV to recruiter... ✓ Done. Expect a call soon."
  pwd: "/home/hakick/portfolio"
  uname: "HakickOS 1.0 — Powered by curiosity and caffeine"
  ping: "PONG — Latency: 0ms (I'm always available)"
  nmap: "Scanning portfolio.hakick.dev... 443/tcp open — All services nominal."
  exit: "Pourquoi partir ? Il y a encore tant à découvrir..."
```

---

## Spécifications des features WOW

### Feature 1 : Boot Sequence (section d'entrée)

**Concept** : Quand le visiteur arrive sur le site, il voit un écran noir avec une simulation de boot terminal. Le texte défile ligne par ligne (typewriter effect), simulant un démarrage système. Après 4-6 secondes, une transition glitch révèle le vrai portfolio.

**Séquence de boot** :
```
[BIOS] Initializing HakickOS v1.0...
[OK] Loading kernel modules
[OK] Mounting secure filesystem
[OK] Starting network interfaces
[SCAN] Running port scan... 443/tcp open
[OK] Firewall rules applied
[OK] Loading AI models...
[OK] Neural network initialized
[READY] System boot complete.

> Welcome, visitor. Initializing portfolio...
```

**Comportement** :
- Typewriter effect, chaque ligne apparaît avec un léger délai (150-200ms)
- Les `[OK]` sont en vert néon, `[SCAN]` en bleu
- Après la dernière ligne, pause de 500ms puis transition glitch (écran qui "casse" en fragments) vers le hero
- Un bouton "Skip" discret en bas à droite pour les visiteurs récurrents
- L'animation ne se joue qu'une fois par session (sessionStorage)
- Durée totale : 5 secondes max

### Feature 2 : Brain 3D Neural Network (arrière-plan)

**Concept** : Un réseau de neurones 3D interactif qui flotte en arrière-plan du hero et de la section about. Les nœuds sont connectés par des lignes lumineuses. Le réseau réagit au mouvement de la souris et au scroll.

**Spécifications** :
- Technologie : Three.js avec un composant React wrapper
- ~50-80 nœuds (sphères petites) connectés par des lignes
- Couleurs : nœuds en bleu électrique (#00d4ff), connexions en vert néon (#00ff41) avec opacité faible
- Réactivité : les nœuds proches de la souris s'illuminent et les connexions se renforcent
- Au scroll : légère rotation du réseau (parallax effect)
- Performance : requestAnimationFrame, max 60fps, lazy-load du composant Three.js
- Dégradation gracieuse : si WebGL non supporté, afficher des particules CSS simples en fallback
- Le brain est UNIQUEMENT dans la zone hero/about, pas sur tout le site (performance)
- Opacité faible (0.3-0.4) pour ne pas gêner la lecture du contenu

### Feature 3 : Terminal Interactif (section dédiée)

**Concept** : Une section du portfolio contient un terminal fonctionnel. Le visiteur peut taper des commandes pour explorer le profil de manière immersive. C'est une navigation alternative au scroll.

**Spécifications** :
- Apparence : fenêtre terminal avec header (3 dots macOS style), fond #0d1117, bordure verte
- Prompt : `hakick@portfolio:~$ `
- Input : champ texte style terminal (font monospace, curseur clignotant vert)
- Les commandes sont définies dans `data/terminal-commands.ts`
- Output : texte formaté avec couleurs ANSI simulées (vert, bleu, rouge, blanc)
- Historique : flèches haut/bas pour naviguer les commandes précédentes
- Auto-complete : Tab pour compléter les commandes
- Commande inconnue : `command not found: <cmd>. Type 'help' for available commands.`
- Animation : chaque caractère de l'output apparaît avec un léger typewriter effect (optionnel, rapide)
- Mobile : le terminal est utilisable sur mobile (clavier natif)
- Le terminal est une SECTION du portfolio (pas un overlay), entre Projects et Contact

### Feature 4 : Dossiers Classifiés (section projets)

**Concept** : Chaque projet est présenté comme un dossier secret/classifié. Card fermée avec un tampon "CLASSIFIED" rouge, qui s'ouvre au clic pour révéler le détail du projet.

**Spécifications** :
- Card fermée : fond sombre, tampon "CLASSIFIED" en diagonale (rouge, semi-transparent), titre du projet visible, catégorie en badge
- Au hover : léger tremblement/glitch de la card, le tampon s'estompe
- Au clic : la card s'étend (animation expand) pour révéler : description complète, stack technique (badges), lien GitHub, statut (completed/in-progress)
- Barre latérale rouge (comme un dossier physique)
- En haut de la section : filtre par catégorie (Tous / IA / Cyber / DevOps / IoT)
- Grid responsive : 3 colonnes desktop, 2 tablette, 1 mobile
- Chaque card a un numéro de dossier style "DOSSIER-001", "DOSSIER-002", etc.

---

## Sections du one-page (ordre de scroll)

1. **Boot Sequence** → Animation d'entrée (plein écran, disparaît après)
2. **Hero** → ASCII art avatar + nom "Hakick" + titre + CTA "Explore my profile" + Brain 3D en fond
3. **About** → Bio complète + Brain 3D qui continue en fond, parcours rapide
4. **Skills** → Radar chart interactif (4 axes : Cloud/DevOps, Monitoring, Cyber, IA)
5. **Projects** → Dossiers classifiés (6 projets) avec filtres
6. **Certifications** → Badge wall (4 certifs avec statut)
7. **Timeline** → Parcours pro/formation chronologique
8. **Terminal** → Terminal interactif embarqué
9. **Contact** → Formulaire minimaliste + lien GitHub
10. **Footer** → Crédits, copyright, "Built with multi-agent AI"

---

## Navigation

- **Sticky navbar** en haut : logo "H" (Hakick) + liens vers chaque section (smooth scroll)
- **Style** : fond transparent au top, fond sombre avec blur au scroll (glassmorphism léger)
- **Mobile** : hamburger menu avec overlay sombre
- **Active state** : le lien de la section visible est highlighted en vert néon
- **Scroll-aware** : utilise Intersection Observer pour détecter la section active

---

## Pages

- Une seule page : `index.astro`
- Le layout charge les fonts (JetBrains Mono + Inter), les meta tags SEO, le CSS global

---

## Responsive breakpoints

- Mobile : < 640px (priorité mobile-first)
- Tablette : 640px - 1024px
- Desktop : > 1024px
- Le Brain 3D est masqué sur mobile (performance) — remplacé par un gradient subtil

---

## SEO & Performance

- Meta tags Open Graph (titre, description, image preview)
- Favicon personnalisé (lettre H stylisée cyber)
- Lazy loading des images et du composant Three.js
- Font preload pour JetBrains Mono et Inter
- Score Lighthouse cible : > 90 sur les 4 métriques

---

## User Stories

### Phase 1 — Foundation (high priority)

- [US-01] Design system cyber + data layer | Créer le fichier cyber-theme.css avec toutes les variables CSS, les composants UI de base (CyberButton, CyberCard, CyberBadge, CyberSection, GlitchText, TerminalBlock), et les fichiers de données TypeScript (profile.ts, projects.ts, skills.ts, timeline.ts, terminal-commands.ts) avec toutes les données du profil. Configurer les fonts JetBrains Mono + Inter. | high
  - Team: frontend-dev, stabilizer

- [US-02] Layout one-page + navigation scroll | Refondre index.astro en page one-page. Créer le Layout.astro avec meta tags, fonts, CSS global. Créer le composant Nav.tsx sticky scroll-aware avec Intersection Observer, mobile hamburger menu, active state vert néon. Smooth scroll entre sections. | high
  - Team: frontend-dev, stabilizer

### Phase 2 — Sections core (high priority)

- [US-03] Boot sequence animation | Créer le composant BootSequence.tsx : animation typewriter de boot terminal (séquence définie dans project.md), transition glitch vers le hero, bouton Skip, sessionStorage pour ne jouer qu'une fois. Durée max 5s. | high
  - Team: frontend-dev, stabilizer

- [US-04] Hero + About sections | Créer Hero.tsx : ASCII art avatar généré, titre "Hakick", sous-titre, bio courte, CTA scroll. Créer About.tsx : bio complète, points forts, approche. Données depuis profile.ts. Zone prévue pour le Brain 3D en fond (intégré en US-09). | high
  - Team: frontend-dev, stabilizer

- [US-05] Skills radar chart | Créer Skills.tsx : radar chart interactif SVG ou Canvas montrant les 4 axes (Cloud/DevOps, Monitoring, Cyber, IA) avec niveaux. Au hover sur un axe : détail des sous-compétences. Données depuis skills.ts. Animation d'apparition au scroll (Intersection Observer). | high
  - Team: frontend-dev, stabilizer

- [US-06] Projets dossiers classifiés | Créer Projects.tsx : grid de ClassifiedCard. Chaque card : état fermé avec tampon CLASSIFIED, expand au clic avec détail (description, stack badges, GitHub link, statut). Filtres par catégorie. Grid responsive. Données depuis projects.ts. | high
  - Team: frontend-dev, stabilizer

- [US-07] Certifications + Timeline | Créer Certifications.tsx : badge wall avec les 4 certifications, statut visuel (obtained=vert, in-progress=bleu, preparing=gris). Créer Timeline.tsx : timeline verticale animée au scroll, chaque étape avec date, titre, description, type (formation/experience/certification/pivot). Données depuis timeline.ts. | high
  - Team: frontend-dev, stabilizer

- [US-08] Contact + Footer | Créer Contact.tsx : formulaire minimaliste (nom, email, message) intégré via Web3Forms ou mailto. Style terminal (TerminalBlock). Lien GitHub. Créer Footer.tsx : copyright, "Built with multi-agent AI", lien GitHub. | medium
  - Team: frontend-dev, stabilizer

### Phase 3 — WOW features (high priority)

- [US-09] Brain 3D neural network interactif | Créer Brain3D.tsx : réseau de neurones Three.js (~50-80 nœuds, connexions lumineuses). Réactif au mouvement souris (nœuds proches s'illuminent). Parallax léger au scroll. Lazy-load Three.js. Fallback CSS si pas de WebGL. Intégrer en arrière-plan des sections Hero et About. Performance : 60fps, opacité 0.3-0.4. Masqué sur mobile. | high
  - Team: frontend-dev, stabilizer

- [US-10] Terminal interactif | Créer Terminal.tsx : terminal embarqué avec prompt hakick@portfolio:~$, input avec curseur clignotant, historique (flèches haut/bas), auto-complete (Tab). Toutes les commandes définies dans terminal-commands.ts. Output formaté avec couleurs. Typewriter effect sur l'output. Responsive mobile. Section dédiée dans le one-page entre Projects et Contact. | high
  - Team: frontend-dev, stabilizer

### Phase 4 — Polish & Deploy (medium priority)

- [US-11] Animations scroll + transitions | Ajouter des animations d'apparition au scroll sur toutes les sections (fade-in, slide-up) via Intersection Observer. Transitions fluides entre les sections. Particules ou effets subtils de connexion entre les sections. Performance : pas de layout shift, animations GPU-accelerated. | medium
  - Team: frontend-dev, stabilizer

- [US-12] Responsive + Accessibilité + SEO | Audit responsive mobile/tablette/desktop complet. ARIA labels sur tous les éléments interactifs. Contraste vérifié (WCAG AA). Meta tags Open Graph. Favicon "H" cyber. Font preload. Alt text images. Lighthouse > 90 sur les 4 métriques. | medium
  - Team: frontend-dev, reviewer, testeur, stabilizer

- [US-13] Déploiement Azure Static Web Apps | Configurer Azure Static Web App pour Astro SSG. GitHub Actions CI/CD (build + deploy on push). Custom domain si disponible. HTTPS automatique. Vérifier que le déploiement fonctionne end-to-end. | medium
  - Team: devops, admin-sys, stabilizer
