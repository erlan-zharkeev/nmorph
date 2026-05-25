import { App, Plugin } from 'vue';
import { useCommonStyles } from './hooks/use-common-styles';
import { useNmorphTranslation } from './hooks/use-nmorph-translation';
import { useNmorphBrowser } from './outside-hooks/use-nmorph-browser';
import { useNmorphTheme } from './outside-hooks/use-nmorph-theme';
import { useNmorphZIndex } from './outside-hooks/use-nmorph-z-index';
import { INmorphOptions } from './types/index.ts';

type VueI18nApp = App & {
  __VUE_I18N__?: {
    global: {
      messages?: { value?: Record<string, unknown> };
      locale?: { value?: unknown };
      mergeLocaleMessage?: (locale: string, messages: unknown) => void;
    };
  };
};

const library: Plugin = {
  install(Vue: App, options: INmorphOptions = {}): App {
    if (!options?.i18n?.outsideMessagesMerge) {
      const libTranslates = useNmorphTranslation(options.i18n);
      const vueI18nInstance = (Vue as VueI18nApp).__VUE_I18N__;
      const vueI18nGlobal = vueI18nInstance?.global;
      const hasI18nInstall = Boolean(Vue.component('i18n-t') || Vue.component('I18nT') || Vue.directive('t'));

      if (vueI18nGlobal?.mergeLocaleMessage) {
        if (libTranslates.global.messages.value) {
          Object.entries(libTranslates.global.messages.value).forEach(([locale, messages]) => {
            vueI18nGlobal.mergeLocaleMessage?.(locale, messages);
          });
        }
        if (vueI18nGlobal.locale && libTranslates.global.locale.value) {
          vueI18nGlobal.locale.value = libTranslates.global.locale.value;
        }
      } else if (!hasI18nInstall) {
        Vue.use(libTranslates);
      }
    }

    useCommonStyles();
    const theme = useNmorphTheme(options.theme);
    const browser = useNmorphBrowser();
    const zIndex = useNmorphZIndex(options.zIndex);

    const nmorph = { theme, browser, zIndex };
    Vue.provide('nmorph', nmorph);
    return Vue;
  },
};

export { default as ru } from './locales/ru.js';
export { default as zh } from './locales/zh.js';
export { default as en } from './locales/en.js';

export { nmorphLog } from './outside-utils';
export { useNmorphBrowser } from './outside-hooks/use-nmorph-browser';
export { useNmorph } from './outside-hooks/use-nmorph';
export { useNmorphNotification } from './outside-hooks/use-nmorph-notification';
export { useNmorphTheme } from './outside-hooks/use-nmorph-theme';
export { getNmorphThemeStyles } from './outside-hooks/use-nmorph-theme';
export { getCommonStyles } from './hooks/use-common-styles';
export * from './types/index.ts';

export const NmorphLibrary = library;
