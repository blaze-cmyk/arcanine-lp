import { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  HelpCircle,
  User,
  Trophy,
  Store,
  MoreHorizontal,
  Bell,
  Plus,
  Minus,
  ChevronDown,
  Pencil,
  Scissors,
} from "lucide-react";

/* ── Static data ── */
const ASSETS = [
  { symbol: "BTC/USD", payout: 92 },
  { symbol: "ETH/USD", payout: 88 },
  { symbol: "GOLD", payout: 85 },
];

const BASE_PRICES: Record<string, number> = {
  "BTC/USD": 67432.5,
  "ETH/USD": 3521.8,
  GOLD: 2341.6,
};

const SIDEBAR_ITEMS = [
  { icon: BarChart3, label: "TRADE", active: true },
  { icon: HelpCircle, label: "SUPPORT" },
  { icon: User, label: "ACCOUNT" },
  { icon: Trophy, label: "TOURNEYS" },
  { icon: Store, label: "MARKET" },
  { icon: MoreHorizontal, label: "MORE" },
];

/* ── Candlestick Chart (canvas) ── */
const CandlestickChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = 2;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    // Generate realistic candle data
    const candles: { o: number; h: number; l: number; c: number }[] = [];
    let price = 67400;
    for (let i = 0; i < 55; i++) {
      const open = price;
      const change = (Math.random() - 0.48) * 80;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 40;
      const low = Math.min(open, close) - Math.random() * 40;
      candles.push({ o: open, h: high, l: low, c: close });
      price = close;
    }

    const candleW = 7;
    const gap = 3;
    const step = candleW + gap;
    const chartW = w - 65; // price scale width
    const chartH = h - 22; // time scale height
    const padTop = 16;

    // Price range
    let minP = Infinity, maxP = -Infinity;
    candles.forEach((c) => {
      if (c.l < minP) minP = c.l;
      if (c.h > maxP) maxP = c.h;
    });
    const padding = (maxP - minP) * 0.08;
    minP -= padding;
    maxP += padding;

    const priceToY = (p: number) =>
      padTop + (chartH - padTop) * (1 - (p - minP) / (maxP - minP));

    // Background
    ctx.fillStyle = "#0f1113";
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 0.5;
    const priceStep = Math.ceil((maxP - minP) / 6);
    for (let p = Math.ceil(minP); p < maxP; p += priceStep) {
      const y = priceToY(p);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartW, y);
      ctx.stroke();
    }

    // Draw candles
    const startX = chartW - candles.length * step;
    candles.forEach((c, i) => {
      const x = startX + i * step + step / 2;
      const isGreen = c.c >= c.o;
      const color = isGreen ? "#22c55e" : "#ef4444";
      const wickColor = isGreen ? "rgba(34,197,94,0.5)" : "rgba(239,68,68,0.5)";

      // Wick
      ctx.strokeStyle = wickColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, priceToY(c.h));
      ctx.lineTo(x, priceToY(c.l));
      ctx.stroke();

      // Body
      const bodyTop = priceToY(Math.max(c.o, c.c));
      const bodyBot = priceToY(Math.min(c.o, c.c));
      const bodyH = Math.max(1, bodyBot - bodyTop);
      ctx.fillStyle = color;
      ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
    });

    // Current price line
    const lastPrice = candles[candles.length - 1].c;
    const priceY = priceToY(lastPrice);
    ctx.setLineDash([4, 3]);
    ctx.strokeStyle = "#2dd4bf";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, priceY);
    ctx.lineTo(chartW, priceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Price label on right
    ctx.fillStyle = "#14b8a6";
    const labelH = 18;
    ctx.fillRect(chartW, priceY - labelH / 2, 65, labelH);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 10px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(lastPrice.toFixed(2), chartW + 32, priceY);

    // Price scale labels
    ctx.fillStyle = "#3a3f50";
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    for (let p = Math.ceil(minP); p < maxP; p += priceStep) {
      const y = priceToY(p);
      if (Math.abs(y - priceY) > 14) {
        ctx.fillText(p.toFixed(0), w - 4, y + 3);
      }
    }

    // Time scale
    ctx.fillStyle = "#0f1113";
    ctx.fillRect(0, chartH, w, 22);
    ctx.fillStyle = "#3a3f50";
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    for (let i = 5; i < candles.length; i += 10) {
      const x = startX + i * step + step / 2;
      const h2 = Math.floor(Math.random() * 24);
      const m2 = Math.floor(Math.random() * 60);
      ctx.fillText(
        `${String(h2).padStart(2, "0")}:${String(m2).padStart(2, "0")}`,
        x,
        chartH + 14
      );
    }

    // Glow dot at current price
    const dotX = startX + (candles.length - 1) * step + step / 2;
    ctx.beginPath();
    ctx.arc(dotX, priceY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = "#2dd4bf";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(dotX, priceY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(45,212,191,0.2)";
    ctx.fill();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

/* ── Main Dashboard Mockup ── */
const DashboardMockup = () => {
  const [activeAsset, setActiveAsset] = useState(0);
  const [prices, setPrices] = useState(BASE_PRICES);
  const [bullPct, setBullPct] = useState(62);

  // Tick prices
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          next[key] = +(next[key] + (Math.random() - 0.5) * next[key] * 0.0008).toFixed(2);
        }
        return next;
      });
      setBullPct((p) => Math.max(30, Math.min(75, p + Math.floor((Math.random() - 0.48) * 4))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const bearPct = 100 - bullPct;

  return (
    <div className="flex h-[420px] sm:h-[480px] bg-[#0f1113] rounded-none overflow-hidden select-none text-[#f5f5f7]">
      {/* Sidebar */}
      <div className="hidden sm:flex w-[52px] flex-col items-center py-3 bg-card border-r border-border flex-shrink-0">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg mb-0.5 transition-colors ${
                item.active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Icon size={16} strokeWidth={item.active ? 2.2 : 1.6} />
              <span className="text-[7px] mt-0.5 font-medium tracking-wide">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Balance header */}
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border bg-card">
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-[10px]">A</span>
            </div>
            <span
              className="text-foreground font-bold text-xs tracking-wider hidden sm:block"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}
            >
              ARCANINE
            </span>
          </div>
          <div className="relative text-muted-foreground">
            <Bell size={16} />
            <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-destructive rounded-full text-[7px] font-bold flex items-center justify-center text-destructive-foreground">
              5
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-secondary rounded-md px-2.5 py-1.5 border border-border">
            <div className="text-left">
              <div className="text-[7px] text-primary font-bold uppercase tracking-wider">
                DEMO ACCOUNT
              </div>
              <div className="text-[11px] font-bold text-foreground font-mono-num">
                $10,000.00
              </div>
            </div>
            <ChevronDown size={10} className="text-muted-foreground" />
          </div>
          <button className="hidden sm:flex items-center gap-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[10px] px-3 py-1.5 rounded-md transition-colors">
            <Plus size={12} strokeWidth={3} />
            Deposit
          </button>
        </div>

        {/* Chart area */}
        <div className="flex-1 flex min-h-0">
          {/* Probability bar */}
          <div className="hidden sm:flex flex-col items-center justify-between h-full py-2 w-5 flex-shrink-0 bg-[#0f1113]">
            <span className="text-[9px] font-bold text-loss font-mono-num">
              {bearPct}%
            </span>
            <div className="flex-1 w-[3px] rounded-full overflow-hidden flex flex-col my-1">
              <div
                className="transition-all duration-700"
                style={{
                  background: "linear-gradient(to bottom, #ef4444, #dc2626)",
                  flexBasis: `${bearPct}%`,
                }}
              />
              <div
                className="transition-all duration-700"
                style={{
                  background: "linear-gradient(to bottom, #16a34a, #22c55e)",
                  flexBasis: `${bullPct}%`,
                }}
              />
            </div>
            <span className="text-[9px] font-bold text-profit font-mono-num">
              {bullPct}%
            </span>
          </div>

          {/* Chart + tabs */}
          <div className="flex-1 relative min-w-0">
            {/* Asset tabs */}
            <div className="absolute top-1.5 left-1.5 right-1.5 z-10 flex items-center gap-1">
              <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0">
                <Plus size={13} />
              </div>
              {ASSETS.map((asset, i) => (
                <button
                  key={asset.symbol}
                  onClick={() => setActiveAsset(i)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all flex-shrink-0 ${
                    activeAsset === i
                      ? "bg-secondary border border-primary/30 text-foreground"
                      : "bg-card/60 text-muted-foreground border border-transparent hover:bg-secondary"
                  }`}
                >
                  <span>{asset.symbol}</span>
                  <span
                    className={`text-[9px] ${
                      asset.payout >= 90
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {asset.payout}%
                  </span>
                </button>
              ))}
            </div>

            {/* Chart toolbar (bottom-left) */}
            <div className="absolute bottom-[28px] left-1.5 z-10 flex flex-col gap-0.5">
              {[
                <Pencil size={11} key="p" />,
                <span className="text-[8px] font-semibold font-mono-num" key="t">
                  1m
                </span>,
                <CandleIcon key="c" />,
                <Scissors size={11} className="rotate-90" key="s" />,
              ].map((icon, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded bg-card/90 border border-border/60 flex items-center justify-center text-muted-foreground"
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Connection status */}
            <div className="absolute top-[36px] left-2 z-10 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-profit" />
              <span className="text-[8px] text-muted-foreground">
                {new Date().toLocaleTimeString()} UTC
              </span>
            </div>

            {/* Canvas chart */}
            <div className="w-full h-full">
              <CandlestickChart />
            </div>
          </div>

          {/* Trade panel (right) */}
          <div className="hidden md:flex w-[220px] flex-col bg-card border-l border-border flex-shrink-0 overflow-hidden">
            {/* Pair info */}
            <div className="px-2.5 py-2 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-[10px]">
                  {ASSETS[activeAsset].symbol}
                </span>
                <span className="text-primary text-[10px] font-bold">
                  {ASSETS[activeAsset].payout}%
                </span>
              </div>
              <div className="font-mono-num text-lg font-bold mt-0.5">
                ${prices[ASSETS[activeAsset].symbol]?.toFixed(2)}
              </div>
            </div>

            {/* Time selector */}
            <div className="px-2.5 py-2 border-b border-border">
              <fieldset className="border border-border rounded-md px-2 pb-1.5 pt-0">
                <legend className="text-[8px] text-muted-foreground px-0.5">
                  Time
                </legend>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 rounded bg-primary/15 flex items-center justify-center text-primary">
                    <Minus size={10} />
                  </button>
                  <span className="flex-1 text-center text-[11px] font-bold font-mono-num">
                    01:00
                  </span>
                  <button className="w-6 h-6 rounded bg-primary/15 flex items-center justify-center text-primary">
                    <Plus size={10} />
                  </button>
                </div>
              </fieldset>
            </div>

            {/* Investment */}
            <div className="px-2.5 py-2 border-b border-border">
              <fieldset className="border border-border rounded-md px-2 pb-1.5 pt-0">
                <legend className="text-[8px] text-muted-foreground px-0.5">
                  Investment
                </legend>
                <div className="flex items-center gap-1">
                  <button className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground">
                    <Minus size={10} />
                  </button>
                  <span className="flex-1 text-center text-[11px] font-bold font-mono-num">
                    100 $
                  </span>
                  <button className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground">
                    <Plus size={10} />
                  </button>
                </div>
              </fieldset>
              {/* Payout info */}
              <div className="flex justify-between text-[8px] mt-1.5 px-1">
                <span className="text-muted-foreground">Payout</span>
                <span className="text-profit font-bold font-mono-num">
                  +$90.00
                </span>
              </div>
              <div className="flex justify-between text-[8px] px-1 mt-0.5">
                <span className="text-muted-foreground">Fee (10%)</span>
                <span className="text-muted-foreground font-mono-num">
                  -$10.00
                </span>
              </div>
            </div>

            {/* UP / DOWN buttons */}
            <div className="px-2.5 py-2 space-y-1.5 mt-auto">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-profit/15 border border-profit/30 text-profit font-bold text-sm hover:bg-profit/25 transition-all">
                <TrendingUp size={16} />
                UP
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-loss/15 border border-loss/30 text-loss font-bold text-sm hover:bg-loss/25 transition-all">
                <TrendingDown size={16} />
                DOWN
              </button>
            </div>

            {/* Trades / Orders tabs */}
            <div className="border-t border-border mt-auto">
              <div className="flex">
                <button className="flex-1 py-1.5 text-[9px] font-bold text-primary border-b-2 border-primary">
                  Trades
                </button>
                <button className="flex-1 py-1.5 text-[9px] font-bold text-muted-foreground">
                  Orders
                </button>
              </div>
              <div className="px-2.5 py-2 text-center text-[9px] text-muted-foreground">
                No active trades
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Small candle icon for toolbar ── */
function CandleIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="4" width="2.5" height="5" rx="0.3" fill="currentColor" opacity="0.9" />
      <line x1="3.25" y1="2" x2="3.25" y2="11" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
      <rect x="5.75" y="3" width="2.5" height="6" rx="0.3" fill="currentColor" opacity="0.9" />
      <line x1="7" y1="1" x2="7" y2="12" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
      <rect x="9.5" y="5" width="2.5" height="4" rx="0.3" fill="currentColor" opacity="0.9" />
      <line x1="10.75" y1="3" x2="10.75" y2="11" stroke="currentColor" strokeWidth="0.7" opacity="0.5" />
    </svg>
  );
}

export default DashboardMockup;
