/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050a08',
        surface: '#0a1510',
        primary: {
          DEFAULT: '#00e676',
          dark: '#00c853',
          light: '#69f0ae',
          glow: 'rgba(0, 230, 118, 0.5)'
        },
        accent: {
          DEFAULT: '#00bcd4',
          glow: 'rgba(0, 188, 212, 0.5)'
        },
        muted: '#4a6a5a',
        carbon: '#0d1a14',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 0.8s steps(10) infinite',
        'shine': 'shine 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'node-pulse': 'node-pulse 2s ease-out infinite',
        'bounce-in': 'bounce-in 0.6s ease-out forwards',
        'marquee-scroll': 'marquee-scroll 30s linear infinite',
        'marquee-reverse': 'marquee-scroll-reverse 35s linear infinite',
        'energy-flow': 'energy-flow 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
};
// Trigger rebuild
