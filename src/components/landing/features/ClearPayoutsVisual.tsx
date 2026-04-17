import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import btcIcon from "@/assets/icons/btc.png";
import ethIcon from "@/assets/icons/eth.png";
import solIcon from "@/assets/icons/sol.png";
import usFlag from "@/assets/icons/us.svg";
import euFlag from "@/assets/icons/eu.png";

type Crypto = { symbol: "BTC" | "ETH" | "SOL"; binance: string; icon: string; decimals: number; defaultAmount: string };
type Fiat = { symbol: "USD" | "EUR"; icon: string; rateVsUsd: number };

const CRYPTOS: Crypto[] = [
  { symbol: "BTC", binance: "BTCUSDT", icon: btcIcon, decimals: 4, defaultAmount: "0.001" },
  { symbol: "ETH", binance: "ETHUSDT", icon: ethIcon, decimals: 4, defaultAmount: "0.05" },
  { symbol: "SOL", binance: "SOLUSDT", icon: solIcon, decimals: 4, defaultAmount: "1" },
];

const FIATS: Fiat[] = [
  { symbol: "USD", icon: usFlag, rateVsUsd: 1 },
  { symbol: "EUR", icon: euFlag, rateVsUsd: 0.92 },
];

const formatFiat = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

function Selector<T extends { symbol: string; icon: string }>({
  items,
  value,
  onChange,
}: {
  items: T[];
  value: T;
  onChange: (next: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.6)",
        }}
      >
        <img
          src={value.icon}
          alt={value.symbol}
          className="w-4 h-4 rounded-full object-cover bg-white/5"
        />
        <span className="text-[11px] font-semibold text-foreground tracking-wide">{value.symbol}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </button>

      {open && (
        <div
          className="absolute right-0 top-[calc(100%+4px)] z-30 w-[110px] rounded-lg overflow-hidden shadow-xl"
          style={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border) / 0.6)",
          }}
        >
          {items.map((item) => (
            <button
              key={item.symbol}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 text-left transition-colors hover:bg-white/[0.04]"
            >
              <img src={item.icon} alt="" className="w-4 h-4 rounded-full object-cover bg-white/5" />
              <span className="text-[11px] font-medium text-foreground">{item.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const ClearPayoutsVisual = () => {
  const [crypto, setCrypto] = useState<Crypto>(CRYPTOS[0]);
  const [fiat, setFiat] = useState<Fiat>(FIATS[0]);
  const [amount, setAmount] = useState<string>(CRYPTOS[0].defaultAmount);
  const [usdPrice, setUsdPrice] = useState<number | null>(null);
  const [pulse, setPulse] = useState(false);
  const lastPriceRef = useRef<number | null>(null);

  // When user switches crypto, swap to its default amount for cleaner display
  useEffect(() => {
    setAmount(crypto.defaultAmount);
  }, [crypto]);

  // Live price via Binance WebSocket (USDT pair) — refreshes every tick
  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;

    (async () => {
      try {
        const r = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${crypto.binance}`);
        const d = await r.json();
        if (!cancelled && d?.price) {
          const p = parseFloat(d.price);
          setUsdPrice(p);
          lastPriceRef.current = p;
        }
      } catch {
        /* noop */
      }

      ws = new WebSocket(`wss://stream.binance.com:9443/ws/${crypto.binance.toLowerCase()}@ticker`);
      ws.onmessage = (event) => {
        try {
          const d = JSON.parse(event.data);
          const p = parseFloat(d.c);
          if (!isFinite(p)) return;
          setUsdPrice(p);
          if (lastPriceRef.current !== null && p !== lastPriceRef.current) {
            setPulse(true);
            setTimeout(() => setPulse(false), 350);
          }
          lastPriceRef.current = p;
        } catch {
          /* noop */
        }
      };
    })();

    return () => {
      cancelled = true;
      try { ws?.close(); } catch { /* noop */ }
    };
  }, [crypto]);

  const numericAmount = parseFloat(amount) || 0;
  const youGet = usdPrice !== null ? numericAmount * usdPrice * fiat.rateVsUsd : null;

  return (
    <div className="relative w-full h-full flex items-center justify-center px-5 py-4">
      <div
        className="w-full max-w-[300px] rounded-2xl p-2 space-y-2"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.5)",
          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        }}
      >
        {/* You send */}
        <div
          className="rounded-xl px-3 py-2.5"
          style={{
            background: "hsl(var(--background) / 0.5)",
            border: "1px solid hsl(var(--border) / 0.4)",
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">You send</span>
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-profit opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-profit" />
              </span>
              Live
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              inputMode="decimal"
              className="flex-1 min-w-0 bg-transparent text-2xl font-bold tabular-nums text-foreground outline-none"
            />
            <Selector items={CRYPTOS} value={crypto} onChange={setCrypto} />
          </div>
        </div>

        {/* You get */}
        <div
          className="rounded-xl px-3 py-2.5"
          style={{
            background: "hsl(var(--background) / 0.5)",
            border: "1px solid hsl(var(--border) / 0.4)",
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">You get</span>
            {usdPrice !== null && (
              <span className="text-[9px] tabular-nums text-muted-foreground">
                1 {crypto.symbol} = {formatFiat(usdPrice * fiat.rateVsUsd)} {fiat.symbol}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className="flex-1 min-w-0 text-2xl font-bold tabular-nums truncate transition-colors duration-300"
              style={{ color: pulse ? "hsl(var(--profit))" : "hsl(var(--foreground))" }}
            >
              {youGet !== null ? formatFiat(youGet) : "—"}
            </span>
            <Selector items={FIATS} value={fiat} onChange={setFiat} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClearPayoutsVisual;
