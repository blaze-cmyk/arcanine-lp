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
  <section className="py-24 px-4 sm:px-6">
    <div className="max-w-3xl mx-auto">
      {/* Header — centered */}
      <div className="text-center mb-14">
        <span className="inline-block text-xs font-medium tracking-wider uppercase text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-5">
          FAQ
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)' }}>
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
