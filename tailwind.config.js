/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: { rBlue: ["#61dafb"] },
      fontFamily: {
        IBM: ["IBM Plex Mono", "monospace"],
        Noto: ["Noto Serif", "serif"],
        Reddit: ["Reddit Mono", "monospace"],
      },
      maxHeight: {
        104: "26rem",
        108: "27rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};
