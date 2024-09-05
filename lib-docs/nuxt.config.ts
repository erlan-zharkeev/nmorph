
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
  i18n: { vueI18n: './i18n.config.ts' }
});
