export type Language = "fr" | "en";

export const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Nav sections
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.certifications": "Certs",
    "nav.timeline": "Timeline",
    "nav.terminal": "Terminal",
    "nav.contact": "Contact",

    // Section titles
    "section.about": "à_propos_",
    "section.skills": "compétences_",
    "section.projects": "projets_",
    "section.certifications": "certifications_",
    "section.timeline": "parcours_",
    "section.terminal": "terminal_",
    "section.contact": "contact_",

    // Hero
    "hero.title": "AI Security Engineer in the making",
    "hero.subtitle": "Cloud · Cyber · IA Générative",
    "hero.cta": "Explorer mon profil",

    // About
    "about.bio":
      "Étudiant en dernière année à Epitech, spécialisé cloud computing et cybersécurité. Administrateur systèmes et réseaux avec un rôle de tech lead (backup, supervision, environnements critiques). Passionné par la sécurité des LLM, leur industrialisation et leur intégration en entreprise.",
    "about.strength.cloud.title": "Cloud & Infra",
    "about.strength.cloud.desc":
      "Administration systèmes et réseaux, Kubernetes k0s, Docker, Proxmox VE. Monitoring avancé avec Nagios, Zabbix, Prometheus.",
    "about.strength.cyber.title": "Cybersécurité",
    "about.strength.cyber.desc":
      "Certifié eJPTv2, CTF, sécurité applicative. Spécialisation LLM Security : prompt injection, jailbreaks, OWASP Top 10 for LLM.",
    "about.strength.ai.title": "IA Générative",
    "about.strength.ai.desc":
      "Computer Vision (YOLOv8), agents IA automatisés (n8n), intégration LLM en entreprise. Dataset building et guardrails.",
    "about.strength.lead.title": "Tech Lead",
    "about.strength.lead.desc":
      "Gestion d'équipe technique, environnements critiques, backup et supervision. Pipelines CI/CD GitLab complètes.",
    "about.neofetch.os": "OS",
    "about.neofetch.host": "Host",
    "about.neofetch.role": "Role",
    "about.neofetch.school": "School",
    "about.neofetch.stack": "Stack",
    "about.neofetch.certs": "Certs",
    "about.neofetch.shell": "Shell",
    "about.neofetch.editor": "Editor",
    "about.neofetch.role.value": "AI Security Engineer",
    "about.neofetch.school.value": "Epitech (5th year)",
    "about.neofetch.stack.value": "Cloud · Cyber · GenAI",
    "about.neofetch.certs.value": "eJPTv2, AZ-900, AWS",
    "about.neofetch.shell.value": "zsh + tmux",
    "about.neofetch.editor.value": "Neovim + Claude Code",

    // Contact
    "contact.label.name": "> nom_",
    "contact.label.email": "> email_",
    "contact.label.message": "> message_",
    "contact.placeholder.name": "Votre nom",
    "contact.placeholder.email": "votre@email.com",
    "contact.placeholder.message": "Votre message...",
    "contact.button.send": "[ ENVOYER ]",
    "contact.status.encrypting": "Encrypting...",
    "contact.status.transmitting": "Transmitting...",
    "contact.status.sent": "Sent ✓",
    "contact.email.label": "Envoyer un email",
    "contact.github.label": "Profil GitHub",

    // Footer
    "footer.uptime": "uptime",
    "footer.uname": "uname -v",
    "footer.uname.value": "HakickOS v1.0",
    "footer.copyright": "echo $COPYRIGHT",
    "footer.copyright.value": "© 2025 {pseudo} — All rights reserved",
    "footer.motd": "cat /etc/motd",
    "footer.motd.value": "Built with multi-agent AI (9 Claude agents)",
    "footer.github": "open github",

    // Projects
    "projects.filter.all": "Tous",
    "projects.filter.ia": "IA",
    "projects.filter.cyber": "Cyber",
    "projects.filter.devops": "DevOps",
    "projects.filter.iot": "IoT",
    "projects.status.completed": "Complété",
    "projects.status.in-progress": "En cours",

    // Terminal
    "terminal.welcome":
      "Welcome to HakickOS Terminal. Type 'help' to see available commands.",
    "terminal.prompt": "hakick@portfolio:~$",
    "terminal.command.unknown":
      "command not found: {cmd}. Type 'help' for available commands.",

    // Boot Sequence
    "boot.skip": "Skip",
    "boot.line.bios": "Initializing HakickOS v1.0...",
    "boot.line.kernel": "Loading kernel modules",
    "boot.line.filesystem": "Mounting secure filesystem",
    "boot.line.network": "Starting network interfaces",
    "boot.line.scan": "Running port scan... 443/tcp open",
    "boot.line.firewall": "Firewall rules applied",
    "boot.line.ai": "Loading AI models...",
    "boot.line.neural": "Neural network initialized",
    "boot.line.ready": "System boot complete.",
    "boot.welcome": "> Welcome, visitor. Initializing portfolio...",

    // Skills
    "skills.cloud.label": "Cloud / DevOps",
    "skills.monitoring.label": "Monitoring / Observabilité",
    "skills.cyber.label": "Cybersécurité",
    "skills.ai.label": "IA / IA Générative",

    // Timeline
    "timeline.type.formation": "Formation",
    "timeline.type.experience": "Expérience",
    "timeline.type.certification": "Certification",
    "timeline.type.pivot": "Évolution",

    // Certifications
    "certifications.status.obtained": "Obtenue",
    "certifications.status.in-progress": "En cours",
    "certifications.status.preparing": "En préparation",
  },
  en: {
    // Nav sections
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.certifications": "Certs",
    "nav.timeline": "Timeline",
    "nav.terminal": "Terminal",
    "nav.contact": "Contact",

    // Section titles
    "section.about": "about_me_",
    "section.skills": "skills_",
    "section.projects": "projects_",
    "section.certifications": "certifications_",
    "section.timeline": "timeline_",
    "section.terminal": "terminal_",
    "section.contact": "contact_",

    // Hero
    "hero.title": "AI Security Engineer in the making",
    "hero.subtitle": "Cloud · Cyber · Generative AI",
    "hero.cta": "Explore my profile",

    // About
    "about.bio":
      "Final-year student at Epitech, specialized in cloud computing and cybersecurity. Systems and network administrator with a tech lead role (backup, monitoring, critical environments). Passionate about LLM security, industrialization, and enterprise integration.",
    "about.strength.cloud.title": "Cloud & Infra",
    "about.strength.cloud.desc":
      "Systems and network administration, Kubernetes k0s, Docker, Proxmox VE. Advanced monitoring with Nagios, Zabbix, Prometheus.",
    "about.strength.cyber.title": "Cybersecurity",
    "about.strength.cyber.desc":
      "eJPTv2 certified, CTF, application security. Specializing in LLM Security: prompt injection, jailbreaks, OWASP Top 10 for LLM.",
    "about.strength.ai.title": "Generative AI",
    "about.strength.ai.desc":
      "Computer Vision (YOLOv8), automated AI agents (n8n), enterprise LLM integration. Dataset building and guardrails.",
    "about.strength.lead.title": "Tech Lead",
    "about.strength.lead.desc":
      "Technical team management, critical environments, backup and monitoring. Complete GitLab CI/CD pipelines.",
    "about.neofetch.os": "OS",
    "about.neofetch.host": "Host",
    "about.neofetch.role": "Role",
    "about.neofetch.school": "School",
    "about.neofetch.stack": "Stack",
    "about.neofetch.certs": "Certs",
    "about.neofetch.shell": "Shell",
    "about.neofetch.editor": "Editor",
    "about.neofetch.role.value": "AI Security Engineer",
    "about.neofetch.school.value": "Epitech (5th year)",
    "about.neofetch.stack.value": "Cloud · Cyber · GenAI",
    "about.neofetch.certs.value": "eJPTv2, AZ-900, AWS",
    "about.neofetch.shell.value": "zsh + tmux",
    "about.neofetch.editor.value": "Neovim + Claude Code",

    // Contact
    "contact.label.name": "> name_",
    "contact.label.email": "> email_",
    "contact.label.message": "> message_",
    "contact.placeholder.name": "Your name",
    "contact.placeholder.email": "your@email.com",
    "contact.placeholder.message": "Your message...",
    "contact.button.send": "[ SEND ]",
    "contact.status.encrypting": "Encrypting...",
    "contact.status.transmitting": "Transmitting...",
    "contact.status.sent": "Sent ✓",
    "contact.email.label": "Send an email",
    "contact.github.label": "GitHub profile",

    // Footer
    "footer.uptime": "uptime",
    "footer.uname": "uname -v",
    "footer.uname.value": "HakickOS v1.0",
    "footer.copyright": "echo $COPYRIGHT",
    "footer.copyright.value": "© 2025 {pseudo} — All rights reserved",
    "footer.motd": "cat /etc/motd",
    "footer.motd.value": "Built with multi-agent AI (9 Claude agents)",
    "footer.github": "open github",

    // Projects
    "projects.filter.all": "All",
    "projects.filter.ia": "AI",
    "projects.filter.cyber": "Cyber",
    "projects.filter.devops": "DevOps",
    "projects.filter.iot": "IoT",
    "projects.status.completed": "Completed",
    "projects.status.in-progress": "In progress",

    // Terminal
    "terminal.welcome":
      "Welcome to HakickOS Terminal. Type 'help' to see available commands.",
    "terminal.prompt": "hakick@portfolio:~$",
    "terminal.command.unknown":
      "command not found: {cmd}. Type 'help' for available commands.",

    // Boot Sequence
    "boot.skip": "Skip",
    "boot.line.bios": "Initializing HakickOS v1.0...",
    "boot.line.kernel": "Loading kernel modules",
    "boot.line.filesystem": "Mounting secure filesystem",
    "boot.line.network": "Starting network interfaces",
    "boot.line.scan": "Running port scan... 443/tcp open",
    "boot.line.firewall": "Firewall rules applied",
    "boot.line.ai": "Loading AI models...",
    "boot.line.neural": "Neural network initialized",
    "boot.line.ready": "System boot complete.",
    "boot.welcome": "> Welcome, visitor. Initializing portfolio...",

    // Skills
    "skills.cloud.label": "Cloud / DevOps",
    "skills.monitoring.label": "Monitoring / Observability",
    "skills.cyber.label": "Cybersecurity",
    "skills.ai.label": "AI / Generative AI",

    // Timeline
    "timeline.type.formation": "Education",
    "timeline.type.experience": "Experience",
    "timeline.type.certification": "Certification",
    "timeline.type.pivot": "Evolution",

    // Certifications
    "certifications.status.obtained": "Obtained",
    "certifications.status.in-progress": "In progress",
    "certifications.status.preparing": "Preparing",
  },
};
