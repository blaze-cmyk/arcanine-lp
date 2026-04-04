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
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-3">
      <div className="max-w-6xl mx-auto rounded-2xl transition-all duration-300">
        <div className="flex items-center justify-between h-14 px-5">
          {/* Left: Logo + Nav */}
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-1">
              <img src={logo} alt="Arcanine" className="w-11 h-11" />
              <span className="text-lg font-bold tracking-tight font-display text-foreground">
                Arcanine
              </span>
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
            <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200">
              Get Demo
              <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground border border-border/50 rounded-lg transition-colors duration-200">
              <User className="w-4 h-4" />
              Log In
            </button>
            <button className="px-5 py-2 text-sm font-semibold text-primary-foreground bg-gradient-accent rounded-lg hover:opacity-90 transition-all duration-200">
              Sign Up
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
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 mt-2">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-foreground/70 border border-border rounded-lg">
                <User className="w-4 h-4" />
                Sign in
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-semibold text-primary-foreground bg-gradient-accent rounded-lg">
                Get Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
