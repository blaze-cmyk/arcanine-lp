import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/arcanine-logo.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#resources" },
    { label: "Community", href: "#community" },
    { label: "Download", href: "#download" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3">
      <div
        className={`max-w-6xl mx-auto rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "border-border/60 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/30"
            : "border-border/30 bg-background/50 backdrop-blur-md"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-5">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Arcanine" className="w-7 h-7" />
            <span className="text-base font-bold tracking-tight font-display text-foreground">
              Arcanine
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-2">
            <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg transition-colors duration-200">
              SIGN IN
            </button>
            <button className="px-4 py-1.5 text-sm font-medium text-foreground bg-foreground/10 border border-border rounded-lg hover:bg-foreground/15 transition-colors duration-200">
              SIGN UP
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border/30 mx-5 pt-4 flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-lg">
                SIGN IN
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-foreground bg-foreground/10 border border-border rounded-lg">
                SIGN UP
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
