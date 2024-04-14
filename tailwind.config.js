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
      boxShadow:{
        'custom-shadow': ' 4px 6px 10px  0 rgba(30, 74, 188, 0.5)'
      },
      lineClamp: { // Thêm cấu hình cho line clamp
        3: '3rem',
        4: '4rem',
        // Thêm bất kỳ giá trị nào bạn muốn ở đây
      },
    },
  },
}

