/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#0d9488',
        'accent-hover': '#0f766e',
        'accent-light': '#ccfbf1',
        'warm': '#faf8f5',
        'warm-dark': '#f5f2ed',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
        'card-lg': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.06)',
        'glow': '0 0 60px -12px rgb(13 148 136 / 0.15)',
        'glow-sm': '0 0 40px -8px rgb(13 148 136 / 0.12)',
        'inner-soft': 'inset 0 1px 2px 0 rgb(255 255 255 / 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
