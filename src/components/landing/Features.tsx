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
      accent: "var(--primary)", // orange
      glowColor: "24 100% 50%",
    },
    {
      title: t("features.clearPayouts"),
      description: t("features.clearPayoutsDesc"),
      visual: <ClearPayoutsVisual />,
      accent: "var(--profit)", // green
      glowColor: "160 45% 50%",
    },
    {
      title: t("features.clearDecisions"),
      description: t("features.clearDecisionsDesc"),
      visual: <ClearDecisionsVisual />,
      accent: "var(--primary)",
      glowColor: "24 100% 50%",
    },
    {
      title: t("features.globalMarkets"),
      description: t("features.globalMarketsDesc"),
      visual: <GlobalMarketsVisual />,
      accent: "var(--profit)",
      glowColor: "160 45% 50%",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
      {/* Section ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(24 100% 50% / 0.04) 0%, transparent 70%)",
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
                  background: "hsl(var(--card))",
                }}
              >
                {/* Gradient border effect - top edge colored accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] z-[5]"
                  style={{
                    background: `linear-gradient(90deg, transparent 5%, hsl(${glowColor} / 0.6) 50%, transparent 95%)`,
                  }}
                />

                {/* Ambient corner glow - top right */}
                <div
                  className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full pointer-events-none z-[1] transition-opacity duration-500 opacity-40 group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(circle, hsl(${glowColor} / 0.12) 0%, transparent 70%)`,
                  }}
                />

                {/* Bottom ambient glow on hover */}
                <div
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[100px] rounded-full pointer-events-none z-[1] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse, hsl(${glowColor} / 0.08) 0%, transparent 70%)`,
                  }}
                />

                {/* Side border glow lines */}
                <div
                  className="absolute top-0 left-0 w-[1px] h-full pointer-events-none z-[5] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to bottom, hsl(${glowColor} / 0.3) 0%, transparent 50%)`,
                  }}
                />
                <div
                  className="absolute top-0 right-0 w-[1px] h-full pointer-events-none z-[5] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to bottom, hsl(${glowColor} / 0.3) 0%, transparent 50%)`,
                  }}
                />

                {/* Base border */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-[4] transition-all duration-500"
                  style={{
                    border: "1px solid hsl(var(--border) / 0.4)",
                  }}
                />
                {/* Hover border overlay */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-[4] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    border: `1px solid hsl(${glowColor} / 0.2)`,
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
