/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Primary — Healthcare Teal
        med: {
          50:  '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
        },
        // Secondary — Trust Blue  
        sky: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        // Accent — Premium Violet
        accent: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        // Backgrounds — Warm Navy
        navy: {
          700: '#1A2332',
          800: '#111827',
          900: '#0C1222',
          950: '#050A18',
        },
      },
      backgroundImage: {
        'medical-grid': "linear-gradient(to right, rgba(20,184,166,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,184,166,0.04) 1px, transparent 1px)",
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'pulse-glow': 'pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'border-glow': 'border-glow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'orb-drift-1': 'orb-drift-1 20s ease-in-out infinite',
        'orb-drift-2': 'orb-drift-2 25s ease-in-out infinite',
        'orb-drift-3': 'orb-drift-3 18s ease-in-out infinite',
        'scanline': 'scanline 4s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(20,184,166,0.6))' },
          '50%': { opacity: '.7', filter: 'drop-shadow(0 0 2px rgba(20,184,166,0.3))' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(20,184,166,0.3), 0 0 20px rgba(20,184,166,0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(20,184,166,0.6), 0 0 40px rgba(20,184,166,0.2)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(20,184,166,0.2)' },
          '50%': { borderColor: 'rgba(20,184,166,0.5)' },
        },
        'orb-drift-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(50px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 40px) scale(0.95)' },
          '75%': { transform: 'translate(30px, 20px) scale(1.05)' },
        },
        'orb-drift-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-40px, 30px) scale(1.1)' },
          '66%': { transform: 'translate(30px, -50px) scale(0.9)' },
        },
        'orb-drift-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, -20px) scale(1.15)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
