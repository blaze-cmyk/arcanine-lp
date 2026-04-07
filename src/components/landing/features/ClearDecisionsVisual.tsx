import { useState } from "react";

const ClearDecisionsVisual = () => {
  const [picked, setPicked] = useState<"up" | "down" | null>(null);

  // Mini price line
  const points = [40, 38, 42, 44, 41, 46, 48, 45, 50, 52, 49, 54, 56, 53, 58, 60, 57, 62, 64, 61];
  const pathD = points
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * 12} ${80 - y}`)
    .join(" ");

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      onMouseLeave={() => setPicked(null)}
    >

      {/* Live price tag */}
      <div className="relative z-10 mb-5">
        <div
          className="rounded-lg px-3 py-1.5 flex items-center gap-2"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.4)",
          }}
        >
          <span className="text-[10px] text-muted-foreground">EUR/USD</span>
          <span className="text-sm font-mono font-bold text-foreground">1.0847</span>
          <span className="text-[10px] font-mono" style={{ color: "hsl(var(--profit))" }}>+0.12%</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="relative z-10 flex gap-3">
        <button
          className="rounded-xl px-6 py-3.5 flex flex-col items-center gap-1 transition-all duration-300 outline-none min-w-[80px]"
          style={{
            background: picked === "up" ? "hsl(var(--profit) / 0.12)" : "hsl(var(--muted) / 0.5)",
            border: `1.5px solid ${picked === "up" ? "hsl(var(--profit) / 0.4)" : "hsl(var(--border) / 0.4)"}`,
            transform: picked === "up" ? "translateY(-2px)" : "translateY(0)",
            boxShadow: picked === "up" ? "0 8px 24px hsl(160 45% 50% / 0.15)" : "none",
          }}
          onMouseEnter={() => setPicked("up")}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3L15 13H3L9 3Z" fill={picked === "up" ? "hsl(160, 45%, 50%)" : "hsl(var(--muted-foreground))"} style={{ transition: "fill 0.3s" }} />
          </svg>
          <span className="text-xs font-semibold transition-colors duration-300" style={{ color: picked === "up" ? "hsl(var(--profit))" : "hsl(var(--muted-foreground))" }}>
            Up
          </span>
        </button>

        <button
          className="rounded-xl px-6 py-3.5 flex flex-col items-center gap-1 transition-all duration-300 outline-none min-w-[80px]"
          style={{
            background: picked === "down" ? "hsl(var(--loss) / 0.12)" : "hsl(var(--muted) / 0.5)",
            border: `1.5px solid ${picked === "down" ? "hsl(var(--loss) / 0.4)" : "hsl(var(--border) / 0.4)"}`,
            transform: picked === "down" ? "translateY(-2px)" : "translateY(0)",
            boxShadow: picked === "down" ? "0 8px 24px hsl(0 55% 55% / 0.15)" : "none",
          }}
          onMouseEnter={() => setPicked("down")}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 15L3 5H15L9 15Z" fill={picked === "down" ? "hsl(0, 55%, 55%)" : "hsl(var(--muted-foreground))"} style={{ transition: "fill 0.3s" }} />
          </svg>
          <span className="text-xs font-semibold transition-colors duration-300" style={{ color: picked === "down" ? "hsl(var(--loss))" : "hsl(var(--muted-foreground))" }}>
            Down
          </span>
        </button>
      </div>

      {/* Result confirmation */}
      <div
        className="relative z-10 mt-3 flex items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-400"
        style={{
          opacity: picked ? 1 : 0,
          transform: picked ? "translateY(0)" : "translateY(8px)",
          background: picked === "up" ? "hsl(var(--profit) / 0.08)" : picked === "down" ? "hsl(var(--loss) / 0.08)" : "transparent",
          border: `1px solid ${picked === "up" ? "hsl(var(--profit) / 0.2)" : picked === "down" ? "hsl(var(--loss) / 0.2)" : "transparent"}`,
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: picked === "up" ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
        />
        <span
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: picked === "up" ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
        >
          {picked === "up" ? "Call placed · 1.85x" : "Put placed · 1.85x"}
        </span>
      </div>
    </div>
  );
};

export default ClearDecisionsVisual;
