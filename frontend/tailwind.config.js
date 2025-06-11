/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'primary': '#0095ff',
        'secondary': '#f8f9fa',
        'text': {
          DEFAULT: '#333333',
          light: '#666666',
        }
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/globe-bg.svg')"
      }
    },
  },
  plugins: [],
}

