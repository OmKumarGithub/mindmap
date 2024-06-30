/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 4s linear infinite',
        'bounce-short': 'bounce 4s ease-in-out infinite'

      }
    }
  },
  plugins: [],
}