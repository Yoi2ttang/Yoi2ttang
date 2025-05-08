/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yoi: {
          50: "#fff3f1",
          100: "#ffe4df",
          200: "#ffcec5",
          300: "#ffac9d",
          400: "#ff7c64",
          500: "#ff5434",
          600: "#ed3715",
          700: "#c82a0d",
          800: "#a5270f",
          900: "#882614",
          950: "#4b0f04",
        },
        mouse: "#bebebe",
        cow: "#e2be8d",
        tiger: "#ffb950",
        rabbit: "#ac2fd7",
        dragon: "#88bfa7",
        snake: "#4f93d2",
        horse: "#ad6b23",
        sheep: "#f2e7d6",
        monkey: "#f2cc4d",
        chicken: "#ef3a5d",
        dog: "#9d9d9d",
        pig: "#f5b8c3",
        black: "#262626",
        white: "#fefefe",
      },
      fontFamily: {
        display: ["Pretendard", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        lg: "18px",
        md: "18px",
        sm: "16px",
        caption: "14px",
      },
      spacing: {
        "yoi-header-height": "52px",
        "yoi-navbar-height": "56px",
      },
      maxWidth: {
        "yoi-container": "600px",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
    },
  },
  plugins: [],
}
