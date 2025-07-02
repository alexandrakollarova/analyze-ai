import preset from "./src/design-system/tailwind.preset";

/** @type {import('tailwindcss').Config} */
const config = {
  ...preset,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {
  //   extend: {
  //     colors: {
  //       background: 'hsl(var(--background))',
  //       foreground: 'hsl(var(--foreground))',
  //       primary: 'hsl(var(--primary))',
  //       secondary: 'hsl(var(--secondary))',
  //     },
  //     fontFamily: {
  //       sans: ['Satoshi', 'sans-serif'],
  //     },
  //   },
  // },
};

export default config;
