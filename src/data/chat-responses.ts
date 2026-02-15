export interface ChatPattern {
  patterns: RegExp[];
  response: string;
}

export const chatPatterns: ChatPattern[] = [
  {
    patterns: [/qui\s+(es|est)/i, /who\s+are/i, /about/i, /présent/i, /toi/i],
    response:
      "Je suis Hakick (Maxime), étudiant en dernière année à Epitech. Spécialisé cloud computing, cybersécurité et IA générative. Je vise des postes d'AI Security Engineer.",
  },
  {
    patterns: [/skill/i, /compéten/i, /tech/i, /stack/i, /sais\s+faire/i],
    response:
      "Mes 4 axes : Cloud/DevOps (Docker, K8s, CI/CD) à 85%, Monitoring (Nagios, Zabbix) à 90%, Cybersécurité (pentest, LLM Security) à 75%, et IA Générative (YOLOv8, LLM, agents) à 70%.",
  },
  {
    patterns: [/projet/i, /project/i, /portfolio/i, /réalis/i],
    response:
      "Quelques projets phares : détection d'objets YOLOv8, agent IA Discord, chatbot cybersécurité, exploit NFC, cluster Kubernetes, et ce portfolio lui-même construit par une archi multi-agents.",
  },
  {
    patterns: [/certif/i, /diplôme/i, /formation/i, /étud/i, /school/i],
    response:
      "Certifié eJPTv2 (pentest). En cours : AWS AI Practitioner. En préparation : AZ-900 et AWS Cloud Practitioner. Formation à Epitech depuis 2020.",
  },
  {
    patterns: [/contact/i, /email/i, /mail/i, /joindre/i, /reach/i],
    response:
      "Tu peux me contacter par email à contact@hakick.dev ou via GitHub : github.com/juninhomax. Je suis basé en France.",
  },
  {
    patterns: [/hire/i, /recrut/i, /embauche/i, /job/i, /poste/i, /travail/i],
    response:
      "Je cherche un poste d'AI Security Engineer ou GenAI Consultant. Tape 'sudo hire-me' pour lancer la procédure ;)",
  },
  {
    patterns: [/cyber/i, /sécu/i, /hack/i, /pentest/i, /ctf/i],
    response:
      "La cybersécurité est mon terrain de jeu. Certifié eJPTv2, passionné par la sécurité des LLM (OWASP Top 10 for LLMs), prompt injection, et le hacking éthique.",
  },
  {
    patterns: [/ia|ai|llm|gpt|claude|machine\s+learn/i, /intelligence/i],
    response:
      "L'IA générative est mon pivot 2025. Je travaille sur YOLOv8, des agents IA (n8n), la sécurité des LLM, et les guardrails. Ce portfolio est lui-même construit avec Claude Code multi-agents.",
  },
  {
    patterns: [/cloud|devops|docker|k8s|kubernetes|aws|azure/i],
    response:
      "Mon quotidien : Docker, Kubernetes (k0s), GitLab CI/CD, Terraform, AWS et Azure. Admin sys/réseau avec supervision Nagios et Zabbix.",
  },
  {
    patterns: [/bonjour|salut|hello|hey|coucou|hi\b/i],
    response:
      "Salut ! Je suis l'assistant IA du portfolio de Hakick. Pose-moi une question sur ses compétences, projets, ou parcours !",
  },
  {
    patterns: [/merci|thank/i],
    response:
      "De rien ! N'hésite pas si tu as d'autres questions. Et pense à taper 'achievements' pour voir tes trophées ;)",
  },
  {
    patterns: [/aide|help/i],
    response:
      "Tu peux me demander : qui est Hakick, ses compétences, ses projets, ses certifications, comment le contacter, ou parler de cyber/IA/cloud.",
  },
];

export const defaultResponse =
  "Hmm, je ne suis pas sûr de comprendre. Essaie de me demander des infos sur les compétences, projets, certifications ou le parcours de Hakick !";
