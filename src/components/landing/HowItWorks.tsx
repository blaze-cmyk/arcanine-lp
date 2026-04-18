import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import btcIcon from "@/assets/icons/btc.png";
import ethIcon from "@/assets/icons/eth.png";
import solIcon from "@/assets/icons/sol.png";
import howItWorksBg from "@/assets/howitworks-bg.webm";

const HowItWorks = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      title: t("howItWorks.step1Title"),
      description: t("howItWorks.step1Desc"),
      visual: (
        <div className="relative w-full h-[200px] flex items-center justify-center px-2">
          <div
            className="w-full rounded-xl overflow-hidden"
            style={{ background: "hsl(var(--background) / 0.6)", border: "1px solid hsl(var(--border) / 0.5)" }}
          >
            <div
              className="grid items-center gap-2 px-3 py-2 text-[9px] font-semibold tracking-wider uppercase text-muted-foreground"
              style={{ gridTemplateColumns: "1.5fr 1fr 1fr 0.8fr", borderBottom: "1px solid hsl(var(--border) / 0.3)" }}
            >
              <span>Market</span>
              <span className="text-right">LTP</span>
              <span className="text-right whitespace-nowrap">Profit +1m</span>
              <span className="text-right">5m</span>
            </div>
            {[
              { name: "BTC/USDT", sub: "Bitcoin", icon: btcIcon, ltp: "$77,047", change: "+2.76%", p1: "92%", p5: "94%", selected: true },
              { name: "ETH/USDT", sub: "Ethereum", icon: ethIcon, ltp: "$2,406", change: "+3.00%", p1: "88%", p5: "90%", selected: false },
              { name: "SOL/USDT", sub: "Solana", icon: solIcon, ltp: "$88.50", change: "+0.40%", p1: "93%", p5: "95%", selected: false },
            ].map((row) => (
              <div
                key={row.name}
                className="grid items-center gap-2 px-3 py-2"
                style={{
                  gridTemplateColumns: "1.5fr 1fr 1fr 0.8fr",
                  background: row.selected ? "hsl(var(--profit) / 0.08)" : "transparent",
                  borderTop: "1px solid hsl(var(--border) / 0.2)",
                  borderLeft: row.selected ? "2px solid hsl(var(--profit))" : "2px solid transparent",
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <img src={row.icon} alt="" className="w-5 h-5 rounded-full object-contain shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-foreground leading-tight truncate">{row.name}</span>
                    <span className="text-[9px] text-muted-foreground leading-tight truncate">{row.sub}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold font-display tabular-nums text-foreground leading-tight">{row.ltp}</span>
                  <span className="text-[9px] font-display tabular-nums leading-tight" style={{ color: "hsl(var(--profit))" }}>{row.change}</span>
                </div>
                <span className="text-[11px] font-bold text-right font-display tabular-nums" style={{ color: "hsl(var(--profit))" }}>{row.p1}</span>
                <span className="text-[11px] font-bold text-right font-display tabular-nums" style={{ color: "hsl(var(--profit))" }}>{row.p5}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: t("howItWorks.step2Title"),
      description: t("howItWorks.step2Desc"),
      visual: (
        <div className="relative w-full h-[220px] flex items-center justify-center overflow-hidden rounded-xl">
          {/* Background video */}
          <video
            src={howItWorksBg}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            style={{ objectPosition: "60% 35%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
          {/* Card 2 — Down (back, tilted right) — Liquid glass */}
          <div
            className="absolute w-[150px] rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card) / 0.55) 0%, hsl(var(--card) / 0.25) 100%)",
              border: "1px solid hsl(0 0% 100% / 0.08)",
              transform: "translate(48px, -10px) rotate(8deg)",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 0 hsl(0 0% 100% / 0.08)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(120% 60% at 50% 0%, hsl(0 0% 100% / 0.06), transparent 60%)" }} />
            <div className="relative px-2.5 pt-2 pb-2" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.06)" }}>
              <fieldset className="rounded-md px-2 pb-1 pt-0" style={{ border: "1px solid hsl(0 0% 100% / 0.1)", background: "hsl(0 0% 100% / 0.03)" }}>
                <legend className="text-[8px] text-muted-foreground px-1">Investment</legend>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-[10px]">−</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[11px] font-semibold text-foreground tabular-nums font-display">100</span>
                    <span className="text-muted-foreground text-[9px]">$</span>
                  </div>
                  <span className="text-muted-foreground text-[10px]">+</span>
                </div>
              </fieldset>
            </div>
            <div className="relative px-2.5 py-1.5" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.06)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground">Your payout</span>
                <span className="text-[9px] font-bold" style={{ color: "hsl(var(--primary))" }}>90%</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-base font-extrabold text-foreground font-display tabular-nums leading-tight">190</span>
                <span className="text-xs font-bold ml-0.5" style={{ color: "hsl(var(--profit))" }}>$</span>
              </div>
            </div>
            <div className="relative px-2.5 py-2">
              <button
                className="w-full py-1.5 rounded-lg flex items-center justify-between px-2.5 text-[11px] font-bold text-white backdrop-blur-md"
                style={{
                  background: "linear-gradient(180deg, hsl(var(--loss) / 0.85), hsl(var(--loss) / 0.65))",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.2), 0 4px 12px -4px hsl(var(--loss) / 0.5)",
                  border: "1px solid hsl(0 0% 100% / 0.12)",
                }}
              >
                <span>Down</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Card 1 — Up (front, tilted left) — Liquid glass */}
          <div
            className="absolute w-[160px] rounded-2xl overflow-hidden backdrop-blur-xl"
            style={{
              background: "linear-gradient(135deg, hsl(var(--card) / 0.6) 0%, hsl(var(--card) / 0.3) 100%)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
              transform: "translate(-48px, 18px) rotate(-8deg)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.75), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(120% 60% at 50% 0%, hsl(0 0% 100% / 0.08), transparent 60%)" }} />
            <div className="relative px-2.5 pt-2 pb-2" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.06)" }}>
              <fieldset className="rounded-md px-2 pb-1 pt-0" style={{ border: "1px solid hsl(0 0% 100% / 0.1)", background: "hsl(0 0% 100% / 0.03)" }}>
                <legend className="text-[8px] text-muted-foreground px-1">Investment</legend>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-[10px]">−</span>
                  <div className="flex items-center gap-0.5">
                    <span className="text-[11px] font-semibold text-foreground tabular-nums font-display">100</span>
                    <span className="text-muted-foreground text-[9px]">$</span>
                  </div>
                  <span className="text-muted-foreground text-[10px]">+</span>
                </div>
              </fieldset>
            </div>
            <div className="relative px-2.5 py-1.5" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.06)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-muted-foreground">Your payout</span>
                <span className="text-[9px] font-bold" style={{ color: "hsl(var(--primary))" }}>90%</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-base font-extrabold text-foreground font-display tabular-nums leading-tight">190</span>
                <span className="text-xs font-bold ml-0.5" style={{ color: "hsl(var(--profit))" }}>$</span>
              </div>
            </div>
            <div className="relative px-2.5 py-2">
              <button
                className="w-full py-1.5 rounded-lg flex items-center justify-between px-2.5 text-[11px] font-bold text-white backdrop-blur-md"
                style={{
                  background: "linear-gradient(180deg, hsl(var(--profit) / 0.9), hsl(var(--profit) / 0.7))",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.25), 0 4px 12px -4px hsl(var(--profit) / 0.55)",
                  border: "1px solid hsl(0 0% 100% / 0.14)",
                }}
              >
                <span>Up</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: t("howItWorks.step3Title"),
      description: t("howItWorks.step3Desc"),
      visual: (
        <div className="relative w-full h-[220px] flex items-center justify-center px-2">
          <div
            className="w-full max-w-[260px] rounded-xl overflow-hidden"
            style={{
              background: "hsl(var(--background) / 0.85)",
              border: "1px solid hsl(var(--border) / 0.6)",
              boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header tabs */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/40">
              <div className="flex items-center gap-1.5 relative">
                <span className="text-[11px] font-bold text-foreground">Trades</span>
                <span className="text-[10px] font-semibold" style={{ color: "hsl(var(--profit))" }}>3</span>
                <span className="absolute -bottom-2 left-0 right-0 h-[2px]" style={{ background: "hsl(var(--profit))" }} />
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <span className="text-[10px]">0</span>
              </div>
            </div>
            {/* Trade rows */}
            {[
              { investment: "250", profit: "+225.00" },
              { investment: "500", profit: "+450.00" },
              { investment: "1000", profit: "+900.00" },
            ].map((trade, idx) => (
              <div
                key={idx}
                className="px-3 py-2"
                style={{ borderTop: idx > 0 ? "1px solid hsl(var(--border) / 0.3)" : "none" }}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="3">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    <img src={btcIcon} alt="" className="w-3.5 h-3.5 rounded-full object-contain" />
                    <span className="text-[10px] font-bold text-foreground">BTC/USDT</span>
                  </div>
                  <span className="text-[9px] font-display tabular-nums text-muted-foreground">00:01:00</span>
                </div>
                <div className="flex items-center justify-between pl-[18px]">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--loss))" }}>
                      <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                        <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
                      </svg>
                    </span>
                    <span className="text-[10px] font-display tabular-nums text-foreground">{trade.investment} $</span>
                  </div>
                  <span className="text-[10px] font-bold font-display tabular-nums" style={{ color: "hsl(var(--profit))" }}>
                    {trade.profit} $
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} id="three-moves" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(0,255,136,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative">
        <div
          className="text-left mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "#00E676" }}>
            {t("howItWorks.eyebrow")}
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.08] mb-5 bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(180deg, hsl(var(--foreground)) 22.5%, hsl(var(--foreground) / 0.7) 100%)" }}
          >
            {t("howItWorks.heading")}
          </h2>
          <p className="text-foreground/80 text-lg max-w-lg leading-relaxed">
            {t("howItWorks.subheading")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {steps.map(({ number, title, description, visual }, i) => (
            <div
              key={number}
              className="transition-all duration-700"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="rounded-2xl overflow-hidden h-full" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)" }}>
                <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 font-display" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
                    {number}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                </div>
                <div className="px-4">{visual}</div>
                <div className="px-6 pb-6 pt-4">
                  <p className="text-foreground/80 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
