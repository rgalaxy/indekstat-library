import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { authBffMiddleware } from "./src/bff/authMiddleware";

const BACKEND_TARGET = process.env.VITE_API_TARGET ?? "http://localhost:8001";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "auth-bff",
      configureServer(server) {
        server.middlewares.use(authBffMiddleware(server));
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/v1": {
        target: BACKEND_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/admin": {
        target: BACKEND_TARGET,
        changeOrigin: true,
      },
    },
  },
});
