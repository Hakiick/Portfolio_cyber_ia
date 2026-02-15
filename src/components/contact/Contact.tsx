import { useState, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import { CyberSection } from "../ui/CyberSection";
import { TerminalBlock } from "../ui/TerminalBlock";
import { ScrollReveal } from "../ui/ScrollReveal";
import { profile } from "../../data/profile";

const inputBaseStyles = [
  "w-full bg-transparent font-mono text-sm",
  "text-[var(--cyber-text-primary)]",
  "border-b border-[var(--cyber-border)]",
  "focus:border-[var(--cyber-accent-green)]",
  "focus:outline-none",
  "placeholder:text-[var(--cyber-text-secondary)]",
  "py-2 transition-colors duration-200",
].join(" ");

const labelStyles = [
  "font-mono text-sm",
  "text-[var(--cyber-accent-green)]",
  "text-glow-green",
  "shrink-0",
].join(" ");

type TransmitPhase = "idle" | "encrypting" | "transmitting" | "sent";

const HEX_CHARS = "0123456789ABCDEF";
const BIN_CHARS = "01";

function TransmissionOverlay({ phase }: { phase: TransmitPhase }) {
  const [chars, setChars] = useState<
    Array<{ char: string; x: number; y: number; speed: number; id: number }>
  >([]);

  useEffect(() => {
    if (phase === "idle") return;

    let counter = 0;
    const interval = setInterval(() => {
      setChars((prev) => {
        const pool = phase === "encrypting" ? HEX_CHARS : BIN_CHARS;
        const newChar = {
          char: pool[Math.floor(Math.random() * pool.length)],
          x: Math.random() * 100,
          y: 100 + Math.random() * 10,
          speed: 1 + Math.random() * 2,
          id: counter++,
        };
        const updated = [...prev, newChar]
          .map((c) => ({ ...c, y: c.y - c.speed * 3 }))
          .filter((c) => c.y > -10);
        return updated.slice(-40);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [phase]);

  if (phase === "idle") return null;

  const statusText =
    phase === "encrypting"
      ? "Encrypting..."
      : phase === "transmitting"
        ? "Transmitting..."
        : "Sent ✓";

  const statusColor =
    phase === "sent" ? "var(--cyber-accent-green)" : "var(--cyber-accent-blue)";

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-md">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(10, 10, 15, 0.9)" }}
      />

      {/* Floating chars */}
      {chars.map((c) => (
        <span
          key={c.id}
          className="absolute font-mono text-xs pointer-events-none"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            color: "var(--cyber-accent-green)",
            opacity: Math.max(0, (c.y + 10) / 110) * 0.5,
          }}
        >
          {c.char}
        </span>
      ))}

      {/* Status text */}
      <div className="relative z-10 text-center">
        <p
          className="font-mono text-lg font-bold mb-2"
          style={{ color: statusColor }}
        >
          {statusText}
        </p>
        {phase !== "sent" && (
          <div className="flex justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: statusColor,
                  animation: `contact-dot-pulse 1s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phase, setPhase] = useState<TransmitPhase>("idle");

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (phase !== "idle") return;

      setPhase("encrypting");

      setTimeout(() => {
        setPhase("transmitting");
      }, 600);

      setTimeout(() => {
        setPhase("sent");
      }, 1200);

      setTimeout(() => {
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(
          `From: ${name}\nEmail: ${email}\n\n${message}`,
        );
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setPhase("idle");
      }, 1800);
    },
    [name, email, message, phase],
  );

  return (
    <div className="relative">
      <TransmissionOverlay phase={phase} />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <label htmlFor="contact-name" className={labelStyles}>
            &gt; nom_
            <span
              className="inline-block w-[2px] h-3 ml-0.5 align-middle"
              style={{
                backgroundColor: "var(--cyber-accent-green)",
                animation: "contact-cursor-blink 1s step-end infinite",
              }}
            />
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputBaseStyles}
            autoComplete="name"
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <label htmlFor="contact-email" className={labelStyles}>
            &gt; email_
            <span
              className="inline-block w-[2px] h-3 ml-0.5 align-middle"
              style={{
                backgroundColor: "var(--cyber-accent-green)",
                animation: "contact-cursor-blink 1s step-end infinite",
                animationDelay: "0.3s",
              }}
            />
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBaseStyles}
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
          <label htmlFor="contact-message" className={labelStyles}>
            &gt; message_
            <span
              className="inline-block w-[2px] h-3 ml-0.5 align-middle"
              style={{
                backgroundColor: "var(--cyber-accent-green)",
                animation: "contact-cursor-blink 1s step-end infinite",
                animationDelay: "0.6s",
              }}
            />
          </label>
          <textarea
            id="contact-message"
            required
            placeholder="Votre message..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputBaseStyles} resize-none`}
            autoComplete="off"
          />
        </div>

        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={phase !== "idle"}
            className="contact-submit-btn relative inline-flex items-center justify-center overflow-hidden border border-[var(--cyber-accent-green)] bg-transparent px-6 py-2.5 font-mono text-sm font-medium text-[var(--cyber-accent-green)] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] active:scale-[0.97] disabled:opacity-50"
          >
            [ ENVOYER ]
          </button>
        </div>
      </form>

      {/* Inline styles for contact animations */}
      <style>{`
        @keyframes contact-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes contact-dot-pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .contact-submit-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 65, 0.1),
            transparent
          );
          transition: left 0.4s ease;
        }
        .contact-submit-btn:hover::after {
          left: 100%;
        }
      `}</style>
    </div>
  );
}

export function Contact() {
  return (
    <CyberSection id="contact" title="contact_">
      <div className="mx-auto max-w-2xl">
        <ScrollReveal animation="fade-in">
          <TerminalBlock title="contact.sh">
            <ContactForm />
          </TerminalBlock>
        </ScrollReveal>

        <ScrollReveal animation="slide-up" delay={200}>
          <div className="mt-6 flex flex-col items-center gap-2 font-mono text-sm">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Envoyer un email"
              className="text-[var(--cyber-text-secondary)] transition-colors duration-200 hover:text-[var(--cyber-accent-green)]"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil GitHub"
              className="text-[var(--cyber-text-secondary)] transition-colors duration-200 hover:text-[var(--cyber-accent-blue)]"
            >
              github.com/{profile.pseudo.toLowerCase()}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </CyberSection>
  );
}

export default Contact;
