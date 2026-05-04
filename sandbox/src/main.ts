import { createApp, type Plugin } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import router from './router'
import { NmorphLibrary, en, ru, zh } from '@nmorph/nmorph-ui-kit'
import { getStoredLocale, saveLocale } from './locale'

const initialLocale = getStoredLocale()

const i18n = createI18n({
  locale: initialLocale,
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  messages: { en: {}, ru: {}, zh: {} },
})

const nmorphOptions = { i18n: { messages: { en, ru, zh }, locale: initialLocale } }

saveLocale(initialLocale)

const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(NmorphLibrary as unknown as Plugin, nmorphOptions)
app.mount('#app')
