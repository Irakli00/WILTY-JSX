// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-yellow": "var(--dark-yellow)",
        "silver-gray": "var(--silver-gray)",
        "darker-gray": "var(--darker-gray)",
        "font-gray": "var(--font-gray)",
        "main-purple": "var(--main-purple)",
        "darker-purple": "var(--darker-purple)",
        "dark-blue": "var(--dark-blue)",
        "secondary-blue": "var(--secondary-blue)",
        "dark-red": "var(--dark-red)",
        "white-tint": "var(--white-tint)",
        greenish: "var(--greenish)",
      },
      fontFamily: {
        main: ["var(--main-font)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
