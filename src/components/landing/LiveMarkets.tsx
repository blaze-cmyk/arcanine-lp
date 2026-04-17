import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import btcIcon from "@/assets/icons/btc.png";
import ethIcon from "@/assets/icons/eth.png";
import solIcon from "@/assets/icons/sol.png";
import aaplIcon from "@/assets/icons/aapl.svg";
import tslaIcon from "@/assets/icons/tsla.svg";
import nvdaIcon from "@/assets/icons/nvda.svg";

type Asset = {
  symbol: string;          // display symbol
  name: string;            // display name (e.g. "Bitcoin")
  category: "crypto" | "stock" | "forex" | "commodity";
  icon?: string;           // image URL (cryptologos.cc) — preferred
  initial?: string;        // fallback letter/glyph
  binanceSymbol?: string;  // for crypto
  yahooSymbol?: string;    // for everything else
  decimals: number;
  prefix?: string;
  compact?: boolean;       // format big numbers like 77.6K
};

const ASSETS: Asset[] = [
  { symbol: "BTC",  name: "Bitcoin",     category: "crypto",
    icon: btcIcon,
    binanceSymbol: "BTCUSDT", decimals: 2, prefix: "$", compact: true },
  { symbol: "ETH",  name: "Ethereum",    category: "crypto",
    icon: ethIcon,
    binanceSymbol: "ETHUSDT", decimals: 2, prefix: "$", compact: true },
  { symbol: "SOL",  name: "Solana",      category: "crypto",
    icon: solIcon,
    binanceSymbol: "SOLUSDT", decimals: 2, prefix: "$" },
  { symbol: "AAPL", name: "Apple",       category: "stock",
    icon: aaplIcon, yahooSymbol: "AAPL",   decimals: 2, prefix: "$" },
  { symbol: "TSLA", name: "Tesla",       category: "stock",
    icon: tslaIcon, yahooSymbol: "TSLA",  decimals: 2, prefix: "$" },
  { symbol: "NVDA", name: "NVIDIA",      category: "stock",
    icon: nvdaIcon, yahooSymbol: "NVDA",  decimals: 2, prefix: "$" },
  { symbol: "EUR/USD", name: "Euro / Dollar", category: "forex",
    initial: "€", yahooSymbol: "EURUSD=X", decimals: 4 },
  { symbol: "GBP/USD", name: "Pound / Dollar", category: "forex",
    initial: "£", yahooSymbol: "GBPUSD=X", decimals: 4 },
  { symbol: "WTI",  name: "Crude Oil",   category: "commodity",
    initial: "🛢", yahooSymbol: "CL=F", decimals: 2, prefix: "$" },
  { symbol: "XAU/USD", name: "Gold Spot", category: "commodity",
    initial: "Au", yahooSymbol: "GC=F", decimals: 2, prefix: "$" },
];

type Quote = {
  price: number | null;
  changePct: number | null;
  spark: number[];
  /** unix-ms timestamps aligned 1:1 with `spark` */
  times: number[];
  loading: boolean;
};

const formatPrice = (n: number, asset: Asset) => {
  if (asset.compact) {
    if (n >= 1000) {
      return `${(n / 1000).toFixed(1)}K`;
    }
  }
  return n.toLocaleString("en-US", {
    minimumFractionDigits: asset.decimals,
    maximumFractionDigits: asset.decimals,
  });
};

