/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "serif"],
        roboto: ["Roboto", "sans-serif"],
        plex: ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
