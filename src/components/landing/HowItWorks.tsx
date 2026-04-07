import { useEffect, useRef, useState } from "react";

const floatStyle = (delay: number, duration: number, distance: number) => ({
  animation: `hiw-float ${duration}s ease-in-out ${delay}s infinite`,
  "--float-distance": `${distance}px`,
} as React.CSSProperties);

const StakeVisual = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center">
    <div className="relative" style={floatStyle(0, 4, 6)}>
      <div
        className="rounded-2xl px-8 py-5 text-center"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.12) 0%, hsl(var(--card)) 100%)",
          border: "1px solid hsl(var(--border) / 0.6)",
        }}
      >
        <span className="text-muted-foreground text-xs tracking-wider uppercase block mb-2">Amount</span>
        <span className="font-mono text-3xl font-bold text-foreground">$250</span>
      </div>
      <div
        className="absolute -top-3 -right-6 rounded-full px-3 py-1 text-xs font-semibold"
        style={{
          background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          ...floatStyle(0.5, 3, 4),
        }}
      >
        x2.4
      </div>
      <div
        className="absolute -bottom-3 -left-4 rounded-lg px-3 py-1.5 text-xs font-medium"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.5)",
          color: "hsl(var(--muted-foreground))",
          ...floatStyle(1, 3.5, 3),
        }}
      >
        Min $1
      </div>
    </div>
  </div>
);

const PredictVisual = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center gap-4">
    <div
      className="rounded-2xl px-6 py-5 text-center flex flex-col items-center gap-2"
      style={{
        background: "hsl(var(--profit) / 0.08)",
        border: "1px solid hsl(var(--profit) / 0.2)",
        ...floatStyle(0, 3.5, 5),
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 6L22 18H6L14 6Z" fill="hsl(160, 45%, 50%)" fillOpacity="0.9" />
      </svg>
      <span className="text-sm font-semibold" style={{ color: "hsl(var(--profit))" }}>Up</span>
    </div>

    <div className="flex flex-col items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))", animation: "hiw-pulse 2s ease-in-out infinite" }} />
      <div className="w-px h-8" style={{ background: "hsl(var(--border))" }} />
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{
          background: "hsl(var(--primary) / 0.15)",
          border: "1px solid hsl(var(--primary) / 0.3)",
          animation: "hiw-glow 3s ease-in-out infinite",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V13M1 7H13" stroke="hsl(24, 100%, 50%)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="w-px h-8" style={{ background: "hsl(var(--border))" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))", animation: "hiw-pulse 2s ease-in-out 1s infinite" }} />
    </div>

    <div
      className="rounded-2xl px-6 py-5 text-center flex flex-col items-center gap-2"
      style={{
        background: "hsl(var(--loss) / 0.08)",
        border: "1px solid hsl(var(--loss) / 0.2)",
        ...floatStyle(0.8, 3.5, 5),
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 22L6 10H22L14 22Z" fill="hsl(0, 55%, 55%)" fillOpacity="0.9" />
      </svg>
      <span className="text-sm font-semibold" style={{ color: "hsl(var(--loss))" }}>Down</span>
    </div>
  </div>
);

const CollectVisual = () => (
  <div className="relative w-full h-[200px] flex items-center justify-center">
    <div className="relative" style={floatStyle(0.3, 4.5, 5)}>
      <div
        className="rounded-2xl px-8 py-5 text-center"
        style={{
          background: "linear-gradient(135deg, hsl(var(--profit) / 0.1) 0%, hsl(var(--card)) 100%)",
          border: "1px solid hsl(var(--profit) / 0.2)",
        }}
      >
        <span className="text-xs tracking-wider uppercase block mb-2" style={{ color: "hsl(var(--profit))" }}>
          Profit
        </span>
        <span className="font-mono text-3xl font-bold" style={{ color: "hsl(var(--profit))" }}>
          +$350
        </span>
      </div>
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase"
        style={{
          background: "hsl(var(--profit) / 0.15)",
          border: "1px solid hsl(var(--profit) / 0.3)",
          color: "hsl(var(--profit))",
          ...floatStyle(0, 3, 3),
        }}
      >
        Settled
      </div>
      <div
        className="absolute -bottom-3 right-0 rounded-lg px-3 py-1.5 text-xs font-mono"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.5)",
          color: "hsl(var(--muted-foreground))",
          ...floatStyle(0.6, 3.2, 3),
        }}
      >
        0:04s
      </div>
    </div>
  </div>
);

const steps = [
  {
    number: "01",
    title: "Set your stake",
    description: "Choose how much to invest — from $1 to $10,000. You're always in control of your risk.",
    visual: <StakeVisual />,
  },
  {
    number: "02",
    title: "Predict the move",
    description: "Will the price go up or down? Pick a direction and set your timeframe. That's it.",
    visual: <PredictVisual />,
  },
  {
    number: "03",
    title: "Collect instantly",
    description: "Get results in seconds. Profits land in your account immediately — no waiting, no delays.",
    visual: <CollectVisual />,
  },
];

const HowItWorks = () => {
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

  return (
    <>
      <style>{`
        @keyframes hiw-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(calc(-1 * var(--float-distance, 6px))); }
        }
        @keyframes hiw-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        @keyframes hiw-glow {
          0%, 100% { box-shadow: 0 0 0 0 hsl(24 100% 50% / 0); }
          50% { box-shadow: 0 0 12px 2px hsl(24 100% 50% / 0.2); }
        }
      `}</style>
      <section ref={ref} className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div
            className="text-center mb-16 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              From zero to profit
            </p>
            <h2
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.08] mb-5 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, hsl(var(--foreground)) 22.5%, hsl(var(--foreground) / 0.7) 100%)",
              }}
            >
              Three moves.
              <br />
              One outcome.
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
              No charts to study. No jargon to learn. Just a simple decision that pays off in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {steps.map(({ number, title, description, visual }, i) => (
              <div
                key={number}
                className="transition-all duration-700"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${200 + i * 150}ms`,
                }}
              >
                <div
                  className="rounded-2xl overflow-hidden h-full"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border) / 0.5)",
                  }}
                >
                  <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      {number}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{title}</h3>
                  </div>
                  <div className="px-4">{visual}</div>
                  <div className="px-6 pb-6 pt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
