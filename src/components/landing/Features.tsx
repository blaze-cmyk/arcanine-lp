import featureSpeed from "@/assets/feature-speed.jpg";
import featurePayouts from "@/assets/feature-payouts.jpg";
import featureDecisions from "@/assets/feature-decisions.jpg";
import featureGlobal from "@/assets/feature-global.jpg";

const features = [
  {
    title: "Trade in seconds",
    description: "Results resolve quickly, without waiting or complexity.",
    image: featureSpeed,
  },
  {
    title: "Crystal-clear payouts",
    description: "Know exactly what you stand to earn before you commit. No hidden fees, no surprises.",
    image: featurePayouts,
  },
  {
    title: "Clear decisions",
    description: "A straightforward up-or-down system, without unnecessary tools.",
    image: featureDecisions,
  },
  {
    title: "Global markets",
    description: "Trade across assets, anytime, from anywhere.",
    image: featureGlobal,
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
        {features.map(({ title, description, image }, index) => {
          const isSmall = index === 0 || index === 3;
          return (
            <div
              key={title}
              className={`relative rounded-2xl border border-border/40 overflow-hidden flex flex-col h-[320px] ${
                isSmall ? "md:col-span-2" : "md:col-span-3"
              }`}
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(11,11,14,0.95) 100%)',
              }}
            >
              {/* Feature image */}
              <div className="flex-1 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="w-full h-full object-cover opacity-70"
                />
              </div>

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
