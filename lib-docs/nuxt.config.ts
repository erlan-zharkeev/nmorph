// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["@nmorph/nmorph-ui-kit/dist/style.css"],
  runtimeConfig: {
    public: {
      NUXT_ENV_GIT_PATH: process.env.NUXT_ENV_GIT_PATH,
    },
  },
  modules: ["@nuxtjs/i18n"],
  i18n: {
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      { code: "en-US", iso: "en-US", name: "English", file: "en-US.json" },
      { code: "ru-RU", iso: "ru-RU", name: "Русский", file: "ru-RU.json" },
    ],
    defaultLocale: "en-US",
  },
});
