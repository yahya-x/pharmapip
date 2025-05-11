/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F7F7',
          100: '#CCF0F0',
          200: '#99E0E0',
          300: '#66D1D1',
          400: '#33C1C1',
          500: '#00A0A0', // Primary teal
          600: '#008080',
          700: '#006060',
          800: '#004040',
          900: '#002020',
        },
        secondary: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0079FF', // Secondary blue
          600: '#0061CC',
          700: '#004999',
          800: '#003066',
          900: '#001833',
        },
        success: {
          500: '#10B981', // Success green
        },
        warning: {
          500: '#F59E0B', // Warning yellow
        },
        danger: {
          500: '#EF4444', // Danger red
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};