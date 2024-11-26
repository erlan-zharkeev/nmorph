import fs from "fs";
import path from "path";

export default defineNuxtConfig({
  compatibilityDate: "2024-09-05",
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
  devtools: { enabled: false },
  css: ["@nmorph/nmorph-ui-kit/dist/style.css"],
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/global-mixins.scss" as *;',
        },
      },
    },
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, "certs/key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "certs/cert.pem")),
      },
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 2222,
  },
  runtimeConfig: {
    public: {
      NUXT_ENV_GIT_PATH: process.env.NUXT_ENV_GIT_PATH,
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
