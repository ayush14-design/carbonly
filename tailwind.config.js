/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        heading: 'var(--font-heading)',
        body: 'var(--font-body)',
      }
    },
  },
  plugins: [],
}
