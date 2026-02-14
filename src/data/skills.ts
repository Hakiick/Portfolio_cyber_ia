export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  id: string;
  label: string;
  level: number;
  items: Skill[];
}

export const skills: SkillCategory[] = [
  {
    id: "cloud_devops",
    label: "Cloud / DevOps",
    level: 85,
    items: [
      { name: "Kubernetes (k0s)", level: 80 },
      { name: "GitLab CI/CD", level: 85 },
      { name: "Terraform", level: 65 },
      { name: "Docker", level: 90 },
      { name: "AWS (eu-west-1)", level: 70 },
      { name: "Azure", level: 60 },
      { name: "Proxmox VE", level: 80 },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring / Observabilité",
    level: 90,
    items: [
      { name: "Nagios Core / XI", level: 95 },
      { name: "Zabbix", level: 85 },
      { name: "Prometheus", level: 75 },
      { name: "Checks custom multi-hosts", level: 90 },
    ],
  },
  {
    id: "cybersecurite",
    label: "Cybersécurité",
    level: 75,
    items: [
      { name: "Pentest (eJPTv2)", level: 70 },
      { name: "CTF", level: 75 },
      { name: "Sécurité applicative", level: 70 },
      { name: "LLM Security (OWASP Top 10)", level: 65 },
      { name: "Prompt Injection / Jailbreaks", level: 70 },
      { name: "NFC Hacking", level: 60 },
    ],
  },
  {
    id: "ia_generative",
    label: "IA / IA Générative",
    level: 70,
    items: [
      { name: "YOLOv8 / Computer Vision", level: 75 },
      { name: "LLM (Claude, GPT, LLaMA)", level: 70 },
      { name: "Agents IA (n8n)", level: 65 },
      { name: "Dataset building", level: 70 },
      { name: "Guardrails / Output control", level: 60 },
    ],
  },
];
