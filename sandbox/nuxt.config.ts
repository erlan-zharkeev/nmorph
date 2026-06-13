import { resolve } from "node:path";
import svgLoader from "vite-svg-loader";

const sandboxSrc = resolve(__dirname, "src");
const nmorphSrc = resolve(__dirname, "../library/src");
const nmorphAliases = {
  "@nmorph/nmorph-ui-kit/plugin": resolve(nmorphSrc, "plugin.ts"),
  "@nmorph/nmorph-ui-kit/icons": resolve(nmorphSrc, "icons.ts"),
  "@nmorph/nmorph-ui-kit/styles": resolve(nmorphSrc, "styles.ts"),
  "@nmorph/nmorph-ui-kit/emoji": resolve(
    nmorphSrc,
    "components/data/nmorph-emoji-picker/emoji/index.ts",
  ),
  "@nmorph/nmorph-ui-kit/emoji/en": resolve(
    nmorphSrc,
    "components/data/nmorph-emoji-picker/emoji/locales/en.ts",
  ),
  "@nmorph/nmorph-ui-kit/emoji/ru": resolve(
    nmorphSrc,
    "components/data/nmorph-emoji-picker/emoji/locales/ru.ts",
  ),
  "@nmorph/nmorph-ui-kit/emoji/zh": resolve(
    nmorphSrc,
    "components/data/nmorph-emoji-picker/emoji/locales/zh.ts",
  ),
  "@nmorph/nmorph-ui-kit": resolve(nmorphSrc, "main.ts"),
};
const nuxtCommand = process.argv
  .map((arg) => arg.replace(/\\/g, "/").split("/").pop())
  .find((arg) => arg === "build" || arg === "generate");
const buildDir = nuxtCommand ? ".nuxt-build" : ".nuxt";

export default defineNuxtConfig({
  compatibilityDate: "2024-09-05",
  buildDir,
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
    plugins: [svgLoader()],
    optimizeDeps: {
      exclude: ["@nmorph/nmorph-ui-kit"],
    },
    resolve: {
      alias: [
        { find: /^@\//, replacement: `${nmorphSrc}/` },
        { find: "@vue/devtools-api", replacement: "vue-devtools-stub" },
        ...Object.entries(nmorphAliases).map(([find, replacement]) => ({
          find,
          replacement,
        })),
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
