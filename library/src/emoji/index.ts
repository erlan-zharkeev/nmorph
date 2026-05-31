import type { NmorphEmojiLanguage, NmorphEmojiLocale } from './base';

export type { NmorphEmojiLanguage, NmorphEmojiLocale, NmorphEmojiLocaleConfig, NmorphEmojiLocaleGroup } from './base';
export { createNmorphEmojiLocale, nmorphEmojiQuickList } from './base';

type NmorphEmojiLocaleModule = {
  default: NmorphEmojiLocale;
};

export const nmorphEmojiLanguageOptions: Array<{ value: NmorphEmojiLanguage; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'ru', label: 'RU' },
  { value: 'zh', label: 'ZH' },
];

const emojiLocaleLoaders: Record<NmorphEmojiLanguage, () => Promise<NmorphEmojiLocaleModule>> = {
  en: () => import('./locales/en'),
  ru: () => import('./locales/ru'),
  zh: () => import('./locales/zh'),
};

export const loadNmorphEmojiLocale = async (language: NmorphEmojiLanguage) => {
  const localeModule = await emojiLocaleLoaders[language]();

  return localeModule.default;
};
