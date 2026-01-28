/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{html,js}",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        'orange': {
          'primary': '#bd9823',
          'dark': '#9d7a1a',
          'light': '#d4b045',
        },
        'brown': {
          'primary': '#000',
          'dark': '#654321',
          'light': '#1a2437',
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.3)',
        'luxury-lg': '0 25px 80px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 30px rgba(189, 152, 35, 0.5)',
        'glow-lg': '0 0 50px rgba(189, 152, 35, 0.7)',
      },
      fontSize: {
        'clamp-xs': 'clamp(0.625rem, 0.5rem + 0.5vw, 0.875rem)',
        'clamp-sm': 'clamp(0.75rem, 0.625rem + 0.5vw, 1rem)',
        'clamp-base': 'clamp(0.875rem, 0.75rem + 0.5vw, 1.125rem)',
        'clamp-lg': 'clamp(1rem, 0.875rem + 0.5vw, 1.25rem)',
        'clamp-xl': 'clamp(1.125rem, 1rem + 0.5vw, 1.5rem)',
        'clamp-2xl': 'clamp(1.5rem, 1.25rem + 1vw, 2rem)',
        'clamp-3xl': 'clamp(2rem, 1.5rem + 2vw, 3rem)',
        'clamp-4xl': 'clamp(2.5rem, 2rem + 2vw, 4rem)',
        'clamp-5xl': 'clamp(3rem, 2.5rem + 2vw, 5rem)',
      },
    },
  },
  plugins: [],
}

