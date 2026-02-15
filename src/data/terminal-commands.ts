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
    output: [
      "Commandes disponibles :",
      "  whoami, skills, projects, certifs, contact, cv, clear",
      "  ls, cat, pwd, uname, ping, nmap, exit",
      "  echo, date, uptime, history, neofetch",
      "  sudo hire-me, man hire-me, flags, achievements",
      "",
      "Try hacking around... there might be easter eggs ;)",
    ].join("\n"),
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
  {
    name: "matrix",
    description: "Enter the Matrix",
    output: "__MATRIX__",
  },
  {
    name: "hack",
    description: "Hack simulation",
    output: [
      "[SCAN] Enumerating ports...",
      "[FOUND] 22/tcp open ssh",
      "[FOUND] 443/tcp open https",
      "[VULN] CVE-2024-31337 detected",
      "[EXPLOIT] Deploying payload...",
      "[ACCESS] Shell obtained",
      "[INFO] Just kidding. Ethical hacking only ;)",
    ].join("\n"),
  },
  {
    name: "rm -rf /",
    description: "Nice try",
    output: [
      "[RED]Deleting /home... ████░░░░ 50%",
      "[RED]Deleting /etc... ██████░░ 75%",
      "[RED]Deleting /root... ████████ 100%",
      "[RED][ABORT] Nice try. System intact.",
    ].join("\n"),
  },
  {
    name: "sudo su",
    description: "Switch user attempt",
    output: "Password: ********\nsu: Authentication failure",
  },
  {
    name: "cat /etc/shadow",
    description: "Read shadow file",
    output: "root:$6$xyz...abc:19234:0:99999:7:::\nHow did you get here?",
  },
  {
    name: "man hire-me",
    description: "Manual page for hire-me",
    output: [
      "HIRE-ME(1)              Hakick Manual             HIRE-ME(1)",
      "",
      "NAME",
      "    hire-me - recruit an AI Security Engineer",
      "",
      "SYNOPSIS",
      "    sudo hire-me [--immediate] [--remote]",
      "",
      "DESCRIPTION",
      "    Sends a hiring request to Hakick (Maxime).",
      "    Warning: May cause immediate productivity boost.",
      "",
      "OPTIONS",
      "    --immediate    Skip interview, hire directly",
      "    --remote       Remote position preferred",
      "",
      "RETURN VALUE",
      "    0 on success, 1 if already hired",
      "",
      "BUGS",
      "    No known bugs. Only features.",
      "",
      "SEE ALSO",
      "    skills(1), projects(1), certifs(1)",
    ].join("\n"),
  },
  {
    name: "history",
    description: "Show command history",
    output: [
      "  1  nmap -sV target.com",
      '  2  sqlmap -u "http://target.com/?id=1"',
      "  3  python3 exploit.py --target 10.0.0.1",
      "  4  cat /etc/passwd",
      "  5  oops wrong terminal",
      "  6  clear",
      '  7  echo "I should probably use my own portfolio"',
    ].join("\n"),
  },
  {
    name: "neofetch",
    description: "System information",
    output: [
      "    \u2588\u2588\u2557  \u2588\u2588\u2557         hakick@portfolio",
      "    \u2588\u2588\u2551  \u2588\u2588\u2551         \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
      "    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551         OS: HakickOS 1.0",
      "    \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551         Shell: zsh 5.9",
      "    \u2588\u2588\u2551  \u2588\u2588\u2551         Terminal: cyber-term",
      "    \u255a\u2550\u255d  \u255a\u2550\u255d         CPU: Neural Network v3",
      "                      GPU: Three.js + Bloom",
      "                      Memory: \u221e",
      "                      Uptime: since 2020",
      "                      Packages: 7 projects",
      "                      Certs: 1 obtained",
      "                      Theme: Cyber Dark [neon]",
    ].join("\n"),
  },
  {
    name: "curl hakick.dev",
    description: "Fetch hakick.dev",
    output:
      "<html><head><title>Hakick</title></head><body><h1>Hakick</h1><p>AI Security Engineer</p><!-- Nice try checking the source --></body></html>",
  },
  {
    name: "ssh root@target",
    description: "SSH connection attempt",
    output:
      "Connecting to root@target... Connection refused. This isn't a real server, you know.",
  },
  {
    name: "find / -name flag*",
    description: "Search for flags",
    output: [
      "/home/hakick/.hidden/flag1.txt",
      "/var/www/html/<!-- flag2 -->",
      "/var/log/console.flag3",
      "/etc/nginx/headers.d/flag4.conf",
      "/root/flag5.txt",
    ].join("\n"),
  },
  {
    name: "cat /home/hakick/.hidden/flag1.txt",
    description: "CTF Flag 1",
    output: "FLAG{h4ck1ck_t3rm1n4l_m4st3r}",
  },
  {
    name: "cat /root/flag5.txt",
    description: "CTF Flag 5",
    output:
      "[RED]Permission denied.\n[RED]Just kidding.\nFLAG{r00t_4cc3ss_gr4nt3d}",
  },
  {
    name: "flags",
    description: "CTF challenge hints",
    output: [
      "╔═══════════════════════════════════════════╗",
      "║         🚩 MINI-CTF CHALLENGE 🚩          ║",
      "╠═══════════════════════════════════════════╣",
      "║  5 flags are hidden in this portfolio.    ║",
      "║                                           ║",
      "║  Hints:                                   ║",
      "║  #1 — Try exploring the filesystem...     ║",
      "║  #2 — View the page source (Ctrl+U)       ║",
      "║  #3 — Open your browser console (F12)      ║",
      "║  #4 — Check the HTTP response headers      ║",
      "║  #5 — Can you read /root?                  ║",
      "║                                           ║",
      "║  Found them all? You're hired.            ║",
      "╚═══════════════════════════════════════════╝",
    ].join("\n"),
  },
  {
    name: "achievements",
    description: "Show unlocked achievements",
    output: "__ACHIEVEMENTS__",
  },
  {
    name: "echo",
    description: "Print arguments",
    output: (args: string[]): string => {
      if (args.length === 0) return "";
      const joined = args.join(" ");
      // Strip surrounding quotes if present
      if (
        (joined.startsWith('"') && joined.endsWith('"')) ||
        (joined.startsWith("'") && joined.endsWith("'"))
      ) {
        return joined.slice(1, -1);
      }
      return joined;
    },
  },
  {
    name: "date",
    description: "Display current date",
    output: (): string => new Date().toString(),
  },
  {
    name: "uptime",
    description: "Display system uptime",
    output: (): string => {
      const start = new Date("2025-01-01T00:00:00");
      const now = new Date();
      const diffMs = now.getTime() - start.getTime();
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `up ${days} days, ${hours}:${String(minutes).padStart(2, "0")}`;
    },
  },
];
