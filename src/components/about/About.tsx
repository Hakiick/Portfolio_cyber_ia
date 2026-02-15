import { useState, useEffect, useRef } from "react";
import { CyberSection } from "../ui/CyberSection";
import { CyberCard } from "../ui/CyberCard";
import { ScrollReveal } from "../ui/ScrollReveal";
import { TypingBio } from "../ui/TypingBio";
import { TerminalBlock } from "../ui/TerminalBlock";
import { profile } from "../../data/profile";

interface Strength {
  title: string;
  description: string;
  glowColor: "green" | "blue" | "purple";
}

const strengths: Strength[] = [
  {
    title: "Cloud & Infra",
    description:
      "Administration systèmes et réseaux, Kubernetes k0s, Docker, Proxmox VE. Monitoring avancé avec Nagios, Zabbix, Prometheus.",
    glowColor: "blue",
  },
  {
    title: "Cybersécurité",
    description:
      "Certifié eJPTv2, CTF, sécurité applicative. Spécialisation LLM Security : prompt injection, jailbreaks, OWASP Top 10 for LLM.",
    glowColor: "green",
  },
  {
    title: "IA Générative",
    description:
      "Computer Vision (YOLOv8), agents IA automatisés (n8n), intégration LLM en entreprise. Dataset building et guardrails.",
    glowColor: "purple",
  },
  {
    title: "Tech Lead",
    description:
      "Gestion d'équipe technique, environnements critiques, backup et supervision. Pipelines CI/CD GitLab complètes.",
    glowColor: "green",
  },
];

const ASCII_H = `██╗  ██╗
██║  ██║
███████║
██╔══██║
██║  ██║
╚═╝  ╚═╝`;

const NEOFETCH_LINES = [
  { label: "OS", value: "HakickOS v1.0", color: "var(--cyber-accent-green)" },
  {
    label: "Host",
    value: profile.pseudo,
    color: "var(--cyber-accent-green)",
  },
  {
    label: "Role",
    value: "AI Security Engineer",
    color: "var(--cyber-accent-blue)",
  },
  {
    label: "School",
    value: "Epitech (5th year)",
    color: "var(--cyber-text-primary)",
  },
  {
    label: "Stack",
    value: "Cloud · Cyber · GenAI",
    color: "var(--cyber-accent-purple)",
  },
  {
    label: "Certs",
    value: "eJPTv2, AZ-900, AWS",
    color: "var(--cyber-text-primary)",
  },
  {
    label: "Shell",
    value: "zsh + tmux",
    color: "var(--cyber-text-primary)",
  },
  {
    label: "Editor",
    value: "Neovim + Claude Code",
    color: "var(--cyber-text-primary)",
  },
];

function Neofetch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= NEOFETCH_LINES.length) return;

    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 120);
    return () => clearTimeout(timer);
  }, [started, visibleLines]);

  return (
    <div ref={containerRef}>
      <TerminalBlock title="neofetch">
        <div className="flex gap-4 md:gap-8">
          {/* ASCII art - hidden on mobile */}
          <pre
            className="hidden md:block font-mono text-xs leading-tight select-none shrink-0"
            style={{ color: "var(--cyber-accent-green)" }}
            aria-hidden="true"
          >
            {ASCII_H}
          </pre>

          {/* System info */}
          <div className="flex flex-col gap-0.5 font-mono text-xs sm:text-sm min-w-0">
            <div
              className="mb-1 font-bold"
              style={{ color: "var(--cyber-accent-green)" }}
            >
              {profile.pseudo}@portfolio
            </div>
            <div
              className="mb-1.5"
              style={{
                borderBottom: "1px solid var(--cyber-border)",
                width: "100%",
              }}
            />
            {NEOFETCH_LINES.map((line, i) => (
              <div
                key={line.label}
                className="flex gap-2 transition-opacity duration-300"
                style={{ opacity: i < visibleLines ? 1 : 0 }}
              >
                <span
                  className="font-bold shrink-0"
                  style={{ color: "var(--cyber-accent-green)" }}
                >
                  {line.label}:
                </span>
                <span style={{ color: line.color }}>{line.value}</span>
              </div>
            ))}
            {/* Color palette bar */}
            {visibleLines >= NEOFETCH_LINES.length && (
              <div className="flex gap-1 mt-2">
                {[
                  "#ff3e3e",
                  "#00ff41",
                  "#00d4ff",
                  "#b44aff",
                  "#e0e0e0",
                  "#8a8a8a",
                  "#0a0a0f",
                  "#12121a",
                ].map((color) => (
                  <div
                    key={color}
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </TerminalBlock>
    </div>
  );
}

export function About() {
  return (
    <CyberSection id="about" title="about_me" className="relative">
      <div
        id="brain-container-about"
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <span
        className="sr-only"
        aria-hidden="true"
        data-ctf="5 flags are hidden in this portfolio. Type 'flags' in the terminal."
      />
      <div className="relative z-10">
        <TypingBio
          text={profile.bio}
          className="text-base md:text-lg leading-relaxed max-w-3xl mb-10 md:mb-14"
          style={{ color: "var(--cyber-text-primary)" }}
        />

        {/* Neofetch block */}
        <ScrollReveal animation="fade-in" className="mb-10 md:mb-14">
          <Neofetch />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {strengths.map((s, i) => (
            <ScrollReveal key={s.title} animation="slide-up" delay={i * 100}>
              <CyberCard glowColor={s.glowColor}>
                <h3
                  className="font-mono font-bold text-sm md:text-base mb-2"
                  style={{ color: "var(--cyber-accent-green)" }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-xs md:text-sm leading-relaxed"
                  style={{ color: "var(--cyber-text-secondary)" }}
                >
                  {s.description}
                </p>
              </CyberCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </CyberSection>
  );
}

export default About;
