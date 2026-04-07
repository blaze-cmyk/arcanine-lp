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
  const progress = hovered ? 1 - countdown / 30 : 0;

  // Generate a realistic price line path
  const points = [
    0, 2, 1, 4, 3, 6, 5, 8, 6, 10, 8, 7, 11, 9, 13, 12, 14, 11, 15, 13,
    16, 14, 18, 15, 17, 20, 18, 22, 19, 24, 21, 23, 26, 24, 28, 25, 30,
  ];

  const pathD = points
    .map((y, i) => {
      const x = (i / (points.length - 1)) * 280;
      const yPos = 55 - y * 1.4;
      return `${i === 0 ? "M" : "L"}${x},${yPos}`;
    })
    .join(" ");

  const areaD = pathD + ` L280,60 L0,60 Z`;

  // Visible portion of chart based on progress
  const clipWidth = hovered ? 10 + progress * 270 : 280;

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated chart */}
      <div className="absolute inset-0 flex items-end px-3 pb-16">
        <svg viewBox="0 0 280 60" className="w-full h-[70%]" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--profit))" stopOpacity="0.2" />
              <stop offset="100%" stopColor="hsl(var(--profit))" stopOpacity="0" />
            </linearGradient>
            <clipPath id="chartClip">
              <rect x="0" y="0" width={clipWidth} height="60" />
            </clipPath>
          </defs>
          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0" x2="280"
              y1={15 * i + 5} y2={15 * i + 5}
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}
          <g clipPath="url(#chartClip)">
            <path d={areaD} fill="url(#chartGrad)" />
            <path
              d={pathD}
              fill="none"
              stroke="hsl(var(--profit))"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-opacity duration-300"
              style={{ opacity: hovered ? 1 : 0.4 }}
            />
          </g>
          {/* Current price dot */}
          {hovered && (
            <g>
              <circle
                cx={clipWidth}
                cy={55 - points[Math.min(Math.floor((clipWidth / 280) * (points.length - 1)), points.length - 1)] * 1.4}
                r="3"
                fill="hsl(var(--profit))"
                className="animate-pulse"
              />
              <circle
                cx={clipWidth}
                cy={55 - points[Math.min(Math.floor((clipWidth / 280) * (points.length - 1)), points.length - 1)] * 1.4}
                r="6"
                fill="hsl(var(--profit))"
                opacity="0.2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Top bar — trade info */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <div
          className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-all duration-300"
          style={{
            background: "hsl(var(--card) / 0.8)",
            border: "1px solid hsl(var(--border) / 0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="w-4 h-4 rounded-full" style={{ background: "linear-gradient(135deg, #F7931A, #FF9500)" }} />
          <span className="text-[11px] font-semibold text-foreground">BTC/USD</span>
          <span className="text-[10px] font-mono-num" style={{ color: "hsl(var(--profit))" }}>+2.41%</span>
        </div>

        {/* Timer pill */}
        <div
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 transition-all duration-500"
          style={{
            background: settled
              ? "hsl(var(--profit) / 0.1)"
              : hovered
              ? "hsl(var(--primary) / 0.08)"
              : "hsl(var(--card) / 0.8)",
            border: `1px solid ${
              settled
                ? "hsl(var(--profit) / 0.3)"
                : hovered
                ? "hsl(var(--primary) / 0.15)"
                : "hsl(var(--border) / 0.3)"
            }`,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
            style={{
              background: settled
                ? "hsl(var(--profit))"
                : hovered
                ? "hsl(var(--primary))"
                : "hsl(var(--muted-foreground))",
            }}
          />
          <span
            className="text-[11px] font-mono-num font-semibold tabular-nums transition-colors duration-300"
            style={{
              color: settled
                ? "hsl(var(--profit))"
                : hovered
                ? "hsl(var(--foreground))"
                : "hsl(var(--muted-foreground))",
            }}
          >
            {settled ? "Done" : `0:${String(countdown).padStart(2, "0")}`}
          </span>
        </div>
      </div>

      {/* Bottom trade panel */}
      <div
        className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-2 transition-all duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div
          className="flex-1 rounded-lg px-3 py-2 flex items-center justify-between"
          style={{
            background: "hsl(var(--card) / 0.8)",
            border: "1px solid hsl(var(--border) / 0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Entry</span>
            <span className="text-[11px] font-mono-num font-semibold text-foreground">$67,432.50</span>
          </div>
          <div className="w-px h-6" style={{ background: "hsl(var(--border) / 0.3)" }} />
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Payout</span>
            <span
              className="text-[11px] font-mono-num font-bold transition-colors duration-300"
              style={{ color: settled ? "hsl(var(--profit))" : "hsl(var(--foreground))" }}
            >
              {settled ? "+$85.00" : "$185.00"}
            </span>
          </div>
        </div>

        {/* Direction indicator */}
        <div
          className="rounded-lg px-2.5 py-2 flex items-center justify-center"
          style={{
            background: "hsl(var(--profit) / 0.1)",
            border: "1px solid hsl(var(--profit) / 0.25)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2L12 9H2L7 2Z" fill="hsl(var(--profit))" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TradeInSecondsVisual;
