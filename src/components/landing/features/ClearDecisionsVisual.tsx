import { useState, useEffect, useRef } from "react";

const ClearDecisionsVisual = () => {
  const [picked, setPicked] = useState<"up" | "down" | null>(null);
  const [priceOffset, setPriceOffset] = useState(0);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  // Animate price movement on pick
  useEffect(() => {
    if (!picked) {
      setPriceOffset(0);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    startRef.current = performance.now();
    const direction = picked === "up" ? 1 : -1;
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPriceOffset(direction * eased * 18);
      if (progress < 1) animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [picked]);

  const basePrice = 1.0847;
  const currentPrice = (basePrice + priceOffset * 0.0001).toFixed(4);
  const priceDelta = (priceOffset * 0.0001).toFixed(4);
  const isPositive = priceOffset >= 0;

  // Mini sparkline points
  const sparkBase = [40, 38, 42, 39, 41, 37, 40, 38, 43, 41, 39, 42, 40];
  const sparkPoints = sparkBase.map((y, i) => {
    const shift = 0;
    return { x: i * 22, y: y + shift };
  });
  const sparkD = sparkPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      onMouseLeave={() => setPicked(null)}
    >
      {/* Ambient glow behind selected direction */}
      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          opacity: picked ? 1 : 0,
          background: picked === "up"
            ? "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(var(--profit) / 0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 60% at 50% 70%, hsl(var(--loss) / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Sparkline background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <svg viewBox="0 0 264 80" className="w-full h-[60%]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="decisionSparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={picked === "down" ? "hsl(var(--loss))" : "hsl(var(--profit))"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={picked === "down" ? "hsl(var(--loss))" : "hsl(var(--profit))"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={sparkD + " L264,60 L0,60 Z"} fill="url(#decisionSparkGrad)" className="transition-all duration-700" />
          <path
            d={sparkD}
            fill="none"
            stroke={picked === "down" ? "hsl(var(--loss))" : "hsl(var(--profit))"}
            strokeWidth="1.5"
            className="transition-all duration-700"
          />
        </svg>
      </div>

      {/* Live price display */}
      <div className="relative z-10 mb-5 flex flex-col items-center">
        <div
          className="rounded-xl px-4 py-2.5 flex flex-col items-center gap-1 transition-all duration-500"
          style={{
            background: "hsl(var(--card) / 0.8)",
            border: `1px solid ${picked ? (isPositive ? "hsl(var(--profit) / 0.2)" : "hsl(var(--loss) / 0.2)") : "hsl(var(--border) / 0.3)"}`,
            backdropFilter: "blur(12px)",
            transform: picked ? "scale(1.05)" : "scale(1)",
          }}
        >
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground">EUR / USD</span>
          <span
            className="text-xl font-display tabular-nums font-bold tabular-nums transition-colors duration-300"
            style={{ color: picked ? (isPositive ? "hsl(var(--profit))" : "hsl(var(--loss))") : "hsl(var(--foreground))" }}
          >
            {currentPrice}
          </span>
          <span
            className="text-[10px] font-display tabular-nums transition-all duration-300"
            style={{
              color: isPositive ? "hsl(var(--profit))" : "hsl(var(--loss))",
              opacity: picked ? 1 : 0.5,
            }}
          >
            {isPositive ? "+" : ""}{priceDelta}
          </span>
        </div>
      </div>

      {/* Decision buttons */}
      <div className="relative z-10 flex gap-3">
        {(["up", "down"] as const).map((dir) => {
          const isActive = picked === dir;
          const color = dir === "up" ? "--profit" : "--loss";
          return (
            <button
              key={dir}
              className="group/btn relative rounded-xl px-5 py-3 flex flex-col items-center gap-1.5 transition-all duration-400 outline-none min-w-[76px] overflow-hidden"
              style={{
                background: isActive ? `hsl(var(${color}) / 0.12)` : "hsl(var(--muted) / 0.4)",
                border: `1.5px solid ${isActive ? `hsl(var(${color}) / 0.4)` : "hsl(var(--border) / 0.3)"}`,
                transform: isActive ? "translateY(-3px) scale(1.04)" : "translateY(0) scale(1)",
                boxShadow: isActive
                  ? `0 8px 30px hsl(var(${color}) / 0.2), 0 0 0 1px hsl(var(${color}) / 0.1)`
                  : "none",
              }}
              onMouseEnter={() => setPicked(dir)}
            >
              {/* Glow sweep on active */}
              <div
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  opacity: isActive ? 1 : 0,
                  background: `radial-gradient(ellipse at 50% 100%, hsl(var(${color}) / 0.15) 0%, transparent 70%)`,
                }}
              />

              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative z-10">
                {dir === "up" ? (
                  <path d="M8 2L14 12H2L8 2Z" fill={isActive ? `hsl(var(${color}))` : "hsl(var(--muted-foreground))"} style={{ transition: "fill 0.3s" }} />
                ) : (
                  <path d="M8 14L2 4H14L8 14Z" fill={isActive ? `hsl(var(${color}))` : "hsl(var(--muted-foreground))"} style={{ transition: "fill 0.3s" }} />
                )}
              </svg>
              <span
                className="text-[10px] font-bold uppercase tracking-wider relative z-10 transition-colors duration-300"
                style={{ color: isActive ? `hsl(var(${color}))` : "hsl(var(--muted-foreground))" }}
              >
                {dir === "up" ? "Call" : "Put"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Confirmation tag */}
      <div
        className="relative z-10 mt-3 flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-500"
        style={{
          opacity: picked ? 1 : 0,
          transform: picked ? "translateY(0) scale(1)" : "translateY(6px) scale(0.95)",
          background: picked === "up" ? "hsl(var(--profit) / 0.08)" : picked === "down" ? "hsl(var(--loss) / 0.08)" : "transparent",
          border: `1px solid ${picked === "up" ? "hsl(var(--profit) / 0.2)" : picked === "down" ? "hsl(var(--loss) / 0.2)" : "transparent"}`,
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: picked === "up" ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
        />
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: picked === "up" ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
        >
          {picked === "up" ? "Call · 1.92x payout" : "Put · 1.92x payout"}
        </span>
      </div>
    </div>
  );
};

export default ClearDecisionsVisual;
