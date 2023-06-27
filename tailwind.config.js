/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./views/**/*.handlebars",
    "./public/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "ui-sans-serif", "sans-serif", "system-ui"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "pulse-lt-blue": {
          50: "#F5FBFC",
          100: "#EBF6FA",
          200: "#D0E9F2",
          300: "#B3D8E8",
          400: "#82BAD9",
          500: "#5698c6",
          600: "#4682B3",
          700: "#2F6394",
          800: "#1F4978",
          900: "#112F59",
          950: "#071B3B",
        },
        "pulse-blue": {
          50: "#f2f8fa",
          100: "#e4eef2",
          200: "#bfd5e0",
          300: "#9bbacc",
          400: "#5e86a6",
          500: "#31557f",
          600: "#284a73",
          700: "#1b365e",
          800: "#12274d",
          900: "#0a1938",
          950: "#040d24",
        },
        "pulse-green": {
          50: "#f2f7f6",
          100: "#e9f2ef",
          200: "#c8ded4",
          300: "#abccbc",
          400: "#76a388",
          500: "#4a7c59",
          600: "#3d704b",
          700: "#2a5e38",
          800: "#1b4a26",
          900: "#0f3818",
          950: "#06240c",
        },
        "pulse-grey": {
          light: "#f2f2f2",
          DEFAULT: "#e5e5e5",
          dark: "#333333",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
