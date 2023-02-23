/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '128': '32rem',
      },
      backgroundImage: {
        'cover-image': "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('/images/bg1.jpg')" // elimina
      },
      fontFamily: {
        unbounded: ['var(--font-unbounded)'],
        poppins: ['var(--font-poppins)'],
      },
      colors: {
        'primary': '',
        'accent': '#7fb069',
        'header': '',
        'text': '',
        'background': '#FFFDDA',
      }
    },
  },
  plugins: [],
}
