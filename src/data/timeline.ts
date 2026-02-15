export type TimelineEntryType =
  | "formation"
  | "experience"
  | "certification"
  | "pivot";

export interface TimelineEntry {
  date: string;
  titre: string;
  titreEn?: string;
  description: string;
  descriptionEn?: string;
  type: TimelineEntryType;
}

export const timeline: TimelineEntry[] = [
  {
    date: "2020 - présent",
    titre: "Epitech",
    titreEn: "Epitech",
    description:
      "Formation en informatique, spécialisation cloud computing et cybersécurité. Dernière année.",
    descriptionEn:
      "Computer science education, specializing in cloud computing and cybersecurity. Final year.",
    type: "formation",
  },
  {
    date: "En poste",
    titre: "Administrateur Systèmes & Réseaux — Tech Lead",
    titreEn: "Systems & Network Administrator — Tech Lead",
    description:
      "Backup, supervision, environnements critiques. Expertise Nagios, Zabbix, Prometheus. Gestion d'équipe technique.",
    descriptionEn:
      "Backup, monitoring, critical environments. Expertise in Nagios, Zabbix, Prometheus. Technical team management.",
    type: "experience",
  },
  {
    date: "2024",
    titre: "Certification eJPTv2",
    titreEn: "eJPTv2 Certification",
    description:
      "Junior Penetration Tester — validation des compétences en pentest et sécurité offensive.",
    descriptionEn:
      "Junior Penetration Tester — validation of pentesting and offensive security skills.",
    type: "certification",
  },
  {
    date: "2025 - présent",
    titre: "Spécialisation IA Générative & LLM Security",
    titreEn: "Generative AI & LLM Security Specialization",
    description:
      "Projets personnels autour de YOLOv8, agents IA, sécurité des LLM. Orientation vers AI Security Engineer.",
    descriptionEn:
      "Personal projects around YOLOv8, AI agents, LLM security. Orienting towards AI Security Engineer.",
    type: "pivot",
  },
];
