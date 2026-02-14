import { useState, useEffect, useCallback, useRef } from "react";

interface BootSequenceProps {
  onComplete?: () => void;
}

interface BootLine {
  tag: string;
  text: string;
  color: string;
}

const BOOT_LINES: BootLine[] = [
  {
    tag: "[BIOS]",
    text: "Initializing HakickOS v1.0...",
    color: "var(--cyber-accent-purple)",
  },
  {
    tag: "[OK]",
    text: "Loading kernel modules",
    color: "var(--cyber-accent-green)",
  },
  {
    tag: "[OK]",
    text: "Mounting secure filesystem",
    color: "var(--cyber-accent-green)",
  },
  {
    tag: "[OK]",
    text: "Starting network interfaces",
    color: "var(--cyber-accent-green)",
  },
  {
    tag: "[SCAN]",
    text: "Running port scan... 443/tcp open",
    color: "var(--cyber-accent-blue)",
  },
  {
    tag: "[OK]",
    text: "Firewall rules applied",
    color: "var(--cyber-accent-green)",
  },
  {
    tag: "[OK]",
    text: "Loading AI models...",
    color: "var(--cyber-accent-green)",
  },
  {
    tag: "[OK]",
    text: "Neural network initialized",
    color: "var(--cyber-accent-green)",
  },
  {
    tag: "[READY]",
    text: "System boot complete.",
    color: "var(--cyber-accent-green)",
  },
];

const WELCOME_LINE = "> Welcome, visitor. Initializing portfolio...";
const LINE_DELAY_MS = 200;
const PAUSE_BEFORE_GLITCH_MS = 500;
const GLITCH_DURATION_MS = 300;
const FADE_DURATION_MS = 200;
const GLITCH_BAND_COUNT = 8;
const SESSION_KEY = "boot-played";

function getGlitchBands(): React.CSSProperties[] {
  const bands: React.CSSProperties[] = [];
  const bandHeight = 100 / GLITCH_BAND_COUNT;

  for (let i = 0; i < GLITCH_BAND_COUNT; i++) {
    const offset = (Math.random() - 0.5) * 40;
    bands.push({
      position: "absolute",
      top: `${i * bandHeight}%`,
      left: 0,
      right: 0,
      height: `${bandHeight}%`,
      transform: `translateX(${offset}px)`,
      transition: `transform ${GLITCH_DURATION_MS}ms ease-in`,
      willChange: "transform",
    });
  }
  return bands;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visible, setVisible] = useState(true);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [phase, setPhase] = useState<"typing" | "glitching" | "fading">(
    "typing",
  );
  const [glitchBands, setGlitchBands] = useState<React.CSSProperties[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const completedRef = useRef(false);

  const totalLines = BOOT_LINES.length;

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // sessionStorage may be unavailable
    }

    setPhase("glitching");
    setGlitchBands(getGlitchBands());

    setTimeout(() => {
      setPhase("fading");
      setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, FADE_DURATION_MS);
    }, GLITCH_DURATION_MS);
  }, [onComplete]);

  // Check sessionStorage on mount and mark hydrated
  useEffect(() => {
    setHydrated(true);
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "true") {
        setVisible(false);
        completedRef.current = true;
        onComplete?.();
        return;
      }
    } catch {
      // sessionStorage may be unavailable
    }
  }, [onComplete]);

  // Typewriter line progression
  useEffect(() => {
    if (phase !== "typing" || completedRef.current) return;

    if (visibleLines < totalLines) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
      }, LINE_DELAY_MS);
      return () => clearTimeout(timer);
    }

    if (!showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, LINE_DELAY_MS * 2);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(handleComplete, PAUSE_BEFORE_GLITCH_MS);
    return () => clearTimeout(timer);
  }, [phase, visibleLines, totalLines, showWelcome, handleComplete]);

  if (!visible) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    backgroundColor: "var(--cyber-bg-primary)",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1.5rem",
    opacity: phase === "fading" ? 0 : 1,
    transition:
      phase === "fading" ? `opacity ${FADE_DURATION_MS}ms ease-out` : undefined,
    willChange: "opacity",
  };

  const skipStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "1.5rem",
    right: "1.5rem",
    fontSize: "0.875rem",
    color: "var(--cyber-text-secondary)",
    opacity: 0.5,
    background: "none",
    border: "1px solid var(--cyber-border)",
    padding: "0.375rem 0.75rem",
    cursor: "pointer",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    borderRadius: "2px",
    transition: "opacity 0.2s",
  };

  return (
    <div
      data-testid="boot-sequence"
      data-hydrated={hydrated ? "true" : undefined}
      style={overlayStyle}
    >
      {phase === "glitching" ? (
        <GlitchOverlay
          bands={glitchBands}
          lines={BOOT_LINES}
          visibleLines={visibleLines}
        />
      ) : (
        <BootContent
          lines={BOOT_LINES}
          visibleLines={visibleLines}
          showWelcome={showWelcome}
          isTyping={phase === "typing"}
        />
      )}
      {phase === "typing" && (
        <button
          data-testid="boot-skip"
          style={skipStyle}
          aria-label="Skip boot animation"
          onClick={handleComplete}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.5";
          }}
        >
          Skip
        </button>
      )}
    </div>
  );
}

interface BootContentProps {
  lines: BootLine[];
  visibleLines: number;
  showWelcome: boolean;
  isTyping: boolean;
}

function BootContent({
  lines,
  visibleLines,
  showWelcome,
  isTyping,
}: BootContentProps) {
  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    width: "100%",
    margin: "0 auto",
    fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
    lineHeight: 1.8,
  };

  return (
    <div style={containerStyle}>
      {lines.slice(0, visibleLines).map((line, i) => (
        <div key={i} style={{ opacity: 1 }}>
          <span style={{ color: line.color, fontWeight: 700 }}>{line.tag}</span>{" "}
          <span style={{ color: "var(--cyber-text-primary)" }}>
            {line.text}
          </span>
          {i === visibleLines - 1 && !showWelcome && isTyping && (
            <BlinkingCursor />
          )}
        </div>
      ))}
      {visibleLines === lines.length && showWelcome && (
        <>
          <div style={{ height: "1.2em" }} />
          <div style={{ color: "var(--cyber-accent-green)" }}>
            {WELCOME_LINE}
            {isTyping && <BlinkingCursor />}
          </div>
        </>
      )}
    </div>
  );
}

function BlinkingCursor() {
  return (
    <span
      className="animate-typing-cursor"
      style={{
        display: "inline-block",
        width: "0.6em",
        height: "1em",
        backgroundColor: "var(--cyber-accent-green)",
        marginLeft: "2px",
        verticalAlign: "text-bottom",
      }}
    />
  );
}

interface GlitchOverlayProps {
  bands: React.CSSProperties[];
  lines: BootLine[];
  visibleLines: number;
}

function GlitchOverlay({ bands, lines, visibleLines }: GlitchOverlayProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {bands.map((bandStyle, i) => (
        <div key={i} style={bandStyle}>
          <div
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
              lineHeight: 1.8,
              padding: "1.5rem",
            }}
          >
            {lines.slice(0, visibleLines).map((line, j) => (
              <div key={j}>
                <span style={{ color: line.color, fontWeight: 700 }}>
                  {line.tag}
                </span>{" "}
                <span style={{ color: "var(--cyber-text-primary)" }}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
