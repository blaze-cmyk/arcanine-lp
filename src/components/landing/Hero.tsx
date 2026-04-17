import { useTranslation } from "react-i18next";
import dashboardPreview from "@/assets/dashboard-preview.png";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 sm:pt-32 pb-0">

      {/* Noise texture */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="heroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="animate-slide-up inline-flex items-center gap-3 mb-6 pl-2 pr-5 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm py-[8px]">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-display font-bold tabular-nums">{t("hero.badgeRank")}</span>
          <span className="text-sm text-muted-foreground font-medium">{t("hero.badge")}</span>
        </div>

        <h1 className="animate-slide-up text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.15] mb-7 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)' }}>
          {t("hero.headline")}
        </h1>

        <p className="animate-slide-up-delay-1 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          {t("hero.subhead")}
        </p>

        <div className="animate-slide-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="inline-flex items-center px-6 py-3 bg-gradient-accent text-primary-foreground font-semibold text-base rounded-xl glow-orange transition-colors duration-200">
            {t("hero.createAccount")}
          </button>
          <p className="text-sm text-muted-foreground max-w-[220px] text-center leading-snug">
            {t("hero.depositNote")}
          </p>
        </div>
      </div>

      {/* ── Dashboard mockup ── */}
      <div className="relative z-10 w-full mx-auto max-w-6xl mt-20 animate-slide-up-delay-4">
        <img src={dashboardPreview} alt="Arcanine trading platform preview" className="relative w-full h-auto block" />
      </div>

      {/* Dark gradient below dashboard (does not overlap image) */}
      <div className="relative z-10 w-full h-16 sm:h-20 bg-gradient-to-b from-transparent to-background pointer-events-none" />

    </section>
  );
};

export default Hero;
