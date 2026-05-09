import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit';
import type { INmorphOptions } from '../types/index.ts';

export type NmorphNuxtModuleOptions = INmorphOptions & {
  styles?: 'all' | false;
};

export default defineNuxtModule<NmorphNuxtModuleOptions>({
  meta: {
    name: '@nmorph/nmorph-ui-kit',
    configKey: 'nmorph',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    styles: false,
  },
  setup(options, nuxt) {
    const { styles, ...pluginOptions } = options;
    nuxt.options.build.transpile.push('@nmorph/nmorph-ui-kit');

    if (styles === 'all') {
      nuxt.options.css.push('@nmorph/nmorph-ui-kit/dist/style.css');
    }

    addPluginTemplate({
      filename: 'nmorph.mjs',
      getContents: () => `
import { defineNuxtPlugin } from '#app'
import { useHead } from '#imports'
import { NmorphLibrary, en, ru, zh, getCommonStyles, getNmorphThemeStyles } from '@nmorph/nmorph-ui-kit/plugin'

const options = ${JSON.stringify(pluginOptions)}
const libraryMessages = { en, ru, zh }

const mergeMessages = (base, overrides = {}) => {
  const result = { ...base }
  Object.entries(overrides).forEach(([locale, messages]) => {
    result[locale] = { ...(result[locale] || {}), ...messages }
  })
  return result
}

export default defineNuxtPlugin((nuxtApp) => {
  const pluginOptions = { ...options }
  const i18nOptions = { ...(pluginOptions.i18n || {}) }
  const messages = mergeMessages(libraryMessages, i18nOptions.messages)
  const i18n = nuxtApp.$i18n

  if (import.meta.server) {
    useHead({
      htmlAttrs: {
        'nmorph-data-theme': pluginOptions.theme?.defaultTheme || 'dark',
      },
      style: [
        { id: 'nmorph-theme-styles', children: getNmorphThemeStyles(pluginOptions.theme) },
        { id: 'nmorph-common-styles', children: getCommonStyles() },
      ],
    })
  }

  i18nOptions.messages = messages

  if (i18n?.mergeLocaleMessage) {
    Object.entries(messages).forEach(([locale, localeMessages]) => {
      i18n.mergeLocaleMessage(locale, localeMessages)
    })
    i18nOptions.outsideMessagesMerge = true
  }

  pluginOptions.i18n = i18nOptions
  nuxtApp.vueApp.use(NmorphLibrary, pluginOptions)
})
`,
    });
  },
});
