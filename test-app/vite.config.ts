import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: 'source', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  build: {
    minify: false,
  },
});
