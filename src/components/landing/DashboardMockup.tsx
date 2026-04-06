import { useState, useEffect, useRef, useCallback } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  HelpCircle,
  User,
  Trophy,
  Store,
  MoreHorizontal,
  Plus,
  Minus,
  ChevronDown,
  Pencil,
  Scissors,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/arcanine-logo.png";

/* ── Asset configs with distinct chart personalities ── */
const ASSETS = [
  { symbol: "BTC/USD", payout: 92, basePrice: 67432.5, volatility: 80, decimals: 2 },
  { symbol: "ETH/USD", payout: 88, basePrice: 3521.8, volatility: 25, decimals: 2 },
  { symbol: "GOLD", payout: 85, basePrice: 2341.6, volatility: 8, decimals: 2 },
];

const SIDEBAR_ITEMS = [
  { icon: BarChart3, label: "TRADE", active: true },
  { icon: HelpCircle, label: "SUPPORT" },
  { icon: User, label: "ACCOUNT" },
  { icon: Trophy, label: "TOURNEYS" },
  { icon: Store, label: "MARKET" },
  { icon: MoreHorizontal, label: "MORE" },
];

/* ── Chart constants (matching Fair Trade Exchange) ── */
const COLORS = {
  bg: '#0f1113',
  gridLine: 'rgba(255, 255, 255, 0.06)',
  priceScaleBg: '#0f1113',
  priceScaleBorder: '#1a1c24',
  timeScaleBg: '#0f1113',
  candleGreen: '#22c55e',
  candleRed: '#ef4444',
  wickGreen: '#22c55e88',
  wickRed: '#ef444488',
  priceLine: '#2dd4bf',
  priceLabel: '#14b8a6',
  textMuted: '#3a3f50',
  textLight: '#6b7280',
  crosshairLine: '#252830',
  crosshairLabel: '#1a1c24',
  crosshairText: '#d1d5db',
};

const CANDLE_WIDTH_BASE = 7;
const CANDLE_GAP = 3;
const PRICE_SCALE_WIDTH = 75;
const TIME_SCALE_HEIGHT = 26;
const PADDING_TOP = 50;
const PADDING_BOTTOM = 10;

/* ── Pre-baked candle data for each asset ── */
interface Candle { o: number; h: number; l: number; c: number; time: number }
const CANDLE_CACHE: Record<number, Candle[]> = {};

function getCandlesForAsset(index: number): Candle[] {
  if (CANDLE_CACHE[index]) return CANDLE_CACHE[index];

  const asset = ASSETS[index];
  const candles: Candle[] = [];
  let price = asset.basePrice;

  const patterns: number[][] = [
    // BTC: rally → pullback → consolidation → breakout
    [1,1,1,0.5,1.2,-0.3,-0.8,-1,-0.5,0.2,0.1,-0.1,0.3,0.2,0.1,0,-0.1,0.2,0.5,0.8,1.2,1.5,1,-0.5,-1.2,-0.8,0.3,0.5,0.8,1,1.3,0.7,0.2,-0.3,-0.6,-0.2,0.4,0.8,1.2,1.5,2,1.8,1.2,0.5,-0.2,0.3,0.6,1,1.5,0.8,0.3,-0.4,0.2,0.5,0.9],
    // ETH: choppy downtrend with dead cat bounces
    [-0.5,-0.8,-1.2,-0.3,0.8,1.2,0.5,-0.6,-1,-1.5,-0.8,0.3,0.6,0.2,-0.4,-0.9,-1.3,-1.6,-0.5,0.9,1.5,1,0.2,-0.8,-1.2,-0.6,-0.2,0.1,-0.5,-0.8,-1.1,-0.3,0.5,0.8,0.3,-0.4,-0.7,-1,-1.4,-0.6,0.2,0.7,1.1,0.4,-0.3,-0.8,-1.2,-0.5,0.1,0.4,0.2,-0.3,-0.6,-0.9,-0.4],
    // GOLD: slow steady uptrend, tight range
    [0.2,0.1,0.3,0.2,0.1,0.15,0.25,0.1,-0.05,0.1,0.2,0.3,0.15,0.1,0.05,0.2,0.1,-0.1,-0.15,0.05,0.15,0.2,0.25,0.3,0.2,0.1,0.15,0.2,0.1,0.05,0.15,0.2,0.25,0.1,0.05,-0.05,0.1,0.2,0.15,0.1,0.25,0.3,0.2,0.1,0.15,0.2,0.05,0.1,0.15,0.2,0.1,0.05,0.15,0.2,0.25],
  ];

  const pattern = patterns[index];
  const baseTime = Math.floor(Date.now() / 1000) - 55 * 60;

  for (let i = 0; i < 55; i++) {
    const open = price;
    const direction = pattern[i % pattern.length];
    const change = direction * asset.volatility * (0.6 + Math.sin(i * 1.7 + index * 5) * 0.4);
    const close = open + change;
    const wickUp = Math.abs(change) * (0.3 + Math.abs(Math.sin(i * 2.3 + index * 3)) * 0.5);
    const wickDown = Math.abs(change) * (0.3 + Math.abs(Math.cos(i * 1.9 + index * 7)) * 0.5);
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;
    candles.push({ o: open, h: high, l: low, c: close, time: baseTime + i * 60 });
    price = close;
  }

  CANDLE_CACHE[index] = candles;
  return candles;
}

