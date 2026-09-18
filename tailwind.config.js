/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#20201E",
        ink: "#E7E1D7",
        muted: "#969189",
        accent: "#C85C45",
        line: "#514D47",
        gold: "#B8A88A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Fraunces Variable", "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1280px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
