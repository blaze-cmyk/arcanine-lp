import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.08),transparent_70%)]" />

      {/* Center orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.06),transparent_70%)] blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Status badge */}
        <div className="animate-slide-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass text-sm mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-profit" />
          </span>
          <span className="text-muted-foreground">Markets are live</span>
          <span className="h-3 w-px bg-border" />
          <span className="text-muted-foreground font-mono-num text-xs">24/7</span>
        </div>

        {/* Headline */}
        <h1 className="animate-slide-up-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.95] mb-7">
          Trade Faster.
          <br />
          <span className="text-gradient">Win Smarter.</span>
        </h1>

        {/* Subhead */}
        <p className="animate-slide-up-delay-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Predict price movements in seconds. Up or down — one decision,
          instant results. The fastest way to trade global markets.
        </p>

        {/* CTAs */}
        <div className="animate-slide-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-accent text-primary-foreground font-bold text-base rounded-xl glow-orange hover:scale-[1.03] transition-all duration-200">
            <Zap className="w-5 h-5" />
            Start Trading Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-muted-foreground hover:text-foreground border border-border rounded-xl hover:border-muted-foreground/30 transition-all duration-200">
            Try Demo Free
          </button>
        </div>

        {/* Trust indicators */}
        <div className="animate-slide-up-delay-4 mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-profit" />
            No signup required
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-profit" />
            Instant payouts
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-profit" />
            256-bit encryption
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
