import { Heart, Github, Twitter, MessageCircle, Youtube, Mail } from "lucide-react";

const BloodSplatter = ({ className = "" }: { className?: string }) => (
  <div className={`absolute opacity-20 ${className}`}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 15 6 18 8C21 10 22 12 20 14C18 16 16 15 14 13C12 11 12 12 10 14C8 16 6 15 4 13C2 11 3 9 6 8C9 7 12 2 12 2Z"
        fill="currentColor"
        className="text-blood-500"
      />
      <circle cx="8" cy="6" r="1" fill="currentColor" className="text-blood-400" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" className="text-blood-600" />
      <circle cx="12" cy="18" r="0.8" fill="currentColor" className="text-blood-500" />
    </svg>
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Control Panel", href: "#panel" },
      { name: "Documentation", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    Support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#contact" },
      { name: "Status Page", href: "#" },
      { name: "Bug Reports", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Discord", icon: Discord, href: "#", color: "hover:text-indigo-400" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-400" },
    { name: "GitHub", icon: Github, href: "#", color: "hover:text-gray-300" },
    { name: "Email", icon: Mail, href: "#contact", color: "hover:text-blood-400" },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId.startsWith('#')) {
      const element = document.getElementById(sectionId.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-slate-900 border-t border-blood-500/20">
      {/* Blood splatter decorations */}
      <BloodSplatter className="top-4 left-1/4" />
      <BloodSplatter className="top-12 right-1/3" />
      <BloodSplatter className="bottom-4 left-1/2" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blood-500 to-blood-700 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-sm transform rotate-45 opacity-90" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blood-400 to-blood-600 rounded-lg blur-sm opacity-50" />
              </div>
              <span className="text-3xl font-bold">
                <span className="blood-text gothic-font">Blood</span>
                <span className="text-neon-blue ml-1">Cloud</span>
              </span>
            </div>
            
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Unleashing the power of darkness in Minecraft hosting. 
              Join thousands of players who trust Blood Cloud for their ultimate gaming experience.
            </p>

            {/* Newsletter signup */}
            <div className="glass-dark p-4 rounded-lg border border-blood-500/20">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Stay in the loop
              </h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-input border border-border rounded text-sm text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-blood-500/50"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blood-500 to-blood-600 text-white text-sm font-medium rounded hover:from-blood-400 hover:to-blood-500 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-foreground mb-4 gothic-font">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-foreground/70 hover:text-blood-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-blood-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-foreground/60 text-sm">
                © {currentYear} Blood Cloud. All rights reserved.
              </p>
              <p className="text-foreground/50 text-xs mt-1">
                Made with <Heart className="w-4 h-4 inline text-blood-500" /> for the Minecraft community
              </p>
            </div>

            {/* Social links */}
            <div className="flex space-x-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => scrollToSection(social.href)}
                    className={`text-foreground/60 ${social.color} transition-colors duration-300 hover:scale-110 transform`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>

            {/* Status indicator */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-foreground/70">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gothic quote */}
      <div className="border-t border-blood-500/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-foreground/50 text-sm gothic-font italic">
            "In the darkness of the void, Blood Cloud illuminates the path to gaming greatness"
          </p>
        </div>
      </div>
    </footer>
  );
}
