import { Coins, ArrowUpDown, Timer } from "lucide-react";

const steps = [
  {
    icon: Coins,
    number: "01",
    title: "Choose your amount",
    description: "Start small or go big — you're in control.",
  },
  {
    icon: ArrowUpDown,
    number: "02",
    title: "Pick a direction",
    description: "Will the price go UP or DOWN?",
  },
  {
    icon: Timer,
    number: "03",
    title: "Get results instantly",
    description: "Know the outcome in seconds.",
  },
];

const HowItWorks = () => (
  <section className="py-24 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          Trading, <span className="text-gradient">simplified</span>
        </h2>
        <p className="text-muted-foreground">Three steps. That's it.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, number, title, description }, i) => (
          <div
            key={number}
            className="relative glass rounded-2xl p-8 group hover:border-primary/30 transition-all duration-300"
          >
            <span className="font-mono-num text-6xl font-black text-muted/80 absolute top-4 right-6 select-none">
              {number}
            </span>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
            {i < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
