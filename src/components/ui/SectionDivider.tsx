export function SectionDivider() {
  return (
    <div
      className="relative w-full overflow-hidden my-16 md:my-24 lg:my-32"
      style={{ height: "2px" }}
      aria-hidden="true"
    >
      {/* Static line */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--cyber-accent-green)",
          opacity: 0.15,
        }}
      />

      {/* Traveling light */}
      <div
        className="absolute top-0 h-full"
        style={{
          width: "80px",
          background:
            "linear-gradient(90deg, transparent, var(--cyber-accent-green), transparent)",
          opacity: 0.6,
          animation: "divider-travel 4s linear infinite",
        }}
      />

      <style>{`
        @keyframes divider-travel {
          0% { left: -80px; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}

export default SectionDivider;
