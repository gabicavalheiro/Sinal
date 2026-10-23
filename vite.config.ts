import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@onnx": fileURLToPath(
        new URL("./node_modules/onnxruntime-web/dist/", import.meta.url),
      ),
    },
  },
  build: { sourcemap: true },
});
