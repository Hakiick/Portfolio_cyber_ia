import { useEffect, useRef, useState } from "react";

function unlockKonamiAchievement() {
  const event = new CustomEvent("achievement-unlocked", {
    detail: {
      id: "konami-code",
      title: "God Mode",
      description: "Activer le Konami Code",
      icon: "🎮",
      unlocked: true,
      unlockedAt: Date.now(),
    },
  });
  window.dispatchEvent(event);
}

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const GOD_MODE_DURATION = 10000;

export function useKonamiCode(): boolean {
  const [active, setActive] = useState(false);
  const indexRef = useRef(0);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (triggeredRef.current) return;

      const expected = KONAMI_SEQUENCE[indexRef.current];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        indexRef.current += 1;

        if (indexRef.current === KONAMI_SEQUENCE.length) {
          triggeredRef.current = true;
          indexRef.current = 0;
          setActive(true);
          unlockKonamiAchievement();

          document.documentElement.classList.add("konami-active");

          setTimeout(() => {
            setActive(false);
            document.documentElement.classList.remove("konami-active");
          }, GOD_MODE_DURATION);
        }
      } else {
        indexRef.current = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return active;
}
