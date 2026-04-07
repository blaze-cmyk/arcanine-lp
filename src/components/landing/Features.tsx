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
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)' }}>Designed for speed and clarity</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Arcanine provides a trading experience with fast execution, transparent payouts, and effortless
          decision-making.
        </p>
      </div>

      {/* Asymmetric Grid — small/large, large/small */}
      <div className="grid md:grid-cols-5 gap-5">
        {features.map(({ icon: Icon, title, description }, index) => {
          const isSmall = index === 0 || index === 3;
          return (
            <div
              key={title}
              className={`glass rounded-2xl border border-border/40 overflow-hidden group hover:border-primary/20 transition-all duration-300 ${
                isSmall ? "md:col-span-2" : "md:col-span-3"
              }`}
            >
              {/* Preview / Illustration area */}
              <div className="w-full aspect-[16/9] bg-muted/30 flex items-center justify-center border-b border-border/30">
                <Icon className="w-10 h-10 text-muted-foreground/40" />
              </div>

              {/* Text content */}
              <div className="p-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{title}.</span> {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
