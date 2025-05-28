// tailwind.config.js
import { defineConfig } from 'tailwindcss/helpers';

export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        instrument: ['"instrument-serif"', 'sans-serif'],
      },
    },
  },
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
});
