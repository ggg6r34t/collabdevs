/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        640: "40rem",
        40: "1.2rem",
        4.5: "0.938rem",
      },
      height: {
        40: "1.2rem",
        4: "58px",
        4.5: "0.938rem",
      },
    },
  },
  plugins: [],
};
