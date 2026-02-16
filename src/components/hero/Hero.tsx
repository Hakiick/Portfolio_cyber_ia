import { useState, useEffect, useRef, useCallback } from "react";
import { CyberButton } from "../ui/CyberButton";
import { ShowcaseCards } from "./ShowcaseCards";
import { profile } from "../../data/profile";
import { useAchievements } from "../../lib/useAchievements";
import { useLanguage } from "../../lib/useLanguage";

const ASCII_HAKICK = `██   ██  █████  ██   ██ ██  ██████ ██   ██
██   ██ ██   ██ ██  ██  ██ ██      ██  ██
███████ ███████ █████   ██ ██      █████
██   ██ ██   ██ ██  ██  ██ ██      ██  ██
██   ██ ██   ██ ██   ██ ██  ██████ ██   ██`;

const ASCII_H = `██   ██
██   ██
███████
██   ██
██   ██`;

const GLITCH_DURATION = 300;
const GLITCH_INTERVAL = 4000;

function getShortBio(bio: string): string {
  const sentences = bio.split(". ");
  return sentences.slice(0, 2).join(". ") + ".";
}

function useAsciiGlitch() {
  const ref = useRef<HTMLPreElement>(null);

  const triggerGlitch = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("is-glitching");
    setTimeout(() => el.classList.remove("is-glitching"), GLITCH_DURATION);
  }, []);

  useEffect(() => {
    const interval = setInterval(triggerGlitch, GLITCH_INTERVAL);
    return () => clearInterval(interval);
  }, [triggerGlitch]);

  return ref;
}

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const { unlock } = useAchievements();
  const { lang } = useLanguage();
  const asciiRef = useAsciiGlitch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => unlock("first-visit"), 1500);
    return () => clearTimeout(timer);
  }, [unlock]);

  const asciiText = isMobile ? ASCII_H : ASCII_HAKICK;
  const titre =
    lang === "en" && profile.titreEn ? profile.titreEn : profile.titre;
  const bio = getShortBio(
    lang === "en" && profile.bioEn ? profile.bioEn : profile.bio,
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      {/* Gradient blobs background */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(circle at 80% 20%, rgba(180,74,255,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(0,255,65,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 40%)",
          ].join(", "),
        }}
      />

      {/* Brain 3D container */}
      <div
        id="brain-container"
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge terminal HAKICK.SYS */}
        <div className="flex items-center justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              backgroundColor: "var(--cyber-bg-secondary)",
              border: "1px solid var(--cyber-border)",
            }}
          >
            <div className="flex items-center gap-1">
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: "#ff3e3e" }}
              />
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: "#ffbd2e" }}
              />
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: "#27c93f" }}
              />
            </div>
            <span
              className="font-mono text-xs"
              style={{ color: "var(--cyber-text-secondary)" }}
            >
              HAKICK.SYS
            </span>
            <div className="flex items-center gap-1">
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: "#ff3e3e" }}
              />
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: "#ffbd2e" }}
              />
              <span
                className="block w-2 h-2 rounded-full"
                style={{ backgroundColor: "#27c93f" }}
              />
            </div>
          </div>
        </div>

        {/* Profile photo with cyber styling */}
        <div className="flex justify-center mb-6">
          <div
            className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full"
            style={{
              padding: "3px",
              background:
                "linear-gradient(135deg, var(--cyber-accent-green), var(--cyber-accent-blue), var(--cyber-accent-purple))",
              boxShadow:
                "0 0 30px rgba(0, 255, 65, 0.3), 0 0 60px rgba(0, 212, 255, 0.15)",
              animation: "hero-photo-glow 4s ease-in-out infinite alternate",
            }}
          >
            <div
              className="relative w-full h-full rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--cyber-bg-secondary)" }}
            >
              <img
                src="/at-work.jpg"
                alt="Hakick — Maxime"
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                style={{
                  opacity: photoLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
                onLoad={() => setPhotoLoaded(true)}
                onError={() => setPhotoLoaded(false)}
              />
              {!photoLoaded && (
                <div
                  className="w-full h-full flex items-center justify-center font-mono text-4xl sm:text-5xl md:text-6xl font-bold select-none"
                  style={{
                    color: "var(--cyber-accent-green)",
                    textShadow: "0 0 20px rgba(0, 255, 65, 0.4)",
                  }}
                >
                  H
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ASCII Art HAKICK with glitch animation */}
        <pre
          ref={asciiRef}
          data-text={asciiText}
          className="glitch-effect font-mono text-[0.3rem] sm:text-[0.4rem] md:text-[0.5rem] lg:text-xs leading-none mb-6 select-none whitespace-pre"
          style={{
            color: "var(--cyber-accent-green)",
            textShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
          }}
          aria-label="HAKICK"
        >
          {asciiText}
        </pre>

        <style>{`
          @keyframes hero-photo-glow {
            0% { box-shadow: 0 0 30px rgba(0, 255, 65, 0.3), 0 0 60px rgba(0, 212, 255, 0.15); }
            50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(180, 74, 255, 0.2); }
            100% { box-shadow: 0 0 30px rgba(180, 74, 255, 0.3), 0 0 60px rgba(0, 255, 65, 0.15); }
          }
        `}</style>

        {/* Titre gradient */}
        <h1
          className="mt-6 text-xl md:text-2xl lg:text-3xl font-semibold font-sans"
          style={{
            background: "linear-gradient(90deg, #00ff41, #b44aff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {titre}
        </h1>

        {/* Bio courte */}
        <p
          className="mt-4 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--cyber-text-secondary)" }}
        >
          {bio}
        </p>

        {/* Deux boutons CTA */}
        <div className="flex items-center justify-center gap-4 mt-8 flex-col sm:flex-row">
          <CyberButton
            variant="filled"
            href="#about"
            className="w-full sm:w-auto"
          >
            {lang === "en"
              ? "\u2726 Explore my profile >"
              : "\u2726 D\u00e9couvrir mon profil >"}
          </CyberButton>
          <CyberButton
            variant="secondary"
            href="#terminal"
            className="w-full sm:w-auto"
          >
            {">_ Terminal"}
          </CyberButton>
        </div>

        {/* Trois badges spécialité */}
        <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs"
            style={{
              border: "1px solid var(--cyber-border)",
              color: "var(--cyber-text-secondary)",
            }}
          >
            <span
              className="font-mono"
              style={{ color: "var(--cyber-accent-blue)" }}
            >
              {"</>"}
            </span>
            <span className="font-sans">Cloud Computing</span>
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs"
            style={{
              border: "1px solid var(--cyber-border)",
              color: "var(--cyber-text-secondary)",
            }}
          >
            <span
              className="font-mono"
              style={{ color: "var(--cyber-accent-green)" }}
            >
              {"\ud83d\udee1"}
            </span>
            <span className="font-sans">
              {lang === "en" ? "Cybersecurity" : "Cybers\u00e9curit\u00e9"}
            </span>
          </div>
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 text-xs"
            style={{
              border: "1px solid var(--cyber-border)",
              color: "var(--cyber-text-secondary)",
            }}
          >
            <span
              className="font-mono"
              style={{ color: "var(--cyber-accent-purple)" }}
            >
              {"{}"}
            </span>
            <span className="font-sans">
              {lang === "en" ? "Generative AI" : "IA G\u00e9n\u00e9rative"}
            </span>
          </div>
        </div>
      </div>

      {/* Showcase cards — full width, outside max-w-4xl */}
      <div className="relative z-10 w-full">
        <ShowcaseCards />
      </div>
    </section>
  );
}

export default Hero;
