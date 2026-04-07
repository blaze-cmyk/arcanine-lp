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
      }, 60);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCountdown(30);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovered]);

  const progress = hovered ? (30 - countdown) / 30 : 0;
  const settled = countdown === 0 && hovered;

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Central timer */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle
              cx="36" cy="36" r="30"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              opacity="0.3"
            />
            <circle
              cx="36" cy="36" r="30"
              fill="none"
              stroke={settled ? "hsl(var(--profit))" : "hsl(var(--primary))"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 30}
              strokeDashoffset={2 * Math.PI * 30 * (1 - progress)}
              transform="rotate(-90 36 36)"
              style={{ transition: settled ? "stroke 0.3s" : "stroke-dashoffset 0.06s linear, stroke 0.3s" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-xl font-bold transition-colors duration-300"
              style={{ color: settled ? "hsl(var(--profit))" : "hsl(var(--foreground))" }}
            >
              {settled ? "✓" : `0:${String(countdown).padStart(2, "0")}`}
            </span>
          </div>
        </div>

        {/* Status label */}
        <div
          className="mt-3 rounded-lg px-3.5 py-1 flex items-center gap-1.5 transition-all duration-300"
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
            {settled ? "Settled" : hovered ? "Executing..." : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TradeInSecondsVisual;
