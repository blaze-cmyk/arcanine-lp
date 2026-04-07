import { useState } from "react";

const assets = [
  {
    name: "BTC/USD",
    price: "67,432",
    change: "+2.41%",
    up: true,
    spark: [30, 34, 32, 38, 36, 42, 40, 46, 44, 50, 48, 54],
    payout: "92%",
  },
  {
    name: "EUR/USD",
    price: "1.0847",
    change: "+0.12%",
    up: true,
    spark: [40, 42, 41, 44, 43, 45, 44, 46, 45, 47, 46, 48],
    payout: "88%",
  },
  {
    name: "GOLD",
    price: "2,342.8",
    change: "-0.31%",
    up: false,
    spark: [50, 48, 49, 46, 47, 44, 45, 42, 43, 40, 41, 38],
    payout: "85%",
];

const MiniSparkline = ({ data, color }: { data: number[]; color: string }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 24;
  const pathD = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const GlobalMarketsVisual = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-pointer select-none px-4">
      <div className="w-full max-w-[280px] flex flex-col gap-1.5">
        {/* Header row */}
        <div className="flex items-center justify-between px-3 mb-1">
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Markets</span>
          <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">Payout</span>
        </div>

        {assets.map((asset, i) => (
          <div
            key={asset.name}
            className="rounded-lg px-3 py-2 flex items-center gap-3 transition-all duration-300"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              background: hoveredIdx === i ? "hsl(var(--primary) / 0.06)" : "hsl(var(--muted) / 0.3)",
              border: `1px solid ${hoveredIdx === i ? "hsl(var(--primary) / 0.2)" : "hsl(var(--border) / 0.2)"}`,
              transform: hoveredIdx === i ? "scale(1.02)" : "scale(1)",
            }}
          >
            {/* Asset name + price */}
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-semibold text-foreground block leading-tight">{asset.name}</span>
              <span className="text-[10px] font-mono text-muted-foreground">${asset.price}</span>
            </div>

            {/* Sparkline */}
            <MiniSparkline
              data={asset.spark}
              color={asset.up ? "hsl(160, 45%, 50%)" : "hsl(0, 55%, 55%)"}
            />

            {/* Change */}
            <span
              className="text-[10px] font-mono font-semibold min-w-[48px] text-right"
              style={{ color: asset.up ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
            >
              {asset.change}
            </span>

            {/* Payout badge — appears on hover */}
            <div
              className="rounded-md px-1.5 py-0.5 text-[9px] font-bold transition-all duration-300"
              style={{
                background: hoveredIdx === i ? "hsl(var(--primary) / 0.15)" : "transparent",
                color: hoveredIdx === i ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                opacity: hoveredIdx === i ? 1 : 0.4,
              }}
            >
              {asset.payout}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalMarketsVisual;
