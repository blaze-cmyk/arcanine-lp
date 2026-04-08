import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import es from "@/locales/es.json";
import ru from "@/locales/ru.json";
import ar from "@/locales/ar.json";
import hi from "@/locales/hi.json";

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "pt", name: "Português" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pl", name: "Polski" },
  { code: "id", name: "Indonesian" },
  { code: "fr", name: "Français" },
  { code: "th", name: "ไทย" },
  { code: "vi", name: "Tiếng Việt" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "ms", name: "Malay" },
  { code: "zh", name: "中文" },
  { code: "tr", name: "Türkçe" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "fa", name: "فارسی", dir: "rtl" },
  { code: "sr", name: "Српски" },
  { code: "ro", name: "Română" },
  { code: "hr", name: "Hrvatski" },
  { code: "hi", name: "हिन्दी" },
  { code: "el", name: "ελληνικά" },
  { code: "bn", name: "বাংলা" },
  { code: "uk", name: "Українська" },
  { code: "fil", name: "Pilipinas" },
  { code: "sw", name: "Kiswahili" },
  { code: "ky", name: "Кыргызча" },
  { code: "kk", name: "Қазақша" },
  { code: "nl", name: "Nederlands" },
  { code: "yo", name: "Yorùbá" },
  { code: "ig", name: "Igbo" },
  { code: "ha", name: "Hausa" },
  { code: "af", name: "Afrikaans" },
  { code: "tg", name: "Тоҷикӣ" },
  { code: "az", name: "Azərbaycan" },
  { code: "uz", name: "Ўзбекча" },
  { code: "hy", name: "հայերեն" },
  { code: "ka", name: "ქართული" },
  { code: "ur", name: "اردو", dir: "rtl" },
  { code: "cs", name: "Čeština" },
  { code: "hu", name: "Magyar" },
  { code: "sv", name: "Svenska" },
  { code: "no", name: "Norsk" },
  { code: "da", name: "Dansk" },
  { code: "fi", name: "Suomi" },
  { code: "sk", name: "Slovenčina" },
  { code: "bg", name: "Български" },
  { code: "mn", name: "Монгол" },
  { code: "lo", name: "ລາວ" },
  { code: "km", name: "ខ្មែរ" },
  { code: "my", name: "မြန်မာ" },
  { code: "si", name: "සිංහල" },
  { code: "am", name: "አማርኛ" },
  { code: "mg", name: "Malagasy" },
] as const;

export const RTL_LANGUAGES = LANGUAGES.filter((l) => "dir" in l && l.dir === "rtl").map((l) => l.code);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
      ru: { translation: ru },
      ar: { translation: ar },
      hi: { translation: hi },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// Set document direction on language change
i18n.on("languageChanged", (lng) => {
  const dir = RTL_LANGUAGES.includes(lng as any) ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;
