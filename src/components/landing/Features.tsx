import { useTranslation } from "react-i18next";
import TradeInSecondsVisual from "./features/TradeInSecondsVisual";
import ClearPayoutsVisual from "./features/ClearPayoutsVisual";
import ClearDecisionsVisual from "./features/ClearDecisionsVisual";
import GlobalMarketsVisual from "./features/GlobalMarketsVisual";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("features.tradeInSeconds"),
      description: t("features.tradeInSecondsDesc"),
      visual: <TradeInSecondsVisual />,
      glowColor: "24 100% 50%",
    },
    {
      title: t("features.clearPayouts"),
      description: t("features.clearPayoutsDesc"),
      visual: <ClearPayoutsVisual />,
      glowColor: "160 45% 50%",
    },
    {
      title: t("features.clearDecisions"),
      description: t("features.clearDecisionsDesc"),
      visual: <ClearDecisionsVisual />,
      glowColor: "24 100% 50%",
    },
    {
      title: t("features.globalMarkets"),
      description: t("features.globalMarketsDesc"),
      visual: <GlobalMarketsVisual />,
      glowColor: "160 45% 50%",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
      {/* Section ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(24 100% 50% / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, hsl(var(--foreground)) 22.5%, hsl(var(--foreground) / 0.7) 100%)",
            }}
          >
            {t("features.heading")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t("features.subheading")}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {features.map(({ title, description, visual, glowColor }, index) => {
            const isSmall = index === 0 || index === 3;
            return (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden flex flex-col h-[340px] transition-all duration-500 hover:-translate-y-1 ${
                  isSmall ? "md:col-span-2" : "md:col-span-3"
                }`}
                style={{
                  background: `linear-gradient(170deg, hsl(${glowColor} / 0.06) 0%, hsl(var(--card)) 40%, hsl(var(--card)) 100%)`,
                  border: "1px solid hsl(var(--border) / 0.4)",
                }}
              >
                {/* Gradient accent top edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] z-[5]"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, hsl(${glowColor} / 0.8) 50%, transparent 100%)`,
                  }}
                />

                {/* Ambient corner glow - always visible, stronger on hover */}
                <div
                  className="absolute -top-16 -right-16 w-[250px] h-[250px] rounded-full pointer-events-none z-[1] transition-opacity duration-500 opacity-60 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, hsl(${glowColor} / 0.15) 0%, hsl(${glowColor} / 0.05) 40%, transparent 70%)`,
                  }}
                />

                {/* Secondary bottom-left ambient */}
                <div
                  className="absolute -bottom-12 -left-12 w-[180px] h-[180px] rounded-full pointer-events-none z-[1] opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle, hsl(${glowColor} / 0.1) 0%, transparent 70%)`,
                  }}
                />

                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-[4] transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px hsl(${glowColor} / 0.15), 0 0 40px hsl(${glowColor} / 0.08)`,
                  }}
                />

                {/* Visual area */}
                <div className="flex-1 relative z-[2]">{visual}</div>

                {/* Content fade overlay */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-[3]"
                  style={{
                    background: "linear-gradient(to bottom, transparent 0%, hsl(var(--card)) 65%)",
                  }}
                />

                {/* Text content */}
                <div className="p-6 max-w-md relative z-[6]">
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
};

export default Features;
