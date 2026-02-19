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
    id: "agent-discord-n8n",
    titre: "Agent IA Discord — Résumés automatiques",
    titreEn: "Discord AI Agent — Automated Summaries",
    description:
      "Agent automatisé qui résume les vidéos quotidiennes d'un YouTuber Pokémon. Pipeline : scraping vidéos → résumé LLM → publication Discord. Scalable à 20-30 chaînes.",
    descriptionEn:
      "Automated agent that summarizes daily Pokémon YouTuber videos. Pipeline: video scraping → LLM summary → Discord publication. Scalable to 20-30 channels.",
    stack: ["n8n", "LLM API", "Discord Bot", "Node.js"],
    categorie: "ia",
    status: "in-progress",
    github: "",
  },
  {
    id: "chatbot-cyber",
    titre: "Chatbot IA Cybersécurité",
    titreEn: "Cybersecurity AI Chatbot",
    description:
      "Assistant IA spécialisé hacking/pentest. Support technique intelligent pour le contexte cyber : méthodologies, outils, exploitation.",
    descriptionEn:
      "AI assistant specialized in hacking/pentesting. Intelligent technical support for cyber context: methodologies, tools, exploitation.",
    stack: ["Python", "LLM", "RAG", "Cybersecurity"],
    categorie: "ia-cyber",
    status: "in-progress",
    github: "",
  },
  {
    id: "nfc-hack",
    titre: "NFC Reader Exploit",
    titreEn: "NFC Reader Exploit",
    description:
      "Projet scolaire Epitech : exploitation d'un lecteur NFC pour intercepter et retransmettre des identifiants. Analyse de protocole, reverse engineering.",
    descriptionEn:
      "Epitech school project: exploiting an NFC reader to intercept and relay credentials. Protocol analysis, reverse engineering.",
    stack: ["Hardware", "NFC", "Reverse Engineering", "C"],
    categorie: "cyber",
    status: "completed",
    github: "",
  },
  {
    id: "iot-domotique",
    titre: "Domotique Cloud-Native",
    titreEn: "Cloud-Native Smart Home",
    description:
      "Architecture domotique personnelle : capteurs Zigbee2MQTT, broker MQTT cloud (AWS IoT Core), analyse présence via capteurs de mouvement. Raspberry Pi + cloud.",
    descriptionEn:
      "Personal smart home architecture: Zigbee2MQTT sensors, cloud MQTT broker (AWS IoT Core), presence analysis via motion sensors. Raspberry Pi + cloud.",
    stack: [
      "Home Assistant",
      "Zigbee2MQTT",
      "MQTT",
      "AWS IoT Core",
      "Raspberry Pi",
    ],
    categorie: "cloud-iot",
    status: "in-progress",
    github: "",
  },
  {
    id: "infra-k8s",
    titre: "Cluster Kubernetes Production",
    titreEn: "Production Kubernetes Cluster",
    description:
      "Conception et déploiement de clusters k0s virtualisés. Pipelines GitLab CI/CD complètes, monitoring Prometheus, déploiement containerisé.",
    descriptionEn:
      "Design and deployment of virtualized k0s clusters. Complete GitLab CI/CD pipelines, Prometheus monitoring, containerized deployment.",
    stack: ["Kubernetes", "k0s", "GitLab CI/CD", "Prometheus", "Docker"],
    categorie: "devops",
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
    screenshots: [
      "/images/projects/timemanager/login-desktop.png",
      "/images/projects/timemanager/login-tablet.png",
      "/images/projects/timemanager/login-mobile.png",
      "/images/projects/timemanager/reset-password-desktop.png",
      "/images/projects/timemanager/reset-password-mobile.png",
      "/images/projects/timemanager/confirm-account-desktop.png",
    ],
  },
];
