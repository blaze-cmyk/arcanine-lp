import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
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
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="relative z-50 pt-3 mx-auto">
      <div className="rounded-2xl transition-all duration-300">
        <div className="flex items-center justify-between h-14 px-5">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-0">
              <img src={logo} alt="Arcanine" className="w-14 h-14" />
              <span className="text-lg font-bold tracking-tight font-display text-foreground">Arcanine</span>
            </div>

            {/* Desktop links — next to logo */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Get Demo + Log In + Sign Up */}
          <div className="hidden md:flex items-center gap-2">
            <button className="py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 px-[8px]">
              Get Demo
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground bg-secondary-btn rounded-lg transition-colors duration-200">
              <LogIn className="w-4 h-4" />
              Log In
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-primary-foreground bg-gradient-accent rounded-lg hover:opacity-90 transition-all duration-200">
              Sign Up
            </button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
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
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 mt-2">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70 border border-border rounded-lg">
                <LogIn className="w-4 h-4" />
                Log In
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-semibold text-primary-foreground bg-gradient-accent rounded-lg">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
