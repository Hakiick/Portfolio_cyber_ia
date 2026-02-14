import { useState, useEffect, useRef } from "react";
import { GlitchText } from "../ui/GlitchText";
import { CyberButton } from "../ui/CyberButton";
import { profile } from "../../data/profile";

const ASCII_HAKICK = `██╗  ██╗ █████╗ ██╗  ██╗██╗ ██████╗██╗  ██╗
██║  ██║██╔══██╗██║ ██╔╝██║██╔════╝██║ ██╔╝
███████║███████║█████╔╝ ██║██║     █████╔╝
██╔══██║██╔══██║██╔═██╗ ██║██║     ██╔═██╗
██║  ██║██║  ██║██║  ██╗██║╚██████╗██║  ██╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝`;

const ASCII_H = `██╗  ██╗
██║  ██║
███████║
██╔══██║
██║  ██║
╚═╝  ╚═╝`;

const CHAR_DELAY_MS = 4;

function useTypewriter(text: string, delayMs: number, startTyping: boolean) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!startTyping) return;
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);

    const totalChars = text.length;
    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= totalChars) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, delayMs);

    return () => clearInterval(interval);
  }, [text, delayMs, startTyping]);

  return { displayed, done };
}

function getShortBio(bio: string): string {
  const sentences = bio.split(". ");
  return sentences.slice(0, 2).join(". ") + ".";
}

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const w = window.innerWidth;
    setIsMobile(w < 640);
    setIsTablet(w >= 640 && w < 1024);

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStartTyping(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const asciiText = isMobile ? ASCII_H : ASCII_HAKICK;
  const { displayed, done } = useTypewriter(
    asciiText,
    CHAR_DELAY_MS,
    startTyping,
  );

  const fontSizeClass = isMobile
    ? "text-xs"
    : isTablet
      ? "text-[0.5rem] sm:text-xs"
      : "text-xs md:text-sm lg:text-base";

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

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <pre
          className={`font-mono ${fontSizeClass} leading-tight mb-6 select-none whitespace-pre`}
          style={{ color: "var(--cyber-accent-green)" }}
          aria-label="HAKICK"
        >
          {displayed}
          {!done && startTyping && (
            <span className="animate-pulse" style={{ opacity: 1 }}>
              ▌
            </span>
          )}
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
