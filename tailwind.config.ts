import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#529ECE',
        'textC': '#212121',
        'pastel': '#E1EEF2',
        'border': '#ADD8E6',
        'userchat' : '#D6EBF2',
        'chatbg' : '#F6F6F6',
      },
    },
  },
  plugins: [],
};
export default config;
