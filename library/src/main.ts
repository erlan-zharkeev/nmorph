import { App, Component, Plugin } from 'vue';
import * as components from './components';
import { useNmorphTranslation } from './hooks';
import { useNmorphBrowser, useNmorphTheme } from './providers';
import { INmorphOptions } from './types/index.ts';

const library: Plugin = {
  install(Vue: App, options: INmorphOptions = {}): App {
    const libTranslates = useNmorphTranslation(options.i18n);
    // @ts-expect-error ///
    const vueI18nInstance = Vue.__VUE_I18N__;
    console.log(libTranslates.global.messages, 'сообщения либы');
    console.log(Vue, 'vue инстанс');
    console.log(vueI18nInstance.global.messages.value, 'сообщение app i18n');
    console.log(vueI18nInstance.global, 'global data app i18n');
    // Object.entries(vueI18nInstance.global.messages)
    // const appMessages = vueI18nInstance.global.messages
    // Object.entries(vueI18nInstance.global.messages)
    if (vueI18nInstance) {
      if (libTranslates.global.messages) {
        Object.entries(libTranslates.global.messages).forEach(([locale, messages]) => {
          console.log(locale, messages, 'locale');
          // vueI18nInstance.global.mergeLocaleMessage(locale, messages);
        });
      }
      if (libTranslates.global.locale) {
        vueI18nInstance.global.locale.value = libTranslates.global.locale;
      }
    } else {
      Vue.use(libTranslates);
    }

    const theme = useNmorphTheme(options.theme);
    const browser = useNmorphBrowser();

    const nmorph = { theme, browser };
    Vue.provide('nmorph', nmorph);

    Object.entries(components).forEach(([name, component]) => {
      if (isVueComponent(component)) {
        if (options.components === undefined) {
          Vue.component(name, component);
        } else {
          const componentExist = options.components.includes(name);
          if (!componentExist) return;
          Vue.component(name, component);
        }
      }
    });
    return Vue;
  },
};

function isVueComponent(component: unknown): component is Component {
  return (
    component &&
    (typeof component === 'object' || typeof component === 'function') &&
    ('render' in component || 'template' in component || 'setup' in component)
  );
}

export * from './types/index.ts';
export * from './components';
export * from './utils';
export * from './hooks';
export * from './locales';
export * from './providers';

export default library;
