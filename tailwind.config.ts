import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'], // เพิ่มฟอนต์ Kanit
      },
      boxShadow: {
        'custom-square': '4px 4px 0px rgba(0, 0, 0, 0.25)', // กำหนดเงาแบบสี่เหลี่ยม
      },
      screens: {
        'md-custom': '990px', // ตั้งค่า breakpoint ที่ 900px
        'md-custom2': '500px'
      },
    },
    daisyui: {
      themes: ["light", "dark", "cupcake"],
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
