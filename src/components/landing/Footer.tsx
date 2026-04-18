import { useTranslation } from "react-i18next";
import logo from "@/assets/arcanine-logo.png";
import advcash from "@/assets/payments/advcash.png";
import gpay from "@/assets/payments/gpay.png";
import upi from "@/assets/payments/upi.png";
import rupay from "@/assets/payments/rupay.png";
import applepay from "@/assets/payments/applepay.png";
import webmoney from "@/assets/payments/webmoney.png";
import grabpay from "@/assets/payments/grabpay.png";
import sepa from "@/assets/payments/sepa.png";
import perfectmoney from "@/assets/payments/perfectmoney.png";

const Footer = () => {
  const { t } = useTranslation();

  const quickMenu = [
    { label: t("footer.howItWorks"), href: "#how-it-works" },
    
    { label: t("footer.tradingTerminal"), href: "#" },
    { label: t("footer.demoAccount"), href: "#" },
    { label: t("footer.faqs"), href: "#faq" },
    { label: t("footer.support"), href: "#" },
  ];

  const information = [
    { label: "Privacy policy", href: "#" },
    { label: "Service agreement", href: "#" },
    { label: "Risk disclosure", href: "#" },
    { label: "Rules of trading operations", href: "#" },
    { label: "Non-trading operations regulations", href: "#" },
    { label: "Payment policy", href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-16 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">
          <div>
            <div className="flex items-center gap-1 mb-6">
              <img src={logo} alt="Arcanine" className="w-10 h-10" />
              <span className="text-base font-bold tracking-tight font-display text-foreground">Arcanine</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[300px] mb-6">{t("footer.description")}</p>
            <p className="text-xs text-muted-foreground/60">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5">{t("footer.quickMenu")}</h4>
            <ul className="space-y-3">
              {quickMenu.map((link) => (
                <li key={link.label}><a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-5">{t("footer.information")}</h4>
            <ul className="space-y-3">
              {information.map((link) => (
                <li key={link.label}><a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30" />

        <div className="py-8">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground/60 uppercase mb-5">{t("footer.acceptedPayments")}</p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Advcash", src: advcash },
              { name: "Google Pay", src: gpay },
              { name: "UPI", src: upi },
              { name: "RuPay", src: rupay },
              { name: "Apple Pay", src: applepay },
              { name: "WebMoney", src: webmoney },
              { name: "GrabPay", src: grabpay },
              { name: "SEPA", src: sepa },
              { name: "Perfect Money", src: perfectmoney },
            ].map((method) => (
              <div key={method.name} className="w-[52px] h-[34px] rounded-md flex items-center justify-center overflow-hidden border border-white/5 bg-[#111]" title={method.name}>
                <img src={method.src} alt={method.name} className="w-full h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border/30" />

        <div className="py-10 space-y-6">
          <div>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              <span className="font-bold text-muted-foreground">{t("footer.riskWarningTitle")}</span>{" "}{t("footer.riskWarningText")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              <span className="font-bold text-muted-foreground">{t("footer.riskDisclosureTitle")}</span>{" "}{t("footer.riskDisclosureText")}{" "}
              <span className="font-bold text-muted-foreground">{t("footer.noGuarantee")}</span>{" "}{t("footer.noGuaranteeText")}{" "}
              <span className="font-bold text-muted-foreground">{t("footer.notAdvice")}</span>{" "}{t("footer.notAdviceText")}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">
              <span className="font-bold text-muted-foreground">{t("footer.eligibilityTitle")}</span>{" "}{t("footer.eligibilityText")}{" "}
              <span className="font-bold text-muted-foreground">{t("footer.liabilityTitle")}</span>{" "}{t("footer.liabilityText")}
            </p>
          </div>
        </div>

        <div className="border-t border-border/30 py-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
            <span>{t("footer.highRisk")}</span>
            <span>|</span>
            <span>{t("footer.capitalAtRisk")}</span>
            <span>|</span>
            <span>{t("footer.adultsOnly")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
