import { useEffect, useState } from "react";

const ALL_TRADES = [
  { amount: "+₹500", user: "user123", profit: true },
  { amount: "+₹1,200", user: "traderX", profit: true },
  { amount: "-₹300", user: "anon45", profit: false },
  { amount: "+₹780", user: "proTrader", profit: true },
  { amount: "-₹150", user: "quickBet", profit: false },
  { amount: "+₹2,100", user: "alphaWolf", profit: true },
  { amount: "+₹430", user: "moonRider", profit: true },
  { amount: "-₹500", user: "riskTaker", profit: false },
  { amount: "+₹960", user: "steadyHand", profit: true },
  { amount: "+₹340", user: "newbie22", profit: true },
];

const LiveActivity = () => {
  const [trades, setTrades] = useState(ALL_TRADES.slice(0, 5));

  useEffect(() => {
    let idx = 5;
    const interval = setInterval(() => {
      const newTrade = ALL_TRADES[idx % ALL_TRADES.length];
      setTrades(prev => [newTrade, ...prev.slice(0, 4)]);
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Trades happening <span className="text-gradient">now</span>
          </h2>
        </div>

        <div className="glass-strong rounded-2xl p-6 space-y-2">
          {trades.map((trade, i) => (
            <div
              key={`${trade.user}-${i}`}
              className="flex items-center justify-between py-3 px-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              style={{
                opacity: 1 - i * 0.12,
              }}
            >
              <span className={`font-mono-num font-bold text-lg ${trade.profit ? "text-profit" : "text-loss"}`}>
                {trade.amount}
              </span>
              <span className="text-sm text-muted-foreground font-medium">{trade.user}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveActivity;
