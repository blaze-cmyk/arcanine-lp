import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const FAQ = () => (
  <section className="py-24 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-20">
      {/* Left column */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-display leading-tight">
          Frequently <span className="italic font-normal text-muted-foreground">asked</span>
          <br />
          questions
        </h2>
        <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
          <span className="text-primary hover:underline cursor-pointer">Contact us</span> via
          support if you have any more questions.
        </p>
      </div>

      {/* Right column — Accordion FAQ */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
