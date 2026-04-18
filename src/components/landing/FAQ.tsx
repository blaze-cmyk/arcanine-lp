import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQS = [
  {
    q: "How do I learn how to trade?",
    a: "Sign up and start practicing on a free demo account. It is just like real trading, except virtual funds are used.",
  },
  {
    q: "How long does it take to withdraw funds?",
    a: "Generally, a withdrawal procedure may take from 1 to 5 days, starting from the date you place a request. The actual time will depend on the current volume of withdrawals that are being processed at the same time. We do our best to withdraw your funds as soon as it is possible.",
  },
  {
    q: "What is trading platform and what it is for?",
    a: "A trading platform is a software solution that allows you to perform trading operations using various financial instruments. You will also have access to the essential data such as asset quotes, real-time market positions, revenue percentage etc.",
  },
  {
    q: "Can I trade using a phone / mobile device?",
    a: "Yes, the platform is optimized to run on almost any modern computer or mobile device. You can use either the browser version, or the Android app.",
  },
  {
    q: "What is the minimum deposit amount?",
    a: "The main advantage is that you don't have to invest large amounts to trade on the platform. You can simply start with a deposit of 10 US dollars.",
  },
  {
    q: "Are there any deposit or withdrawal fees?",
    a: "No, the broker does not charge any deposit/withdrawal fees.\n\nHowever, you should be aware that such fees may be imposed by the third-party payment providers that you may be using. They may also apply their own currency conversion rate.",
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/50">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left group">
        <span className="text-lg font-medium text-foreground pr-8">{q}</span>
        <span className="text-muted-foreground flex-shrink-0 transition-transform duration-200">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: open ? 600 : 0, opacity: open ? 1 : 0 }}>
        <p className="text-base text-muted-foreground leading-relaxed pb-6 whitespace-pre-line">{a}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <section id="frequently-asked-questions" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)' }}>
            Frequently asked questions
          </h2>
          <p className="text-base text-muted-foreground">
            See the the most common questions of new traders answered here.
          </p>
        </div>
        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
