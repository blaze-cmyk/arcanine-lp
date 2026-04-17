import { useState } from "react";

type Asset = {
  symbol: string;
  name: string;
  price: string;
  changePct: string;
  changeUp: boolean;
  volume: string;
  volumePct: string;
  volumeUp: boolean;
  profit1m: string;
  profit5m: string;
  iconBg: string;
  iconLetter: string;
  iconColor: string;
};

const assets: Asset[] = [
  {
    symbol: "BTC/USDT",
    name: "Bitcoin",
    price: "$67,432.10",
    changePct: "+2.41%",
    changeUp: true,
    volume: "$3.39M",
    volumePct: "+6.73%",
    volumeUp: true,
    profit1m: "92%",
    profit5m: "94%",
    iconBg: "linear-gradient(135deg, #F7931A, #FFB347)",
    iconLetter: "₿",
    iconColor: "#fff",
  },
  {
    symbol: "ETH/USDT",
    name: "Ethereum",
    price: "$3,247.85",
    changePct: "-1.82%",
    changeUp: false,
    volume: "$920K",
    volumePct: "-39.39%",
    volumeUp: false,
    profit1m: "88%",
    profit5m: "90%",
    iconBg: "linear-gradient(135deg, #627EEA, #8FA4F3)",
    iconLetter: "Ξ",
    iconColor: "#fff",
  },
  {
    symbol: "SOL/USDT",
    name: "Solana",
    price: "$184.62",
    changePct: "+0.17%",
    changeUp: true,
    volume: "$204K",
    volumePct: "-9.1%",
    volumeUp: false,
    profit1m: "93%",
    profit5m: "95%",
    iconBg: "linear-gradient(135deg, #9945FF, #14F195)",
    iconLetter: "S",
    iconColor: "#fff",
  },
];

const GlobalMarketsVisual = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-pointer select-none px-4">
      <div className="w-full max-w-[320px] flex flex-col gap-1.5">
        {/* Header row */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_0.6fr] items-center gap-2 px-3 pb-1.5 mb-0.5 border-b border-border/30">
          <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground">Market</span>
          <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground text-right">LTP</span>
          <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground text-right">Volume</span>
          <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground text-right">1m</span>
          <span className="text-[8px] font-medium uppercase tracking-wider text-muted-foreground text-right">5m</span>
        </div>

        {assets.map((asset, i) => (
          <div
            key={asset.symbol}
            className="grid grid-cols-[1.4fr_1fr_1fr_0.6fr_0.6fr] items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              background: hoveredIdx === i ? "hsl(var(--primary) / 0.06)" : "hsl(var(--muted) / 0.3)",
              border: `1px solid ${hoveredIdx === i ? "hsl(var(--primary) / 0.2)" : "hsl(var(--border) / 0.2)"}`,
              transform: hoveredIdx === i ? "scale(1.02)" : "scale(1)",
            }}
          >
            {/* Market: icon + symbol/name */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                style={{ background: asset.iconBg, color: asset.iconColor }}
              >
                {asset.iconLetter}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold text-foreground leading-tight truncate">{asset.symbol}</div>
                <div className="text-[8px] text-muted-foreground leading-tight truncate">{asset.name}</div>
              </div>
            </div>

            {/* LTP: price + change% */}
            <div className="text-right">
              <div className="text-[10px] font-display tabular-nums font-semibold text-foreground leading-tight">{asset.price}</div>
              <div
                className="text-[9px] font-display tabular-nums leading-tight"
                style={{ color: asset.changeUp ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
              >
                {asset.changePct}
              </div>
            </div>

            {/* Volume: volume + volume% */}
            <div className="text-right">
              <div
                className="text-[10px] font-display tabular-nums font-semibold leading-tight"
                style={{ color: asset.volumeUp ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
              >
                {asset.volume}
              </div>
              <div
                className="text-[9px] font-display tabular-nums leading-tight"
                style={{ color: asset.volumeUp ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
              >
                {asset.volumePct}
              </div>
            </div>

            {/* Profit 1m */}
            <div
              className="text-[10px] font-display tabular-nums font-bold text-right"
              style={{ color: "hsl(var(--accent))" }}
            >
              {asset.profit1m}
            </div>

            {/* Profit 5m */}
            <div
              className="text-[10px] font-display tabular-nums font-bold text-right"
              style={{ color: "hsl(var(--accent))" }}
            >
              {asset.profit5m}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalMarketsVisual;
