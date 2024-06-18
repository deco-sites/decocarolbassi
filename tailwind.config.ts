import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear ",
        'sliding-down': 'sliding-down 0.2s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-in-out',
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        'sliding-down': {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0%)" },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
    colors: {
      "primary-100": "#EDEDED",
      "primary-200": "#BABABA",
      "primary-300": "#878787",
      "primary-400": "#6E6E6E",
      "primary-500": "#535353",
      "primary-600": "#3B3B3B",
      "primary-700": "#262626",
      "primary-800": "#0D0D0D",
      "primary-900": "#000000",

      "secondary-neutral-100": "#FFFFFF",
      "secondary-neutral-200": "#F8FAFC",
      "secondary-neutral-300": "#EEF2F6",
      "secondary-neutral-400": "#E3E8EF",
      "secondary-neutral-500": "#E3E8EF",
      "secondary-neutral-600": "#CDD5DF",
      "secondary-neutral-700": "#9AA4B2",
      "secondary-neutral-800": "#9AA4B2",
      "paragraph-color": "#4B5565",
      "dark-blue": "#121926",

      "success-light": "#D5FDD7",
      "success-medium": "#25A760",
      "success-bold": "#086A5B",

      "error-light": "#FFE7E0",
      "error-medium": "#FF4F66",
      "error-bold": "#932150",

      "warning-light": "#FFF9DA",
      "warning-medium": "#FFCE47",
      "warning-bold": "#936816",
    },
    flex: {
      '1.5':  '1.5 1.5 0%',
      '2': '2 2 0%',
      '4': '4 4 0%',
    },
    boxShadow: {
      'header': '0px 4px 6px -1px #0000000D',
    }
  },
};
