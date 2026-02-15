import { useState, useEffect, useCallback } from "react";
import { translations, type Language } from "./i18n";

const STORAGE_KEY = "hakick-lang";

function getStoredLang(): Language {
  if (typeof window === "undefined") return "fr";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") return stored;
  } catch {
    // localStorage might not be available
  }
  return "fr";
}

function setStoredLang(lang: Language): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  } catch {
    // localStorage might not be available
  }
}

/**
 * Hook for managing language state across Astro islands.
 * Uses a custom event to sync language changes across all components.
 */
export function useLanguage() {
  const [lang, setLang] = useState<Language>(getStoredLang);

  useEffect(() => {
    function handleLangChange() {
      setLang(getStoredLang());
    }
    window.addEventListener("language-changed", handleLangChange);
    return () =>
      window.removeEventListener("language-changed", handleLangChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Language = lang === "fr" ? "en" : "fr";
    setStoredLang(next);
    setLang(next);
    window.dispatchEvent(new CustomEvent("language-changed"));
  }, [lang]);

  const t = useCallback(
    (key: string, replacements?: Record<string, string>): string => {
      let text = translations[lang]?.[key] ?? key;

      // Replace placeholders like {pseudo} with values
      if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
          text = text.replace(`{${placeholder}}`, value);
        });
      }

      return text;
    },
    [lang],
  );

  return { lang, toggle, t };
}
