module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A3AFF",
      },
      backgroundImage: {
        Hero: "url('assets/home3.jpg')",
      },
      fontFamily: {
        heading: ['font1', 'sans'],
        base: ['font2', 'sans'],
      },
    },
  },
  plugins: [],
};
