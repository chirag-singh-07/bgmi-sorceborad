/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        teko: ['Teko', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
      },
      colors: {
        background: "#0b0e14",
        gunmetal: "#1e242e",
        gold: {
          DEFAULT: "#eab308",
          light: "#fde047",
        },
        primary: {
          DEFAULT: "#eab308", // Yellow as primary for BGMI vibe
          dark: "#a16207",
        },
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ff3e3e",
      },
      backgroundImage: {
        'esports-noise': "url('https://www.transparenttextures.com/patterns/dark-matter.png')",
      }
    },
  },
  plugins: [],
}