/* ── Helpers (from Fair Trade Exchange) ── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function formatPrice(price: number): string {
  if (price >= 1000) return price.toFixed(2);
  if (price >= 1) return price.toFixed(4);
  return price.toFixed(6);
}

function calculatePriceStep(range: number): number {
  const raw = range / 8;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const normalized = raw / mag;
  if (normalized <= 1) return mag;
  if (normalized <= 2) return 2 * mag;
  if (normalized <= 5) return 5 * mag;
  return 10 * mag;
}

function calculateTimeStep(candleStep: number): number {
  const pixelsPerLabel = 80;
  return Math.max(1, Math.round(pixelsPerLabel / candleStep));
}

/* ── Candlestick Chart (canvas — ported from Fair Trade Exchange) ── */
const CandlestickChart = ({ assetIndex }: { assetIndex: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const crosshairRef = useRef<{ x: number; y: number } | null>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 2;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const candles = getCandlesForAsset(assetIndex);
    const step = CANDLE_WIDTH_BASE + CANDLE_GAP;
    const candleW = CANDLE_WIDTH_BASE;
    const chartWidth = width - PRICE_SCALE_WIDTH;

    // Calculate visible range
    const totalWidth = candles.length * step;
    const effectiveOffset = totalWidth - chartWidth + step * 8;
    const startIdx = Math.max(0, Math.floor(effectiveOffset / step) - 2);
    const endIdx = Math.min(candles.length - 1, Math.ceil((effectiveOffset + chartWidth) / step) + 2);

    // Price range
    let minPrice = Infinity, maxPrice = -Infinity;
    for (let i = startIdx; i <= endIdx && i < candles.length; i++) {
      if (candles[i].l < minPrice) minPrice = candles[i].l;
      if (candles[i].h > maxPrice) maxPrice = candles[i].h;
    }
    const padding = (maxPrice - minPrice) * 0.06;
    minPrice -= padding;
    maxPrice += padding;

    const priceToY = (p: number) => {
      const chartH = height - TIME_SCALE_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
      return PADDING_TOP + chartH * (1 - (p - minPrice) / (maxPrice - minPrice));
    };

    const yToPrice = (y: number) => {
      const chartH = height - TIME_SCALE_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
      return minPrice + (1 - (y - PADDING_TOP) / chartH) * (maxPrice - minPrice);
    };

    // Background
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    const priceRange = maxPrice - minPrice;
    const priceStep = calculatePriceStep(priceRange);
    const firstPrice = Math.ceil(minPrice / priceStep) * priceStep;

    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 0.5;
    ctx.setLineDash([]);

    for (let p = firstPrice; p <= maxPrice; p += priceStep) {
      const y = priceToY(p);
      if (y < PADDING_TOP || y > height - TIME_SCALE_HEIGHT) continue;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();
    }

    // Vertical grid
    const timeStep = calculateTimeStep(step);
    for (let i = startIdx; i <= endIdx; i++) {
      if (i % timeStep !== 0) continue;
      const x = (i * step) - effectiveOffset + step / 2;
      if (x < 0 || x > chartWidth) continue;
      ctx.beginPath();
      ctx.moveTo(x, PADDING_TOP);
      ctx.lineTo(x, height - TIME_SCALE_HEIGHT);
      ctx.stroke();
    }

    // Draw candles
    for (let i = startIdx; i <= endIdx && i < candles.length; i++) {
      const candle = candles[i];
      const x = (i * step) - effectiveOffset;
      const centerX = x + step / 2;
      if (centerX < -candleW * 2 || centerX > chartWidth + candleW * 2) continue;

      const isGreen = candle.c >= candle.o;
      const openY = priceToY(candle.o);
      const closeY = priceToY(candle.c);
      const highY = priceToY(candle.h);
      const lowY = priceToY(candle.l);

      // Wick
      ctx.strokeStyle = isGreen ? COLORS.wickGreen : COLORS.wickRed;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, highY);
      ctx.lineTo(centerX, lowY);
      ctx.stroke();

      // Body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(1, Math.abs(closeY - openY));
      ctx.fillStyle = isGreen ? COLORS.candleGreen : COLORS.candleRed;
      ctx.fillRect(Math.round(centerX - candleW / 2), Math.round(bodyTop), Math.round(candleW), Math.round(bodyHeight));

      // Live timer badge on last candle
      if (i === candles.length - 1) {
        const livePriceY = priceToY(candle.c);
        const badgeW2 = 40, badgeH2 = 16;
        const badgeX2 = chartWidth - badgeW2 - 6;
        const timerY2 = livePriceY - badgeH2 - 8;
        ctx.fillStyle = 'rgba(30, 35, 48, 0.95)';
        roundRect(ctx, badgeX2, timerY2, badgeW2, badgeH2, 4);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.lineWidth = 0.5;
        roundRect(ctx, badgeX2, timerY2, badgeW2, badgeH2, 4);
        ctx.stroke();
        ctx.fillStyle = '#d1d5db';
        ctx.font = "9px 'JetBrains Mono', monospace";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('00:34', badgeX2 + badgeW2 / 2, timerY2 + badgeH2 / 2);
      }
    }

    // Current price line
    const lastPrice = candles[candles.length - 1].c;
    const priceY = priceToY(lastPrice);
    ctx.strokeStyle = COLORS.priceLine;
    ctx.lineWidth = 1;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(0, priceY);
    ctx.lineTo(chartWidth, priceY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Arrow on price line pointing to scale
    ctx.fillStyle = COLORS.priceLine;
    ctx.beginPath();
    ctx.moveTo(chartWidth - 6, priceY - 4);
    ctx.lineTo(chartWidth, priceY);
    ctx.lineTo(chartWidth - 6, priceY + 4);
    ctx.closePath();
    ctx.fill();

    // "Beginning of trade" preview line
    const tradeStartIdx = candles.length - 1;
    const tradeStartX = (tradeStartIdx * step) - effectiveOffset + step / 2;
    if (tradeStartX > 0 && tradeStartX < chartWidth) {
      ctx.strokeStyle = COLORS.priceLine;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(tradeStartX, PADDING_TOP);
      ctx.lineTo(tradeStartX, height - TIME_SCALE_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // "Beginning of trade" label with right chevron, vertically centered
      const labelText2 = 'Beginning of trade';
      ctx.font = "10px 'Inter', sans-serif";
      const textW = ctx.measureText(labelText2).width;
      const chevronW = 8;
      const totalW = textW + chevronW + 4;
      const labelY = PADDING_TOP + (height - TIME_SCALE_HEIGHT - PADDING_TOP) / 2;

      ctx.fillStyle = COLORS.priceLine;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(labelText2, tradeStartX - 6 - chevronW - 2, labelY);

      // Right chevron arrow
      ctx.strokeStyle = COLORS.priceLine;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tradeStartX - 10, labelY - 4);
      ctx.lineTo(tradeStartX - 6, labelY);
      ctx.lineTo(tradeStartX - 10, labelY + 4);
      ctx.stroke();
    }

    // "End of trade" preview line
    const tradeEndX = tradeStartX + step * 10;
    if (tradeEndX > 0 && tradeEndX < chartWidth + 50) {
      ctx.strokeStyle = 'rgba(160, 170, 190, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(tradeEndX, PADDING_TOP);
      ctx.lineTo(tradeEndX, height - TIME_SCALE_HEIGHT);
      ctx.stroke();

      ctx.fillStyle = 'rgba(160, 170, 190, 0.5)';
      ctx.font = "10px 'Inter', sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillText('End of trade', tradeEndX + 6, PADDING_TOP - 4);

      // Stop square
      ctx.fillStyle = 'rgba(160, 170, 190, 0.4)';
      ctx.fillRect(tradeEndX - 4, PADDING_TOP - 17, 8, 8);
    }

    // Price scale
    ctx.fillStyle = COLORS.priceScaleBg;
    ctx.fillRect(chartWidth, 0, PRICE_SCALE_WIDTH, height);
    ctx.strokeStyle = COLORS.priceScaleBorder;
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(chartWidth, 0);
    ctx.lineTo(chartWidth, height);
    ctx.stroke();

    ctx.fillStyle = COLORS.textMuted;
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let p = firstPrice; p <= maxPrice; p += priceStep) {
      const y = priceToY(p);
      if (y < PADDING_TOP || y > height - TIME_SCALE_HEIGHT) continue;
      if (Math.abs(y - priceY) > 18) {
        ctx.fillText(formatPrice(p), width - 8, y);
      }
    }

    // Current price label on scale
    const labelText = formatPrice(lastPrice);
    const labelH = 22;
    ctx.fillStyle = COLORS.priceLabel;
    roundRect(ctx, chartWidth + 1, priceY - labelH / 2, PRICE_SCALE_WIDTH - 2, labelH, 4);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(labelText, chartWidth + PRICE_SCALE_WIDTH / 2, priceY);

    // Time scale
    ctx.fillStyle = COLORS.timeScaleBg;
    ctx.fillRect(0, height - TIME_SCALE_HEIGHT, width, TIME_SCALE_HEIGHT);
    ctx.strokeStyle = COLORS.priceScaleBorder;
    ctx.beginPath();
    ctx.moveTo(0, height - TIME_SCALE_HEIGHT);
    ctx.lineTo(width, height - TIME_SCALE_HEIGHT);
    ctx.stroke();

    ctx.fillStyle = COLORS.textMuted;
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = startIdx; i <= endIdx; i++) {
      if (i % timeStep !== 0 || i >= candles.length) continue;
      const x = (i * step) - effectiveOffset + step / 2;
      if (x < 20 || x > chartWidth - 20) continue;
      const date = new Date(candles[i].time * 1000);
      const label = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      ctx.fillText(label, x, height - TIME_SCALE_HEIGHT / 2);
    }

    // Glow dot at current price
    const dotX = ((candles.length - 1) * step) - effectiveOffset + step / 2;
    ctx.beginPath();
    ctx.arc(dotX, priceY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.priceLine;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(dotX, priceY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(45,212,191,0.15)";
    ctx.fill();

    // Crosshair
    const ch = crosshairRef.current;
    if (ch && ch.x < chartWidth && ch.y < height - TIME_SCALE_HEIGHT && ch.y > PADDING_TOP) {
      ctx.strokeStyle = COLORS.crosshairLine;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(ch.x, PADDING_TOP);
      ctx.lineTo(ch.x, height - TIME_SCALE_HEIGHT);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, ch.y);
      ctx.lineTo(chartWidth, ch.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Price label on crosshair
      const crossPrice = yToPrice(ch.y);
      const crossLabel = formatPrice(crossPrice);
      const crossLabelH = 20;
      ctx.fillStyle = COLORS.crosshairLabel;
      roundRect(ctx, chartWidth + 1, ch.y - crossLabelH / 2, PRICE_SCALE_WIDTH - 2, crossLabelH, 3);
      ctx.fill();
      ctx.fillStyle = COLORS.crosshairText;
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(crossLabel, chartWidth + PRICE_SCALE_WIDTH / 2, ch.y);

      // Time label on crosshair
      const candleIdx = Math.round((ch.x + effectiveOffset) / step);
      if (candleIdx >= 0 && candleIdx < candles.length) {
        const date = new Date(candles[candleIdx].time * 1000);
        const timeLabel = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        const timeLabelW = 48;
        const timeLabelH = 18;
        ctx.fillStyle = COLORS.crosshairLabel;
        roundRect(ctx, ch.x - timeLabelW / 2, height - TIME_SCALE_HEIGHT + 1, timeLabelW, timeLabelH, 3);
        ctx.fill();
        ctx.fillStyle = COLORS.crosshairText;
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillText(timeLabel, ch.x, height - TIME_SCALE_HEIGHT + 1 + timeLabelH / 2);

        // OHLC tooltip
        const c = candles[candleIdx];
        const isGreen = c.c >= c.o;
        const labels = [
          { label: 'Open:', value: formatPrice(c.o) },
          { label: 'Close:', value: formatPrice(c.c) },
          { label: 'High:', value: formatPrice(c.h) },
          { label: 'Low:', value: formatPrice(c.l) },
        ];
        const lineH = 15;
        const boxH = labels.length * lineH + 10;
        const boxW = 140;
        const boxX = 46;
        const boxY = height - TIME_SCALE_HEIGHT - boxH - 22;

        ctx.fillStyle = 'rgba(15, 17, 19, 0.92)';
        roundRect(ctx, boxX, boxY, boxW, boxH, 5);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.lineWidth = 0.5;
        roundRect(ctx, boxX, boxY, boxW, boxH, 5);
        ctx.stroke();

        labels.forEach(({ label, value }, idx) => {
          const ly = boxY + 8 + idx * lineH;
          ctx.font = "10px 'Inter', sans-serif";
          ctx.textAlign = 'left';
          ctx.textBaseline = 'top';
          ctx.fillStyle = '#6b7280';
          ctx.fillText(label, boxX + 8, ly);
          ctx.fillStyle = isGreen ? '#22c55e' : '#ef4444';
          ctx.textAlign = 'right';
          ctx.fillText(value, boxX + boxW - 8, ly);
        });
      }
    }
  }, [assetIndex]);

  useEffect(() => {
    const loop = () => {
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const chartWidth = rect.width - PRICE_SCALE_WIDTH;
    crosshairRef.current = x < chartWidth ? { x, y } : null;
  }, []);

  const handleMouseLeave = useCallback(() => {
    crosshairRef.current = null;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block', cursor: 'crosshair' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

/* ── Main Dashboard Mockup ── */
const DashboardMockup = () => {
  const [activeAsset, setActiveAsset] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(60);
  const [investment, setInvestment] = useState(100);
  const [prices, setPrices] = useState<Record<string, number>>(
    Object.fromEntries(ASSETS.map((a) => [a.symbol, a.basePrice]))
  );
  const [bullPct, setBullPct] = useState(62);

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
  const currentAsset = ASSETS[activeAsset];
  const currentPrice = prices[currentAsset.symbol];
  const payoutAmount = (investment * currentAsset.payout / 100).toFixed(2);
  const timeDisplay = `${String(Math.floor(timeSeconds / 60)).padStart(2, '0')}:${String(timeSeconds % 60).padStart(2, '0')}`;

  const adjustTime = (delta: number) => {
    setTimeSeconds(prev => {
      const next = prev + delta;
      if (next < 20) return 20;
      if (next > 60) return 60;
      return next;
    });
  };

  const adjustInvestment = (delta: number) => {
    setInvestment(prev => Math.max(1, prev + delta));
  };

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
          <div className="flex items-center gap-1.5 mr-auto">
            <img src={logo} alt="Arcanine" className="h-5 w-auto" />
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


            {/* Canvas chart */}
            <div className="w-full h-full">
              <CandlestickChart assetIndex={activeAsset} />
            </div>
          </div>

          {/* Trade panel (right) */}
          <div className="hidden md:flex w-[220px] flex-col bg-card border-l border-border flex-shrink-0 overflow-hidden">
            {/* Pair info */}
            <div className="px-2.5 py-2 border-b border-border">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground text-[10px]">
                  {currentAsset.symbol}
                </span>
                <span className="text-primary text-[10px] font-bold">
                  {currentAsset.payout}%
                </span>
              </div>
              <div className="font-mono-num text-lg font-bold mt-0.5">
                ${currentPrice?.toFixed(currentAsset.decimals)}
              </div>
            </div>

            {/* Time selector */}
            <div className="px-2.5 py-2 border-b border-border">
              <fieldset className="border border-border rounded-md px-2 pb-1.5 pt-0">
                <legend className="text-[8px] text-muted-foreground px-0.5">
                  Time
                </legend>
                <div className="flex items-center gap-1">
                  <button onClick={() => adjustTime(-5)} className="w-6 h-6 rounded bg-primary/15 flex items-center justify-center text-primary hover:bg-primary/25 transition-colors">
                    <Minus size={10} />
                  </button>
                  <span className="flex-1 text-center text-[11px] font-bold font-mono-num">
                    {timeDisplay}
                  </span>
                  <button onClick={() => adjustTime(5)} className="w-6 h-6 rounded bg-primary/15 flex items-center justify-center text-primary hover:bg-primary/25 transition-colors">
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
                  <button onClick={() => adjustInvestment(-10)} className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Minus size={10} />
                  </button>
                  <span className="flex-1 text-center text-[11px] font-bold font-mono-num">
                    {investment} $
                  </span>
                  <button onClick={() => adjustInvestment(10)} className="w-5 h-5 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Plus size={10} />
                  </button>
                </div>
              </fieldset>
              <div className="flex justify-between text-[8px] mt-1.5 px-1">
                <span className="text-muted-foreground">Payout</span>
                <span className="text-profit font-bold font-mono-num">
                  +${payoutAmount}
                </span>
              </div>
              <div className="flex justify-between text-[8px] px-1 mt-0.5">
                <span className="text-muted-foreground">Fee ({100 - currentAsset.payout}%)</span>
                <span className="text-muted-foreground font-mono-num">
                  -${((investment * (100 - currentAsset.payout)) / 100).toFixed(2)}
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
