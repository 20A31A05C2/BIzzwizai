import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import arTranslation from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: 'en', // Changed to English for broader accessibility
    debug: process.env.NODE_ENV === 'development', // Enable debug only in development
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'], // Added navigator for better language detection
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;