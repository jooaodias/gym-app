import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enTranslations from '@/locales/en.json'
import ptTranslations from '@/locales/pt.json'

const resources = {
  en: {
    translation: enTranslations
  },
  pt: {
    translation: ptTranslations
  }
}

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // init i18next
  .init({
    resources,
    
    // fallback language
    fallbackLng: 'en',
    
    // debug mode in development
    debug: import.meta.env.DEV,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n