import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			woreda: {
  				primary: "#1E5631",       // Forest Green
  				secondary: "#6F4E37",     // Coffee Brown
  				accent: "#D4A017",        // Golden Harvest
  				bgCream: "#F8F6F1",       // Light Cream
  				charcoal: "#2C2C2C",      // Dark Charcoal Text[cite: 1]
  				textGray: "#6B7280",      // Gray Secondary Text[cite: 1]
  				success: "#2E7D32",       // Success Green[cite: 1]
  				info: "#2F80ED",          // Sky Blue[cite: 1]
  				warning: "#F2994A",       // Orange[cite: 1]
  			},
  			background: "var(--background)",
  			foreground: "var(--foreground)",
  		},
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)"
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;