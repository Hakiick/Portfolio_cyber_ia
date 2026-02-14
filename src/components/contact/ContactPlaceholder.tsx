import { profile } from "../../data/profile";
import { CyberSection } from "../ui/CyberSection";
import { CyberButton } from "../ui/CyberButton";

export function ContactPlaceholder() {
  return (
    <CyberSection id="contact" title="contact" className="min-h-[60vh]">
      <div className="mx-auto max-w-lg space-y-6 text-center">
        <p className="text-base text-[var(--cyber-text-primary)] md:text-lg">
          Une question, une opportunité, un projet ? N'hésitez pas.
        </p>

        <div className="space-y-3 font-mono text-sm text-[var(--cyber-text-secondary)]">
          <p>
            <span className="text-[var(--cyber-accent-green)]">email</span>:{" "}
            {profile.email}
          </p>
          <p>
            <span className="text-[var(--cyber-accent-green)]">github</span>:{" "}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--cyber-accent-blue)] transition-colors hover:text-[var(--cyber-accent-green)]"
            >
              {profile.github}
            </a>
          </p>
          <p>
            <span className="text-[var(--cyber-accent-green)]">location</span>:{" "}
            {profile.localisation}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <CyberButton variant="primary" href={`mailto:${profile.email}`}>
            Envoyer un message
          </CyberButton>
          <CyberButton variant="secondary" href={profile.github}>
            GitHub
          </CyberButton>
        </div>

        <p className="font-mono text-sm text-[var(--cyber-text-secondary)]">
          // Formulaire de contact disponible prochainement
        </p>
      </div>
    </CyberSection>
  );
}

export default ContactPlaceholder;
