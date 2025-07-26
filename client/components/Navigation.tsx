import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "Panel", id: "panel" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-dark backdrop-blur-md shadow-lg border-b border-blood-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blood-500 to-blood-700 rounded-lg flex items-center justify-center group-hover:animate-pulse">
                  <div className="w-6 h-6 bg-white rounded-sm transform rotate-45 opacity-90" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blood-400 to-blood-600 rounded-lg blur-sm opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
              <span className="text-2xl font-bold">
                <span className="blood-text gothic-font">Blood</span>
                <span className="text-neon-blue ml-1">Cloud</span>
              </span>
            </button>
          </div>

          {/* Navigation - Always visible */}
          <div className="flex-1 justify-center">
            <div className="flex items-baseline justify-center space-x-4 md:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-foreground px-2 md:px-3 py-2 text-xs md:text-sm font-medium transition-all duration-300 relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blood-500 to-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-blood-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("pricing")}
              className="btn-blood relative overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-blood-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Mobile menu button - hidden since nav is always visible */}
          <div className="hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-blood-400 transition-colors duration-300 p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - hidden since nav is always visible */}
      <div
        className={`hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass-dark backdrop-blur-md border-t border-blood-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/80 hover:text-foreground hover:bg-blood-500/10 block px-3 py-2 text-base font-medium w-full text-left transition-all duration-300 rounded-md"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("pricing")}
              className="btn-blood w-full mt-4 justify-center"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
