import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import upiLogo from "@/assets/payments/upi.png";
import phonepeLogo from "@/assets/payments/phonepe.png";
import netbankingLogo from "@/assets/payments/netbanking.png";
import bitcoinLogo from "@/assets/payments/bitcoin.png";

const METHODS: { label: string; logo?: string; text?: string; textStyle?: string }[] = [
  {
    label: "Net Banking",
    logo: netbankingLogo,
  },
  {
    label: "GPay · UPI",
    text: "GPay",
    textStyle: "text-xl font-bold tracking-tight",
    logo: upiLogo,
  },
  {
    label: "UPI",
    logo: upiLogo,
  },
  {
    label: "PhonePe · UPI",
    logo: phonepeLogo,
    text: "UPI",
  },
  {
    label: "Crypto Methods",
    logo: bitcoinLogo,
  },
  {
    label: "AstroPay",
    text: "AstroPay",
    textStyle: "text-xl font-bold tracking-tight",
  },
];

const FairnessLogic = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 px-4 sm:px-6 overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,106,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.02em] leading-[1.1] mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)",
            }}
          >
            Transparent Deposit,{" "}
            <br className="hidden sm:block" />
            Fast Withdrawal
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Transfer safely via familiar payment methods
          </p>
        </div>

        {/* Payment grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {METHODS.map((method, i) => (
            <div
              key={method.label}
              className="group relative rounded-2xl h-[88px] flex items-center justify-center gap-3 transition-all duration-700 cursor-default"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${200 + i * 80}ms`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 100%, rgba(255,106,0,0.06) 0%, transparent 70%)",
                }}
              />

              {method.logo && (
                <img
                  src={method.logo}
                  alt={method.label}
                  className="h-8 w-auto object-contain"
                  style={{ filter: method.logo === netbankingLogo ? "invert(1) brightness(0.8)" : "none" }}
                />
              )}
              {method.text && (
                <span className={`text-foreground/90 ${method.textStyle || "text-base font-semibold"}`}>
                  {method.text}
                </span>
              )}
              {!method.text && !method.logo && (
                <span className="text-base font-semibold text-foreground/90">{method.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex justify-center mt-12 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "800ms",
          }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-accent text-primary-foreground transition-all duration-200 hover:shadow-lg"
            style={{
              boxShadow: "0 0 30px rgba(255,106,0,0.2)",
            }}
          >
            Start Trading
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FairnessLogic;
