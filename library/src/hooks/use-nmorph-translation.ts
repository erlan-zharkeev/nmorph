import { INmorphApplyTranslation, Locale } from '@/types';
import { createI18n } from 'vue-i18n';
import { en } from '@/locales';

export const useNmorphTranslation = (data: INmorphApplyTranslation) => {
  const messages = data && data.messages ? { ...data.messages, en } : { en };
  const locale = data && data.locale ? data.locale : Locale.en;
  return createI18n({
    locale,
    fallbackLocale: Locale.en,
    messages,
  });
};
