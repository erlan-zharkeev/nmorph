import { createApp, type Plugin } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import { NmorphLibrary, ru, zh } from '@nmorph/nmorph-ui-kit'

const i18nApp = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  messages: {
    en: {
      title: 'Nmorph Sandbox',
      description: 'Library is connected using i18n config from docs.',
      languageTitle: 'Language',
      langEn: 'English',
      langRu: 'Russian',
      currentLanguage: 'Current locale'
    },
    ru: {
      title: 'Nmorph Sandbox',
      description: 'Библиотека подключена с i18n-конфигом из документации.',
      languageTitle: 'Язык',
      langEn: 'Английский',
      langRu: 'Русский',
      currentLanguage: 'Текущая локаль'
    }
  }
})

const nmorphOptions = { i18n: { messages: { ru, zh }, locale: 'en' } }
const app = createApp(App)
app.use(i18nApp)
app.use(NmorphLibrary as unknown as Plugin, nmorphOptions)
app.mount('#app')
