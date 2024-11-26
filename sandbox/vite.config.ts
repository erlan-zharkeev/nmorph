import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  server: {
    port: 3009,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith("nmorph-");
          },
        },
      },
    }),
    vueJsx(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "..", "library", "src"),
    },
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, "src", "app", "index.ts"),
    },
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import '@/styles/main';
        `,
      },
    },
  },
});
