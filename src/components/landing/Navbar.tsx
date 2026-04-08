import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/arcanine-logo.png";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav.howItWorks"), href: "#three-moves" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.faq"), href: "#frequently-asked-questions" },
    { label: t("nav.demoAccount"), href: "#demo" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/60"
          : "bg-transparent"
      }`}
    >
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-px transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--border) / 0.5) 20%, hsl(var(--border) / 0.5) 80%, transparent 100%)",
          opacity: scrolled ? 1 : 0,
        }}
      />
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="relative flex items-center justify-between h-[4.5rem] px-1">
          <div className="flex items-center gap-0">
            <img src={logo} alt="Arcanine" className="w-14 h-14" />
            <span className="text-lg font-bold tracking-tight font-display text-foreground">Arcanine</span>
          </div>

          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-medium font-display text-foreground/80 hover:text-foreground transition-colors duration-200" style={{ fontSize: '15px' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSelector />
            <button className="inline-flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-foreground bg-secondary-btn rounded-xl transition-colors duration-200">
              <LogIn className="w-4 h-4" />
              {t("nav.logIn")}
            </button>
            <button className="px-3 py-2.5 text-sm font-semibold text-primary-foreground bg-gradient-accent rounded-xl transition-colors duration-200">
              {t("nav.signUp")}
            </button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border/30 mx-1 pt-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1.5"
                onClick={(e) => { handleNavClick(e, link.href); setMobileOpen(false); }}
              >
                {link.label}
              </a>
            ))}
            <LanguageSelector />
            <div className="flex gap-2 mt-2">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70 border border-border rounded-lg">
                <LogIn className="w-4 h-4" />
                {t("nav.logIn")}
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-semibold text-primary-foreground bg-gradient-accent rounded-lg">
                {t("nav.signUp")}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
