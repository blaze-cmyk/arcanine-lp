import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import btcIcon from "@/assets/icons/btc.png";
import ethIcon from "@/assets/icons/eth.png";
import solIcon from "@/assets/icons/sol.png";

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
        <div className="relative w-full h-[200px] flex items-center justify-center gap-4">
          <div
            className="rounded-2xl px-6 py-5 text-center flex flex-col items-center gap-2"
            style={{ background: "hsl(var(--profit) / 0.08)", border: "1px solid hsl(var(--profit) / 0.2)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 6L22 18H6L14 6Z" fill="hsl(160, 45%, 50%)" fillOpacity="0.9" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: "hsl(var(--profit))" }}>{t("howItWorks.up")}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
            <div className="w-px h-8" style={{ background: "hsl(var(--border))" }} />
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.15)", border: "1px solid hsl(var(--primary) / 0.3)" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1V13M1 7H13" stroke="hsl(24, 100%, 50%)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="w-px h-8" style={{ background: "hsl(var(--border))" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
          </div>
          <div
            className="rounded-2xl px-6 py-5 text-center flex flex-col items-center gap-2"
            style={{ background: "hsl(var(--loss) / 0.08)", border: "1px solid hsl(var(--loss) / 0.2)" }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 22L6 10H22L14 22Z" fill="hsl(0, 55%, 55%)" fillOpacity="0.9" />
            </svg>
            <span className="text-sm font-semibold" style={{ color: "hsl(var(--loss))" }}>{t("howItWorks.down")}</span>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: t("howItWorks.step3Title"),
      description: t("howItWorks.step3Desc"),
      visual: (
        <div className="relative w-full h-[200px] flex items-center justify-center">
          <div className="relative">
            <div
              className="rounded-2xl px-8 py-5 text-center"
              style={{ background: "linear-gradient(135deg, hsl(var(--profit) / 0.1) 0%, hsl(var(--card)) 100%)", border: "1px solid hsl(var(--profit) / 0.2)" }}
            >
              <span className="text-xs tracking-wider uppercase block mb-2" style={{ color: "hsl(var(--profit))" }}>{t("howItWorks.profit")}</span>
              <span className="font-display tabular-nums text-3xl font-bold" style={{ color: "hsl(var(--profit))" }}>+$350</span>
            </div>
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase"
              style={{ background: "hsl(var(--profit) / 0.15)", border: "1px solid hsl(var(--profit) / 0.3)", color: "hsl(var(--profit))" }}
            >
              {t("howItWorks.settled")}
            </div>
            <div
              className="absolute -bottom-3 right-0 rounded-lg px-3 py-1.5 text-xs font-display tabular-nums"
              style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)", color: "hsl(var(--muted-foreground))" }}
            >
              0:04s
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section ref={ref} id="three-moves" className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,106,0,0.04) 0%, transparent 70%)" }} />
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
