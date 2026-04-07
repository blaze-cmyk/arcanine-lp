import { useEffect, useRef, useState } from "react";
import { Shield, Eye, Lock, BarChart3, Zap, Scale } from "lucide-react";

const CARDS = [
  {
    icon: Eye,
    title: "Transparent Pricing",
    description: "Real-time market data with zero hidden spreads or manipulated quotes.",
  },
  {
    icon: Shield,
    title: "Verified Payouts",
    description: "Every payout is cryptographically verified and publicly auditable on-chain.",
  },
  {
    icon: Lock,
    title: "Tamper-Proof Execution",
    description: "Trades execute at the exact price you see. No requotes, no slippage games.",
  },
  {
    icon: BarChart3,
    title: "Open Odds Engine",
    description: "Our algorithm calculates payouts from live market volatility — not house edge.",
  },
  {
    icon: Zap,
    title: "Instant Settlements",
    description: "Winning trades are credited to your balance within milliseconds of expiry.",
  },
  {
    icon: Scale,
    title: "Fair Play Guarantee",
    description: "Independent audits every quarter. If we're not fair, we don't deserve your trust.",
  },
];

const FairnessLogic = () => {
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,70,220,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-medium tracking-wide uppercase"
            style={{
              background: "rgba(99,70,220,0.1)",
              border: "1px solid rgba(99,70,220,0.15)",
              color: "rgba(160,140,255,0.9)",
            }}
          >
            <Shield size={12} />
            Provably fair
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)",
            }}
          >
            Fairness you can verify
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Every trade, every payout, every price — transparent and auditable
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative rounded-2xl p-6 transition-all duration-700 cursor-default"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,70,220,0.06) 0%, rgba(99,70,220,0.02) 100%)",
                  border: "1px solid rgba(99,70,220,0.1)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${200 + i * 100}ms`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 100%, rgba(99,70,220,0.08) 0%, transparent 70%)",
                  }}
                />

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "rgba(99,70,220,0.1)",
                    border: "1px solid rgba(99,70,220,0.12)",
                  }}
                >
                  <Icon size={20} style={{ color: "rgba(160,140,255,0.85)" }} />
                </div>

                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className="flex justify-center mt-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "900ms",
          }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, rgba(99,70,220,0.15) 0%, rgba(99,70,220,0.08) 100%)",
              border: "1px solid rgba(99,70,220,0.2)",
              color: "rgba(180,165,255,0.95)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,70,220,0.22)";
              e.currentTarget.style.borderColor = "rgba(99,70,220,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(99,70,220,0.15) 0%, rgba(99,70,220,0.08) 100%)";
              e.currentTarget.style.borderColor = "rgba(99,70,220,0.2)";
            }}
          >
            Learn how it works
            <span className="text-base">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FairnessLogic;
