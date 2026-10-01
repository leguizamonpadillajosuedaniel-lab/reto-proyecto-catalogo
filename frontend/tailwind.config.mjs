/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        power: { red: '#e31f1a', orange: '#f26a21', ink: '#111111', charcoal: '#202020', mist: '#f3f3f3' },
      },
      fontFamily: { display: ['Saira Condensed', 'sans-serif'], sans: ['Inter', 'sans-serif'] },
      boxShadow: { power: '0 14px 35px rgba(17, 17, 17, .14)' },
    },
  },
  plugins: [],
};
