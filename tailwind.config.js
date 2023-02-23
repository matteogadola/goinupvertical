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
        /* https://coolors.co/7fb069-fffdda-e6aa68-ca3c25-262410 */
        'primary': '#e6aa68',
        'accent': '#7fb069',
        'title': '#262410',
        'button': '#ca3c25',
        'background': '#FFFDDA',
      }
    },
  },
  plugins: [],
}
