import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Create type aliases to manage folder structure.
    alias: {
      "@components": "/src/components",
      "@style": "/src/style",
      "@lib": "/src/lib",
      "@routes": "/src/routes/routes.jsx",
      "@hooks": "/src/hooks/hooks.jsx",
    },
  },
});
