export function LogoH({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hakick logo"
      className="logo-h"
    >
      {/* Left vertical */}
      <path
        d="M8 4 L8 36"
        stroke="var(--cyber-accent-green)"
        strokeWidth="4"
        strokeLinecap="round"
        className="logo-h-stroke"
        style={{
          strokeDasharray: 32,
          strokeDashoffset: 32,
          animation: "logo-draw 0.6s ease-out 0.1s forwards",
        }}
      />
      {/* Right vertical */}
      <path
        d="M32 4 L32 36"
        stroke="var(--cyber-accent-green)"
        strokeWidth="4"
        strokeLinecap="round"
        className="logo-h-stroke"
        style={{
          strokeDasharray: 32,
          strokeDashoffset: 32,
          animation: "logo-draw 0.6s ease-out 0.3s forwards",
        }}
      />
      {/* Horizontal bar */}
      <path
        d="M8 20 L32 20"
        stroke="var(--cyber-accent-green)"
        strokeWidth="4"
        strokeLinecap="round"
        className="logo-h-stroke"
        style={{
          strokeDasharray: 24,
          strokeDashoffset: 24,
          animation: "logo-draw 0.4s ease-out 0.6s forwards",
        }}
      />

      <style>{`
        @keyframes logo-draw {
          to { stroke-dashoffset: 0; }
        }
        .logo-h:hover .logo-h-stroke {
          filter: drop-shadow(0 0 6px rgba(0, 255, 65, 0.6));
        }
        .logo-h-stroke {
          transition: filter 0.3s ease;
        }
      `}</style>
    </svg>
  );
}

export default LogoH;
