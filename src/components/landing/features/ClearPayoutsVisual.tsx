import { useState } from "react";

const ClearPayoutsVisual = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none px-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Trade receipt card */}
      <div
        className="w-full max-w-[280px] rounded-xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid hsl(var(--border) / 0.4)",
        }}
      >
        {/* Header */}
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{
            borderBottom: "1px solid hsl(var(--border) / 0.3)",
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold"
              style={{ background: "hsl(var(--profit) / 0.15)", color: "hsl(var(--profit))" }}
            >
              ↑
            </div>
            <span className="text-xs font-semibold text-foreground">EUR/USD · Call</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">01:00</span>
        </div>

        {/* Body rows */}
        <div className="px-4 py-3 space-y-2.5">
          {/* Investment */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Investment</span>
            <span className="text-xs font-mono font-semibold text-foreground">$100.00</span>
          </div>

          {/* Multiplier */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Multiplier</span>
            <span
              className="text-xs font-mono font-semibold transition-colors duration-500"
              style={{ color: hovered ? "hsl(var(--primary))" : "hsl(var(--foreground))" }}
            >
              ×1.85
            </span>
          </div>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: "hsl(var(--border) / 0.3)" }} />

          {/* Payout */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Potential Payout</span>
            <span
              className="text-sm font-mono font-bold transition-all duration-500"
              style={{
                color: hovered ? "hsl(var(--profit))" : "hsl(var(--foreground))",
              }}
            >
              $185.00
            </span>
          </div>

          {/* Fee row — always takes space, just fades in */}
          <div className="flex items-center justify-between">
            <span
              className="text-[10px] text-muted-foreground transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              Platform fee
            </span>
            <span
              className="text-[10px] font-mono text-muted-foreground transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0 }}
            >
              $0.00
            </span>
          </div>
        </div>

        {/* Footer badge */}
        <div
          className="px-4 py-2 flex items-center justify-center gap-1.5 transition-all duration-500"
          style={{
            background: hovered ? "hsl(var(--profit) / 0.06)" : "transparent",
            borderTop: `1px solid ${hovered ? "hsl(var(--profit) / 0.15)" : "hsl(var(--border) / 0.2)"}`,
          }}
        >
          <div
            className="w-1 h-1 rounded-full transition-colors duration-500"
            style={{ background: hovered ? "hsl(var(--profit))" : "hsl(var(--muted-foreground))" }}
          />
          <span
            className="text-[9px] font-semibold uppercase tracking-widest transition-colors duration-500"
            style={{ color: hovered ? "hsl(var(--profit))" : "hsl(var(--muted-foreground))" }}
          >
            {hovered ? "No hidden fees" : "Hover to preview"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClearPayoutsVisual;
