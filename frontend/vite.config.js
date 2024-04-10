import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@lib": "/src/lib",
      "@routes": "/src/routes",
      "@style": "/src/style",
    },
  },
});
