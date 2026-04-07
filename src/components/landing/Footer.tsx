import logo from "@/assets/arcanine-logo.png";

const quickMenu = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Asset Index", href: "#" },
  { label: "Trading Terminal", href: "#" },
  { label: "Demo Account", href: "#" },
  { label: "FAQs", href: "#faq" },
  { label: "Support", href: "#" },
];

const information = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "AML & KYC Policy", href: "#" },
  { label: "Responsible Trading", href: "#" },
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
            A next-generation binary options platform built for speed, transparency, and precision trading across global markets.
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
            { name: "Apple Pay", bg: "#000000", text: "Pay", textColor: "#FFFFFF" },
            { name: "Google Pay", bg: "#1A1A2E", text: "G Pay", textColor: "#FFFFFF" },
            { name: "Bitcoin", bg: "#F7931A", text: "₿", textColor: "#FFFFFF" },
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
                  {method.text}
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
            <span className="font-bold text-muted-foreground">HIGH RISK INVESTMENT WARNING:</span>{" "}
            Binary options trading involves significant risk and may not be suitable for all investors. The value of your positions can fluctuate rapidly, and you may lose the entirety of your invested capital. Before engaging in binary options trading, carefully assess your financial situation, experience level, and willingness to accept risk. Only trade with funds you can afford to lose entirely. Demo account performance does not guarantee future results in live trading.
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <span className="font-bold text-muted-foreground">Risk Disclosure:</span>{" "}
            Binary options are complex financial instruments. Prices are derived from underlying assets including forex pairs, commodities, indices, and cryptocurrencies. Market volatility can cause rapid and unpredictable price movements.{" "}
            <span className="font-bold text-muted-foreground">No Guarantee of Profit:</span>{" "}
            There is no assurance that any strategy or approach will generate profits. Historical returns shown on the platform are for illustrative purposes only.{" "}
            <span className="font-bold text-muted-foreground">Not Financial Advice:</span>{" "}
            Content provided on this platform is for educational and informational purposes only and should not be construed as financial, investment, or tax advice.
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            <span className="font-bold text-muted-foreground">Eligibility & Compliance:</span>{" "}
            Services are restricted to users 18 years or older who are not residents of jurisdictions where binary options trading is prohibited. Arcanine enforces strict anti-money laundering (AML) and know-your-customer (KYC) protocols. Identity verification is required before processing any withdrawal.{" "}
            <span className="font-bold text-muted-foreground">Limitation of Liability:</span>{" "}
            Arcanine shall not be liable for any direct, indirect, incidental, or consequential losses arising from the use of our platform, including but not limited to trading losses, data inaccuracies, or service interruptions.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
          <span>High Risk Product</span>
          <span>|</span>
          <span>Capital at Risk</span>
          <span>|</span>
          <span>18+ Only</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
