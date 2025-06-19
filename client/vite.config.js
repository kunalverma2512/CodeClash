import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist'  // ✅ required for Vercel to locate built files
  },
  base: '/', // ✅ ensures correct path resolution for Vercel deployment
});
