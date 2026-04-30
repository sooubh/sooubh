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
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
          dark: '#202124',
          gray: '#5f6368',
        },
        gemini: {
          paper: '#ffffff',
          sand: '#f8f9fa',
          ink: '#202124',
          dusk: '#5f6368',
          cobalt: '#4285F4',
          mint: '#34A853',
          sun: '#FBBC05',
          ember: '#EA4335',
          lilac: '#E8F0FE',
        }
      },
      backgroundImage: {
        'gemini-aurora':
          'radial-gradient(1200px 600px at 12% -10%, rgba(66, 133, 244, 0.18), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(52, 168, 83, 0.18), transparent 60%), radial-gradient(700px 400px at 80% 80%, rgba(251, 188, 5, 0.15), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f8f9fa 45%, #f1f3f4 100%)',
        'gemini-grid':
          'linear-gradient(rgba(32, 33, 36, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(32, 33, 36, 0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
