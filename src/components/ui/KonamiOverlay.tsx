import { useKonamiCode } from "../../lib/useKonamiCode";

export function KonamiOverlay() {
  const active = useKonamiCode();

  if (!active) return null;

  return (
    <>
      {/* Flash overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9995,
          animation: "konami-flash 0.6s ease-out forwards",
        }}
        aria-hidden="true"
      />

      {/* Toast notification */}
      <div
        className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded border font-mono text-sm font-bold"
        style={{
          zIndex: 9999,
          backgroundColor: "var(--cyber-bg-terminal)",
          borderColor: "var(--cyber-accent-green)",
          color: "var(--cyber-accent-green)",
          boxShadow: "0 0 30px rgba(0,255,65,0.4), 0 0 60px rgba(0,255,65,0.2)",
          animation: "konami-toast 10s ease-in-out forwards",
        }}
      >
        GOD MODE ACTIVATED — 10s remaining
      </div>
    </>
  );
}

export default KonamiOverlay;
