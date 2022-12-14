/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      // xs: 14,
      sm: 18,
      md: 24,
      lg: 32,
      xl: 48,
      '2xl': 128,
    },

    colors: {
      transparent: 'transparent',

      black: '#000',
      white: '#FFF',

      gray: {
        900: '#18181B',
        700: '#3F3F46',
        100: '#F4F4F5',
      },

      primary: '#FBBF24',

      success: '#16A34A',
      warning: '#DC2626',
      info: '#0284C7',
    },
    extend: {
      fontFamily: {
        sans: 'Inter, sans-serif',
      },
    },
  },
  plugins: [],
};
