/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "chat-primary-color": "#00A3FF",
        "chat-secondary-color": "#292929",
      },
    },
  },
  plugins: [require("daisyui")],
};
