/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // Pastikan file index.html ada di sini
    "./src/**/*.{js,jsx,ts,tsx}",  // Memastikan file JSX dibaca oleh Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
