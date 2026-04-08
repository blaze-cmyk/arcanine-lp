import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/lib/i18n";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-lg transition-colors duration-200"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden lg:inline text-xs">{currentLang.name}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-[320px] max-h-[400px] overflow-y-auto rounded-xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/40 z-50 p-3"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="grid grid-cols-2 gap-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors duration-150 ${
                  i18n.language === lang.code
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
