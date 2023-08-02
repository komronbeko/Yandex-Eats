/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#FCE000',
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