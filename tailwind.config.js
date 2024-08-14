/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4DA8DA",
          DEFAULT: "#007CC7",
          dark: "#12232E",
        },
        secondary: {
          light: "#EEFBFB",
          DEFAULT: "#4DA8DA",
          dark: "#203647",
        },
        accent: "#EEFBFB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
      },
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(0, 124, 199, 0.1), 0 2px 4px -1px rgba(0, 124, 199, 0.06)",
      },
    },
  },
  plugins: [],
};
