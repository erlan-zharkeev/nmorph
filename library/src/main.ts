import { App, Component, Plugin } from 'vue';
import * as components from './components';
import { useNmorphTranslation } from './hooks';
import { useNmorphBrowser, useNmorphTheme } from './providers';
import { INmorphOptions } from './types/index.ts';

const library: Plugin = {
  install(Vue: App, options: INmorphOptions = {}): App {
    const i18n = useNmorphTranslation(options.i18n);
    // @ts-expect-error ///
    const vueI18nInstance = Vue.__VUE_I18N__;
    console.log(vueI18nInstance, 'vue i18n instance', Vue);
    if (vueI18nInstance) {
      if (i18n.global.messages) {
        console.log(i18n.global.messages, 'messages');
        Object.entries(i18n.global.messages).forEach(([locale, translates]) => {
          vueI18nInstance.global.messages.value[locale] = {
            ...vueI18nInstance.global.messages.value[locale],
            ...translates,
          };
        });
      }
      if (i18n.global.locale) {
        console.log(i18n.global.locale, 'locale');
        vueI18nInstance.global.locale.value = i18n.global.locale;
      }
    } else {
      Vue.use(i18n);
      console.log('use i18n', i18n);
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
