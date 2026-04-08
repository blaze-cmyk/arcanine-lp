import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Set your stake",
    description:
      "Choose how much to invest — from $1 to $10,000. You're always in control of your risk.",
    visual: (
      <div className="relative w-full h-[200px] flex items-center justify-center">
        {/* Stake selector mock */}
        <div className="relative">
          <div
            className="rounded-2xl px-8 py-5 text-center"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary) / 0.12) 0%, hsl(var(--card)) 100%)",
              border: "1px solid hsl(var(--border) / 0.6)",
            }}
          >
            <span className="text-muted-foreground text-xs tracking-wider uppercase block mb-2">Amount</span>
            <span className="font-display tabular-nums text-3xl font-bold text-foreground">$250</span>
          </div>
          {/* Floating chips */}
          <div
            className="absolute -top-3 -right-6 rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
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
            }}
          >
            Min $1
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Predict the move",
    description:
      "Will the price go up or down? Pick a direction and set your timeframe. That's it.",
    visual: (
      <div className="relative w-full h-[200px] flex items-center justify-center gap-4">
        {/* Up / Down cards */}
        <div
          className="rounded-2xl px-6 py-5 text-center flex flex-col items-center gap-2"
          style={{
            background: "hsl(var(--profit) / 0.08)",
            border: "1px solid hsl(var(--profit) / 0.2)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 6L22 18H6L14 6Z" fill="hsl(160, 45%, 50%)" fillOpacity="0.9" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: "hsl(var(--profit))" }}>Up</span>
        </div>

        {/* Connector dot */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
          <div className="w-px h-8" style={{ background: "hsl(var(--border))" }} />
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "hsl(var(--primary) / 0.15)",
              border: "1px solid hsl(var(--primary) / 0.3)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="hsl(24, 100%, 50%)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-px h-8" style={{ background: "hsl(var(--border))" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--primary))" }} />
        </div>

        <div
          className="rounded-2xl px-6 py-5 text-center flex flex-col items-center gap-2"
          style={{
            background: "hsl(var(--loss) / 0.08)",
            border: "1px solid hsl(var(--loss) / 0.2)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 22L6 10H22L14 22Z" fill="hsl(0, 55%, 55%)" fillOpacity="0.9" />
          </svg>
          <span className="text-sm font-semibold" style={{ color: "hsl(var(--loss))" }}>Down</span>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Collect instantly",
    description:
      "Get results in seconds. Profits land in your account immediately — no waiting, no delays.",
    visual: (
      <div className="relative w-full h-[200px] flex items-center justify-center">
        <div className="relative">
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
            <span className="font-display tabular-nums text-3xl font-bold" style={{ color: "hsl(var(--profit))" }}>
              +$350
            </span>
          </div>
          {/* Status badge */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase"
            style={{
              background: "hsl(var(--profit) / 0.15)",
              border: "1px solid hsl(var(--profit) / 0.3)",
              color: "hsl(var(--profit))",
            }}
          >
            Settled
          </div>
          {/* Timer */}
          <div
            className="absolute -bottom-3 right-0 rounded-lg px-3 py-1.5 text-xs font-display tabular-nums"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border) / 0.5)",
              color: "hsl(var(--muted-foreground))",
            }}
          >
            0:04s
          </div>
        </div>
      </div>
    ),
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
    <section ref={ref} id="three-moves" className="relative py-32 sm:py-40 px-4 sm:px-6 overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,106,0,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
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

        {/* Cards */}
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
                {/* Number + Title */}
                <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 font-display"
                    style={{
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    {number}
                  </span>
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                </div>

                {/* Visual area */}
                <div className="px-4">{visual}</div>

                {/* Description */}
                <div className="px-6 pb-6 pt-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
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
