export type TimelineEntryType =
  | "formation"
  | "experience"
  | "certification"
  | "pivot";

export interface TimelineEntry {
  date: string;
  titre: string;
  description: string;
  type: TimelineEntryType;
}

export const timeline: TimelineEntry[] = [
  {
    date: "2020 - présent",
    titre: "Epitech",
    description:
      "Formation en informatique, spécialisation cloud computing et cybersécurité. Dernière année.",
    type: "formation",
  },
  {
    date: "En poste",
    titre: "Administrateur Systèmes & Réseaux — Tech Lead",
    description:
      "Backup, supervision, environnements critiques. Expertise Nagios, Zabbix, Prometheus. Gestion d'équipe technique.",
    type: "experience",
  },
  {
    date: "2024",
    titre: "Certification eJPTv2",
    description:
      "Junior Penetration Tester — validation des compétences en pentest et sécurité offensive.",
    type: "certification",
  },
  {
    date: "2025 - présent",
    titre: "Spécialisation IA Générative & LLM Security",
    description:
      "Projets personnels autour de YOLOv8, agents IA, sécurité des LLM. Orientation vers AI Security Engineer.",
    type: "pivot",
  },
];
