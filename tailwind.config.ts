import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/data/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coyote: {
          DEFAULT: '#1A365D', // Coyote Blue (Primary)
          700: '#1A365D',
          800: '#153052',
        },
        cerulean: {
          DEFAULT: '#2B6CB0', // Cerulean (Secondary)
          700: '#2B6CB0',
          800: '#234E70',
        },
        wheat: {
          DEFAULT: '#F6E05E', // Wheat (Accent)
          100: '#F9FAFB', // Background
        },
        cadet_gray: {
          DEFAULT: '#4A5568', // Cadet Gray (Text Secondary)
          700: '#4A5568',
        },
        background: '#F9FAFB',
        surface: '#FFFFFF',
        'text-primary': '#1A202C',
        'text-secondary': '#4A5568',
        border: '#E2E8F0',
        success: '#38A169',
        warning: '#D69E2E',
        error: '#E53E3E',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'lg': '0.5rem', // 8px
        'xl': '1rem',   // 16px
        '2xl': '1.5rem',// 24px
      },
      boxShadow: {
        'md': '0 2px 8px rgba(26, 54, 93, 0.06)',
        'lg': '0 4px 16px rgba(26, 54, 93, 0.10)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.4,0,0.2,1)',
        'hero-animation': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config; 