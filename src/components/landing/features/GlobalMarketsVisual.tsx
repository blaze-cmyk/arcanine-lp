import { useEffect, useState } from "react";
import btcIcon from "@/assets/icons/btc.png";
import ethIcon from "@/assets/icons/eth.png";
import solIcon from "@/assets/icons/sol.png";

type Asset = {
  symbol: string;
  name: string;
  binanceSymbol: string;
  icon: string;
  whiteBg?: boolean;
  profit1m: string;
  profit5m: string;
  // mocked volume display
  volume: string;
  volumePct: string;
  volumeUp: boolean;
};

const ASSETS: Asset[] = [
  {
    symbol: "BTC/USDT",
    name: "Bitcoin",
    binanceSymbol: "BTCUSDT",
    icon: btcIcon,
    profit1m: "92%",
    profit5m: "94%",
    volume: "$3.39M",
    volumePct: "+6.73%",
    volumeUp: true,
  },
  {
    symbol: "ETH/USDT",
    name: "Ethereum",
    binanceSymbol: "ETHUSDT",
    icon: ethIcon,
    whiteBg: true,
    profit1m: "88%",
    profit5m: "90%",
    volume: "$920K",
    volumePct: "-39.39%",
    volumeUp: false,
  },
  {
    symbol: "SOL/USDT",
    name: "Solana",
    binanceSymbol: "SOLUSDT",
    icon: solIcon,
    profit1m: "93%",
    profit5m: "95%",
    volume: "$204K",
    volumePct: "-9.1%",
    volumeUp: false,
  },
];

type Quote = { price: number | null; changePct: number | null; loading: boolean };

const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const GlobalMarketsVisual = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [quotes, setQuotes] = useState<Record<string, Quote>>(() =>
    Object.fromEntries(ASSETS.map((a) => [a.symbol, { price: null, changePct: null, loading: true }]))
  );

  useEffect(() => {
    let cancelled = false;

    // Initial REST fetch
    (async () => {
      try {
        const symbolsParam = encodeURIComponent(JSON.stringify(ASSETS.map((a) => a.binanceSymbol)));
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsParam}`);
        const data: Array<{ symbol: string; lastPrice: string; priceChangePercent: string }> = await res.json();
        if (cancelled) return;
        setQuotes((prev) => {
          const next = { ...prev };
          for (const a of ASSETS) {
            const t = data.find((d) => d.symbol === a.binanceSymbol);
            if (t) {
              next[a.symbol] = {
                price: parseFloat(t.lastPrice),
                changePct: parseFloat(t.priceChangePercent),
                loading: false,
              };
            }
          }
          return next;
        });
      } catch {
        /* ignore */
      }
    })();

    // Live WebSocket
    const streams = ASSETS.map((a) => `${a.binanceSymbol.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    ws.onmessage = (event) => {
      try {
        const d = JSON.parse(event.data).data;
        const asset = ASSETS.find((a) => a.binanceSymbol === d.s);
        if (!asset) return;
        const price = parseFloat(d.c);
        const changePct = parseFloat(d.P);
        setQuotes((prev) => {
          const cur = prev[asset.symbol];
          if (!cur) return prev;
          return {
            ...prev,
            [asset.symbol]: {
              price,
              changePct: isFinite(changePct) ? changePct : cur.changePct,
              loading: false,
            },
          };
        });
      } catch {
        /* ignore */
      }
    };

    return () => {
      cancelled = true;
      try { ws.close(); } catch { /* noop */ }
    };
  }, []);

  return (
    <div
      className="relative w-full h-full flex items-start justify-center cursor-pointer select-none px-5 pt-5"
      style={{ fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }}
    >
      <div className="w-full max-w-[420px] flex flex-col gap-1.5">
        {/* Header row */}
        <div className="grid grid-cols-[1.6fr_1fr_0.9fr_0.85fr_0.55fr] items-center gap-2 px-3 pb-1.5 mb-0.5 border-b border-border/30">
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">Market</span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground text-right">LTP</span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground text-right">Volume</span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground text-right whitespace-nowrap inline-flex items-center justify-end gap-1">
            Profit +1m <span aria-hidden="true">▼</span>
          </span>
          <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground text-right">5m</span>
        </div>

        {ASSETS.map((asset, i) => {
          const q = quotes[asset.symbol];
          const up = (q?.changePct ?? 0) >= 0;
          return (
            <div
              key={asset.symbol}
              className="grid grid-cols-[1.6fr_1fr_0.9fr_0.85fr_0.55fr] items-center gap-2 rounded-lg px-3 py-1.5 transition-all duration-300"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                background: hoveredIdx === i ? "hsl(var(--primary) / 0.06)" : "transparent",
                transform: hoveredIdx === i ? "scale(1.01)" : "scale(1)",
              }}
            >

              {/* Market */}
              <div className="flex items-center gap-2.5 min-w-0">
                {asset.whiteBg ? (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={asset.icon} alt={asset.name} className="w-5 h-5 object-contain" loading="lazy" />
                  </div>
                ) : (
                  <img src={asset.icon} alt={asset.name} className="w-8 h-8 rounded-full object-contain flex-shrink-0" loading="lazy" />
                )}
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-foreground leading-tight whitespace-nowrap">{asset.symbol}</div>
                  <div className="text-[10px] text-muted-foreground leading-tight truncate">{asset.name}</div>
                </div>
              </div>

              {/* LTP */}
              <div className="text-right">
                <div className="text-[12px] font-display tabular-nums font-semibold text-foreground leading-tight">
                  {q?.loading || q?.price === null ? (
                    <span className="inline-block h-3 w-12 rounded bg-muted animate-pulse align-middle" />
                  ) : (
                    <>${formatPrice(q!.price!)}</>
                  )}
                </div>
                <div
                  className="text-[10px] font-display tabular-nums leading-tight mt-0.5"
                  style={{ color: up ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
                >
                  {q?.changePct !== null && q?.changePct !== undefined
                    ? `${up ? "+" : ""}${q.changePct.toFixed(2)}%`
                    : "—"}
                </div>
              </div>

              {/* Volume (mocked) */}
              <div className="text-right">
                <div
                  className="text-[12px] font-display tabular-nums font-semibold leading-tight"
                  style={{ color: asset.volumeUp ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
                >
                  {asset.volume}
                </div>
                <div
                  className="text-[10px] font-display tabular-nums leading-tight mt-0.5"
                  style={{ color: asset.volumeUp ? "hsl(var(--profit))" : "hsl(var(--loss))" }}
                >
                  {asset.volumePct}
                </div>
              </div>

              {/* Profit 1m */}
              <div className="text-[12px] font-display tabular-nums font-bold text-right text-profit">
                {asset.profit1m}
              </div>

              {/* Profit 5m */}
              <div className="text-[12px] font-display tabular-nums font-bold text-right text-profit">
                {asset.profit5m}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GlobalMarketsVisual;
