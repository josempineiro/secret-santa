/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        santa: "#b73f43",
        grinch: "#8bc13c",
        dark: "#1a1a1a",
        light: "#f5f5f5",
      },
      keyframes: {
        "move-y": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(5px)" },
        },
        "move-x": {
          "0%, 100%": { transform: "translateX(0px)" },
          "50%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        "move-y": "move-y 2s ease-in-out infinite",
        "move-x": "move-x 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
