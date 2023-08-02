/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#fdc632',
      },
      container:{
        center: true
      }
    },
    fontFamily: {
      'roboto': ['Roboto Mono'],
      'rubik': ['Rubik'],
    },
  },
  plugins: [],
};