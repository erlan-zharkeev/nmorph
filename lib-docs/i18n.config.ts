import { en, ru } from './locales';

export default defineI18nConfig(() => ({
  lazy: true,
  langDir: "./locales",
  strategy: "prefix_except_default",
  defaultLocale: "en",
  legacy: false,
  locale: 'en',
  messages: {
    en,
    ru
  }
}))
