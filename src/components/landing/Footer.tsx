import logo from "@/assets/arcanine-logo.png";

const footerLinks = {
  Platform: [
    { label: "Web Terminal", href: "#" },
    { label: "Demo Account", href: "#" },
    { label: "Asset Index", href: "#" },
    { label: "Trading Rules", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "AML Policy", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "Live Chat", href: "#" },
    { label: "Status", href: "#" },
  ],
};

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Main footer grid */}
      <div className="py-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12">
        {/* Brand column */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
          <div className="flex items-center gap-1 mb-4">
            <img src={logo} alt="Arcanine" className="w-10 h-10" />
            <span className="text-base font-bold tracking-tight font-display text-foreground">
              Arcanine
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[260px]">
            Trade smarter with real-time charts, instant execution, and a platform built for precision.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-6">
            {["twitter", "discord", "telegram", "github"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-lg bg-muted/50 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <SocialIcon name={social} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Arcanine. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-xs text-muted-foreground">
            18+ only. Trade responsibly.
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--profit))] animate-pulse" />
            <span className="text-xs text-muted-foreground">All systems operational</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const SocialIcon = ({ name }: { name: string }) => {
  const icons: Record<string, JSX.Element> = {
    twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
    discord: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0m6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
        <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.333.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5" />
        <path d="M8.5 17c0 1-1.5 3-2 3-1.5 0-2.833-1.667-3.5-3-.667-1.333-.5-5.833 1.5-11.5C5.957 4.485 7.5 4.16 9 4l1 2.5" />
      </svg>
    ),
    telegram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 10-4 4 6 6 4-16-18 7 4 2 2 6 3-4" />
      </svg>
    ),
    github: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  };
  return icons[name] || null;
};

export default Footer;
