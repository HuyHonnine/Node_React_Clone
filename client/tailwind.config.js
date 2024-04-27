module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        homeBackground: "#F5F5F5",
        divBackground: "#1266dd",
        btnBackground: "#F73859",
        inputColor: "#e8f0fe",
      },
      width: {
        1100: "1100px",
      },
      fontSize: {
        base: "1rem",
        smbase: "0.5rem",
        mdbase: "0.75rem",
        lgbase: "1.25rem",
        xlbase: "1.5rem",
      },
      backgroundColor: {
        'overlay-30': 'rgba(0,0,0,0.3)',
        'overlay-70': 'rgba(0,0,0,0.7)',
      }
    },
  },
  plugins: [],
};
