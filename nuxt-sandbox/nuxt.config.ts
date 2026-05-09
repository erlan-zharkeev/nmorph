export default defineNuxtConfig({
  compatibilityDate: "2024-09-05",
  ssr: true,
  devtools: { enabled: false },
  css: ["~/assets/style.css"],
  modules: ["@nuxtjs/i18n", "@nmorph/nmorph-ui-kit/nuxt"],
  nmorph: {},
  devServer: {
    host: "127.0.0.1",
    port: 43119,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@nmorph/nmorph-ui-kit"],
    },
    resolve: {
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
    vueI18n: "./i18n.config.ts",
    compilation: {
      strictMessage: false,
    },
  },
});
