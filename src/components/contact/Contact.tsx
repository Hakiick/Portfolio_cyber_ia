import { useState } from "react";
import type { FormEvent } from "react";
import { CyberSection } from "../ui/CyberSection";
import { TerminalBlock } from "../ui/TerminalBlock";
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

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(
      `From: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
        <label htmlFor="contact-name" className={labelStyles}>
          &gt; nom_
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
          className="inline-flex items-center justify-center border border-[var(--cyber-accent-green)] bg-transparent px-6 py-2.5 font-mono text-sm font-medium text-[var(--cyber-accent-green)] transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] active:scale-[0.97]"
        >
          [ ENVOYER ]
        </button>
      </div>
    </form>
  );
}

export function Contact() {
  return (
    <CyberSection id="contact" title="contact_">
      <div className="mx-auto max-w-2xl">
        <TerminalBlock title="contact.sh">
          <ContactForm />
        </TerminalBlock>

        <div className="mt-6 flex flex-col items-center gap-2 font-mono text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="text-[var(--cyber-text-secondary)] transition-colors duration-200 hover:text-[var(--cyber-accent-green)]"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--cyber-text-secondary)] transition-colors duration-200 hover:text-[var(--cyber-accent-blue)]"
          >
            github.com/{profile.pseudo.toLowerCase()}
          </a>
        </div>
      </div>
    </CyberSection>
  );
}

export default Contact;
