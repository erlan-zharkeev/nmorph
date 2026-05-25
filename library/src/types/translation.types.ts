import type { I18n } from 'vue-i18n';

export enum Locale {
  en = 'en',
  ru = 'ru',
  zh = 'zh',
}

export type TranslateType = Partial<Record<keyof typeof Locale, TranslateMessages>> & { en: TranslateMessages };

export interface TranslateMessages {
  [key: string]: TranslateMessages | string;
}

export interface LibraryOptions {
  i18n?: I18n;
}

export interface INmorphApplyTranslation {
  outsideMessagesMerge?: boolean;
  messages?: TranslateType;
  locale?: keyof typeof Locale;
}
