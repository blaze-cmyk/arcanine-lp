import { useEffect, useState, useRef } from "react";
import { TrendingUp } from "lucide-react";

interface Win {
  id: number;
  user: string;
  avatar: string;
  amount: string;
  asset: string;
  color: string;
  isNew: boolean;
}

const AVATARS = ["🐺", "🦊", "🐯", "🦅", "🐉", "🦁", "🐻", "🦈", "🐍", "🦇", "🐗", "🦉"];
const ASSETS = ["BTC/USD", "ETH/USD", "GOLD", "EUR/USD", "GBP/JPY", "AAPL", "TSLA", "SOL/USD"];
const NAMES = [
  "alex_t",
  "markW",
  "proTrader",
  "luna99",
  "quickWin",
  "rizz_k",
  "novaX",
  "hidden",
  "aceHigh",
  "deltaFx",
  "ironJaw",
  "pixelDev",
  "zenith",
  "blaze7",
];
const COLORS = [
  "from-emerald-500/20 to-emerald-500/5",
  "from-cyan-500/20 to-cyan-500/5",
  "from-violet-500/20 to-violet-500/5",
  "from-amber-500/20 to-amber-500/5",
  "from-rose-500/20 to-rose-500/5",
  "from-blue-500/20 to-blue-500/5",
];

const randomAmount = () => {
  const amounts = [0.5, 1.2, 2.0, 5.0, 8.37, 10.0, 14.5, 26.72, 50.0, 0.76, 3.4, 6.45, 0.14, 0.4, 1.1, 2.06, 0.17];
  return `$${amounts[Math.floor(Math.random() * amounts.length)].toFixed(2)}`;
};

let idCounter = 0;
const generateWin = (isNew = false): Win => {
  idCounter++;
  return {
    id: idCounter,
    user: NAMES[Math.floor(Math.random() * NAMES.length)],
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    amount: randomAmount(),
    asset: ASSETS[Math.floor(Math.random() * ASSETS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    isNew,
  };
};

const initialWins = Array.from({ length: 8 }, () => generateWin());

const LiveWins = () => {
  const [wins, setWins] = useState<Win[]>(initialWins);
  const firstCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWins((prev) => {
        const updated = prev.map((w) => ({ ...w, isNew: false }));
        return [generateWin(true), ...updated.slice(0, 7)];
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mt-20 pb-6 overflow-hidden border-y border-border/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.03),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto mt-5 pb-1">
        {/* Live Wins pill badge — floating above cards */}
        <div className="absolute -top-3 left-0 z-20">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-profit" />
            </span>
            <span className="text-xs font-semibold text-foreground">Live Wins</span>
          </div>
        </div>

        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-3 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {wins.map((win, index) => (
            <div
              key={win.id}
              ref={index === 0 ? firstCardRef : undefined}
              className={`relative flex-shrink-0 w-[140px] rounded-xl bg-gradient-to-b ${win.color} border border-border/30 p-3 backdrop-blur-sm transition-all duration-300 ${
                win.isNew ? "animate-live-win-enter" : ""
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-sm">
                  {win.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-foreground truncate">{win.asset}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground truncate">{win.user}</span>
                <div className="flex items-center gap-0.5">
                  <TrendingUp size={9} className="text-profit" />
                  <span className="text-xs font-bold font-mono-num text-profit">{win.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveWins;
