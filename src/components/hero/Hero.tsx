import { GlitchText } from "../ui/GlitchText";
import { CyberButton } from "../ui/CyberButton";
import { profile } from "../../data/profile";

const ASCII_ART = `
    ██╗  ██╗
    ██║  ██║
    ███████║
    ██╔══██║
    ██║  ██║
    ╚═╝  ╚═╝
`.trimEnd();

function getShortBio(bio: string): string {
  const sentences = bio.split(". ");
  return sentences.slice(0, 2).join(". ") + ".";
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      <div
        id="brain-container"
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <pre
          className="font-mono text-xs sm:text-sm md:text-base leading-tight mb-6 select-none"
          style={{ color: "var(--cyber-accent-green)" }}
          aria-hidden="true"
        >
          {ASCII_ART}
        </pre>

        <GlitchText
          text={profile.pseudo}
          as="h1"
          intensity="medium"
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight text-glow-green"
          style={{ color: "var(--cyber-accent-green)" }}
        />

        <p
          className="mt-4 text-lg md:text-xl lg:text-2xl font-medium"
          style={{ color: "var(--cyber-text-primary)" }}
        >
          {profile.titre}
        </p>

        <p
          className="mt-2 text-sm md:text-base font-mono tracking-wider"
          style={{ color: "var(--cyber-accent-blue)" }}
        >
          {profile.sousTitre}
        </p>

        <p
          className="mt-6 text-sm md:text-base max-w-xl mx-auto leading-relaxed"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {getShortBio(profile.bio)}
        </p>

        <div className="mt-8">
          <CyberButton variant="primary" size="lg" href="#about">
            Explore my profile
          </CyberButton>
        </div>
      </div>
    </section>
  );
}

export default Hero;
