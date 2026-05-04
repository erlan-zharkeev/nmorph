export const LOCALE_STORAGE_KEY = 'nmorph-sandbox-locale'

export const getStoredLocale = () => {
  if (typeof window === 'undefined') return 'en'

  const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY)

  if (storedLocale === 'ru' || storedLocale === 'zh') {
    return storedLocale
  }

  return 'en'
}

export const saveLocale = (locale: string) => {
  if (typeof window === 'undefined') return

  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.lang = locale
}
