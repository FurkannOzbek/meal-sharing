import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      port: Number(env.PORT) || 3000,
    },
    build: {
      outDir: "dist", // Ensure the build directory is set to "dist"
    },
  };
});
