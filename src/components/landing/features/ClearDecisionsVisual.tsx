import { useEffect, useRef, useState } from "react";

/**
 * Compact candlestick chart inspired by the Arcanine Dashboard CustomChart.
 * Streams real-time BTCUSDT 1m klines from Binance via WebSocket.
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

type Candle = { o: number; h: number; l: number; c: number; t: number };

const NUM_CANDLES = 30;
const SYMBOL = "BTCUSDT";
const INTERVAL = "1m";

const formatPrice = (p: number) =>
  p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ClearDecisionsVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [livePrice, setLivePrice] = useState<number | null>(null);

  // Fetch initial klines + subscribe to live updates
  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;

    (async () => {
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=${NUM_CANDLES}`
        );
        const raw: unknown[][] = await res.json();
        if (cancelled) return;
        const seeded: Candle[] = raw.map((k) => ({
          t: k[0] as number,
          o: parseFloat(k[1] as string),
          h: parseFloat(k[2] as string),
          l: parseFloat(k[3] as string),
          c: parseFloat(k[4] as string),
        }));
        setCandles(seeded);
        setLivePrice(seeded[seeded.length - 1].c);
      } catch {
        /* ignore */
      }

      // Live kline stream
      ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${SYMBOL.toLowerCase()}@kline_${INTERVAL}`
      );
      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          const k = msg.k;
          if (!k) return;
          const candle: Candle = {
            t: k.t,
            o: parseFloat(k.o),
            h: parseFloat(k.h),
            l: parseFloat(k.l),
            c: parseFloat(k.c),
          };
          setLivePrice(candle.c);
          setCandles((prev) => {
            if (prev.length === 0) return [candle];
            const last = prev[prev.length - 1];
            if (last.t === candle.t) {
              const copy = prev.slice();
              copy[copy.length - 1] = candle;
              return copy;
            }
            // new candle
            return [...prev.slice(-(NUM_CANDLES - 1)), candle];
          });
        } catch {
          /* ignore */
        }
      };
    })();

    return () => {
      cancelled = true;
      try { ws?.close(); } catch { /* noop */ }
    };
  }, []);

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0 || livePrice === null) return;
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

    const PRICE_SCALE_W = 72;
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
    ctx.fillText(formatPrice(livePrice), labelX + labelW / 2, labelY + labelH / 2);
  }, [candles, livePrice]);

  const last = candles[candles.length - 1];
  const open = last?.o ?? 0;
  const price = livePrice ?? open;
  const change = price - open;
  const changePct = open ? (change / open) * 100 : 0;
  const up = change >= 0;

  return (
    <div
      className="relative w-full h-full flex flex-col select-none px-5 pt-5"
      style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">BTC / USDT</div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold tabular-nums text-foreground">
              {livePrice !== null ? `$${formatPrice(livePrice)}` : "—"}
            </span>
            <span
              className="text-[11px] tabular-nums font-medium"
              style={{ color: up ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
            >
              {livePrice !== null ? `${up ? "+" : ""}${changePct.toFixed(3)}%` : ""}
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
