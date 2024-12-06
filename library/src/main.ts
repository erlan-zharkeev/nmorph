import { App, Plugin } from 'vue';
import { useNmorphTranslation, useStyleClassMixins } from './hooks';
import { useNmorphBrowser, useNmorphTheme } from './outside-hooks/index.ts';
import { INmorphOptions } from './types/index.ts';

const library: Plugin = {
  install(Vue: App, options: INmorphOptions = {}): App {
    try {
      if (!options?.i18n?.outsideMessagesMerge) {
        const libTranslates = useNmorphTranslation(options.i18n);
        // @ts-expect-error ///
        const vueI18nInstance = Vue.__VUE_I18N__;
        if (vueI18nInstance) {
          if (libTranslates.global.messages.value) {
            Object.entries(libTranslates.global.messages.value).forEach(([locale, messages]) => {
              vueI18nInstance.global.mergeLocaleMessage(locale, messages);
            });
          }
          if (libTranslates.global.locale.value) {
            vueI18nInstance.global.locale.value = libTranslates.global.locale.value;
          }
        } else {
          Vue.use(libTranslates);
        }
      }
    } catch(e) {
      console.log('yay');
    }

    useStyleClassMixins()
    const theme = useNmorphTheme(options.theme);
    const browser = useNmorphBrowser();

    const nmorph = { theme, browser };
    Vue.provide('nmorph', nmorph);
    return Vue;
  },
};

export { default as ru } from './locales/ru.js';
export { default as zh } from './locales/zh.js';
export { nmorphLog } from './outside-utils';
export { useNmorphTheme, useNmorphBrowser, useNmorphNotification, useNmorph } from './outside-hooks';
export * from './types/index.ts';
export * from './components';

export const NmorphLibrary = library;
