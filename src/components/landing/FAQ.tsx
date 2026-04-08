import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQ_KEYS = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
  { q: "faq.q6", a: "faq.a6" },
  { q: "faq.q7", a: "faq.a7" },
  { q: "faq.q8", a: "faq.a8" },
];

const FAQItem = ({ questionKey, answerKey }: { questionKey: string; answerKey: string }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-lg font-medium text-foreground pr-8">{t(questionKey)}</span>
        <span className="text-muted-foreground flex-shrink-0 transition-transform duration-200">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: open ? 200 : 0, opacity: open ? 1 : 0 }}>
        <p className="text-base text-muted-foreground leading-relaxed pb-6">{t(answerKey)}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <section id="frequently-asked-questions" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Top gradient separator — bright line with downward glow */}
      <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
        <div className="relative w-full max-w-3xl">
          {/* Bright thin line — fades at edges */}
          <div
            className="h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,106,0,0.4) 30%, rgba(255,106,0,0.4) 70%, transparent 100%)",
            }}
          />
          {/* Soft glow beneath — also fades at edges */}
          <div
            className="h-24"
            style={{
              background: "radial-gradient(ellipse 40% 100% at 50% 0%, rgba(255,106,0,0.06) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-medium tracking-wider uppercase text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-5">
            {t("faq.badge")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)' }}>
            {t("faq.heading")}
          </h2>
          <p className="text-base text-muted-foreground">
            {t("faq.contactPrompt")}{" "}
            <span className="text-primary hover:underline cursor-pointer">{t("faq.contactLink")}</span>
          </p>
        </div>
        <div>
          {FAQ_KEYS.map((faq, i) => (
            <FAQItem key={i} questionKey={faq.q} answerKey={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
