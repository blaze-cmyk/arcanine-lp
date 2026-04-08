import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is binary options trading?",
    answer:
      "Binary options trading is a financial instrument that allows you to predict whether the price of an asset will go up or down within a specific time frame. If your prediction is correct, you earn a fixed return on your investment.",
  },
  {
    question: "How do I get started?",
    answer:
      "Sign up for a free account, complete a quick verification process, and deposit funds to start trading. We also offer a demo account with virtual funds so you can practice risk-free before trading with real money.",
  },
  {
    question: "What assets can I trade?",
    answer:
      "You can trade a wide range of assets including forex currency pairs, cryptocurrencies, stocks, commodities, and indices — all from a single platform with real-time market data.",
  },
  {
    question: "How fast are withdrawals processed?",
    answer:
      "Withdrawal requests are typically processed within 1–2 business days. Depending on your payment method, funds may take an additional 1–3 days to appear in your account.",
  },
  {
    question: "Is my money safe on the platform?",
    answer:
      "We use bank-grade encryption and segregated client accounts to ensure your funds are always protected. Our platform is fully regulated and undergoes regular third-party security audits.",
  },
  {
    question: "What is the minimum deposit amount?",
    answer:
      "The minimum deposit varies by payment method but starts as low as $10. This makes it accessible for beginners who want to start small and gradually increase their trading activity.",
  },
  {
    question: "Can I practice without risking real money?",
    answer:
      "Yes! We offer a fully-featured demo account preloaded with $10,000 in virtual funds. You can practice trading strategies, explore the platform, and build confidence before switching to a real account.",
  },
  {
    question: "What trading timeframes are available?",
    answer:
      "We support a variety of expiry times ranging from 60 seconds to several hours. This flexibility lets you choose timeframes that match your trading style, whether you prefer quick scalps or longer positions.",
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="text-lg font-medium text-foreground pr-8">{question}</span>
        <span className="text-muted-foreground flex-shrink-0 transition-transform duration-200">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? 200 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-base text-muted-foreground leading-relaxed pb-6">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => (
  <section className="section-light relative py-32 sm:py-40 px-4 sm:px-6 overflow-hidden">
    {/* Subtle center glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,106,0,0.04) 0%, transparent 70%)" }} />
    <div className="max-w-4xl mx-auto">
      {/* Header — centered */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-medium tracking-wider uppercase text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-5">
          FAQ
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, hsl(var(--foreground)) 22.5%, hsl(var(--foreground) / 0.7) 100%)' }}>
          Frequently asked questions
        </h2>
        <p className="text-base text-muted-foreground">
          Haven't found what you're looking for?{" "}
          <span className="text-primary hover:underline cursor-pointer">Contact us.</span>
        </p>
      </div>

      {/* Accordion list */}
      <div>
        {faqs.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
