/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        vault: {
          black: '#0a0a0a',
          dark: '#111111',
          card: '#181818',
          border: '#2a2a2a',
          gold: '#d4a832',
          'gold-light': '#f0c75a',
          red: '#e03c3c',
          muted: '#888888',
        },
      },
    },
  },
  plugins: [],
}
