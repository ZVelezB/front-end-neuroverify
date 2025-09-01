/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0D1B2A",
        neuroBlue: "#3A7CA5",
        cyan: "#00D4FF",
        signal: "#FF6B35"
      }
    }
  },
  plugins: []
}
