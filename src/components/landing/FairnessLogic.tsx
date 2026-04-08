import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import upiLogo from "@/assets/payments/upi.png";
import phonepeLogo from "@/assets/payments/phonepe.png";
import netbankingLogo from "@/assets/payments/netbanking.png";
import bitcoinLogo from "@/assets/payments/bitcoin.png";

const METHODS = [
  { label: "Net Banking", logo: netbankingLogo, invert: true },
  { label: "GPay", text: "GPay", logo: upiLogo },
  { label: "UPI", logo: upiLogo },
  { label: "PhonePe", logo: phonepeLogo },
  { label: "Crypto", logo: bitcoinLogo },
  { label: "AstroPay", text: "AstroPay" },
];

const POSITIONS = [
  { top: "12%", left: "8%", delay: 0, float: 0 },
  { top: "10%", left: "52%", delay: 150, float: 1 },
  { top: "42%", left: "0%", delay: 300, float: 2 },
  { top: "40%", left: "58%", delay: 100, float: 0 },
  { top: "72%", left: "12%", delay: 250, float: 1 },
  { top: "70%", left: "48%", delay: 200, float: 2 },
];

const FairnessLogic = () => {
  const { t } = useTranslation();
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)" }}
        >
          {/* Ambient orange glow at top-right corner */}
          <div
            className="absolute -top-[20%] -right-[10%] w-[60%] h-[70%] pointer-events-none z-0"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(255,106,0,0.22) 0%, rgba(255,80,0,0.08) 40%, transparent 70%)",
            }}
          />
          <div
            className="absolute -top-[10%] -right-[5%] w-[45%] h-[50%] pointer-events-none z-0 blur-2xl"
            style={{
              background: "radial-gradient(ellipse at 75% 25%, rgba(255,120,20,0.28) 0%, rgba(255,80,0,0.08) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute top-[5%] right-[5%] w-[30%] h-[30%] pointer-events-none z-0 blur-xl"
            style={{
              background: "radial-gradient(ellipse at 60% 40%, rgba(255,160,60,0.2) 0%, transparent 80%)",
            }}
          />
          <div className="relative z-10 py-20 sm:py-24 px-8 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div
                className="transition-all duration-700"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
              >
                <h2
                  className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.02em] leading-[1.08] mb-5 bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(180deg, #fff 22.5%, rgba(255,255,255,0.7) 100%)" }}
                >
                  {t("fairness.heading")}
                  <br />
                  {t("fairness.headingLine2")}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                  {t("fairness.description")}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold bg-gradient-accent text-primary-foreground transition-all duration-200 hover:shadow-lg"
                  style={{ boxShadow: "0 0 30px rgba(255,106,0,0.2)" }}
                >
                  {t("fairness.cta")}
                </a>
              </div>

              <div className="relative h-[340px] sm:h-[380px] lg:ml-auto lg:w-[92%]">
                {METHODS.map((method, i) => {
                  const pos = POSITIONS[i];
                  return (
                    <div
                      key={method.label}
                      className="absolute transition-all duration-700"
                      style={{
                        top: pos.top,
                        left: pos.left,
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
                        transitionDelay: `${300 + pos.delay}ms`,
                        animation: visible ? `floatPill${pos.float} 6s ease-in-out ${pos.delay + 800}ms infinite` : "none",
                      }}
                    >
                      <div
                        className="flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-default select-none whitespace-nowrap"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        {method.logo && (
                          <img src={method.logo} alt={method.label} className="h-7 w-auto object-contain" style={{ filter: method.invert ? "invert(1) brightness(0.8)" : "none" }} />
                        )}
                        {method.text ? (
                          <span className="text-base font-bold text-foreground/90 tracking-tight">{method.text}</span>
                        ) : (
                          <span className="text-sm font-medium text-foreground/70">{method.label}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatPill0 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes floatPill1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
        @keyframes floatPill2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
    </section>
  );
};

export default FairnessLogic;
