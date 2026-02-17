export function SectionDivider() {
  return (
    <div
      className="relative w-full overflow-hidden py-8 md:py-12 lg:py-16"
      style={{
        zIndex: 1,
        backgroundColor: "var(--cyber-bg-primary)",
      }}
      aria-hidden="true"
    >
      {/* Divider line centered */}
      <div className="absolute left-0 right-0 top-1/2 h-[2px]">
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
      </div>

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
