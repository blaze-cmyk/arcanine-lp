import TradeInSecondsVisual from "./features/TradeInSecondsVisual";
import ClearPayoutsVisual from "./features/ClearPayoutsVisual";
import ClearDecisionsVisual from "./features/ClearDecisionsVisual";
import GlobalMarketsVisual from "./features/GlobalMarketsVisual";

// Mesh gradient configs per card for variety
const meshGradients = [
  "radial-gradient(ellipse 60% 50% at 70% 20%, hsl(24 100% 50% / 0.07) 0%, transparent 70%)",
  "radial-gradient(ellipse 50% 60% at 30% 30%, hsl(160 45% 50% / 0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 60%, hsl(24 100% 50% / 0.04) 0%, transparent 70%)",
  "radial-gradient(ellipse 60% 50% at 50% 25%, hsl(220 60% 50% / 0.06) 0%, transparent 70%)",
  "radial-gradient(ellipse 50% 50% at 60% 30%, hsl(24 100% 50% / 0.05) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 50%, hsl(160 45% 50% / 0.04) 0%, transparent 70%)",
];

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
    {/* SVG noise filter — defined once, used by all cards */}
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="feature-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>

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
                background: "hsl(var(--card))",
              }}
            >
              {/* Mesh gradient layer — gives visual area a subtle glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: meshGradients[index] }}
              />

              {/* Noise texture overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                style={{ filter: "url(#feature-noise)", width: "100%", height: "100%" }}
              />

              {/* Interactive visual */}
              <div className="flex-1 relative z-[1]">{visual}</div>

              {/* Text area with shadow depth — darker band with inset shadow on top */}
              <div
                className="relative z-[3] p-6 max-w-md"
                style={{
                  background: "linear-gradient(to bottom, rgba(8,8,10,0.85) 0%, rgba(8,8,10,0.95) 100%)",
                  boxShadow: "0 -20px 40px 0 rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.04)",
                }}
              >
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
