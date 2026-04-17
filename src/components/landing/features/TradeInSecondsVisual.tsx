import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import btcIcon from "@/assets/icons/btc.png";

const ENTRY_PRICE = 67432.0;
const AMOUNT = 100;
const PROFIT = 90; // +$90 (always profitable)

const TradeInSecondsVisual = () => {
  const [secondsLeft, setSecondsLeft] = useState(56);
  const [ltp, setLtp] = useState(ENTRY_PRICE + 18.42);

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 60 : s - 1));
      // Always above entry => profitable. Small jitter, never below entry+5.
      setLtp(() => ENTRY_PRICE + 5 + Math.random() * 45);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="relative w-full h-full flex items-center justify-center px-5 py-3">
      <div
        className="w-full max-w-[230px] rounded-xl px-3 py-2.5"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.6)",
          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        }}
      >
        {/* Header: pair + countdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src={btcIcon} alt="BTC" className="w-4 h-4 rounded-full" />
            <span className="text-xs font-semibold text-foreground">BTC/USDT</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium tabular-nums">
            {mm}:{ss}
          </span>
        </div>

        {/* Direction + amount + live profit */}
        <div className="flex items-center justify-between mt-1.5 pl-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center bg-profit text-[8px] font-bold text-background">
              <ArrowUp size={9} strokeWidth={3} />
            </div>
            <span className="text-xs font-semibold text-profit tabular-nums">{AMOUNT} $</span>
          </div>
          <span className="text-xs font-bold text-profit tabular-nums">+{PROFIT.toFixed(2)} $</span>
        </div>

        {/* Entry / LTP rows */}
        <div className="mt-2 pt-2 border-t border-border/50 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Entry price</span>
            <span className="text-[11px] font-semibold text-foreground tabular-nums">
              {fmt(ENTRY_PRICE)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">LTP</span>
            <span className="text-[11px] font-semibold text-profit tabular-nums">
              {fmt(ltp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeInSecondsVisual;
