/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: "250px 1fr",
        collectionHeader: "1fr auto",
      },
      gridTemplateRows: {
        layout: "auto 1fr",
      },
      boxShadow: {
        card: "0px 6px 12px rgba(0, 0, 0, 0.1)",
      },
      maxHeight: {
        form: "90%",
      },
    },
  },
  plugins: [require("daisyui"),
    require('tailwind-scrollbar-hide')
  ],
};
