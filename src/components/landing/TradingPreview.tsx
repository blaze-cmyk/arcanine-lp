import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const ASSETS = ["BTC", "ETH", "GOLD", "EUR/USD"];
const PRICES: Record<string, number> = { BTC: 67432.50, ETH: 3521.80, GOLD: 2341.60, "EUR/USD": 1.0847 };
const DECIMALS: Record<string, number> = { BTC: 2, ETH: 2, GOLD: 2, "EUR/USD": 4 };

const ACTIVITY = [
  { amount: "+₹320", user: "user123", profit: true },
  { amount: "-₹100", user: "anon45", profit: false },
  { amount: "+₹850", user: "traderX", profit: true },
  { amount: "+₹1,200", user: "cryptoK", profit: true },
  { amount: "-₹250", user: "quick99", profit: false },
  { amount: "+₹500", user: "alphaM", profit: true },
];

const MiniChart = ({ trend }: { trend: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.width = canvas.offsetWidth * 2;
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const dw = w / 2, dh = h / 2;

    let points: number[] = [];
    const numPoints = 60;
    let price = 50;
    for (let i = 0; i < numPoints; i++) {
      price += (Math.random() - 0.48) * 3;
      price = Math.max(10, Math.min(90, price));
      points.push(price);
    }

    let animFrame: number;
    const draw = () => {
      price += (Math.random() - 0.48 + trend * 0.02) * 2.5;
      price = Math.max(10, Math.min(90, price));
      points.push(price);
      if (points.length > numPoints) points.shift();

      ctx.clearRect(0, 0, dw, dh);

      // gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, dh);
      const isUp = points[points.length - 1] > points[0];
      gradient.addColorStop(0, isUp ? "rgba(74,158,110,0.15)" : "rgba(192,85,85,0.15)");
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      points.forEach((p, i) => {
        const x = (i / (numPoints - 1)) * dw;
        const y = dh - (p / 100) * dh;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = isUp ? "#00E676" : "#FF5252";
      ctx.lineWidth = 2;
      ctx.stroke();

      // fill area
      const lastX = dw;
      const firstX = 0;
      ctx.lineTo(lastX, dh);
      ctx.lineTo(firstX, dh);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // glow dot at end
      const lastY = dh - (points[points.length - 1] / 100) * dh;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
      ctx.fillStyle = isUp ? "#00E676" : "#FF5252";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lastX, lastY, 8, 0, Math.PI * 2);
      ctx.fillStyle = isUp ? "rgba(0,230,118,0.3)" : "rgba(255,82,82,0.3)";
      ctx.fill();

      animFrame = requestAnimationFrame(() => setTimeout(() => draw(), 150));
    };
    draw();
    return () => { cancelAnimationFrame(animFrame); };
  }, [trend]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const TradingPreview = () => {
  const [activeAsset, setActiveAsset] = useState("BTC");
  const [amount, setAmount] = useState(100);
  const [timer] = useState(15);
  const [currentPrices, setCurrentPrices] = useState(PRICES);
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrices(prev => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          const change = (Math.random() - 0.5) * (next[key] * 0.001);
          next[key] = +(next[key] + change).toFixed(DECIMALS[key]);
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivityIndex(i => (i + 1) % ACTIVITY.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const visibleActivity = [
    ACTIVITY[activityIndex % ACTIVITY.length],
    ACTIVITY[(activityIndex + 1) % ACTIVITY.length],
    ACTIVITY[(activityIndex + 2) % ACTIVITY.length],
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            See it in <span className="text-gradient">action</span>
          </h2>
          <p className="text-muted-foreground">A real preview of how it feels to trade</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Main trading card */}
          <div className="glass-strong rounded-2xl p-6 space-y-6">
            {/* Asset tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-muted/50 w-fit">
              {ASSETS.map(asset => (
                <button
                  key={asset}
                  onClick={() => setActiveAsset(asset)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeAsset === asset
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {asset}
                </button>
              ))}
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3">
              <span className="font-mono-num text-4xl font-bold">
                {activeAsset === "EUR/USD" ? "" : "$"}{currentPrices[activeAsset]?.toFixed(DECIMALS[activeAsset])}
              </span>
              <span className="text-profit text-sm font-semibold font-mono-num">+0.42%</span>
            </div>

            {/* Chart */}
            <div className="h-48 sm:h-56 rounded-xl overflow-hidden bg-muted/30">
              <MiniChart trend={0} />
            </div>

            {/* Controls */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-mono-num font-semibold">₹{amount}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  step={10}
                  value={amount}
                  onChange={e => setAmount(+e.target.value)}
                  className="w-full accent-[hsl(152,100%,45%)] h-1.5 bg-muted rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Timer</span>
                  <span className="font-mono-num font-semibold">{timer}s</span>
                </div>
                <div className="flex gap-2">
                  {[15, 30, 60].map(t => (
                    <button
                      key={t}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                        timer === t ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {t}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* UP / DOWN buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="group flex items-center justify-center gap-3 py-4 rounded-xl bg-profit/10 border-2 border-profit/30 text-profit font-bold text-lg hover:bg-profit/20 hover:border-profit/50 hover:scale-[1.02] transition-all duration-200 glow-green">
                <TrendingUp className="w-6 h-6" />
                UP
              </button>
              <button className="group flex items-center justify-center gap-3 py-4 rounded-xl bg-loss/10 border-2 border-loss/30 text-loss font-bold text-lg hover:bg-loss/20 hover:border-loss/50 hover:scale-[1.02] transition-all duration-200 glow-red">
                <TrendingDown className="w-6 h-6" />
                DOWN
              </button>
            </div>
          </div>

          {/* Activity feed */}
          <div className="glass-strong rounded-2xl p-5 space-y-4 h-fit">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-profit animate-pulse" />
              <span className="text-sm font-semibold text-muted-foreground">Live Activity</span>
            </div>
            <div className="space-y-3">
              {visibleActivity.map((item, i) => (
                <div
                  key={`${item.user}-${i}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/40 animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className={`font-mono-num font-bold text-sm ${item.profit ? "text-profit" : "text-loss"}`}>
                    {item.amount}
                  </span>
                  <span className="text-xs text-muted-foreground">{item.user}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingPreview;
