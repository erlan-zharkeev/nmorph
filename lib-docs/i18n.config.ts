import en from "./locales/en.js";
import ru from "./locales/ru.js";
import zh from "./locales/zh.js";

export default defineI18nConfig(() => ({
  messages: {
    en,
    ru,
    zh,
  },
}));
