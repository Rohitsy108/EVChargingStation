/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: "#00C853", // vibrant green
          dark: "#009624",
          light: "#B9F6CA",
        },
        accent: {
          DEFAULT: "#00B8D4", // teal blue
          dark: "#00838F",
          light: "#84FFFF",
        },
        bg: {
          light: "#f8fafc",
          dark: "#263238",
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
