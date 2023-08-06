/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./Component/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colors: {
          "primary-dark": "#1f1f1f",
          primary: "#ffffff",
          highlight: {
            dark: "#FFFFFF",
            light: "#1f1f1f",
          },
          secondary: {
            dark: "#707070",
            light: "#e6e6e6",
          },
          action: "#3B82F6",
        },
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
