import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit';
import type { NuxtModule } from '@nuxt/schema';
import type { INmorphOptions } from '../types/index.ts';

export type NmorphNuxtModuleOptions = INmorphOptions & {
  styles?: 'all' | false;
};

const nmorphNuxtModule: NuxtModule<NmorphNuxtModuleOptions> = defineNuxtModule<NmorphNuxtModuleOptions>({
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
      nuxt.options.css.push('@nmorph/nmorph-ui-kit/styles.css');
    }

    addPluginTemplate({
      filename: 'nmorph.mjs',
      getContents: () => `
import { defineNuxtPlugin } from '#app'
import { useHead } from '#imports'
import { NmorphLibrary, en, ru, zh, getCommonStyles, getNmorphThemeStyles } from '@nmorph/nmorph-ui-kit/plugin'

	const options = ${JSON.stringify(pluginOptions)}
	const libraryMessages = { en, ru, zh }
	const themeKey = 'nmorph-data-theme'
	const defaultTheme = options.theme?.defaultTheme || 'dark'
	const saveCurrentThemeToLS = options.theme?.saveCurrentThemeToLS !== false
	const themeNames = Array.from(new Set(['light', 'dark', defaultTheme, ...Object.keys(options.theme?.themes || {})]))
	const themeInitScript = \`
		(function () {
		  try {
		    var themeKey = 'nmorph-data-theme'
		    var defaultTheme = \${JSON.stringify(defaultTheme)}
		    var themeNames = \${JSON.stringify(themeNames)}
		    var storedTheme = \${saveCurrentThemeToLS ? "localStorage.getItem(themeKey)" : "null"}
		    var theme = themeNames.indexOf(storedTheme) !== -1 ? storedTheme : defaultTheme
		    document.documentElement.setAttribute(themeKey, theme)
		  } catch (error) {
		    document.documentElement.setAttribute('nmorph-data-theme', '\${defaultTheme}')
		  }
		})()
	\`

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
	        [themeKey]: defaultTheme,
	      },
	      script: [
	        {
	          key: 'nmorph-theme-init',
	          innerHTML: themeInitScript,
	          tagPosition: 'head',
	          tagPriority: 'critical',
	        },
	      ],
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

export default nmorphNuxtModule;
