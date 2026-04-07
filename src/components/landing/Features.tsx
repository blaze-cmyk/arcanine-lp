import { useState } from "react";

/* ─── Feature visual components with hover interactions ─── */

const TradeInSecondsVisual = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Timer ring */}
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3"
          />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 42}
            strokeDashoffset={hovered ? 0 : 2 * Math.PI * 42 * 0.75}
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.33, 1, 0.68, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-2xl font-bold text-foreground transition-all duration-700"
            style={{ opacity: hovered ? 1 : 0.5 }}
          >
            {hovered ? "0:04" : "0:30"}
          </span>
        </div>
      </div>

      {/* Status label */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-all duration-500"
        style={{
          background: hovered ? "hsl(var(--profit) / 0.15)" : "hsl(var(--muted))",
          color: hovered ? "hsl(var(--profit))" : "hsl(var(--muted-foreground))",
          border: `1px solid ${hovered ? "hsl(var(--profit) / 0.3)" : "hsl(var(--border))"}`,
        }}
      >
        {hovered ? "Settled" : "Waiting..."}
      </div>
    </div>
  );
};

const ClearPayoutsVisual = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Stake row */}
        <div
          className="rounded-xl px-5 py-2.5 flex items-center gap-4 transition-all duration-500"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.5)",
          }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Stake</span>
          <span className="font-mono text-lg font-bold text-foreground">$100</span>
        </div>

        {/* Arrow */}
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="transition-all duration-500" style={{ opacity: hovered ? 1 : 0.3 }}>
          <path d="M8 0V20M2 14L8 20L14 14" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Payout row */}
        <div
          className="rounded-xl px-5 py-2.5 flex items-center gap-4 transition-all duration-500"
          style={{
            background: hovered ? "hsl(var(--profit) / 0.08)" : "hsl(var(--card))",
            border: `1px solid ${hovered ? "hsl(var(--profit) / 0.25)" : "hsl(var(--border) / 0.5)"}`,
          }}
        >
          <span className="text-xs uppercase tracking-wider transition-colors duration-500" style={{ color: hovered ? "hsl(var(--profit))" : "hsl(var(--muted-foreground))" }}>Payout</span>
          <span
            className="font-mono text-lg font-bold transition-all duration-500"
            style={{ color: hovered ? "hsl(var(--profit))" : "hsl(var(--foreground))" }}
          >
            {hovered ? "+$185" : "$—"}
          </span>
        </div>

        {/* Multiplier badge */}
        <div
          className="rounded-full px-3 py-0.5 text-[10px] font-semibold transition-all duration-500"
          style={{
            background: hovered ? "hsl(var(--primary) / 0.15)" : "transparent",
            color: hovered ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-4px)",
          }}
        >
          1.85x return
        </div>
      </div>
    </div>
  );
};

