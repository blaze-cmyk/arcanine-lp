import { useTranslation } from "react-i18next";
import TradeInSecondsVisual from "./features/TradeInSecondsVisual";
import ClearPayoutsVisual from "./features/ClearPayoutsVisual";
import ClearDecisionsVisual from "./features/ClearDecisionsVisual";
import GlobalMarketsVisual from "./features/GlobalMarketsVisual";

const meshGradients = [
  "radial-gradient(ellipse 70% 55% at 75% 10%, hsl(24 100% 50% / 0.18) 0%, hsl(24 100% 40% / 0.06) 40%, transparent 70%)",
  "radial-gradient(ellipse 60% 50% at 25% 15%, hsl(160 50% 45% / 0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 45% at 80% 20%, hsl(24 100% 50% / 0.10) 0%, transparent 60%)",
  "radial-gradient(ellipse 65% 55% at 55% 12%, hsl(240 50% 55% / 0.14) 0%, hsl(260 40% 40% / 0.05) 45%, transparent 70%)",
  "radial-gradient(ellipse 80% 60% at 50% 5%, hsl(24 100% 50% / 0.16) 0%, hsl(24 80% 30% / 0.04) 50%, transparent 75%), radial-gradient(ellipse 40% 40% at 15% 60%, hsl(280 40% 45% / 0.06) 0%, transparent 60%)",
];

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
    <section className="py-32 sm:py-40 px-4">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="feature-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

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
                className={`relative rounded-2xl border border-border/40 overflow-hidden flex flex-col h-[340px] ${
                  isSmall ? "md:col-span-2" : "md:col-span-3"
                }`}
                style={{ background: "hsl(var(--card))" }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: meshGradients[index] }} />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, hsl(var(--card) / 0.7) 100%)" }} />
                <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay" style={{ filter: "url(#feature-noise)", width: "100%", height: "100%" }} />
                <div className="flex-1 relative z-[1]">{visual}</div>
                <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none z-[2]" style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(var(--card)) 65%)" }} />
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
