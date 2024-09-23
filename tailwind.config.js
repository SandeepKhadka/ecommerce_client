/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#7E33E0",
        "primary-dark": "#0D0E43",
        "primary-light": "#8A8FB9",
        secondary: "#FB2E86"
      }
    },
  },
  plugins: [],
}

