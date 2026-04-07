import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface Win {
  id: number;
  user: string;
  avatar: string;
  amount: string;
  asset: string;
  color: string;
}

const AVATARS = ["🐺", "🦊", "🐯", "🦅", "🐉", "🦁", "🐻", "🦈", "🐍", "🦇", "🐗", "🦉"];
const ASSETS = ["BTC/USD", "ETH/USD", "GOLD", "EUR/USD", "GBP/JPY", "AAPL", "TSLA", "SOL/USD"];
const NAMES = [
  "alex_t", "markW", "proTrader", "luna99", "quickWin", "rizz_k", "novaX",
  "hidden", "aceHigh", "deltaFx", "ironJaw", "pixelDev", "zenith", "blaze7",
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
  const amounts = [0.50, 1.20, 2.00, 5.00, 8.37, 10.00, 14.50, 26.72, 50.00, 0.76, 3.40, 6.45, 0.14, 0.40, 1.10, 2.06, 0.17];
  return `$${amounts[Math.floor(Math.random() * amounts.length)].toFixed(2)}`;
};

let idCounter = 0;
const generateWin = (): Win => {
  idCounter++;
  return {
    id: idCounter,
    user: NAMES[Math.floor(Math.random() * NAMES.length)],
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    amount: randomAmount(),
    asset: ASSETS[Math.floor(Math.random() * ASSETS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
};

const initialWins = Array.from({ length: 8 }, () => generateWin());

const LiveWins = () => {
  const [wins, setWins] = useState<Win[]>(initialWins);

  useEffect(() => {
    const interval = setInterval(() => {
      setWins(prev => [generateWin(), ...prev.slice(0, 7)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-6 overflow-hidden border-y border-border/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {wins.map((win) => (
            <div
              key={win.id}
              className={`flex-shrink-0 w-[140px] rounded-xl bg-gradient-to-b ${win.color} border border-border/30 p-3 backdrop-blur-sm transition-all duration-300`}
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
