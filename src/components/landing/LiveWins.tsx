import { useEffect, useRef, useState } from "react";
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

const initialWins = Array.from({ length: 12 }, () => generateWin());

const LiveWins = () => {
  const [wins, setWins] = useState<Win[]>(initialWins);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setWins(prev => [generateWin(), ...prev.slice(0, 19)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll horizontally
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let scrollPos = 0;
    const speed = 0.4;

    const animate = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth / 2) scrollPos = 0;
      el.scrollLeft = scrollPos;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative py-6 overflow-hidden border-y border-border/20">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.03),transparent_70%)] pointer-events-none" />

      {/* Header pill */}
      <div className="flex items-center justify-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-profit/10 border border-profit/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-profit opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-profit" />
          </span>
          <span className="text-xs font-semibold text-profit tracking-wide">Live Wins</span>
        </div>
      </div>

      {/* Scrolling cards */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-hidden px-4"
          style={{ scrollBehavior: 'auto' }}
        >
          {/* Duplicate for seamless loop */}
          {[...wins, ...wins].map((win, i) => (
            <div
              key={`${win.id}-${i}`}
              className={`flex-shrink-0 w-[140px] rounded-xl bg-gradient-to-b ${win.color} border border-border/30 p-3 backdrop-blur-sm transition-all duration-300`}
            >
              {/* Avatar + Asset */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-sm">
                  {win.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-foreground truncate">{win.asset}</div>
                </div>
              </div>

              {/* User + Amount */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-[10px] text-muted-foreground truncate">{win.user}</span>
                </div>
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
