import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden px-4 pt-32 sm:pt-40">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="animate-slide-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] leading-[0.92] mb-7">
          Trade the
          <br />
          <span className="text-gradient">next move.</span>
        </h1>

        {/* Subhead */}
        <p className="animate-slide-up-delay-1 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Predict price movements in seconds. Up or down — one decision,
          instant results. The fastest way to trade global markets.
        </p>

        {/* Dual CTA */}
        <div className="animate-slide-up-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-accent text-primary-foreground font-bold text-base rounded-xl glow-orange hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(255,106,0,0.35)] transition-all duration-300">
            Create Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="inline-flex items-center gap-3 px-10 py-4 border border-border/60 text-foreground font-bold text-base rounded-xl hover:bg-muted/40 hover:scale-[1.03] transition-all duration-300">
            Try Free Demo
          </button>
        </div>
      </div>

      {/* Trading preview with ambient glow */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-20 animate-slide-up-delay-4">
        {/* Ambient glow behind the preview */}
        <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.06),transparent_60%)] blur-3xl pointer-events-none" />
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/[0.04] to-transparent pointer-events-none" />

        {/* The preview card */}
        <div className="relative glass-strong rounded-2xl border border-border/40 overflow-hidden shadow-2xl shadow-black/40">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-loss/60" />
              <div className="w-3 h-3 rounded-full bg-[hsl(45,100%,50%)]/60" />
              <div className="w-3 h-3 rounded-full bg-profit/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground font-mono-num">
                app.arcanine.trade
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Inner trading UI */}
          <TradingUI />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

/* ─── Inline Trading UI (self-contained, no external deps) ─── */
import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const ASSETS = ["BTC/USD", "ETH/USD", "GOLD", "EUR/USD"];
const BASE_PRICES: Record<string, number> = { "BTC/USD": 67432.50, "ETH/USD": 3521.80, GOLD: 2341.60, "EUR/USD": 1.0847 };
const DECIMALS: Record<string, number> = { "BTC/USD": 2, "ETH/USD": 2, GOLD: 2, "EUR/USD": 4 };

const MiniChart = ({ trend }: { trend: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = canvas.offsetWidth * 2);
    const h = (canvas.height = canvas.offsetHeight * 2);
    ctx.scale(2, 2);
    const dw = w / 2, dh = h / 2;

    const points: number[] = [];
    let price = 50;
    for (let i = 0; i < 60; i++) {
      price += (Math.random() - 0.48) * 3;
      price = Math.max(10, Math.min(90, price));
      points.push(price);
    }

    let animFrame: number;
    const draw = () => {
      price += (Math.random() - 0.48 + trend * 0.02) * 2.5;
      price = Math.max(10, Math.min(90, price));
      points.push(price);
      if (points.length > 60) points.shift();

      ctx.clearRect(0, 0, dw, dh);
      const isUp = points[points.length - 1] > points[0];
      const gradient = ctx.createLinearGradient(0, 0, 0, dh);
      gradient.addColorStop(0, isUp ? "rgba(0,200,83,0.12)" : "rgba(255,59,59,0.12)");
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      points.forEach((p, i) => {
        const x = (i / 59) * dw;
        const y = dh - (p / 100) * dh;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = isUp ? "#00C853" : "#FF3B3B";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.lineTo(dw, dh);
      ctx.lineTo(0, dh);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      const lastY = dh - (points[points.length - 1] / 100) * dh;
      ctx.beginPath();
      ctx.arc(dw, lastY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = isUp ? "#00C853" : "#FF3B3B";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dw, lastY, 8, 0, Math.PI * 2);
      ctx.fillStyle = isUp ? "rgba(0,200,83,0.25)" : "rgba(255,59,59,0.25)";
      ctx.fill();

      animFrame = requestAnimationFrame(() => setTimeout(draw, 120));
    };
    draw();
    return () => cancelAnimationFrame(animFrame);
  }, [trend]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

const TradingUI = () => {
  const [activeAsset, setActiveAsset] = useState("BTC/USD");
  const [amount, setAmount] = useState(100);
  const [prices, setPrices] = useState(BASE_PRICES);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          next[key] = +(next[key] + (Math.random() - 0.5) * next[key] * 0.001).toFixed(DECIMALS[key]);
        }
        return next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 sm:p-6 space-y-5">
      {/* Asset tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/40 w-fit">
        {ASSETS.map((a) => (
          <button
            key={a}
            onClick={() => setActiveAsset(a)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              activeAsset === a
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono-num text-3xl sm:text-4xl font-bold">
          {activeAsset === "EUR/USD" ? "" : "$"}
          {prices[activeAsset]?.toFixed(DECIMALS[activeAsset])}
        </span>
        <span className="text-profit text-sm font-semibold font-mono-num">+0.42%</span>
      </div>

      {/* Chart */}
      <div className="h-44 sm:h-56 rounded-xl overflow-hidden bg-muted/20 border border-border/20">
        <MiniChart trend={0} />
      </div>

      {/* Controls row */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2.5">
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
            onChange={(e) => setAmount(+e.target.value)}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg"
          />
        </div>
        <div className="space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Timer</span>
            <span className="font-mono-num font-semibold">15s</span>
          </div>
          <div className="flex gap-2">
            {[15, 30, 60].map((t) => (
              <button
                key={t}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                  t === 15
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {t}s
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* UP / DOWN */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 py-4 rounded-xl bg-profit/10 border-2 border-profit/30 text-profit font-bold text-lg hover:bg-profit/20 hover:border-profit/50 hover:scale-[1.02] transition-all duration-200">
          <TrendingUp className="w-6 h-6" />
          UP
        </button>
        <button className="flex items-center justify-center gap-3 py-4 rounded-xl bg-loss/10 border-2 border-loss/30 text-loss font-bold text-lg hover:bg-loss/20 hover:border-loss/50 hover:scale-[1.02] transition-all duration-200">
          <TrendingDown className="w-6 h-6" />
          DOWN
        </button>
      </div>
    </div>
  );
};

export default Hero;
