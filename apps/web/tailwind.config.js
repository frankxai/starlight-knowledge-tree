/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050810",
          900: "#0A0E1A",
          800: "#0F1526",
          700: "#151d35",
          600: "#1c2847",
        },
        cyan: {
          primary: "#00D4FF",
          dim: "#00A3C4",
          glow: "rgba(0, 212, 255, 0.15)",
        },
        amber: {
          authority: "#F5A623",
          dim: "#C07D0F",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-navy":
          "linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(0, 212, 255, 0.12), 0 4px 24px rgba(0, 0, 0, 0.4)",
        "glass-hover": "0 0 0 1px rgba(0, 212, 255, 0.3), 0 8px 32px rgba(0, 0, 0, 0.5)",
        "cyan-glow": "0 0 20px rgba(0, 212, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
