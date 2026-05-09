import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit';
import type { INmorphOptions } from '../types/index.ts';

export type NmorphNuxtModuleOptions = INmorphOptions;

export default defineNuxtModule<NmorphNuxtModuleOptions>({
  meta: {
    name: '@nmorph/nmorph-ui-kit',
    configKey: 'nmorph',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {},
  setup(options) {
    addPluginTemplate({
      filename: 'nmorph.client.mjs',
      getContents: () => `
import { defineNuxtPlugin } from '#app'
import { NmorphLibrary, en, ru, zh } from '@nmorph/nmorph-ui-kit'

const options = ${JSON.stringify(options)}
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
