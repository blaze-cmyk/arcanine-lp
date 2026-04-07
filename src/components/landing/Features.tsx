import TradeInSecondsVisual from "./features/TradeInSecondsVisual";
import ClearPayoutsVisual from "./features/ClearPayoutsVisual";
import ClearDecisionsVisual from "./features/ClearDecisionsVisual";
import GlobalMarketsVisual from "./features/GlobalMarketsVisual";

const features = [
  {
    title: "Trade in seconds",
    description: "Results resolve quickly, without waiting or complexity.",
    visual: <TradeInSecondsVisual />,
  },
  {
    title: "Crystal-clear payouts",
    description: "Know exactly what you stand to earn before you commit. No hidden fees, no surprises.",
    visual: <ClearPayoutsVisual />,
  },
  {
    title: "Clear decisions",
    description: "A straightforward up-or-down system, without unnecessary tools.",
    visual: <ClearDecisionsVisual />,
  },
  {
    title: "Global markets",
    description: "Trade across assets, anytime, from anywhere.",
    visual: <GlobalMarketsVisual />,
  },
];

const Features = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, hsl(var(--foreground)) 22.5%, hsl(var(--foreground) / 0.7) 100%)",
          }}
        >
          Designed for speed and clarity
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Arcanine provides a trading experience with fast execution, transparent payouts, and effortless
          decision-making.
        </p>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid md:grid-cols-5 gap-5">
        {features.map(({ title, description, visual }, index) => {
          const isSmall = index === 0 || index === 3;
          return (
            <div
              key={title}
              className={`relative rounded-2xl border border-border/40 overflow-hidden flex flex-col h-[340px] ${
                isSmall ? "md:col-span-2" : "md:col-span-3"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--foreground) / 0.04) 0%, hsl(var(--background) / 0.95) 100%)",
              }}
            >
              {/* Interactive visual */}
              <div className="flex-1">{visual}</div>

              {/* Text pinned to bottom */}
              <div className="p-6 max-w-md">
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
