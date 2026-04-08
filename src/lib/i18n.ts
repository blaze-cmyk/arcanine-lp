import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all locale files
import en from "@/locales/en.json";
import pt from "@/locales/pt.json";
import es from "@/locales/es.json";
import ru from "@/locales/ru.json";
import ar from "@/locales/ar.json";
import hi from "@/locales/hi.json";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";
import it from "@/locales/it.json";
import tr from "@/locales/tr.json";
import zh from "@/locales/zh.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import th from "@/locales/th.json";
import vi from "@/locales/vi.json";
import pl from "@/locales/pl.json";
import id from "@/locales/id.json";
import ms from "@/locales/ms.json";
import fa from "@/locales/fa.json";
import sr from "@/locales/sr.json";
import ro from "@/locales/ro.json";
import hr from "@/locales/hr.json";
import el from "@/locales/el.json";
import bn from "@/locales/bn.json";
import uk from "@/locales/uk.json";
import fil from "@/locales/fil.json";
import sw from "@/locales/sw.json";
import ky from "@/locales/ky.json";
import kk from "@/locales/kk.json";
import nl from "@/locales/nl.json";
import yo from "@/locales/yo.json";
import ig from "@/locales/ig.json";
import ha from "@/locales/ha.json";
import af from "@/locales/af.json";
import tg from "@/locales/tg.json";
import az from "@/locales/az.json";
import uz from "@/locales/uz.json";
import hy from "@/locales/hy.json";
import ka from "@/locales/ka.json";
import ur from "@/locales/ur.json";
import cs from "@/locales/cs.json";
import hu from "@/locales/hu.json";
import sv from "@/locales/sv.json";
import no from "@/locales/no.json";
import da from "@/locales/da.json";
import fi from "@/locales/fi.json";
import sk from "@/locales/sk.json";
import bg from "@/locales/bg.json";
import mn from "@/locales/mn.json";
import lo from "@/locales/lo.json";
import km from "@/locales/km.json";
import my from "@/locales/my.json";
import si from "@/locales/si.json";
import am from "@/locales/am.json";
import mg from "@/locales/mg.json";

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
  { code: "ar", name: "العربية", dir: "rtl" as const },
  { code: "ms", name: "Malay" },
  { code: "zh", name: "中文" },
  { code: "tr", name: "Türkçe" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "fa", name: "فارسی", dir: "rtl" as const },
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
  { code: "ur", name: "اردو", dir: "rtl" as const },
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
];

export const RTL_LANGUAGES = ["ar", "fa", "ur"];

const resources: Record<string, { translation: Record<string, unknown> }> = {
  en: { translation: en }, pt: { translation: pt }, es: { translation: es },
  ru: { translation: ru }, ar: { translation: ar }, hi: { translation: hi },
  de: { translation: de }, fr: { translation: fr }, it: { translation: it },
  tr: { translation: tr }, zh: { translation: zh }, ja: { translation: ja },
  ko: { translation: ko }, th: { translation: th }, vi: { translation: vi },
  pl: { translation: pl }, id: { translation: id }, ms: { translation: ms },
  fa: { translation: fa }, sr: { translation: sr }, ro: { translation: ro },
  hr: { translation: hr }, el: { translation: el }, bn: { translation: bn },
  uk: { translation: uk }, fil: { translation: fil }, sw: { translation: sw },
  ky: { translation: ky }, kk: { translation: kk }, nl: { translation: nl },
  yo: { translation: yo }, ig: { translation: ig }, ha: { translation: ha },
  af: { translation: af }, tg: { translation: tg }, az: { translation: az },
  uz: { translation: uz }, hy: { translation: hy }, ka: { translation: ka },
  ur: { translation: ur }, cs: { translation: cs }, hu: { translation: hu },
  sv: { translation: sv }, no: { translation: no }, da: { translation: da },
  fi: { translation: fi }, sk: { translation: sk }, bg: { translation: bg },
  mn: { translation: mn }, lo: { translation: lo }, km: { translation: km },
  my: { translation: my }, si: { translation: si }, am: { translation: am },
  mg: { translation: mg },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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
  const dir = RTL_LANGUAGES.includes(lng) ? "rtl" : "ltr";
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;
