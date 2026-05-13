import { resolve } from "node:path";

const sandboxSrc = resolve(__dirname, "src");

export default defineNuxtConfig({
  compatibilityDate: "2024-09-05",
  debug: false,
  srcDir: "src",
  ssr: true,
  telemetry: false,
  devtools: { enabled: false },
  css: ["~/style.css"],
  modules: ["@nuxtjs/i18n", "@nmorph/nmorph-ui-kit/nuxt"],
  nmorph: {},
  devServer: {
    host: "0.0.0.0",
    port: 43173,
  },
  alias: {
    "@sandbox": sandboxSrc,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@nmorph/nmorph-ui-kit"],
    },
    resolve: {
      alias: {
        "@vue/devtools-api": "vue-devtools-stub",
      },
      dedupe: [
        "vue",
        "vue-i18n",
        "@intlify/shared",
        "@intlify/core-base",
        "@intlify/message-compiler",
      ],
      preserveSymlinks: true,
    },
  },
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "en",
    vueI18n: "../i18n.config.ts",
    compilation: {
      strictMessage: false,
    },
  },
});
