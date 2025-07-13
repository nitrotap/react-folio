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
          DEFAULT: '#7a542e',
          100: '#181109',
          200: '#312213',
          300: '#49321c',
          400: '#624325',
          500: '#7a542e',
          600: '#ac7641',
          700: '#c7986a',
          800: '#d9bb9c',
          900: '#ecddcd',
        },
        rich_black: {
          DEFAULT: '#031926',
          100: '#010508',
          200: '#010a0f',
          300: '#020f17',
          400: '#02141e',
          500: '#031926',
          600: '#0a537d',
          700: '#118cd3',
          800: '#51b6f1',
          900: '#a8dbf8',
        },
        wheat: {
          DEFAULT: '#ead2ac',
          100: '#412f10',
          200: '#835d21',
          300: '#c48c31',
          400: '#dab06c',
          500: '#ead2ac',
          600: '#efdcbe',
          700: '#f3e5ce',
          800: '#f7edde',
          900: '#fbf6ef',
        },
        cadet_gray: {
          DEFAULT: '#9cafb7',
          100: '#1c2427',
          200: '#39484e',
          300: '#556b75',
          400: '#738e9a',
          500: '#9cafb7',
          600: '#afbec5',
          700: '#c3ced3',
          800: '#d7dfe2',
          900: '#ebeff0',
        },
        cerulean: {
          DEFAULT: '#4281a4',
          100: '#0d1a21',
          200: '#1a3442',
          300: '#274e62',
          400: '#346883',
          500: '#4281a4',
          600: '#5f9dbf',
          700: '#87b6cf',
          800: '#afcedf',
          900: '#d7e7ef',
        },
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