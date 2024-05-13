import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
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

      "neutral-100": "#FFFFFF",
      "neutral-200": "#F8FAFC",
      "neutral-300": "#EEF2F6",
      "neutral-400": "#E3E8EF",
      "neutral-500": "#E3E8EF",
      "neutral-600": "#CDD5DF",
      "neutral-700": "#9AA4B2",
      "neutral-800": "#9AA4B2",
      "neutral-900": "#4B5565",

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
  },
};
