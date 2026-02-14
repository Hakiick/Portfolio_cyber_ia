export type ProjectCategory = "ia" | "cyber" | "ia-cyber" | "cloud-iot" | "devops" | "ia-meta";
export type ProjectStatus = "completed" | "in-progress";

export interface Project {
  id: string;
  titre: string;
  description: string;
  stack: string[];
  categorie: ProjectCategory;
  status: ProjectStatus;
  github: string;
}

export const projects: Project[] = [
  {
    id: "yolov8-detection",
    titre: "Object Detection YOLOv8",
    description:
      "IA de détection d'objets spécifiques (blé, eau, ressources) dans des captures d'écran de jeu 3D. Entraînement custom, dataset building, détection temps réel.",
    stack: ["Python", "YOLOv8", "Computer Vision", "PyTorch"],
    categorie: "ia",
    status: "completed",
    github: "",
  },
  {
    id: "agent-discord-n8n",
    titre: "Agent IA Discord — Résumés automatiques",
    description:
      "Agent automatisé qui résume les vidéos quotidiennes d'un YouTuber Pokémon. Pipeline : scraping vidéos → résumé LLM → publication Discord. Scalable à 20-30 chaînes.",
    stack: ["n8n", "LLM API", "Discord Bot", "Node.js"],
    categorie: "ia",
    status: "in-progress",
    github: "",
  },
  {
    id: "chatbot-cyber",
    titre: "Chatbot IA Cybersécurité",
    description:
      "Assistant IA spécialisé hacking/pentest. Support technique intelligent pour le contexte cyber : méthodologies, outils, exploitation.",
    stack: ["Python", "LLM", "RAG", "Cybersecurity"],
    categorie: "ia-cyber",
    status: "in-progress",
    github: "",
  },
  {
    id: "nfc-hack",
    titre: "NFC Reader Exploit",
    description:
      "Projet scolaire Epitech : exploitation d'un lecteur NFC pour intercepter et retransmettre des identifiants. Analyse de protocole, reverse engineering.",
    stack: ["Hardware", "NFC", "Reverse Engineering", "C"],
    categorie: "cyber",
    status: "completed",
    github: "",
  },
  {
    id: "iot-domotique",
    titre: "Domotique Cloud-Native",
    description:
      "Architecture domotique personnelle : capteurs Zigbee2MQTT, broker MQTT cloud (AWS IoT Core), analyse présence via capteurs de mouvement. Raspberry Pi + cloud.",
    stack: ["Home Assistant", "Zigbee2MQTT", "MQTT", "AWS IoT Core", "Raspberry Pi"],
    categorie: "cloud-iot",
    status: "in-progress",
    github: "",
  },
  {
    id: "infra-k8s",
    titre: "Cluster Kubernetes Production",
    description:
      "Conception et déploiement de clusters k0s virtualisés. Pipelines GitLab CI/CD complètes, monitoring Prometheus, déploiement containerisé.",
    stack: ["Kubernetes", "k0s", "GitLab CI/CD", "Prometheus", "Docker"],
    categorie: "devops",
    status: "completed",
    github: "",
  },
  {
    id: "portfolio-multi-agent",
    titre: "Ce Portfolio (Meta-projet)",
    description:
      "Ce portfolio lui-même : construit par une architecture multi-agents Claude Code (9 agents spécialisés coordonnés via tmux). Preuve de maîtrise des workflows IA.",
    stack: ["Astro", "React", "Three.js", "Claude Code", "Multi-Agent"],
    categorie: "ia-meta",
    status: "in-progress",
    github: "https://github.com/juninhomax/Portfolio_cyber_ia",
  },
];
