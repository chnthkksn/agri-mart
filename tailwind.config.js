/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'md': {
          'max': '768px'
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        'primary': '#1E3A8A',
        'secondary': '#F2F2F2',
        'tertiary': '#F2F2F2',
      }
    },
  },
  plugins: [],
}

