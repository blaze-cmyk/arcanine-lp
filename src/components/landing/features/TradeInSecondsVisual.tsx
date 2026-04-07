import { useState, useEffect, useRef } from "react";

const TradeInSecondsVisual = () => {
  const [hovered, setHovered] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (hovered) {
      setCountdown(30);
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 30);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCountdown(30);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered]);

  const settled = countdown === 0 && hovered;

  // Smooth price line
  const points = [40, 42, 38, 44, 39, 43, 37, 42, 38, 45, 41, 47, 43, 48, 44, 50, 46, 52, 48, 50];
  const pathD = points
    .map((y, i) => {
      const x = (i / (points.length - 1)) * 260;
      const yPos = 70 - y * 0.9;
      return `${i === 0 ? "M" : "L"}${x},${yPos}`;
    })
    .join(" ");
  const areaD = pathD + " L260,70 L0,70 Z";

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Chart background — always visible, subtle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <svg viewBox="0 0 260 70" className="w-full h-[55%] opacity-25" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tisFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--profit))" stopOpacity="0.25" />
              <stop offset="100%" stopColor="hsl(var(--profit))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#tisFill)" />
          <path d={pathD} fill="none" stroke="hsl(var(--profit))" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Asset tag */}
        <div
          className="rounded-lg px-3 py-1.5 flex items-center gap-2 mb-4 transition-all duration-500"
          style={{
            background: "hsl(var(--card) / 0.8)",
            border: "1px solid hsl(var(--border) / 0.3)",
          }}
        >
          <span className="text-[10px] text-muted-foreground">BTC/USD</span>
          <span className="text-xs font-mono-num font-bold text-foreground">$67,432</span>
        </div>

        {/* Timer */}
        <span
          className="text-3xl font-display font-bold tabular-nums transition-colors duration-500"
          style={{
            color: settled
              ? "hsl(var(--profit))"
              : hovered
              ? "hsl(var(--foreground))"
              : "hsl(var(--muted-foreground))",
          }}
        >
          {settled ? "0:00" : `0:${String(countdown).padStart(2, "0")}`}
        </span>

        {/* Status tag */}
        <div
          className="mt-3 rounded-lg px-4 py-1.5 flex items-center gap-2 transition-all duration-500"
          style={{
            background: settled
              ? "hsl(var(--profit) / 0.1)"
              : hovered
              ? "hsl(var(--primary) / 0.08)"
              : "hsl(var(--muted) / 0.5)",
            border: `1px solid ${
              settled
                ? "hsl(var(--profit) / 0.25)"
                : hovered
                ? "hsl(var(--primary) / 0.2)"
                : "hsl(var(--border) / 0.3)"
            }`,
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
            style={{
              background: settled
                ? "hsl(var(--profit))"
                : hovered
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
            }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-wider transition-colors duration-500"
            style={{
              color: settled
                ? "hsl(var(--profit))"
                : hovered
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
            }}
          >
            {settled ? "Trade settled" : hovered ? "Executing..." : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TradeInSecondsVisual;
