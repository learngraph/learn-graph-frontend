/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "var(--color-page-bg)",
        section: "var(--color-section-bg)",
        ink: "var(--text-primary)",
        "ink-muted": "var(--text-muted)",
        onaccent: "var(--text-on-accent)",
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        foreground: "rgb(var(--foreground-rgb) / <alpha-value>)",
        "stats-band": "var(--stats-band-bg)",
        "stats-hover": "var(--stats-stat-hover)",
      },
      zIndex: {
        waypoints: "var(--z-waypoints)",
        spotlight: "var(--z-spotlight)",
        nav: "var(--z-navbar)",
        modal: "var(--z-modal)",
        "tile-overlay": "var(--z-tile-overlay)",
        cookie: "var(--z-cookie)",
      },
    },
  },
  plugins: [],
};
