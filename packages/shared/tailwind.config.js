/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'capas-turquoise': {
          DEFAULT: '#0A8A98',
          light: '#1DA9B9',
          dark: '#066A78',
        },
        'capas-gold': {
          DEFAULT: '#FFCE00',
          light: '#FFD833',
          dark: '#E6B800',
        },
        'capas-ocean': {
          light: '#E6F4F1',
          DEFAULT: '#A8D5E2',
          dark: '#2C5F7C',
        },
        'capas-sand': {
          light: '#FAF5E4',
          DEFAULT: '#F0E5D1',
          dark: '#D4B896',
        },
        'capas-coral': {
          light: '#FFB6B3',
          DEFAULT: '#FF8B87',
          dark: '#E85D57',
        },
        'capas-palm': {
          light: '#9BC400',
          DEFAULT: '#7FA900',
          dark: '#5C7A00',
        },
        'capas-purple': {
          light: '#A78BFA',
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        }
      },
      backgroundImage: {
        'ocean-wave': "url('/patterns/ocean-wave.svg')",
        'conch-pattern': "url('/patterns/conch-shell.svg')",
        'palm-leaves': "url('/patterns/palm-leaves.svg')",
        'coral-reef': "url('/patterns/coral-reef.svg')",
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'wave': 'wave 15s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-20px) translateY(-10px)' },
          '50%': { transform: 'translateX(0) translateY(-20px)' },
          '75%': { transform: 'translateX(20px) translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gentle-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        }
      }
    },
  },
  plugins: [],
}