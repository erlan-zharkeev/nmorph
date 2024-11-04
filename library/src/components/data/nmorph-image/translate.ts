import { Locale, TranslateType } from '@/types';

export const translate: TranslateType = {
  [Locale.en]: {
    loadingText: 'Loading ...',
    loadFailedText: 'Image loading failed',
  },
  [Locale.ru]: {
    loadingText: 'Загрузка ...',
    loadFailedText: 'Не удалось загрузить изображение',
  },
  [Locale.zh]: {
    loadingText: '加载中...',
    loadFailedText: '图片加载失败',
  },
};
