export type ProjectCategory =
  | "ia"
  | "cyber"
  | "ia-cyber"
  | "cloud-iot"
  | "devops"
  | "ia-meta"
  | "fullstack";
export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  id: string;
  titre: string;
  titreEn?: string;
  description: string;
  descriptionEn?: string;
  stack: string[];
  categorie: ProjectCategory;
  status: ProjectStatus;
  github: string;
  screenshots?: string[];
  video?: string;
}

export const projects: Project[] = [
  {
    id: "yolov8-detection",
    titre: "Object Detection YOLOv8",
    titreEn: "Object Detection YOLOv8",
    description:
      "IA de détection d'objets spécifiques (blé, eau, ressources) dans des captures d'écran de jeu 3D. Entraînement custom, dataset building, détection temps réel.",
    descriptionEn:
      "AI for detecting specific objects (wheat, water, resources) in 3D game screenshots. Custom training, dataset building, real-time detection.",
    stack: ["Python", "YOLOv8", "Computer Vision", "PyTorch"],
    categorie: "ia",
    status: "completed",
    github: "",
  },
  {
    id: "portfolio-multi-agent",
    titre: "Ce Portfolio (Meta-projet)",
    titreEn: "This Portfolio (Meta-project)",
    description:
      "Ce portfolio lui-même : construit par une architecture multi-agents Claude Code (9 agents spécialisés coordonnés via tmux). Preuve de maîtrise des workflows IA.",
    descriptionEn:
      "This portfolio itself: built by a multi-agent Claude Code architecture (9 specialized agents coordinated via tmux). Proof of AI workflow mastery.",
    stack: ["Astro", "React", "Three.js", "Claude Code", "Multi-Agent"],
    categorie: "ia-meta",
    status: "in-progress",
    github: "https://github.com/juninhomax/Portfolio_cyber_ia",
  },
  {
    id: "timemanager",
    titre: "TimeManager — Gestion du temps de travail",
    titreEn: "TimeManager — Work Time Management",
    description:
      "Application full-stack de gestion des heures de travail : clock in/out, gestion d'équipes, suivi des heures supplémentaires, dashboard admin. Backend Elixir/Phoenix + PostgreSQL, frontend Vue 3 rebuild mobile-first avec animations fluides, PWA offline-first et design responsive. Projet Epitech T-POO-700 avec 275+ commits.",
    descriptionEn:
      "Full-stack work time management application: clock in/out, team management, overtime tracking, admin dashboard. Elixir/Phoenix + PostgreSQL backend, Vue 3 frontend rebuilt mobile-first with smooth animations, offline-first PWA and responsive design. Epitech T-POO-700 project with 275+ commits.",
    stack: [
      "Vue 3",
      "TypeScript",
      "Elixir/Phoenix",
      "PostgreSQL",
      "Tailwind CSS",
      "PWA",
    ],
    categorie: "fullstack",
    status: "completed",
    github: "https://github.com/Hakiick/T-POO-700-STG_1",
    video: "/images/projects/timemanager/timemanager-demo.mp4",
  },
  {
    id: "chess-fighter",
    titre: "Chess Fighter — Jeu d'échecs thématique",
    titreEn: "Chess Fighter — Themed Chess Game",
    description:
      "Jeu d'échecs complet avec des thèmes visuels immersifs (Classic, Marvel, Neon, Pokémon). Animations fluides Framer Motion, responsive mobile-first, effets sonores, confettis de victoire. Projet Epitech construit avec Next.js 14 et orchestré par une architecture multi-agents Claude Code.",
    descriptionEn:
      "Full chess game with immersive visual themes (Classic, Marvel, Neon, Pokémon). Smooth Framer Motion animations, mobile-first responsive, sound effects, victory confetti. Epitech project built with Next.js 14 and orchestrated by a Claude Code multi-agent architecture.",
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Playwright",
      "Vitest",
    ],
    categorie: "fullstack",
    status: "completed",
    github: "https://github.com/Hakiick/ChessGame",
    video: "/images/projects/chessgame/chess-fighter-demo.mp4",
  },
  {
    id: "nsa-banking-infra",
    titre: "Infrastructure DevOps — App Bancaire HA",
    titreEn: "DevOps Infrastructure — HA Banking App",
    description:
      "Application bancaire full-stack déployée sur infrastructure haute disponibilité multi-machines. Backend Node.js/TypeORM sécurisé (JWT, RBAC, bcrypt), frontend React/Redux, monitoring Zabbix centralisé, déploiement 0-downtime avec nginx load balancing et pipeline CI/CD GitHub Actions granulaire. Projet Epitech T-NSA-810 avec 251 commits.",
    descriptionEn:
      "Full-stack banking application deployed on multi-machine high-availability infrastructure. Secure Node.js/TypeORM backend (JWT, RBAC, bcrypt), React/Redux frontend, centralized Zabbix monitoring, 0-downtime deployment with nginx load balancing and granular GitHub Actions CI/CD pipeline. Epitech T-NSA-810 project with 251 commits.",
    stack: [
      "Node.js/TypeScript",
      "React/Redux",
      "Docker/Podman",
      "Ansible",
      "Zabbix",
      "GitHub Actions",
    ],
    categorie: "devops",
    status: "completed",
    github: "https://github.com/Hakiick/T-NSA-810-STG_9",
  },
  {
    id: "trelltech-mobile",
    titre: "TrellTech — Client Trello Mobile",
    titreEn: "TrellTech — Mobile Trello Client",
    description:
      "Client mobile Trello développé en React Native/Expo, implémentant la hiérarchie complète de gestion de projets (workspaces, boards, lists, cartes, membres) via intégration API REST native. Architecture multi-écrans avec routage Expo Router et TypeScript strict. Projet Epitech T-DEV-600.",
    descriptionEn:
      "Native Trello mobile client built with React Native and Expo, implementing full project management hierarchy (workspaces, boards, lists, cards, members) through native REST API integration. Multi-screen architecture with Expo Router and strict TypeScript. Epitech T-DEV-600 project.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Trello API",
      "React Navigation",
    ],
    categorie: "fullstack",
    status: "completed",
    github: "https://github.com/Hakiick/T-DEV-600-STG_18",
  },
  {
    id: "cloud-paas-azure",
    titre: "PaaS Azure — Infrastructure Cloud",
    titreEn: "Azure PaaS — Cloud Infrastructure",
    description:
      "Déploiement PaaS complet sur Azure avec Infrastructure-as-Code Terraform. Pipeline d'automation couvrant containerisation Docker (ACR), MySQL Flexible Server sécurisé SSL/TLS, monitoring Azure Monitor avec alerting multi-canal et validation des performances via load testing Locust. Projet Epitech T-CLO-901.",
    descriptionEn:
      "End-to-end PaaS deployment on Microsoft Azure using Terraform Infrastructure-as-Code. Automation pipeline spanning Docker containerization (ACR), SSL/TLS-secured MySQL Flexible Server, Azure Monitor with multi-channel alerting and Locust load testing performance validation. Epitech T-CLO-901 project.",
    stack: ["Terraform", "Azure", "Docker", "MySQL", "Azure Monitor", "Bash"],
    categorie: "devops",
    status: "completed",
    github: "https://github.com/Hakiick/T-CLO-901-STG_10",
  },
  {
    id: "bombcrypto-bot",
    titre: "Bombcrypto Bot — Automatisation RPA",
    titreEn: "Bombcrypto Bot — RPA Automation",
    description:
      "Bot RPA autonome pour jeu blockchain Bombcrypto. Reconnaissance de patterns d'écran via template matching (80+ templates PNG), orchestration multi-session parallèle avec stratégies d'attaque tierisées et gestion intelligente du cooldown. Architecture modulaire avec mécanismes de résilience et retry.",
    descriptionEn:
      "Autonomous RPA bot for Bombcrypto blockchain game. Screen pattern recognition via template matching (80+ PNG templates), parallel multi-session orchestration with tiered attack strategies and intelligent cooldown management. Modular architecture with resilience mechanisms and retry logic.",
    stack: ["Python", "PyAutoGUI", "Computer Vision", "RPA"],
    categorie: "ia",
    status: "completed",
    github: "https://github.com/Hakiick/Bombcrypto_bot_2021",
  },
  {
    id: "winonebitcoin-bot",
    titre: "WinOneBitcoin — Bot Binance",
    titreEn: "WinOneBitcoin — Binance Bot",
    description:
      "Bot d'automatisation d'interface Binance exploitant la vision par ordinateur pour la détection temps réel de séquences visuelles (57 états d'UI). Pipeline de données multi-threadé avec export Excel et notifications push via API Pushover.",
    descriptionEn:
      "Binance interface automation bot leveraging computer vision for real-time visual sequence detection (57 UI states). Multi-threaded data pipeline with Excel export and push notifications via Pushover API.",
    stack: [
      "Python",
      "PyAutoGUI",
      "Computer Vision",
      "Multi-threading",
      "Pandas",
    ],
    categorie: "ia",
    status: "completed",
    github: "https://github.com/Hakiick/WinOneBitcoin_2022",
  },
  {
    id: "swc-bot",
    titre: "SWC Bot — Automatisation RPG Mobile",
    titreEn: "SWC Bot — Mobile RPG Automation",
    description:
      "Bot d'automatisation pour jeu mobile RPG implémentant 30+ scénarios de gameplay automatisés (arènes, donjons, expéditions, minage) avec seuils de confiance adaptatifs et optimisation par régions d'intérêt. Architecture modulaire multi-plateforme Windows/Linux.",
    descriptionEn:
      "Mobile RPG game automation bot implementing 30+ automated gameplay scenarios (arenas, dungeons, expeditions, mining) with adaptive confidence thresholds and region-of-interest optimization. Cross-platform modular architecture for Windows and Linux.",
    stack: ["Python", "PyAutoGUI", "OpenCV", "Template Matching", "RPA"],
    categorie: "ia",
    status: "completed",
    github: "https://github.com/Hakiick/SWC_Bot_2022",
  },
];
