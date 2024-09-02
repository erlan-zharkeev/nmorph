// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
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
      ],
    },
  },
  devtools: { enabled: true },
  css: ["@nmorph/nmorph-ui-kit/dist/style.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/global-mixins.scss" as *;',
        },
      },
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 2222,
  },
  runtimeConfig: {
    public: {
      NUXT_ENV_GIT_PATH: process.env.NUXT_ENV_GIT_PATH,
    },
  },
  modules: ["@nuxtjs/i18n", "nuxt-svgo"],
  i18n: {
    lazy: false,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      { code: "en-US", iso: "en-US", name: "English", file: "en-US.json" },
      { code: "ru-RU", iso: "ru-RU", name: "Русский", file: "ru-RU.json" },
    ],
    defaultLocale: "en-US",
  },
});
