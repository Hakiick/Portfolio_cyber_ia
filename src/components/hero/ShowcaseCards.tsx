import { useLanguage } from "../../lib/useLanguage";
import { BrainModel } from "./BrainModel";
import { SkullModel } from "./SkullModel";

interface CardData {
  title: string;
  subtitle: string;
  borderColor: string;
}

export function ShowcaseCards() {
  const { lang } = useLanguage();

  const cards: [CardData, CardData] = [
    {
      title: lang === "en" ? "AI Brain" : "IA Brain",
      subtitle:
        lang === "en" ? "Artificial Intelligence" : "Intelligence Artificielle",
      borderColor: "var(--cyber-accent-purple)",
    },
    {
      title: "Hack Flag",
      subtitle: lang === "en" ? "Cybersecurity" : "Cybersécurité",
      borderColor: "var(--cyber-accent-green)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 max-w-3xl mx-auto px-4">
      {/* Card 1 — IA Brain */}
      <div
        className="rounded-xl overflow-hidden h-40 md:h-56 flex flex-col"
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

      {/* Card 2 — Hack Flag */}
      <div
        className="rounded-xl overflow-hidden h-40 md:h-56 flex flex-col"
        style={{
          backgroundColor: "var(--cyber-bg-secondary)",
          border: "1px solid var(--cyber-border)",
        }}
      >
        <div className="flex-1 relative overflow-hidden">
          <SkullModel className="absolute inset-0" />
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
    </div>
  );
}

export default ShowcaseCards;
