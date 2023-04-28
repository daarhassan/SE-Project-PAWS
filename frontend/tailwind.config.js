/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f8cda3",
        secondary: "#d29856",
        alternative: "#c28862",
      },
      fontFamily: {
        basetext: ["Little Moment", "sans-serif"],
        headtext: ["KawaiiRT", "sans-serif"],
      },
    },
  },
  plugins: [],
}

