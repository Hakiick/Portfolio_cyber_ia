import { useState, useEffect } from "react";

const STORAGE_KEY = "hakick-crt-mode";

export function CrtOverlay() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setEnabled(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(enabled));
    if (enabled) {
      document.documentElement.classList.add("crt-mode");
    } else {
      document.documentElement.classList.remove("crt-mode");
    }
  }, [enabled]);

  return (
    <>
      <button
        onClick={() => setEnabled((v) => !v)}
        className="fixed bottom-4 left-4 z-50 px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200"
        style={{
          backgroundColor: enabled
            ? "rgba(0,255,65,0.15)"
            : "var(--cyber-bg-secondary)",
          borderColor: enabled
            ? "var(--cyber-accent-green)"
            : "var(--cyber-border)",
          color: enabled
            ? "var(--cyber-accent-green)"
            : "var(--cyber-text-secondary)",
          boxShadow: enabled ? "var(--cyber-glow-green)" : "none",
        }}
        aria-label={enabled ? "Disable CRT mode" : "Enable CRT mode"}
        title="Toggle CRT mode"
      >
        [{enabled ? "CRT ON" : "CRT OFF"}]
      </button>

      {enabled && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9990 }}
          aria-hidden="true"
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
              animation: "crt-scroll 8s linear infinite",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
            }}
          />

          {/* Flicker */}
          <div
            className="absolute inset-0"
            style={{
              animation: "crt-flicker 0.15s infinite",
              opacity: 0.02,
              backgroundColor: "white",
            }}
          />
        </div>
      )}
    </>
  );
}

export default CrtOverlay;