/* ─────────────── Interactive Chart ─────────────── */
const InteractiveChart = ({
  points,
  times,
  up,
  asset,
}: {
  points: number[];
  times: number[];
  up: boolean;
  asset: Asset;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ idx: number; x: number; y: number } | null>(null);

  const W = 280;
  const H = 70;

  const { path, areaPath, coords } = useMemo(() => {
    if (!points || points.length < 2) {
      return { path: "", areaPath: "", coords: [] as Array<{ x: number; y: number }> };
    }
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const stepX = W / (points.length - 1);
    const cs = points.map((p, i) => ({
      x: i * stepX,
      y: H - ((p - min) / range) * H,
    }));
    const d = cs.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(" ");
    const area = `${d} L${W},${H} L0,${H} Z`;
    return { path: d, areaPath: area, coords: cs };
  }, [points]);

  if (!points || points.length < 2) return <div className="h-full w-full" />;

  const stroke = up ? "hsl(var(--profit))" : "hsl(var(--loss))";
  const fillId = `area-${asset.symbol.replace(/[^a-z0-9]/gi, "")}`;
  const stopColor = up ? "rgba(0,255,136,0.25)" : "rgba(255,59,92,0.25)";

  const handleMove = (e: React.MouseEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    // nearest point index
    const stepX = W / (points.length - 1);
    let idx = Math.round(relX / stepX);
    idx = Math.max(0, Math.min(points.length - 1, idx));
    setHover({ idx, x: coords[idx].x, y: coords[idx].y });
  };

  const formatTime = (ms: number) =>
    new Date(ms).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

  // Tooltip positioning in % of width/height for responsive overlay
  const tipLeftPct = hover ? (hover.x / W) * 100 : 0;
  const tipTopPct = hover ? (hover.y / H) * 100 : 0;
  // flip tooltip to the left if it would overflow on the right
  const flipLeft = tipLeftPct > 60;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-full"
      onMouseMove={handleMove}
      onMouseLeave={() => setHover(null)}
      onTouchStart={() => setHover(null)}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stopColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${fillId})`} />
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {hover && (
          <>
            {/* vertical guideline */}
            <line
              x1={hover.x}
              x2={hover.x}
              y1={0}
              y2={H}
              stroke="hsl(var(--foreground) / 0.5)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            {/* dot */}
            <circle
              cx={hover.x}
              cy={hover.y}
              r="4"
              fill="hsl(var(--background))"
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>

      {hover && times[hover.idx] != null && (
        <div
          className="pointer-events-none absolute z-10 rounded-xl bg-background/95 border border-border shadow-xl px-3 py-2 text-xs whitespace-nowrap"
          style={{
            left: `${tipLeftPct}%`,
            top: `${tipTopPct}%`,
            transform: `translate(${flipLeft ? "calc(-100% - 10px)" : "10px"}, -110%)`,
            fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
          }}
        >
          <div className="text-muted-foreground tabular-nums">{formatTime(times[hover.idx])}</div>
          <div className="text-foreground font-bold tabular-nums text-sm">
            {asset.prefix}
            {formatPrice(points[hover.idx], asset)}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────── Card ─────────────── */
const TickerCard = ({ asset, quote }: { asset: Asset; quote: Quote }) => {
  const up = (quote?.changePct ?? 0) >= 0;
  const changeColor = up ? "text-profit" : "text-loss";

  return (
    <div
      className="snap-start shrink-0 w-[280px] sm:w-[300px] rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 hover:border-border transition-colors"
      style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
    >
      {/* Header: icon + name */}
      <div className="flex items-center gap-2.5 mb-2">
        {asset.icon ? (
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <img
              src={asset.icon}
              alt={`${asset.name} logo`}
              className="w-5 h-5 object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
            {asset.initial || asset.symbol[0]}
          </div>
        )}
        <span className="text-base font-semibold text-foreground">{asset.name}</span>
      </div>

      {/* Interactive chart */}
      <div className="h-16 my-3">
        {quote.loading || quote.spark.length < 2 ? (
          <div className="w-full h-full rounded bg-muted/40 animate-pulse" />
        ) : (
          <InteractiveChart
            points={quote.spark}
            times={quote.times}
            up={up}
            asset={asset}
          />
        )}
      </div>

      {/* Bottom row: price/change + buttons */}
      <div className="flex items-end justify-between mt-3">
        <div>
          <div className="text-2xl font-bold tabular-nums text-foreground leading-tight">
            {quote.loading || quote.price === null ? (
              <span className="inline-block h-6 w-20 rounded bg-muted animate-pulse align-middle" />
            ) : (
              <>
                {asset.prefix}
                {formatPrice(quote.price, asset)}
              </>
            )}
          </div>
          <div className="flex items-center gap-1 mt-1 text-sm tabular-nums">
            {quote.loading || quote.changePct === null ? (
              <span className="inline-block h-3 w-14 rounded bg-muted animate-pulse" />
            ) : (
              <>
                <span className={changeColor}>
                  {up ? "+" : ""}
                  {quote.changePct.toFixed(1)}%
                </span>
                <span className="text-muted-foreground">· 24H</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group/up">
            <button
              aria-label={`Buy ${asset.name} long`}
              className="w-9 h-9 rounded-full bg-muted/70 hover:bg-profit/20 flex items-center justify-center text-foreground hover:text-profit transition-colors border border-transparent hover:border-profit/40"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <span
              style={{ fontFamily: "Bricolage Grotesque, system-ui, sans-serif" }}
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-card border border-border text-xs text-foreground opacity-0 group-hover/up:opacity-100 transition-opacity whitespace-nowrap"
            >
              Up
            </span>
          </div>
          <div className="relative group/down">
            <button
              aria-label={`Sell ${asset.name} short`}
              className="w-9 h-9 rounded-full bg-muted/70 hover:bg-loss/20 flex items-center justify-center text-foreground hover:text-loss transition-colors border border-transparent hover:border-loss/40"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <span
              style={{ fontFamily: "Bricolage Grotesque, system-ui, sans-serif" }}
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-card border border-border text-xs text-foreground opacity-0 group-hover/down:opacity-100 transition-opacity whitespace-nowrap"
            >
              Down
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────── Main section ─────────────── */
const LiveMarkets = () => {
  const [quotes, setQuotes] = useState<Record<string, Quote>>(() =>
    Object.fromEntries(
      ASSETS.map((a) => [a.symbol, { price: null, changePct: null, spark: [], times: [], loading: true }])
    )
  );
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCrypto = async () => {
      const cryptoAssets = ASSETS.filter((a) => a.binanceSymbol);
      try {
        // 1) current prices + 24h change
        const symbolsParam = encodeURIComponent(
          JSON.stringify(cryptoAssets.map((a) => a.binanceSymbol))
        );
        const tickerRes = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsParam}`
        );
        const tickerData: Array<{
          symbol: string;
          lastPrice: string;
          priceChangePercent: string;
        }> = await tickerRes.json();

        // 2) sparklines (1h klines x 24)  — for richer detail use 15m × 96
        const sparkResults = await Promise.all(
          cryptoAssets.map(async (a) => {
            try {
              const r = await fetch(
                `https://api.binance.com/api/v3/klines?symbol=${a.binanceSymbol}&interval=15m&limit=96`
              );
              const d: Array<unknown[]> = await r.json();
              return {
                sym: a.symbol,
                points: d.map((row) => parseFloat(row[4] as string)),
                times: d.map((row) => row[0] as number),
              };
            } catch {
              return { sym: a.symbol, points: [] as number[], times: [] as number[] };
            }
          })
        );

        if (cancelled) return;
        setQuotes((prev) => {
          const next = { ...prev };
          for (const a of cryptoAssets) {
            const t = tickerData.find((d) => d.symbol === a.binanceSymbol);
            const sp = sparkResults.find((s) => s.sym === a.symbol);
            next[a.symbol] = {
              price: t ? parseFloat(t.lastPrice) : prev[a.symbol].price,
              changePct: t ? parseFloat(t.priceChangePercent) : prev[a.symbol].changePct,
              spark: sp?.points ?? prev[a.symbol].spark,
              times: sp?.times ?? prev[a.symbol].times,
              loading: false,
            };
          }
          return next;
        });
      } catch {
        if (cancelled) return;
        setQuotes((prev) => {
          const next = { ...prev };
          for (const a of cryptoAssets) next[a.symbol] = { ...next[a.symbol], loading: false };
          return next;
        });
      }
    };

    const fetchYahoo = async () => {
      const yahooAssets = ASSETS.filter((a) => a.yahooSymbol);
      try {
        const symbols = yahooAssets.map((a) => a.yahooSymbol!).join(",");
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/market-quote?symbols=${encodeURIComponent(symbols)}`;
        const res = await fetch(url, {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        });
        if (!res.ok) throw new Error(`quote failed ${res.status}`);
        const j: {
          quotes: Record<
            string,
            { price?: number; changePct?: number; sparkline?: number[]; timestamps?: number[]; error?: string }
          >;
        } = await res.json();
        if (cancelled) return;
        setQuotes((prev) => {
          const next = { ...prev };
          for (const a of yahooAssets) {
            const q = j.quotes?.[a.yahooSymbol!];
            if (q && !q.error && typeof q.price === "number") {
              next[a.symbol] = {
                price: q.price,
                changePct: q.changePct ?? 0,
                spark: q.sparkline ?? [],
                times: q.timestamps ?? [],
                loading: false,
              };
            } else {
              next[a.symbol] = { ...next[a.symbol], loading: false };
            }
          }
          return next;
        });
      } catch {
        if (cancelled) return;
        setQuotes((prev) => {
          const next = { ...prev };
          for (const a of yahooAssets) next[a.symbol] = { ...next[a.symbol], loading: false };
          return next;
        });
      }
    };

    const fetchAll = () => {
      fetchCrypto();
      fetchYahoo();
    };

    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section
      className="relative py-20 px-4 sm:px-6"
      style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Live Markets
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em]">
              Trade real markets in <span className="text-primary">real time</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-border bg-card/60 hover:bg-card flex items-center justify-center text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-border bg-card/60 hover:bg-card flex items-center justify-center text-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal slider */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {ASSETS.map((asset) => (
              <TickerCard key={asset.symbol} asset={asset} quote={quotes[asset.symbol]} />
            ))}
          </div>
          {/* Right fade */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="pointer-events-none absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-background to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default LiveMarkets;
