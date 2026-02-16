import { GlitchText } from "../ui/GlitchText";
import { useLanguage } from "../../lib/useLanguage";
import { BrainModel } from "./BrainModel";

interface CardData {
  title: string;
  subtitle: string;
  borderColor: string;
}

export function ShowcaseCards() {
  const { lang } = useLanguage();

  const cards: [CardData, CardData, CardData] = [
    {
      title: lang === "en" ? "AI Brain" : "IA Brain",
      subtitle:
        lang === "en" ? "Artificial Intelligence" : "Intelligence Artificielle",
      borderColor: "var(--cyber-accent-purple)",
    },
    {
      title: "Hakick",
      subtitle: "Security Engineer",
      borderColor: "var(--cyber-accent-blue)",
    },
    {
      title: "Hack Flag",
      subtitle: lang === "en" ? "Cybersecurity" : "Cybersécurité",
      borderColor: "var(--cyber-accent-green)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto px-4">
      {/* Card 1 — IA Brain */}
      <div
        className="rounded-xl overflow-hidden h-48 md:h-72 flex flex-col"
        style={{
          backgroundColor: "var(--cyber-bg-secondary)",
          border: "1px solid var(--cyber-border)",
        }}
      >
        <div className="flex-1 relative overflow-hidden">
          <BrainModel className="absolute inset-0" />
        </div>
        <div
          className="px-4 py-3"
          style={{
            borderTop: `2px solid ${cards[0].borderColor}`,
            backgroundColor: "rgba(10, 10, 15, 0.8)",
          }}
        >
          <p
            className="font-mono text-sm font-bold"
            style={{ color: "var(--cyber-accent-green)" }}
          >
            {cards[0].title}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--cyber-text-secondary)" }}
          >
            {cards[0].subtitle}
          </p>
        </div>
      </div>

      {/* Card 2 — Hakick */}
      <div
        className="rounded-xl overflow-hidden h-48 md:h-72 flex flex-col"
        style={{
          backgroundColor: "var(--cyber-bg-secondary)",
          border: "1px solid var(--cyber-border)",
        }}
      >
        <div
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(180,74,255,0.12) 0%, rgba(0,0,0,0.8) 70%)",
          }}
        >
          <GlitchText
            text="HAKICK"
            as="span"
            intensity="medium"
            className="text-4xl md:text-5xl font-bold font-mono tracking-wider"
            style={{ color: "var(--cyber-accent-green)", opacity: 0.5 }}
          />
          <div className="absolute inset-0 scanlines pointer-events-none" />
        </div>
        <div
          className="px-4 py-3"
          style={{
            borderTop: `2px solid ${cards[1].borderColor}`,
            backgroundColor: "rgba(10, 10, 15, 0.8)",
          }}
        >
          <p
            className="font-mono text-sm font-bold"
            style={{ color: "var(--cyber-accent-green)" }}
          >
            {cards[1].title}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--cyber-text-secondary)" }}
          >
            {cards[1].subtitle}
          </p>
        </div>
      </div>

      {/* Card 3 — Hack Flag */}
      <div
        className="rounded-xl overflow-hidden h-48 md:h-72 flex flex-col"
        style={{
          backgroundColor: "var(--cyber-bg-secondary)",
          border: "1px solid var(--cyber-border)",
        }}
      >
        <div
          id="skull-card-placeholder"
          className="flex-1 flex items-center justify-center relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 70%)",
          }}
        >
          <span
            className="text-6xl"
            style={{
              color: "var(--cyber-accent-green)",
              opacity: 0.3,
              textShadow: "0 0 20px rgba(0, 255, 65, 0.4)",
            }}
          >
            ☠
          </span>
        </div>
        <div
          className="px-4 py-3"
          style={{
            borderTop: `2px solid ${cards[2].borderColor}`,
            backgroundColor: "rgba(10, 10, 15, 0.8)",
          }}
        >
          <p
            className="font-mono text-sm font-bold"
            style={{ color: "var(--cyber-accent-green)" }}
          >
            {cards[2].title}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--cyber-text-secondary)" }}
          >
            {cards[2].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseCards;
