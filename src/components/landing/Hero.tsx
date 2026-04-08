import { useTranslation } from "react-i18next";
import DashboardMockup from "./DashboardMockup";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-28 sm:pt-32">
      {/* ── Background layers ── */}

      {/* Subtle grid pattern for structure */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Grid fade-out mask */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, hsl(var(--background)) 75%)",
        }}
      />

      {/* Primary hero glow — concentrated behind headline */}
      <div
        className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[80%] h-[55%] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 55% 45% at 50% 35%, rgba(255,106,0,0.14) 0%, rgba(255,80,0,0.06) 35%, transparent 70%)",
        }}
      />

      {/* Secondary warm wash — wider, softer */}
      <div
        className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[100%] h-[45%] pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(ellipse 80% 45% at 50% 45%, rgba(255,120,20,0.07) 0%, rgba(255,80,0,0.02) 55%, transparent 100%)",
        }}
      />

      {/* Vertical light beam behind the heading */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[45%] pointer-events-none z-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(255,106,0,0.15) 30%, rgba(255,106,0,0.08) 60%, transparent 100%)",
          filter: "blur(8px)",
          width: "120px",
        }}
      />

      {/* Side accent glows */}
      <div
        className="absolute top-[18%] left-[-3%] w-[30%] h-[55%] pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(255,106,0,0.05) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[18%] right-[-3%] w-[30%] h-[55%] pointer-events-none z-0 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(255,106,0,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Floating orbs for organic depth */}
      <div
        className="absolute pointer-events-none z-0 rounded-full animate-pulse-soft"
        style={{
          width: "300px",
          height: "300px",
          top: "5%",
          left: "15%",
          background: "radial-gradient(circle, rgba(255,106,0,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute pointer-events-none z-0 rounded-full animate-pulse-soft"
        style={{
          width: "250px",
          height: "250px",
          top: "12%",
          right: "10%",
          background: "radial-gradient(circle, rgba(255,140,40,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          animationDelay: "1.5s",
        }}
      />
      <div
        className="absolute pointer-events-none z-0 rounded-full animate-pulse-soft"
        style={{
          width: "200px",
          height: "200px",
          top: "55%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(255,100,0,0.04) 0%, transparent 70%)",
          filter: "blur(35px)",
          animationDelay: "3s",
        }}
      />

      {/* Noise texture for grain/depth */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="heroNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>
      </div>

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 50%, rgba(11,11,14,0.6) 100%)",
        }}
      />

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

        <div className="animate-slide-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="inline-flex items-center px-6 py-3 bg-gradient-accent text-primary-foreground font-semibold text-base rounded-xl glow-orange transition-colors duration-200">
            {t("hero.createAccount")}
          </button>
          <button className="inline-flex items-center px-7 py-[0.8125rem] bg-secondary-btn text-foreground font-semibold text-base rounded-xl transition-colors duration-200">
            {t("hero.tryDemo")}
          </button>
        </div>
      </div>

      {/* ── Dashboard mockup ── */}
      <div className="relative z-10 w-full mx-auto max-w-6xl mt-20 mb-[-60px] animate-slide-up-delay-4">
        <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.06),transparent_60%)] blur-3xl pointer-events-none" />
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />

        <div className="relative glass-strong rounded-2xl border border-border/40 overflow-hidden shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-loss/60" />
              <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,50%)]/60" />
              <div className="w-3 h-3 rounded-full bg-profit/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground font-display tabular-nums">
                {t("hero.browserBar")}
              </div>
            </div>
            <div className="w-12" />
          </div>
          <DashboardMockup />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default Hero;
