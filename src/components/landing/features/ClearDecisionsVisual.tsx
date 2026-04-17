import { useEffect, useRef, useState } from "react";

/**
 * Compact candlestick chart inspired by the Arcanine Dashboard CustomChart.
 * Zoomed in near the live price with a moving price line and price label —
 * meant to illustrate "real-time charts with zero lag".
 */

const COLORS = {
  gridLine: "rgba(255, 255, 255, 0.05)",
  candleGreen: "#3dbc84",
  candleRed: "#c94545",
  wickGreen: "#3dbc8488",
  wickRed: "#c9454588",
  priceLine: "#18dcb5",
  priceLabelBg: "#18dcb5",
  priceLabelText: "#0c1014",
};

type Candle = { o: number; h: number; l: number; c: number };

const NUM_CANDLES = 28;

const seedCandles = (): Candle[] => {
  const candles: Candle[] = [];
  let price = 1.0847;
  for (let i = 0; i < NUM_CANDLES; i++) {
    const o = price;
    const drift = (Math.random() - 0.48) * 0.0008;
    const c = +(o + drift).toFixed(5);
    const h = Math.max(o, c) + Math.random() * 0.0004;
    const l = Math.min(o, c) - Math.random() * 0.0004;
    candles.push({ o, h, l, c });
    price = c;
  }
  return candles;
};

const ClearDecisionsVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [candles, setCandles] = useState<Candle[]>(seedCandles);
  const [livePrice, setLivePrice] = useState(() => candles[candles.length - 1].c);

  // Tick the live price + occasionally append a new candle
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setLivePrice((prev) => {
        const drift = (Math.random() - 0.5) * 0.00035;
        const next = +(prev + drift).toFixed(5);
        setCandles((cs) => {
          const copy = [...cs];
          const last = { ...copy[copy.length - 1] };
          last.c = next;
          if (next > last.h) last.h = next;
          if (next < last.l) last.l = next;
          copy[copy.length - 1] = last;
          return copy;
        });
        return next;
      });
    }, 280);

    const newCandleInterval = setInterval(() => {
      setCandles((cs) => {
        const last = cs[cs.length - 1];
        const o = last.c;
        const next: Candle = { o, h: o, l: o, c: o };
        return [...cs.slice(1), next];
      });
    }, 4000);

    return () => {
      clearInterval(tickInterval);
      clearInterval(newCandleInterval);
    };
  }, []);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, dpr, 0, 0, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const PRICE_SCALE_W = 56;
    const PADDING_TOP = 14;
    const PADDING_BOTTOM = 14;
    const chartW = W - PRICE_SCALE_W;
    const chartH = H - PADDING_TOP - PADDING_BOTTOM;

    // Price range — zoom near current price
    let min = Infinity;
    let max = -Infinity;
    for (const c of candles) {
      if (c.l < min) min = c.l;
      if (c.h > max) max = c.h;
    }
    if (livePrice < min) min = livePrice;
    if (livePrice > max) max = livePrice;
    const pad = (max - min) * 0.25 || livePrice * 0.0005;
    min -= pad;
    max += pad;

    const priceToY = (p: number) =>
      PADDING_TOP + chartH * (1 - (p - min) / (max - min));

    // Horizontal grid lines
    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const y = PADDING_TOP + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartW, y);
      ctx.stroke();
    }

    // Candles
    const step = chartW / candles.length;
    const candleW = Math.max(2, step * 0.6);
    candles.forEach((c, i) => {
      const x = i * step + step / 2;
      const isUp = c.c >= c.o;
      const color = isUp ? COLORS.candleGreen : COLORS.candleRed;
      const wickColor = isUp ? COLORS.wickGreen : COLORS.wickRed;

      ctx.strokeStyle = wickColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, priceToY(c.h));
      ctx.lineTo(x, priceToY(c.l));
      ctx.stroke();

      const yOpen = priceToY(c.o);
      const yClose = priceToY(c.c);
      const top = Math.min(yOpen, yClose);
      const bodyH = Math.max(1.5, Math.abs(yClose - yOpen));
      ctx.fillStyle = color;
      ctx.fillRect(x - candleW / 2, top, candleW, bodyH);
    });

    // Live price line
    const priceY = priceToY(livePrice);
    ctx.strokeStyle = COLORS.priceLine;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, priceY);
    ctx.lineTo(chartW, priceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Price label on the right
    const labelW = PRICE_SCALE_W - 4;
    const labelH = 20;
    const labelX = chartW + 2;
    const labelY = priceY - labelH / 2;
    ctx.fillStyle = COLORS.priceLabelBg;
    const r = 4;
    ctx.beginPath();
    ctx.moveTo(labelX + r, labelY);
    ctx.lineTo(labelX + labelW - r, labelY);
    ctx.quadraticCurveTo(labelX + labelW, labelY, labelX + labelW, labelY + r);
    ctx.lineTo(labelX + labelW, labelY + labelH - r);
    ctx.quadraticCurveTo(labelX + labelW, labelY + labelH, labelX + labelW - r, labelY + labelH);
    ctx.lineTo(labelX + r, labelY + labelH);
    ctx.quadraticCurveTo(labelX, labelY + labelH, labelX, labelY + labelH - r);
    ctx.lineTo(labelX, labelY + r);
    ctx.quadraticCurveTo(labelX, labelY, labelX + r, labelY);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = COLORS.priceLabelText;
    ctx.font = "600 11px 'Bricolage Grotesque', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(livePrice.toFixed(5), labelX + labelW / 2, labelY + labelH / 2);
  }, [candles, livePrice]);

  const last = candles[candles.length - 1];
  const open = last.o;
  const change = livePrice - open;
  const changePct = (change / open) * 100;
  const up = change >= 0;

  return (
    <div
      className="relative w-full h-full flex flex-col select-none px-5 pt-5"
      style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">EUR / USD</div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tabular-nums text-foreground">{livePrice.toFixed(5)}</span>
            <span
              className="text-[11px] tabular-nums font-medium"
              style={{ color: up ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
            >
              {up ? "+" : ""}{changePct.toFixed(3)}%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-profit opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-profit" />
          </span>
          Live
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};

export default ClearDecisionsVisual;
