/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neo: {
          cyan: '#00f2fe',
          blue: '#4facfe',
        },
        space: {
          900: '#0f172a',
          950: '#020617',
        },
      },
      backgroundImage: {
        'medical-grid': "linear-gradient(to right, rgba(0,242,254,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,242,254,0.05) 1px, transparent 1px)",
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(0,242,254,0.6))' },
          '50%': { opacity: '.7', filter: 'drop-shadow(0 0 2px rgba(0,242,254,0.3))' },
        }
      }
    },
  },
  plugins: [],
};
