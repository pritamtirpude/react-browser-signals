import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isLibBuild = mode === "lib";

  return {
    plugins: [react()],
    build: isLibBuild
      ? {
          emptyOutDir: false,
          lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "ReactBrowserSignals",
            formats: ["es", "cjs"],
            fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
          },
          rollupOptions: {
            external: ["react", "react-dom"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
              },
            },
          },
        }
      : undefined,
  };
});
