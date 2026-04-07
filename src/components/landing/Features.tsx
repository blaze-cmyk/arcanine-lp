import { Zap, Eye, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Trade in seconds",
    description: "Results resolve quickly, without waiting or complexity.",
  },
  {
    icon: Eye,
    title: "Crystal-clear payouts",
    description: "Know exactly what you stand to earn before you commit. No hidden fees, no surprises.",
  },
  {
    icon: Shield,
    title: "Clear decisions",
    description: "A straightforward up-or-down system, without unnecessary tools.",
  },
  {
    icon: BarChart3,
    title: "Global markets",
    description: "Trade across assets, anytime, from anywhere.",
  },
];

const Features = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Designed for speed and clarity
        </h2>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Arcanine provides a trading experience with fast execution, transparent payouts, and effortless decision-making.
        </p>
      </div>

      {/* 2x2 Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="glass rounded-2xl border border-border/40 overflow-hidden group hover:border-primary/20 transition-all duration-300"
          >
            {/* Preview / Illustration area */}
            <div className="w-full aspect-[16/9] bg-muted/30 flex items-center justify-center border-b border-border/30">
              <Icon className="w-10 h-10 text-muted-foreground/40" />
            </div>

            {/* Text content */}
            <div className="p-6">
              <p className="text-sm leading-relaxed">
                <span className="font-bold">{title}.</span>{" "}
                <span className="text-muted-foreground">{description}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
