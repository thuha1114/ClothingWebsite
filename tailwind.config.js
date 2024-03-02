/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'playfair': ['Playfair Display', 'serif'],
        'rowdies': ['Rowdies', 'sans-serif'],
        'gowun': ['Gowun Dodum', 'sans-serif']
      },
    },
  },
  plugins: [],
}

