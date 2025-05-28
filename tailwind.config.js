/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // tailwind.config.js
  theme: {
    extend: {
      fontFamily: {
        instrument: ['Instrument Serif', 'serif'],
      },
    },
  },
};
