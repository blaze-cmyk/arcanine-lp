import { Users, Globe, BarChart3, DollarSign, TrendingUp, Zap } from "lucide-react";

const Stats = () => (
  <section className="py-24 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">
      <h2
        className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1] mb-14 text-center bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)",
        }}
      >
        Traders worldwide trust Arcanine
      </h2>

      {/* Bento grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-3 sm:gap-4 auto-rows-[180px]">
        
        {/* Active traders — large card, spans 2 cols */}
        <div
          className="col-span-2 row-span-1 relative rounded-2xl p-8 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(255,106,0,0.06) 0%, transparent 70%)" }} />
          <Users className="w-16 h-16 text-muted-foreground/20 mb-4" strokeWidth={1} />
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ backgroundImage: "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>50K+</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5">Active traders</p>
        </div>

        {/* Min trade */}
        <div
          className="col-span-1 row-span-1 relative rounded-2xl p-6 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.06) 0%, transparent 70%)" }} />
          <DollarSign className="w-10 h-10 text-muted-foreground/20 mb-3" strokeWidth={1.2} />
          <span className="text-3xl sm:text-4xl font-bold tracking-tight block" style={{ backgroundImage: "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$1</span>
          <p className="text-sm text-muted-foreground mt-1">Minimum trade</p>
        </div>

        {/* Min deposit */}
        <div
          className="col-span-1 row-span-1 relative rounded-2xl p-6 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.06) 0%, transparent 70%)" }} />
          <Zap className="w-10 h-10 text-muted-foreground/20 mb-3" strokeWidth={1.2} />
          <span className="text-3xl sm:text-4xl font-bold tracking-tight block" style={{ backgroundImage: "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$10</span>
          <p className="text-sm text-muted-foreground mt-1">Minimum deposit</p>
        </div>

        {/* Countries */}
        <div
          className="col-span-1 row-span-1 relative rounded-2xl p-6 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.06) 0%, transparent 70%)" }} />
          <Globe className="w-10 h-10 text-muted-foreground/20 mb-3" strokeWidth={1.2} />
          <span className="text-3xl sm:text-4xl font-bold tracking-tight block" style={{ backgroundImage: "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>130+</span>
          <p className="text-sm text-muted-foreground mt-1">Countries</p>
        </div>

        {/* Trading assets */}
        <div
          className="col-span-1 row-span-1 relative rounded-2xl p-6 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,106,0,0.06) 0%, transparent 70%)" }} />
          <BarChart3 className="w-10 h-10 text-muted-foreground/20 mb-3" strokeWidth={1.2} />
          <span className="text-3xl sm:text-4xl font-bold tracking-tight block" style={{ backgroundImage: "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>140+</span>
          <p className="text-sm text-muted-foreground mt-1">Trading assets</p>
        </div>

        {/* Monthly payouts — large card, spans 2 cols */}
        <div
          className="col-span-2 row-span-1 relative rounded-2xl p-8 overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at 70% 60%, rgba(255,106,0,0.06) 0%, transparent 70%)" }} />
          <TrendingUp className="w-16 h-16 text-muted-foreground/20 mb-4" strokeWidth={1} />
          <div className="flex items-baseline gap-3">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ backgroundImage: "linear-gradient(180deg, #fff 20%, rgba(255,255,255,0.7) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>$2M+</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1.5">Monthly payouts</p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-14">
        <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-accent text-primary-foreground font-semibold text-base rounded-xl glow-orange transition-colors duration-200">
          Join us
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
);

export default Stats;
