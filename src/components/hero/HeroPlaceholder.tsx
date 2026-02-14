import { profile } from "../../data/profile";
import { CyberButton } from "../ui/CyberButton";
import { GlitchText } from "../ui/GlitchText";

export function HeroPlaceholder() {
  const scrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center"
    >
      <p className="mb-4 font-mono text-sm text-[var(--cyber-accent-blue)] md:text-base">
        &gt; initializing portfolio...
      </p>

      <h1 className="mb-4 text-5xl font-bold md:text-7xl lg:text-8xl">
        <GlitchText
          text={profile.pseudo}
          as="span"
          intensity="medium"
          className="text-[var(--cyber-accent-green)] text-glow-green"
        />
      </h1>

      <p className="mb-2 font-mono text-lg text-[var(--cyber-text-primary)] md:text-2xl">
        {profile.titre}
      </p>

      <p className="mb-8 font-mono text-sm text-[var(--cyber-text-secondary)] md:text-base">
        {profile.sousTitre}
      </p>

      <CyberButton variant="primary" size="lg" onClick={scrollToAbout}>
        Explore my profile
      </CyberButton>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce font-mono text-sm text-[var(--cyber-text-secondary)]"
        aria-hidden="true"
      >
        scroll down
      </div>
    </section>
  );
}

export default HeroPlaceholder;
