/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Google Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        geminiDisplay: ['"Space Grotesk"', '"IBM Plex Sans"', 'sans-serif'],
        geminiBody: ['"IBM Plex Sans"', 'sans-serif'],
        geminiMono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        google: {
          blue: '#4285F4',
          red: '#DB4437',
          yellow: '#F4B400',
          green: '#0F9D58',
          dark: '#202124',
          gray: '#5f6368',
        },
        gemini: {
          paper: '#f6f1e7',
          sand: '#eadfcb',
          ink: '#1a1c2b',
          dusk: '#30324a',
          cobalt: '#2d5bff',
          mint: '#20c997',
          sun: '#f4b400',
          ember: '#d96570',
          lilac: '#c8b6ff',
        }
      },
      backgroundImage: {
        'gemini-aurora':
          'radial-gradient(1200px 600px at 10% -10%, rgba(45, 91, 255, 0.18), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(32, 201, 151, 0.16), transparent 60%), linear-gradient(180deg, #f6f1e7 0%, #fbf8f1 45%, #efe7d9 100%)',
        'gemini-grid':
          'linear-gradient(rgba(26, 28, 43, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 28, 43, 0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
