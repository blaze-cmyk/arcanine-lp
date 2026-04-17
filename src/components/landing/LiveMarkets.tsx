import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type Asset = {
  symbol: string;
  name: string;
  category: "crypto" | "stock" | "forex" | "commodity";
  icon?: string;
  initialIcon?: string;
  binanceSymbol?: string;
  yahooSymbol?: string;
  decimals: number;
  prefix?: string;
  suffix?: string;
};

const ASSETS: Asset[] = [
  // 3 Crypto — icons from cryptologos.cc
  {
    symbol: "BTC",
    name: "Bitcoin",
    category: "crypto",
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
    binanceSymbol: "BTCUSDT",
    decimals: 0,
    prefix: "$",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    category: "crypto",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
    binanceSymbol: "ETHUSDT",
    decimals: 0,
    prefix: "$",
  },
  {
    symbol: "SOL",
    name: "Solana",
    category: "crypto",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.svg",
    binanceSymbol: "SOLUSDT",
    decimals: 2,
    prefix: "$",
  },
  // 3 Stocks
  {
    symbol: "AAPL",
    name: "Apple",
    category: "stock",
    initialIcon: "A",
    yahooSymbol: "AAPL",
    decimals: 2,
    prefix: "$",
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    category: "stock",
    initialIcon: "T",
    yahooSymbol: "TSLA",
    decimals: 2,
    prefix: "$",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA",
    category: "stock",
    initialIcon: "N",
    yahooSymbol: "NVDA",
    decimals: 2,
    prefix: "$",
  },
  // 2 Forex
  {
    symbol: "EUR/USD",
    name: "Euro / Dollar",
    category: "forex",
    initialIcon: "€",
    yahooSymbol: "EURUSD=X",
    decimals: 4,
  },
  {
    symbol: "GBP/USD",
    name: "Pound / Dollar",
    category: "forex",
    initialIcon: "£",
    yahooSymbol: "GBPUSD=X",
    decimals: 4,
  },
  // 1 Crude oil
  {
    symbol: "WTI",
    name: "Crude Oil",
    category: "commodity",
    initialIcon: "🛢",
    yahooSymbol: "CL=F",
    decimals: 2,
    prefix: "$",
  },
  // 1 Gold
  {
    symbol: "XAU/USD",
    name: "Gold Spot",
    category: "commodity",
    initialIcon: "Au",
    yahooSymbol: "GC=F",
    decimals: 2,
    prefix: "$",
  },
];

type Quote = { price: number | null; changePct: number | null; loading: boolean };

const fmt = (n: number, d: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

const LiveMarkets = () => {
  const [quotes, setQuotes] = useState<Record<string, Quote>>(() =>
    Object.fromEntries(ASSETS.map((a) => [a.symbol, { price: null, changePct: null, loading: true }]))
  );

  useEffect(() => {
    let cancelled = false;

    const fetchCrypto = async () => {
      const cryptoAssets = ASSETS.filter((a) => a.binanceSymbol);
      const symbolsParam = encodeURIComponent(
        JSON.stringify(cryptoAssets.map((a) => a.binanceSymbol))
      );
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${symbolsParam}`);
        if (!res.ok) throw new Error("binance failed");
        const data: Array<{ symbol: string; lastPrice: string; priceChangePercent: string }> = await res.json();
        if (cancelled) return;
        setQuotes((prev) => {
          const next = { ...prev };
          for (const a of cryptoAssets) {
            const row = data.find((d) => d.symbol === a.binanceSymbol);
            if (row) {
              next[a.symbol] = {
                price: parseFloat(row.lastPrice),
                changePct: parseFloat(row.priceChangePercent),
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
          for (const a of cryptoAssets) next[a.symbol] = { ...next[a.symbol], loading: false };
          return next;
        });
      }
    };

    const fetchYahoo = async (a: Asset) => {
      try {
        // Public Yahoo Finance chart endpoint — supports CORS for browser requests
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
          a.yahooSymbol!
        )}?interval=1d&range=2d`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("yahoo failed");
        const json = await res.json();
        const result = json?.chart?.result?.[0];
        const meta = result?.meta;
        if (!meta) throw new Error("no meta");
        const price: number = meta.regularMarketPrice;
        const prevClose: number = meta.chartPreviousClose ?? meta.previousClose;
        const changePct = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
        if (cancelled) return;
        setQuotes((prev) => ({
          ...prev,
          [a.symbol]: { price, changePct, loading: false },
        }));
      } catch {
        if (cancelled) return;
        setQuotes((prev) => ({
          ...prev,
          [a.symbol]: { ...prev[a.symbol], loading: false },
        }));
      }
    };

    const fetchAll = () => {
      fetchCrypto();
      ASSETS.filter((a) => a.yahooSymbol).forEach((a) => fetchYahoo(a));
    };

    fetchAll();
    const interval = setInterval(fetchAll, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Live Markets
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-3">
            Trade real markets in <span className="text-primary">real time</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live prices streamed from Binance and Yahoo Finance — crypto, stocks, forex and commodities.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {ASSETS.map((asset) => {
            const q = quotes[asset.symbol];
            const up = (q?.changePct ?? 0) >= 0;
            return (
              <div
                key={asset.symbol}
                className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm p-4 hover:border-primary/40 hover:bg-card transition-all duration-300"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  {asset.icon ? (
                    <img
                      src={asset.icon}
                      alt={`${asset.name} logo`}
                      className="w-8 h-8 rounded-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                      {asset.initialIcon}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-semibold leading-tight truncate">{asset.symbol}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                      {asset.category}
                    </div>
                  </div>
                </div>

                <div className="font-display tabular-nums text-lg sm:text-xl font-bold mb-1">
                  {q?.loading || q?.price === null ? (
                    <span className="inline-block h-5 w-16 rounded bg-muted animate-pulse" />
                  ) : (
                    <>
                      {asset.prefix}
                      {fmt(q.price!, asset.decimals)}
                      {asset.suffix}
                    </>
                  )}
                </div>

                <div
                  className={`inline-flex items-center gap-1 text-xs font-semibold tabular-nums ${
                    up ? "text-profit" : "text-loss"
                  }`}
                >
                  {q?.loading || q?.changePct === null ? (
                    <span className="inline-block h-3 w-10 rounded bg-muted animate-pulse" />
                  ) : (
                    <>
                      {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {up ? "+" : ""}
                      {q.changePct!.toFixed(2)}%
                      <span className="text-muted-foreground font-normal ml-1">24H</span>
                    </>
                  )}
                </div>

                {/* subtle live dot */}
                <span className="absolute top-3 right-3 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiveMarkets;
