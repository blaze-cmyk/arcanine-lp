import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
import btcIcon from "@/assets/icons/btc.png";
import bgVideo from "@/assets/swaps-bg.webm";

const ENTRY_PRICE = 67432.0;

type Row = {
  id: string;
  direction: "up" | "down";
  amount: number;
  profit: number;        // signed $
  secondsLeft: number;   // initial countdown
  expanded?: boolean;
};

const INITIAL_ROWS: Row[] = [
  { id: "t1", direction: "up", amount: 100, profit: 90.0, secondsLeft: 60, expanded: true },
  { id: "t2", direction: "up", amount: 100, profit: 0.0, secondsLeft: 60, expanded: false },
];

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TradeInSecondsVisual = () => {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [ltp, setLtp] = useState(ENTRY_PRICE + 22.4);

  useEffect(() => {
    const t = setInterval(() => {
      setRows((rs) =>
        rs.map((r) => ({
          ...r,
          secondsLeft: r.secondsLeft <= 1 ? 60 : r.secondsLeft - 1,
        }))
      );
      // LTP always above entry → always profitable
      setLtp(ENTRY_PRICE + 5 + Math.random() * 45);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 py-3 overflow-hidden">
      {/* Background video */}
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-70"
      />
      {/* Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--card) / 0.4) 0%, hsl(var(--card) / 0.15) 40%, hsl(var(--card) / 0.55) 100%)",
        }}
      />

      <div
        className="relative w-full max-w-[280px] rounded-xl overflow-hidden backdrop-blur-md"
        style={{
          background: "hsl(var(--card) / 0.7)",
          border: "1px solid hsl(var(--border) / 0.6)",
          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        }}
      >
        {/* Tabs header */}
        <div className="flex items-center border-b border-border/60">
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 border-b-2 border-primary">
            <span className="text-xs font-semibold text-foreground">Trades</span>
            <span className="bg-secondary/70 px-1.5 py-0.5 rounded text-[10px] font-semibold text-foreground">
              {rows.length}
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-1.5 py-2 text-muted-foreground">
            <span className="text-[11px]">⏱</span>
            <span className="bg-secondary/50 px-1.5 py-0.5 rounded text-[10px] font-semibold">0</span>
          </div>
        </div>

        {/* Date row */}
        <div className="flex items-center justify-center gap-1.5 py-1.5 border-b border-border/40">
          <span className="text-[10px] text-muted-foreground font-semibold tracking-wide">17 APRIL</span>
          <span className="bg-secondary/60 text-[9px] px-1.5 py-0.5 rounded font-semibold text-foreground">
            {rows.length}
          </span>
        </div>

        {/* Trade rows */}
        <div>
          {rows.map((r) => {
            const isWinning = r.profit >= 0;
            const mm = String(Math.floor(r.secondsLeft / 60)).padStart(2, "0");
            const ss = String(r.secondsLeft % 60).padStart(2, "0");
            return (
              <div
                key={r.id}
                className="px-3 py-2 border-b border-border/40 last:border-b-0"
                style={{ background: r.expanded ? "hsl(var(--accent) / 0.4)" : "transparent" }}
              >
                {/* Row header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <ChevronDown
                      size={12}
                      className="text-muted-foreground transition-transform"
                      style={{ transform: r.expanded ? "rotate(0deg)" : "rotate(-90deg)" }}
                    />
                    <img src={btcIcon} alt="BTC" className="w-4 h-4 rounded-full" />
                    <span className="text-xs font-semibold text-foreground">BTC/USDT</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-medium tabular-nums">
                    00:{mm === "00" ? "01" : mm}:{ss}
                  </span>
                </div>

                {/* Direction + amount + pnl */}
                <div className="flex items-center justify-between mt-1 pl-[18px]">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                        r.direction === "up" ? "bg-profit" : "bg-loss"
                      }`}
                    >
                      {r.direction === "up" ? (
                        <ArrowUp size={9} strokeWidth={3} className="text-background" />
                      ) : (
                        <ArrowDown size={9} strokeWidth={3} className="text-white" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold tabular-nums ${
                        r.direction === "up" ? "text-profit" : "text-loss"
                      }`}
                    >
                      {r.amount} $
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isWinning && r.profit > 0
                        ? "text-profit"
                        : r.profit < 0
                        ? "text-loss"
                        : "text-muted-foreground"
                    }`}
                  >
                    {r.profit > 0 ? "+" : ""}
                    {r.profit.toFixed(2)} $
                  </span>
                </div>

                {/* Expanded details */}
                {r.expanded && (
                  <div className="mt-2 pt-2 border-t border-border/40 space-y-1 pl-[18px]">
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
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TradeInSecondsVisual;
