import { useState, useEffect, useRef } from "react";

const FEED_MESSAGES = [
  "Threat level: LOW — All systems nominal",
  "Neural network: ACTIVE — 60 nodes online",
  "Portfolio uptime: 99.97%",
  "Last scan: 0 vulnerabilities detected",
  "Firewall: 12,847 requests blocked today",
  "Encryption: AES-256 active",
  "Active sessions: 1 (you)",
  "CPU: Neural v3 — 0.2% usage",
  "Location: France — 48.8566°N 2.3522°E",
  "Next cert: AWS AI Practitioner — 73% ready",
];

const STORAGE_KEY = "hakick-livefeed-dismissed";
const ROTATE_INTERVAL = 4000;
const SLIDE_IN_DELAY = 3000;

export function LiveFeed() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setDismissed(true);
      return;
    }

    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => setVisible(true), SLIDE_IN_DELAY);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!visible || dismissed) return;

    intervalRef.current = setInterval(() => {
      setMessageIndex((i) => (i + 1) % FEED_MESSAGES.length);
    }, ROTATE_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visible, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isDesktop || dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded border font-mono text-xs"
      style={{
        backgroundColor: "var(--cyber-bg-terminal)",
        borderColor: "var(--cyber-border)",
        color: "var(--cyber-text-secondary)",
        animation: "livefeed-slide-in 0.4s ease-out",
        maxWidth: 320,
      }}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{
          backgroundColor: "var(--cyber-accent-green)",
          animation: "livefeed-blink 1.5s ease-in-out infinite",
          boxShadow: "0 0 6px rgba(0,255,65,0.5)",
        }}
      />

      <span className="truncate" style={{ color: "var(--cyber-text-primary)" }}>
        {FEED_MESSAGES[messageIndex]}
      </span>

      <button
        onClick={handleDismiss}
        className="flex-shrink-0 ml-1 hover:opacity-100 opacity-50 transition-opacity"
        style={{ color: "var(--cyber-text-secondary)" }}
        aria-label="Dismiss live feed"
      >
        x
      </button>
    </div>
  );
}

export default LiveFeed;
