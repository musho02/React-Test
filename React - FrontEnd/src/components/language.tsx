import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Layout & Style",
      move: "Move shape",
      switch: "Move position",
      language: "Language"
    }
  },
  th: {
    translation: {
      welcome: "การจัดการหน้าเว็บ",
      move: "เลื่อนรูปแบบ",
      switch: "เปลี่ยนตำแหน่ง",
      language: "ภาษา"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'th',  // กำหนดภาษาเริ่มต้นเป็นไทย
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
