import { useTranslation } from "react-i18next";
import logo from "@/assets/arcanine-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  const quickMenu = [
    { label: t("footer.howItWorks"), href: "#how-it-works" },
    { label: t("footer.assetIndex"), href: "#" },
    { label: t("footer.tradingTerminal"), href: "#" },
    { label: t("footer.demoAccount"), href: "#" },
    { label: t("footer.faqs"), href: "#faq" },
    { label: t("footer.support"), href: "#" },
  ];

  const information = [
    { label: t("footer.termsOfService"), href: "#" },
    { label: t("footer.privacyPolicy"), href: "#" },
    { label: t("footer.amlKyc"), href: "#" },
    { label: t("footer.responsibleTrading"), href: "#" },
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
              { name: "Visa", bg: "#1A1F71", text: "VISA", textColor: "#FFFFFF" },
              { name: "Mastercard", bg: "#1A1A2E", icon: "mc" },
              { name: "Discover", bg: "#FF6000", text: "DISCOVER", textColor: "#FFFFFF" },
              { name: "Apple Pay", bg: "#000000", text: "Pay", textColor: "#FFFFFF" },
              { name: "Google Pay", bg: "#1A1A2E", text: "G Pay", textColor: "#FFFFFF" },
              { name: "Bitcoin", bg: "#F7931A", text: "₿", textColor: "#FFFFFF" },
            ].map((method) => (
              <div key={method.name} className="w-[52px] h-[34px] rounded-md flex items-center justify-center border border-white/5" style={{ background: method.bg }} title={method.name}>
                {method.icon === "mc" ? (
                  <div className="flex -space-x-1.5"><div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" /><div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-80" /></div>
                ) : (
                  <span className="text-[9px] font-bold leading-none" style={{ color: method.textColor }}>{method.text}</span>
                )}
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
