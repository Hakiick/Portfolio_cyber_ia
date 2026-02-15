import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "hakick-achievements";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first-visit",
    title: "Bienvenue",
    description: "Première visite sur le portfolio",
    icon: "🎯",
    unlocked: false,
  },
  {
    id: "terminal-user",
    title: "Hacker",
    description: "Utiliser le terminal interactif",
    icon: "💻",
    unlocked: false,
  },
  {
    id: "secret-finder",
    title: "Secret Hunter",
    description: "Trouver un flag CTF",
    icon: "🚩",
    unlocked: false,
  },
  {
    id: "scroll-master",
    title: "Explorer",
    description: "Scroller jusqu'en bas de la page",
    icon: "🗺️",
    unlocked: false,
  },
  {
    id: "konami-code",
    title: "God Mode",
    description: "Activer le Konami Code",
    icon: "🎮",
    unlocked: false,
  },
  {
    id: "matrix-entered",
    title: "Neo",
    description: "Entrer dans la Matrix",
    icon: "🟢",
    unlocked: false,
  },
  {
    id: "all-projects",
    title: "Analyste",
    description: "Ouvrir tous les dossiers classifiés",
    icon: "📂",
    unlocked: false,
  },
  {
    id: "hire-me",
    title: "Recruté",
    description: "Exécuter sudo hire-me",
    icon: "🏆",
    unlocked: false,
  },
];

function loadAchievements(): Achievement[] {
  if (typeof window === "undefined") return INITIAL_ACHIEVEMENTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return INITIAL_ACHIEVEMENTS;
    const parsed = JSON.parse(stored);
    return INITIAL_ACHIEVEMENTS.map((initial) => {
      const saved = parsed.find((a: Achievement) => a.id === initial.id);
      return saved ?? initial;
    });
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
}

function saveAchievements(achievements: Achievement[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(() =>
    loadAchievements(),
  );

  const unlock = useCallback((id: string) => {
    setAchievements((prev) => {
      const existing = prev.find((a) => a.id === id);
      if (!existing || existing.unlocked) return prev;

      const updated = prev.map((a) =>
        a.id === id ? { ...a, unlocked: true, unlockedAt: Date.now() } : a,
      );

      saveAchievements(updated);

      const achievement = updated.find((a) => a.id === id);
      if (achievement) {
        const event = new CustomEvent("achievement-unlocked", {
          detail: achievement,
        });
        window.dispatchEvent(event);
      }

      return updated;
    });
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return { achievements, unlock, unlockedCount, totalCount };
}