const ClearDecisionsVisual = () => {
  const [picked, setPicked] = useState<"up" | "down" | null>(null);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      onMouseLeave={() => setPicked(null)}
    >
      <div className="flex gap-3">
        {/* Up button */}
        <button
          className="rounded-xl px-5 py-4 flex flex-col items-center gap-1.5 transition-all duration-300 outline-none"
          style={{
            background: picked === "up" ? "hsl(var(--profit) / 0.12)" : "hsl(var(--card))",
            border: `1px solid ${picked === "up" ? "hsl(var(--profit) / 0.35)" : "hsl(var(--border) / 0.5)"}`,
            transform: picked === "up" ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setPicked("up")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4L16 14H4L10 4Z" fill={picked === "up" ? "hsl(160, 45%, 50%)" : "hsl(var(--muted-foreground))"} style={{ transition: "fill 0.3s" }} />
          </svg>
          <span className="text-xs font-semibold transition-colors duration-300" style={{ color: picked === "up" ? "hsl(var(--profit))" : "hsl(var(--muted-foreground))" }}>
            Up
          </span>
        </button>

        {/* Down button */}
        <button
          className="rounded-xl px-5 py-4 flex flex-col items-center gap-1.5 transition-all duration-300 outline-none"
          style={{
            background: picked === "down" ? "hsl(var(--loss) / 0.12)" : "hsl(var(--card))",
            border: `1px solid ${picked === "down" ? "hsl(var(--loss) / 0.35)" : "hsl(var(--border) / 0.5)"}`,
            transform: picked === "down" ? "scale(1.05)" : "scale(1)",
          }}
          onMouseEnter={() => setPicked("down")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 16L4 6H16L10 16Z" fill={picked === "down" ? "hsl(0, 55%, 55%)" : "hsl(var(--muted-foreground))"} style={{ transition: "fill 0.3s" }} />
          </svg>
          <span className="text-xs font-semibold transition-colors duration-300" style={{ color: picked === "down" ? "hsl(var(--loss))" : "hsl(var(--muted-foreground))" }}>
            Down
          </span>
        </button>
      </div>

      {/* Result label */}
      {picked && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-wider uppercase animate-fade-in"
          style={{ color: picked === "up" ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
        >
          {picked === "up" ? "Call placed" : "Put placed"}
        </div>
      )}
    </div>
  );
};

const GlobalMarketsVisual = () => {
  const [active, setActive] = useState(0);
  const assets = [
    { pair: "EUR/USD", price: "1.0847", change: "+0.12%" },
    { pair: "BTC/USD", price: "67,432", change: "+2.4%" },
    { pair: "AAPL", price: "189.72", change: "-0.31%" },
  ];

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={() => {
        let i = 0;
        const interval = setInterval(() => {
          i = (i + 1) % assets.length;
          setActive(i);
        }, 800);
        setTimeout(() => clearInterval(interval), 3000);
      }}
    >
      <div className="flex flex-col gap-1.5 w-[160px]">
        {assets.map((a, i) => (
          <div
            key={a.pair}
            className="rounded-lg px-3 py-2 flex items-center justify-between transition-all duration-400"
            style={{
              background: i === active ? "hsl(var(--primary) / 0.08)" : "hsl(var(--card))",
              border: `1px solid ${i === active ? "hsl(var(--primary) / 0.25)" : "hsl(var(--border) / 0.3)"}`,
              transform: i === active ? "scale(1.03)" : "scale(1)",
              transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
            }}
          >
            <div>
              <span className="text-[11px] font-semibold text-foreground block leading-tight">{a.pair}</span>
              <span className="text-[10px] font-mono text-muted-foreground">{a.price}</span>
            </div>
            <span
              className="text-[10px] font-mono font-semibold"
              style={{ color: a.change.startsWith("+") ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
            >
              {a.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Feature data ─── */
const features = [
  {
    title: "Trade in seconds",
    description: "Results resolve quickly, without waiting or complexity.",
    visual: <TradeInSecondsVisual />,
  },
  {
    title: "Crystal-clear payouts",
    description: "Know exactly what you stand to earn before you commit. No hidden fees, no surprises.",
    visual: <ClearPayoutsVisual />,
  },
  {
    title: "Clear decisions",
    description: "A straightforward up-or-down system, without unnecessary tools.",
    visual: <ClearDecisionsVisual />,
  },
  {
    title: "Global markets",
    description: "Trade across assets, anytime, from anywhere.",
    visual: <GlobalMarketsVisual />,
  },
];

const Features = () => (
  <section className="py-24 px-4">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, hsl(var(--foreground)) 22.5%, hsl(var(--foreground) / 0.7) 100%)",
          }}
        >
          Designed for speed and clarity
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Arcanine provides a trading experience with fast execution, transparent payouts, and effortless
          decision-making.
        </p>
      </div>

      {/* Asymmetric Grid */}
      <div className="grid md:grid-cols-5 gap-5">
        {features.map(({ title, description, visual }, index) => {
          const isSmall = index === 0 || index === 3;
          return (
            <div
              key={title}
              className={`relative rounded-2xl border border-border/40 overflow-hidden flex flex-col h-[320px] ${
                isSmall ? "md:col-span-2" : "md:col-span-3"
              }`}
              style={{
                background:
                  "linear-gradient(180deg, hsl(var(--foreground) / 0.04) 0%, hsl(var(--background) / 0.95) 100%)",
              }}
            >
              {/* Interactive visual */}
              <div className="flex-1">{visual}</div>

              {/* Text pinned to bottom */}
              <div className="p-6 max-w-md">
                <p className="text-base leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{title}.</span> {description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
