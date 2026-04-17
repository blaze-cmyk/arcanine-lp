import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Faithful port of the Arcanine Dashboard CustomChart visual style,
 * trimmed for a landing-page card. Streams BTCUSDT 1m klines from Binance.
 */

type Candle = { time: number; open: number; high: number; low: number; close: number };
type BinanceKline = [number, string, string, string, string, ...unknown[]];

const COLORS = {
  bg: "#111118",
  gridLine: "rgba(255, 255, 255, 0.06)",
  priceScaleBg: "#111118",
  priceScaleBorder: "#1a1a24",
  candleGreen: "#3dbc84",
  candleRed: "#c94545",
  wickGreen: "#3dbc8488",
  wickRed: "#c9454588",
  priceLine: "#18dcb5",
  priceLabel: "#18dcb5",
  textMuted: "#ffffff",
  textLight: "#6b7280",
};

const CANDLE_WIDTH = 7;
const CANDLE_GAP = 3;
const CANDLE_STEP = CANDLE_WIDTH + CANDLE_GAP;
const PRICE_SCALE_WIDTH = 64;
const TIME_SCALE_HEIGHT = 22;
const PADDING_TOP = 12;
const PADDING_BOTTOM = 6;
const SYMBOL = "BTCUSDT";
const INTERVAL = "1m";
const NUM_CANDLES = 60;
const REST_ENDPOINTS = [
  "https://api.binance.com",
  "https://data-api.binance.vision",
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const formatPrice = (p: number) =>
  p.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatTime = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

const isBinanceKlineArray = (data: unknown): data is BinanceKline[] =>
  Array.isArray(data) &&
  data.length > 0 &&
  Array.isArray(data[0]) &&
  data[0].length >= 5;

const seedFallbackCandles = (latest: Candle, count = NUM_CANDLES): Candle[] => {
  const range = Math.max(latest.high - latest.low, latest.close * 0.0006, 8);

  return Array.from({ length: count }, (_, index) => {
    const t = index / Math.max(1, count - 1);
    const wave = Math.sin(t * Math.PI * 3.2) * range * 0.18;
    const drift = (t - 0.5) * range * 0.12;
    const close = latest.close + wave + drift;
    const open = close - Math.cos(t * Math.PI * 2.4) * range * 0.08;
    const high = Math.max(open, close) + range * 0.06;
    const low = Math.min(open, close) - range * 0.06;

    return {
      time: latest.time - (count - 1 - index) * 60,
      open,
      high,
      low,
      close,
    };
  });
};

function calculatePriceStep(range: number): number {
  if (range <= 0) return 1;
  const rough = range / 5;
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  let step;
  if (norm < 1.5) step = 1;
  else if (norm < 3) step = 2;
  else if (norm < 7) step = 5;
  else step = 10;
  return step * pow;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const ClearDecisionsVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const candlesRef = useRef<Candle[]>([]);
  const priceRef = useRef<number>(0);
  const smoothPriceRef = useRef<number>(0);
  const animRef = useRef<number>(0);
  const [, force] = useState(0);
  const [headerPrice, setHeaderPrice] = useState<number | null>(null);
  const [openPrice, setOpenPrice] = useState<number | null>(null);

  const interactRef = useRef({
    offsetX: 0,
    scaleX: 1,
    scaleY: 1,
    isDraggingChart: false,
    isDraggingPrice: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartOffsetX: 0,
    dragStartScaleY: 1,
  });

  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;

    const applySeed = (seeded: Candle[]) => {
      candlesRef.current = seeded;
      const last = seeded[seeded.length - 1];
      priceRef.current = last.close;
      smoothPriceRef.current = last.close;
      setHeaderPrice(last.close);
      setOpenPrice(seeded[0].open);
      force((n) => n + 1);
    };

    (async () => {
      let seeded: Candle[] | null = null;

      for (const endpoint of REST_ENDPOINTS) {
        try {
          const res = await fetch(
            `${endpoint}/api/v3/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=${NUM_CANDLES}`,
            { cache: "no-store" }
          );
          if (!res.ok) continue;

          const raw: unknown = await res.json();
          if (!isBinanceKlineArray(raw)) continue;

          seeded = raw.map((k) => ({
            time: Math.floor(k[0] / 1000),
            open: parseFloat(k[1]),
            high: parseFloat(k[2]),
            low: parseFloat(k[3]),
            close: parseFloat(k[4]),
          }));
          break;
        } catch {
          continue;
        }
      }

      if (cancelled) return;
      if (seeded && seeded.length > 0) {
        applySeed(seeded);
      }

      ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${SYMBOL.toLowerCase()}@kline_${INTERVAL}`
      );

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          const k = payload?.k;
          if (!k) return;

          const c: Candle = {
            time: Math.floor(k.t / 1000),
            open: parseFloat(k.o),
            high: parseFloat(k.h),
            low: parseFloat(k.l),
            close: parseFloat(k.c),
          };

          priceRef.current = c.close;
          setHeaderPrice(c.close);

          const arr = candlesRef.current;
          if (arr.length === 0) {
            applySeed(seedFallbackCandles(c));
            return;
          }

          const last = arr[arr.length - 1];
          if (last.time === c.time) {
            candlesRef.current = [...arr.slice(0, -1), c];
          } else {
            candlesRef.current = [...arr.slice(-(NUM_CANDLES - 1)), c];
          }
        } catch {
          /* noop */
        }
      };
    })();

    return () => {
      cancelled = true;
      try { ws?.close(); } catch { /* noop */ }
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    if (!W || !H) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (priceRef.current > 0) {
      smoothPriceRef.current =
        smoothPriceRef.current === 0
          ? priceRef.current
          : lerp(smoothPriceRef.current, priceRef.current, 0.25);
    }

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);

    const candles = candlesRef.current;
    if (candles.length === 0) {
      ctx.fillStyle = COLORS.textLight;
      ctx.font = "12px 'Bricolage Grotesque', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Connecting to BTC/USDT feed…", W / 2, H / 2);
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    const chartW = W - PRICE_SCALE_WIDTH;
    const chartH = H - TIME_SCALE_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

    const it = interactRef.current;
    const step = CANDLE_STEP * it.scaleX;
    const candleW = Math.max(1, CANDLE_WIDTH * it.scaleX);

    const rightGap = step * 6;
    const visibleCount = Math.max(4, Math.floor((chartW - rightGap) / step));
    const offsetCandles = Math.round(it.offsetX / step);
    const baseEnd = candles.length - 1;
    const endIdx = Math.min(baseEnd, Math.max(visibleCount - 1, baseEnd - offsetCandles));
    const startIdx = Math.max(0, endIdx - visibleCount + 1);

    let minPrice = Infinity;
    let maxPrice = -Infinity;
    for (let i = startIdx; i <= endIdx; i++) {
      if (candles[i].low < minPrice) minPrice = candles[i].low;
      if (candles[i].high > maxPrice) maxPrice = candles[i].high;
    }
    const live = smoothPriceRef.current;
    if (live > 0 && endIdx === baseEnd) {
      if (live < minPrice) minPrice = live;
      if (live > maxPrice) maxPrice = live;
    }
    const liveCandle = candles[endIdx];
    const candleRange = Math.max(liveCandle.high - liveCandle.low, liveCandle.open * 0.00035, 1);
    const basePadding = (maxPrice - minPrice) * 0.08;
    const livePadding = candleRange * 2.5;
    const padding = Math.max(basePadding, livePadding, (live || liveCandle.close) * 0.0002, 1);
    let rawMin = minPrice - padding;
    let rawMax = maxPrice + padding;
    const center = (rawMin + rawMax) / 2;
    const half = (rawMax - rawMin) / 2 / Math.max(0.001, it.scaleY);
    rawMin = center - half;
    rawMax = center + half;
    minPrice = rawMin;
    maxPrice = rawMax;

    if (Math.abs(maxPrice - minPrice) < 0.0001) {
      minPrice -= candleRange;
      maxPrice += candleRange;
    }

    const priceToY = (p: number) =>
      PADDING_TOP + chartH * (1 - (p - minPrice) / Math.max(maxPrice - minPrice, 0.0001));

    // Grid
    const priceRange = maxPrice - minPrice;
    const priceStep = calculatePriceStep(priceRange);
    const firstPrice = Math.ceil(minPrice / priceStep) * priceStep;

    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([]);
    for (let p = firstPrice; p <= maxPrice; p += priceStep) {
      const y = priceToY(p);
      if (y < PADDING_TOP || y > H - TIME_SCALE_HEIGHT) continue;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartW, y);
      ctx.stroke();
    }

    // Vertical grid every ~5 candles
    const timeStep = 5;
    for (let i = startIdx; i <= endIdx; i++) {
      if (i % timeStep !== 0) continue;
      const x = (i - startIdx) * step + step / 2;
      ctx.beginPath();
      ctx.moveTo(x, PADDING_TOP);
      ctx.lineTo(x, H - TIME_SCALE_HEIGHT);
      ctx.stroke();
    }

    // Candles
    for (let i = startIdx; i <= endIdx; i++) {
      const c = candles[i];
      const centerX = (i - startIdx) * step + step / 2;
      const isGreen = c.close >= c.open;
      const openY = priceToY(c.open);
      const closeY = priceToY(c.close);
      const highY = priceToY(c.high);
      const lowY = priceToY(c.low);

      ctx.strokeStyle = isGreen ? COLORS.wickGreen : COLORS.wickRed;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, highY);
      ctx.lineTo(centerX, lowY);
      ctx.stroke();

      const bodyTop = Math.min(openY, closeY);
      const bodyH = Math.max(1, Math.abs(closeY - openY));
      ctx.fillStyle = isGreen ? COLORS.candleGreen : COLORS.candleRed;
      ctx.fillRect(Math.round(centerX - candleW / 2), Math.round(bodyTop), Math.round(candleW), Math.round(bodyH));
    }

    // Live price line + right-edge arrow
    if (live > 0) {
      const py = priceToY(live);
      ctx.strokeStyle = COLORS.priceLine;
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(chartW, py);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = COLORS.priceLine;
      ctx.beginPath();
      ctx.moveTo(chartW - 6, py - 4);
      ctx.lineTo(chartW, py);
      ctx.lineTo(chartW - 6, py + 4);
      ctx.closePath();
      ctx.fill();
    }

    // Live countdown badge above price line
    {
      const last = candles[endIdx];
      const nowMs = Date.now();
      const candleEndMs = (last.time + 60) * 1000;
      const secsLeft = Math.max(0, Math.ceil((candleEndMs - nowMs) / 1000));
      const timerText = `00:${String(secsLeft).padStart(2, "0")}`;
      const py = priceToY(live || last.close);
      const bw = 40;
      const bh = 16;
      const bx = chartW - bw - 6;
      const by = py - bh - 8;
      ctx.fillStyle = "rgba(30, 35, 48, 0.95)";
      roundRect(ctx, bx, by, bw, bh, 4);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 0.5;
      roundRect(ctx, bx, by, bw, bh, 4);
      ctx.stroke();
      ctx.fillStyle = "#d1d5db";
      ctx.font = "9px 'Bricolage Grotesque', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(timerText, bx + bw / 2, by + bh / 2);
    }

    // Price scale
    ctx.fillStyle = COLORS.priceScaleBg;
    ctx.fillRect(chartW, 0, PRICE_SCALE_WIDTH, H);
    ctx.strokeStyle = COLORS.priceScaleBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(chartW, 0);
    ctx.lineTo(chartW, H);
    ctx.stroke();

    ctx.fillStyle = COLORS.textMuted;
    ctx.font = "9px 'Bricolage Grotesque', sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let p = firstPrice; p <= maxPrice; p += priceStep) {
      const y = priceToY(p);
      if (y < PADDING_TOP || y > H - TIME_SCALE_HEIGHT) continue;
      ctx.fillText(formatPrice(p), W - 6, y);
    }

    // Live price label
    if (live > 0) {
      const py = priceToY(live);
      const labelH = 18;
      ctx.fillStyle = COLORS.priceLabel;
      roundRect(ctx, chartW + 1, py - labelH / 2, PRICE_SCALE_WIDTH - 2, labelH, 4);
      ctx.fill();
      ctx.fillStyle = "#1a1a2e";
      ctx.font = "bold 10px 'Bricolage Grotesque', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(formatPrice(live), chartW + PRICE_SCALE_WIDTH / 2, py);
    }

    // Time scale
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, H - TIME_SCALE_HEIGHT, W, TIME_SCALE_HEIGHT);
    ctx.strokeStyle = COLORS.priceScaleBorder;
    ctx.beginPath();
    ctx.moveTo(0, H - TIME_SCALE_HEIGHT);
    ctx.lineTo(W, H - TIME_SCALE_HEIGHT);
    ctx.stroke();

    ctx.fillStyle = COLORS.textLight;
    ctx.font = "9px 'Bricolage Grotesque', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (let i = startIdx; i <= endIdx; i++) {
      if (i % timeStep !== 0) continue;
      const x = (i - startIdx) * step + step / 2;
      if (x < 16 || x > chartW - 16) continue;
      ctx.fillText(formatTime(new Date(candles[i].time * 1000)), x, H - TIME_SCALE_HEIGHT / 2);
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  // Wheel zoom (X axis), passive:false so we can preventDefault scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const it = interactRef.current;
      const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
      it.scaleX = Math.min(4, Math.max(0.4, it.scaleX * factor));
    };
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", onWheel);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const it = interactRef.current;
    const chartW = rect.width - PRICE_SCALE_WIDTH;
    if (x >= chartW) {
      it.isDraggingPrice = true;
      it.dragStartY = e.clientY;
      it.dragStartScaleY = it.scaleY;
      canvas.style.cursor = "ns-resize";
    } else {
      it.isDraggingChart = true;
      it.dragStartX = e.clientX;
      it.dragStartOffsetX = it.offsetX;
      canvas.style.cursor = "grabbing";
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const it = interactRef.current;
    if (it.isDraggingChart) {
      const dx = e.clientX - it.dragStartX;
      it.offsetX = Math.max(0, it.dragStartOffsetX + dx);
    } else if (it.isDraggingPrice) {
      const dy = e.clientY - it.dragStartY;
      // drag down → zoom out, drag up → zoom in
      const factor = Math.exp(-dy / 120);
      it.scaleY = Math.min(6, Math.max(0.3, it.dragStartScaleY * factor));
    } else {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const chartW = rect.width - PRICE_SCALE_WIDTH;
      canvas.style.cursor = x >= chartW ? "ns-resize" : "grab";
    }
  };

  const endDrag = () => {
    const canvas = canvasRef.current;
    const it = interactRef.current;
    it.isDraggingChart = false;
    it.isDraggingPrice = false;
    if (canvas) canvas.style.cursor = "grab";
  };

  const onDoubleClick = () => {
    const it = interactRef.current;
    it.offsetX = 0;
    it.scaleX = 1;
    it.scaleY = 1;
  };

  const change = headerPrice !== null && openPrice !== null ? headerPrice - openPrice : 0;
  const changePct = openPrice ? (change / openPrice) * 100 : 0;
  const up = change >= 0;

  return (
    <div
      className="absolute inset-0 select-none"
      style={{
        fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        background: COLORS.bg,
      }}
    >
      {/* Floating header */}
      <div className="absolute top-3 left-4 right-4 z-10 flex items-start justify-between pointer-events-none">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">BTC / USDT · 1m</div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold tabular-nums text-foreground">
              {headerPrice !== null ? `$${formatPrice(headerPrice)}` : "—"}
            </span>
            <span
              className="text-[10px] tabular-nums font-medium"
              style={{ color: up ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
            >
              {headerPrice !== null ? `${up ? "+" : ""}${changePct.toFixed(3)}%` : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-profit opacity-75 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-profit" />
          </span>
          Live
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onDoubleClick={onDoubleClick}
      />
    </div>
  );
};

export default ClearDecisionsVisual;
