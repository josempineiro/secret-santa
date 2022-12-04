/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#b73f43",
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
