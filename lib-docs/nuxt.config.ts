export default defineNuxtConfig({
  compatibilityDate: "2024-09-05",
  ssr: true,
  app: {
    head: {
      title: "Nmorph",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#2d89ef" },
        { name: "theme-color", content: "#ffffff" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "description", content: "Описание вашего сайта для поисковых систем." },
        { name: "author", content: "ketjo" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: "Nmorph" },
        { property: "og:description", content: "Описание для социальных сетей" },
        { property: "og:image", content: "/og-image.png" },
        { property: "og:url", content: "https://ваш-сайт.com" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Nmorph" },
        { name: "twitter:description", content: "Описание для Twitter" },
        { name: "twitter:image", content: "/twitter-image.png" },
      ],
    },
  },
  devtools: { enabled: false },
  css: [],
  vite: {
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/global-mixins.scss" as *;',
        },
      },
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 43117,
  },
  runtimeConfig: {
    public: {
      NUXT_ENV_GIT_PATH: process.env.NUXT_ENV_GIT_PATH,
    },
  },
  nitro: {
    preset: "static",
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  modules: ["@nuxtjs/i18n", "nuxt-svgo"],
  i18n: {
    lazy: true,
    langDir: "./locales",
    strategy: "prefix_except_default",
    locales: [
      { code: "en", name: "English", file: "en.js" },
      { code: "ru", name: "Русский", file: "ru.js" },
      { code: "zh", name: "中国语文科", file: "zh.js" },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    vueI18n: "./i18n.config.ts",
    compilation: {
      strictMessage: false,
    },
  },
});
