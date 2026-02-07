/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfaf6',
          100: '#f9f3ea',
          200: '#f0e4d0',
          300: '#e5d1b0',
          400: '#d4b580',
          500: '#c49a5c',
          600: '#a87d42',
          700: '#8a6435',
          800: '#6e4f2c',
          900: '#5a4126',
        },
        ocean: {
          50: '#f0f9fc',
          100: '#daf1f8',
          200: '#b8e4f1',
          300: '#85d0e7',
          400: '#4ab3d6',
          500: '#2997bd',
          600: '#1e7a9f',
          700: '#1d6382',
          800: '#1e526c',
          900: '#1e455b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}