import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import language_en from "./locales/en";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: language_en
  }
};

const language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const existingLanguage = resources.hasOwnProperty(languageWithoutRegionCode)
  ? languageWithoutRegionCode
  : "en";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: existingLanguage,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
