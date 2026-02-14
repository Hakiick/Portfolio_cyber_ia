import { CyberSection } from "../ui/CyberSection";
import { CyberCard } from "../ui/CyberCard";
import { ScrollReveal } from "../ui/ScrollReveal";
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

export function About() {
  return (
    <CyberSection id="about" title="about_me" className="relative">
      <div
        id="brain-container-about"
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10">
        <ScrollReveal animation="fade-in">
          <p
            className="text-base md:text-lg leading-relaxed max-w-3xl mb-10 md:mb-14"
            style={{ color: "var(--cyber-text-primary)" }}
          >
            {profile.bio}
          </p>
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
