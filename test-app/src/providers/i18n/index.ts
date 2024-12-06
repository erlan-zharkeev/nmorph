import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true,
  legacy: false,
  messages: {
    ru: {
      custom: "RU KUSTOM",
    },
    en: {
      custom: "ENG CUSTOM",
    },
  },
});
