import { useState } from "react";
import { Minus, Plus, ArrowUp, ArrowDown } from "lucide-react";

const PAYOUT_PCT = 90;

const TradeInSecondsVisual = () => {
  const [amount, setAmount] = useState(100);
  const adjust = (d: number) => setAmount((v) => Math.max(1, v + d));
  const payout = Math.round(amount * (1 + PAYOUT_PCT / 100));

  return (
    <div className="relative w-full h-full flex items-start justify-center px-5 pt-4 pb-2">
      <div
        className="w-full max-w-[240px] rounded-xl overflow-hidden"
        style={{
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.6)",
          fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
        }}
      >
        {/* Investment */}
        <div className="px-3 pt-3 pb-2.5 border-b border-border/50">
          <fieldset className="border border-border/60 rounded-md px-2 pb-2 pt-0">
            <legend className="text-[10px] text-muted-foreground font-medium px-1">Investment</legend>
            <div className="flex items-center gap-1">
              <button
                onClick={() => adjust(-10)}
                className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus size={12} />
              </button>
              <div className="flex-1 flex items-center justify-center gap-1">
                <span className="text-sm font-semibold text-foreground tabular-nums">{amount}</span>
                <span className="text-muted-foreground text-xs">$</span>
              </div>
              <button
                onClick={() => adjust(10)}
                className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          </fieldset>
          <button className="w-full text-center text-[10px] text-primary font-bold mt-1.5 hover:underline tracking-wide">
            SWITCH
          </button>
        </div>

        {/* Payout */}
        <div className="px-3 py-3 border-b border-border/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground font-medium">Your payout</span>
            <span className="text-[10px] text-profit font-bold">{PAYOUT_PCT}% return</span>
          </div>
          <div className="flex items-center justify-center py-1">
            <span className="text-2xl font-extrabold tracking-tight text-foreground tabular-nums">
              {payout}
            </span>
            <span className="text-lg font-bold text-profit ml-1.5">$</span>
          </div>
        </div>

        {/* Up / Down */}
        <div className="p-2 space-y-1.5">
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-md font-bold text-sm transition-transform hover:scale-[1.01]"
            style={{ background: "hsl(var(--profit))", color: "hsl(var(--profit-foreground, 0 0% 100%))" }}
          >
            <span>Up</span>
            <ArrowUp size={16} />
          </button>
          <button
            className="w-full flex items-center justify-between px-3 py-2 rounded-md font-bold text-sm transition-transform hover:scale-[1.01]"
            style={{ background: "hsl(var(--loss))", color: "hsl(0 0% 100%)" }}
          >
            <span>Down</span>
            <ArrowDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeInSecondsVisual;
