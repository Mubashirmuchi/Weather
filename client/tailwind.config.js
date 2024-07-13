/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: { colors: {
      'custom-blue': '#45278B',
      'custom-green': '#45278B',
    },},
  },
  plugins: [],
}

