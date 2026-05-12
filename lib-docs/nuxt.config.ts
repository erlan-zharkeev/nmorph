import { createRequire } from "node:module";
import { dirname } from "node:path";
import { guidePages } from "./data/guide";

const require = createRequire(import.meta.url);
const piniaPackagePath = require.resolve("pinia/package.json");
const vueDevtoolsApiEsm = require.resolve("@vue/devtools-api/lib/esm/index.js", {
  paths: [dirname(piniaPackagePath)],
});

const guideRoutes = guidePages.flatMap((page) => [
  `/guide/${page.slug}`,
  `/ru/guide/${page.slug}`,
  `/zh/guide/${page.slug}`,
]);
const guideIndexRoutes = ["/guide", "/ru/guide", "/zh/guide"];
const siteTitle = "Nmorph UI Kit";
const siteDescription =
  "Vue 3 and Nuxt component library for building tactile product interfaces with neumorphic styling, forms, tables, overlays, theming, and typed component APIs.";
const siteUrl = "https://ketjo.gitlab.io/nmorph/";

export default defineNuxtConfig({
  compatibilityDate: "2024-09-05",
  debug: false,
  ssr: true,
  telemetry: false,
  app: {
    head: {
      title: siteTitle,
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
        { rel: "canonical", href: siteUrl },
      ],
      meta: [
        { name: "msapplication-TileColor", content: "#2d89ef" },
        { name: "theme-color", content: "#ffffff" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        { name: "description", content: siteDescription },
        { name: "author", content: "play_def" },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: siteTitle },
        { property: "og:description", content: siteDescription },
        { property: "og:image", content: "/og-image.png" },
        { property: "og:url", content: siteUrl },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: siteTitle },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: siteTitle },
        { name: "twitter:description", content: siteDescription },
        { name: "twitter:image", content: "/twitter-image.png" },
      ],
    },
  },
  devtools: { enabled: false },
  css: [],
  vite: {
    optimizeDeps: {
      exclude: ["@nmorph/nmorph-ui-kit"],
    },
    resolve: {
      alias: [
        {
          find: /^@vue\/devtools-api$/,
          replacement: vueDevtoolsApiEsm,
        },
      ],
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
          api: "modern",
          additionalData: '@use "~/assets/style/global-mixins.scss" as *;',
        },
      },
    }
  },
  devServer: {
    host: "127.0.0.1",
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
      routes: ["/", ...guideIndexRoutes, ...guideRoutes],
    },
  },
  modules: ["@nuxtjs/i18n", "nuxt-svgo", "@nmorph/nmorph-ui-kit/nuxt"],
  nmorph: {
    styles: "all",
  },
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
