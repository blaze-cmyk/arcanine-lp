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

  

  // Mini candlestick data
  const candles = [
    { o: 60, c: 45, h: 65, l: 40 },
    { o: 45, c: 55, h: 60, l: 42 },
    { o: 55, c: 50, h: 58, l: 46 },
    { o: 50, c: 62, h: 66, l: 48 },
    { o: 62, c: 58, h: 68, l: 55 },
    { o: 58, c: 70, h: 74, l: 56 },
    { o: 70, c: 65, h: 75, l: 62 },
    { o: 65, c: 72, h: 78, l: 63 },
    { o: 72, c: 68, h: 76, l: 66 },
    { o: 68, c: 78, h: 82, l: 66 },
    { o: 78, c: 74, h: 80, l: 70 },
    { o: 74, c: 82, h: 86, l: 72 },
  ];

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Candlestick chart background */}
      <svg
        viewBox="0 0 240 100"
        className="absolute inset-0 w-full h-full opacity-20"
        preserveAspectRatio="none"
      >
        {candles.map((c, i) => {
          const x = 10 + i * 19;
          const green = c.c > c.o;
          const color = green ? "hsl(160, 45%, 50%)" : "hsl(0, 55%, 55%)";
          const bodyTop = Math.min(c.o, c.c);
          const bodyBot = Math.max(c.o, c.c);
          return (
            <g key={i}>
              <line x1={x} x2={x} y1={100 - c.h} y2={100 - c.l} stroke={color} strokeWidth="1" opacity="0.6" />
              <rect x={x - 4} y={100 - bodyBot} width="8" height={Math.max(bodyBot - bodyTop, 1)} fill={color} rx="1" />
            </g>
          );
        })}
      </svg>

      {/* Central timer */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-[90px] h-[90px] flex items-center justify-center">
          <svg width="90" height="90" viewBox="0 0 90 90" className="absolute inset-0">
            <circle
              cx="45" cy="45" r="38"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2.5"
              opacity="0.4"
            />
          </svg>
          <span
            className="font-display text-2xl font-bold transition-colors duration-300"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {`0:${String(countdown).padStart(2, "0")}`}
          </span>
        </div>

        {/* Trade status bar */}
        <div
          className="mt-3 rounded-lg px-4 py-1.5 flex items-center gap-2 transition-all duration-300"
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
            className="text-[10px] font-semibold uppercase tracking-wider transition-colors duration-300"
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

      {/* Floating price tag */}
      <div
        className="absolute top-4 right-4 rounded-lg px-2.5 py-1 transition-all duration-500"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.4)",
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <span className="text-[10px] font-mono text-muted-foreground">BTC/USD</span>
        <span
          className="block text-xs font-mono font-bold transition-colors duration-300"
          style={{ color: settled ? "hsl(var(--profit))" : "hsl(var(--foreground))" }}
        >
          $67,432.50
        </span>
      </div>
    </div>
  );
};

export default TradeInSecondsVisual;
