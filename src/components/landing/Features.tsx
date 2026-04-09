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
    },
    {
      title: t("features.clearPayouts"),
      description: t("features.clearPayoutsDesc"),
      visual: <ClearPayoutsVisual />,
    },
    {
      title: t("features.clearDecisions"),
      description: t("features.clearDecisionsDesc"),
      visual: <ClearDecisionsVisual />,
    },
    {
      title: t("features.globalMarkets"),
      description: t("features.globalMarketsDesc"),
      visual: <GlobalMarketsVisual />,
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4">
      <div className="max-w-6xl mx-auto">
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
          {features.map(({ title, description, visual }, index) => {
            const isSmall = index === 0 || index === 3;
            return (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden flex flex-col h-[340px] ${
                  isSmall ? "md:col-span-2" : "md:col-span-3"
                }`}
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border) / 0.5)",
                }}
              >
                {/* Subtle top-edge highlight like other sections */}
                <div
                  className="absolute top-0 left-0 right-0 h-px pointer-events-none z-[2]"
                  style={{
                    background: "linear-gradient(90deg, transparent 10%, hsl(var(--border) / 0.4) 50%, transparent 90%)",
                  }}
                />
                <div className="flex-1 relative z-[1]">{visual}</div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-[2]"
                  style={{
                    background: "linear-gradient(to bottom, transparent 0%, hsl(var(--card)) 65%)",
                  }}
                />
                <div className="p-6 max-w-md relative z-[3]">
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
