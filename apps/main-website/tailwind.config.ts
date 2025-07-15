import type { Config } from "tailwindcss";
import capasConfig from "@capas/shared/tailwind";

const config: Config = {
  ...capasConfig,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shared/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...capasConfig.theme,
    extend: {
      ...capasConfig.theme?.extend,
      colors: {
        ...capasConfig.theme?.extend?.colors,
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
};
export default config;
