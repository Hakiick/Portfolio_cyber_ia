export interface TerminalCommand {
  name: string;
  description: string;
  output: string | ((args: string[]) => string);
}

export const terminalCommands: TerminalCommand[] = [
  {
    name: "whoami",
    description: "Display current user",
    output: "Hakick (Maxime) — AI Security Engineer in the making",
  },
  {
    name: "help",
    description: "List available commands",
    output:
      "Commandes disponibles : whoami, skills, projects, certifs, contact, cv, clear, sudo hire-me",
  },
  {
    name: "skills",
    description: "Display skills overview",
    output: [
      "┌─────────────────────────┬───────┐",
      "│ Cloud / DevOps          │ ██████░░ 85% │",
      "│ Monitoring              │ ███████░ 90% │",
      "│ Cybersécurité           │ █████░░░ 75% │",
      "│ IA / IA Générative      │ █████░░░ 70% │",
      "└─────────────────────────┴───────┘",
    ].join("\n"),
  },
  {
    name: "projects",
    description: "List all projects",
    output: [
      "  [✓] Object Detection YOLOv8    — IA de détection custom",
      "  [~] Agent IA Discord            — Résumés auto de vidéos",
      "  [~] Chatbot IA Cybersécurité    — Assistant pentest IA",
      "  [✓] NFC Reader Exploit          — Exploitation lecteur NFC",
      "  [~] Domotique Cloud-Native      — IoT + AWS IoT Core",
      "  [✓] Cluster Kubernetes          — k0s + CI/CD + monitoring",
      "  [~] Ce Portfolio                — Multi-agent Claude Code",
    ].join("\n"),
  },
  {
    name: "ls",
    description: "List directory contents",
    output: "about.txt  skills/  projects/  certifs.md  contact.sh  .secret",
  },
  {
    name: "cat about.txt",
    description: "Display about file",
    output:
      "Étudiant en dernière année à Epitech, spécialisé cloud computing et cybersécurité. Administrateur systèmes et réseaux avec un rôle de tech lead (backup, supervision, environnements critiques). Passionné par la sécurité des LLM, leur industrialisation et leur intégration en entreprise.",
  },
  {
    name: "cat .secret",
    description: "Try to read secret file",
    output: "Nice try ;) — But there's nothing hidden here... or is there?",
  },
  {
    name: "certifs",
    description: "Display certifications",
    output: [
      "┌──────────────────────┬─────────────┬────────────┐",
      "│ Certification        │ Organisme   │ Statut     │",
      "├──────────────────────┼─────────────┼────────────┤",
      "│ eJPTv2               │ INE Security│ ✓ Obtained │",
      "│ AZ-900               │ Microsoft   │ ○ Preparing│",
      "│ AWS Cloud Practitioner│ AWS        │ ○ Preparing│",
      "│ AWS AI Practitioner  │ AWS         │ ~ In progress│",
      "└──────────────────────┴─────────────┴────────────┘",
    ].join("\n"),
  },
  {
    name: "contact",
    description: "Display contact info",
    output: [
      "📧 Email:  contact@hakick.dev",
      "🐙 GitHub: https://github.com/juninhomax",
      "📍 Location: France",
    ].join("\n"),
  },
  {
    name: "cv",
    description: "Download CV",
    output: "Downloading CV... → Opening PDF in new tab.",
  },
  {
    name: "clear",
    description: "Clear terminal",
    output: "__CLEAR__",
  },
  {
    name: "sudo hire-me",
    description: "Easter egg hire command",
    output:
      "Permission granted. Sending CV to recruiter... ✓ Done. Expect a call soon.",
  },
  {
    name: "pwd",
    description: "Print working directory",
    output: "/home/hakick/portfolio",
  },
  {
    name: "uname",
    description: "Display system info",
    output: "HakickOS 1.0 — Powered by curiosity and caffeine",
  },
  {
    name: "ping",
    description: "Ping test",
    output: "PONG — Latency: 0ms (I'm always available)",
  },
  {
    name: "nmap",
    description: "Network scan simulation",
    output:
      "Scanning portfolio.hakick.dev... 443/tcp open — All services nominal.",
  },
  {
    name: "exit",
    description: "Try to exit",
    output: "Pourquoi partir ? Il y a encore tant à découvrir...",
  },
];
