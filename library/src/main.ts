import { App, Component, Plugin } from 'vue';
import * as components from './components';
import { useNmorphTheme, useNmorphTranslation } from './hooks';
import { INmorphOptions } from './types/index.ts';

const library: Plugin = {
  install(Vue: App, options: INmorphOptions = {}): App {
    const i18n = useNmorphTranslation(options.i18n);
    // @ts-expect-error ///
    const vueI18nInstance = Vue.__VUE_I18N__;
    if (vueI18nInstance) {
      if (i18n.global.messages) {
        Object.entries(i18n.global.messages).forEach(([locale, translates]) => {
          vueI18nInstance.global.messages.value[locale] = {
            ...vueI18nInstance.global.messages.value[locale],
            ...translates,
          };
        });
      }
      if (i18n.global.locale) {
        vueI18nInstance.global.locale.value = i18n.global.locale;
      }
    } else {
      Vue.use(i18n);
    }

    const nmorph = useNmorphTheme(options.theme) as Plugin<[]>;
    Vue.use(nmorph);

    Object.entries(components).forEach(([name, component]) => {
      if (isVueComponent(component)) {
        Vue.component(name, component);
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

export default library;
