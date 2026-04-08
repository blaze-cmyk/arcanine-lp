

## Add Full i18n Support with 55+ Languages

### What We're Building
A complete internationalization system using `react-i18next` with all languages from the original list plus the additional ones identified, and a language selector in the navbar.

### Full Language List (55 languages)
English, Русский, Português, Español, Deutsch, Italiano, Polski, Indonesian, Français, Thai, Tiếng Việt, العربية, Malay, 中文, Türkçe, 日本語, 한국어, فارسی, Српски, Română, Hrvatski, हिन्दी, ελληνικά, বাংলা, Українська, Pilipinas, Kiswahili, Кыргызча, Қазақша, Nederlands, Yorùbá, Igbo, Hausa, Afrikaans, Тоҷикӣ, Azərbaycan, Ўзбекча, հայերեն, ქართული, اردو, Čeština, Magyar, Svenska, Norsk, Dansk, Suomi, Slovenčina, Български, Монгол, ລາວ, ខ្មែរ, မြန်မာ, සිංහල, አማርኛ, Malagasy

### Implementation Steps

**1. Install dependencies**
- `i18next`, `react-i18next`, `i18next-browser-languagedetector`

**2. Create i18n configuration (`src/lib/i18n.ts`)**
- Register all 55 language codes, set English as default/fallback
- Enable browser language detection and localStorage persistence

**3. Create English translation file (`src/locales/en.json`)**
- Extract every user-facing string from all landing components (Navbar, Hero, Stats, Features, HowItWorks, FAQ, FairnessLogic, DemoCTA, Footer, LiveWins, FinalCTA, WhatIsThis, WhyDifferent, RiskWarning, TrustStrip)

**4. Import i18n in `src/main.tsx`**

**5. Build `LanguageSelector` component**
- Globe icon button in the navbar
- Opens a dropdown/modal with a grid of all languages (flag optional, language name in native script)
- Calls `i18next.changeLanguage()` on selection
- Sets `dir="rtl"` on `<html>` for Arabic, Persian, and Urdu
- Matches existing dark theme styling

**6. Update all landing page components**
- Replace all hardcoded strings with `t('key')` via the `useTranslation` hook
- Affects ~15+ component files

### Technical Notes
- Only English will have complete translations initially; all others fall back to English
- RTL support for Arabic (ar), Persian (fa), and Urdu (ur)
- Translation JSON files for other languages can be added later via translation services
- Language preference persisted in localStorage

