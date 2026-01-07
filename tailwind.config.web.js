module.exports = {
  content: ["./web/**/*.html", "./web/assets/js/**/*.js"],
  prefix: "panel-",
  theme: {
    extend: {
      boxShadow: {
        'sidebar-btn': '0px 0px 9.4px 0px var(--primary-600)',
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
        label: {
          red: "var(--red-label)",
          blue: "var(--blue-label)",
          purple: "var(--purple-label)",
          orange: "var(--orange-label)",
          lightGreen: "var(--lightGreen-label)",
          darkGreen: "var(--darkGreen-label)",
          Gray: "var(--Gray-label)",

          redBg: "var(--red-bgLabel)",
          blueBg: "var(--blue-bgLabel)",
          purpleBg: "var(--purple-bgLabel)",
          orangeBg: "var(--orange-bgLabel)",
          lightGreenBg: "var(--lightGreen-bgLabel)",
          darkGreenBg: "var(--darkGreen-bgLabel)",
          GrayBg: "var(--Gray-bgLabel)",
        },
      },
    },
  },
  plugins: [

  ],
  
  
};

