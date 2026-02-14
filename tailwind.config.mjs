/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          "bg-primary": "var(--cyber-bg-primary)",
          "bg-secondary": "var(--cyber-bg-secondary)",
          "bg-terminal": "var(--cyber-bg-terminal)",
          green: "var(--cyber-accent-green)",
          blue: "var(--cyber-accent-blue)",
          purple: "var(--cyber-accent-purple)",
          red: "var(--cyber-accent-red)",
          "text-primary": "var(--cyber-text-primary)",
          "text-secondary": "var(--cyber-text-secondary)",
          border: "var(--cyber-border)",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 255, 65, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 255, 65, 0.4), 0 0 40px rgba(0, 255, 65, 0.1)" },
        },
        "typing-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "typing-cursor": "typing-cursor 1s step-end infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(0, 255, 65, 0.3)",
        "glow-blue": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-purple": "0 0 20px rgba(180, 74, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
