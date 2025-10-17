import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Crucial for GitHub Pages to resolve assets correctly
  build: {
    outDir: "dist", // Output the build to the 'docs' folder in the project root
    emptyOutDir: true, // Clear the output directory before building
  },
});