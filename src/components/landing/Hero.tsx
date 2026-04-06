import DashboardMockup from "./DashboardMockup";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-20 sm:pt-24">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="animate-slide-up text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1] mb-7">
          Trade the next market move
        </h1>

        {/* Subhead */}
        <p className="animate-slide-up-delay-1 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Trade up or down in seconds and get instant results. The fastest way to act on global markets.
        </p>

        {/* Dual CTA */}
        <div className="animate-slide-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="inline-flex items-center px-6 py-3 bg-gradient-accent text-primary-foreground font-semibold text-base rounded-xl glow-orange transition-colors duration-200">
            Create an account
          </button>
          <button className="inline-flex items-center px-6 py-3 bg-secondary-btn text-foreground font-semibold text-base rounded-xl transition-colors duration-200">
            Try free demo
          </button>
        </div>
      </div>

      {/* Dashboard preview with ambient glow */}
      <div className="relative z-10 w-full mx-auto max-w-6xl mt-20 animate-slide-up-delay-4">
        {/* Ambient glow behind the preview */}
        <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.06),transparent_60%)] blur-3xl pointer-events-none" />
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />

        {/* The preview card */}
        <div className="relative glass-strong rounded-2xl border border-border/40 overflow-hidden shadow-2xl shadow-black/40">
          {/* Top bar (browser chrome) */}
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-loss/60" />
              <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,50%)]/60" />
              <div className="w-3 h-3 rounded-full bg-profit/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground font-mono-num">
                app.arcanine.trade
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Dashboard mockup */}
          <DashboardMockup />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
