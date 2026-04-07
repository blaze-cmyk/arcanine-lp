import logo from "@/assets/arcanine-logo.png";

const quickMenu = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Affiliate Program", href: "#" },
  { label: "FAQs", href: "#faq" },
  { label: "Support", href: "#" },
];

const information = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
  { label: "AML Policy", href: "#" },
];

const Footer = () => (
  <footer className="bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Top section: Logo + Links */}
      <div className="py-16 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-20">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-1 mb-6">
            <img src={logo} alt="Arcanine" className="w-10 h-10" />
            <span className="text-base font-bold tracking-tight font-display text-foreground">
              Arcanine
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[300px] mb-6">
            The premier binary options trading platform. Trade smarter with real-time charts and instant execution.
          </p>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Arcanine. All rights reserved.
          </p>
        </div>

        {/* Quick Menu */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-5">Quick Menu</h4>
          <ul className="space-y-3">
            {quickMenu.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-5">Information</h4>
          <ul className="space-y-3">
            {information.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Accepted Payments */}
      <div className="py-8">
        <p className="text-xs font-semibold tracking-widest text-muted-foreground/60 uppercase mb-5">
          Accepted Payments
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Visa", bg: "#1A1F71", text: "VISA", textColor: "#FFFFFF" },
            { name: "Mastercard", bg: "#1A1A2E", icon: "mc" },
            { name: "Discover", bg: "#FF6000", text: "DISCOVER", textColor: "#FFFFFF" },
            { name: "Apple Pay", bg: "#000000", text: "Pay", textColor: "#FFFFFF", prefix: "" },
            { name: "Google Pay", bg: "#1A1A2E", text: "G Pay", textColor: "#FFFFFF" },
            { name: "PayPal", bg: "#003087", text: "PayPal", textColor: "#009CDE" },
          ].map((method) => (
            <div
              key={method.name}
              className="w-[52px] h-[34px] rounded-md flex items-center justify-center border border-white/5"
              style={{ background: method.bg }}
              title={method.name}
            >
              {method.icon === "mc" ? (
                <div className="flex -space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-80" />
                </div>
              ) : (
                <span
                  className="text-[9px] font-bold leading-none"
                  style={{ color: method.textColor }}
                >
                  {method.prefix !== undefined ? `${method.prefix}${method.text}` : method.text}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Risk Disclaimers */}
      <div className="py-10 space-y-6">
        <div>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <span className="font-bold text-muted-foreground">SIMULATED TRADING ENVIRONMENT:</span>{" "}
            Arcanine operates using simulated trading accounts with virtual funds. All challenge phases and funded accounts utilize demo environments that mirror real prediction market conditions. No actual capital is deployed on prediction market platforms during your trading activities. Hypothetical or simulated performance results have certain inherent limitations. Unlike an actual performance record, simulated results do not represent actual trading.
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <span className="font-bold text-muted-foreground">Risk Disclosure:</span>{" "}
            Trading prediction markets involves substantial risk of loss and is not suitable for everyone. Past performance is not indicative of future results. You should not risk money that you cannot afford to lose.{" "}
            <span className="font-bold text-muted-foreground">No Guarantee of Profit:</span>{" "}
            There is no guarantee that you will earn any money using our platform. The testimonials and examples used are exceptional results and do not reflect the typical participant's experience.{" "}
            <span className="font-bold text-muted-foreground">Not Financial Advice:</span>{" "}
            Arcanine does not provide investment advice, financial planning services, or recommendations regarding the purchase or sale of any financial instruments.
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <span className="font-bold text-muted-foreground">Eligibility & Compliance:</span>{" "}
            Our services are available only to individuals who are 18 years of age or older, not residents of restricted jurisdictions, and in compliance with all applicable local laws and regulations. Arcanine maintains strict AML and KYC procedures; all traders must complete identity verification before receiving payouts.{" "}
            <span className="font-bold text-muted-foreground">Limitation of Liability:</span>{" "}
            To the maximum extent permitted by applicable law, Arcanine shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
          <span>Not a Deposit</span>
          <span>|</span>
          <span>Not FDIC Insured</span>
          <span>|</span>
          <span>May Lose Value</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
