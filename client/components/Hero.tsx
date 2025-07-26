import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

const GlitchLine = ({ delay = 0 }) => (
  <div
    className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blood-500 to-transparent opacity-70 animate-pulse"
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random()}s`,
    }}
  />
);

const EnergyVein = ({ 
  top, 
  left, 
  width, 
  rotation = 0, 
  delay = 0 
}: { 
  top: string; 
  left: string; 
  width: string; 
  rotation?: number; 
  delay?: number; 
}) => (
  <div
    className="absolute opacity-30"
    style={{
      top,
      left,
      width,
      transform: `rotate(${rotation}deg)`,
      animationDelay: `${delay}s`,
    }}
  >
    <div className="h-px bg-gradient-to-r from-transparent via-blood-400 to-transparent animate-pulse" />
    <div className="h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-pulse mt-1" 
         style={{ animationDelay: "0.5s" }} />
  </div>
);

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 hero-gradient">
        {/* Floating particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blood-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}

        {/* Energy veins */}
        <EnergyVein top="20%" left="10%" width="30%" rotation={15} delay={0} />
        <EnergyVein top="40%" left="60%" width="25%" rotation={-20} delay={1} />
        <EnergyVein top="70%" left="20%" width="40%" rotation={10} delay={2} />
        <EnergyVein top="30%" left="80%" width="20%" rotation={-35} delay={1.5} />
        <EnergyVein top="60%" left="70%" width="35%" rotation={25} delay={0.5} />

        {/* Glitch lines */}
        <div className="absolute top-1/4 left-0 right-0">
          <GlitchLine delay={0} />
        </div>
        <div className="absolute top-2/3 left-0 right-0">
          <GlitchLine delay={1} />
        </div>
        <div className="absolute top-1/2 left-0 right-0">
          <GlitchLine delay={2} />
        </div>

        {/* Mouse-following gradient */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 pointer-events-none transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, hsl(var(--blood-500)) 0%, transparent 70%)`,
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block mb-2">
              <span className="text-foreground">Empower your</span>
            </span>
            <span className="block mb-2">
              <span className="blood-text text-shadow-lg">Minecraft Hosting</span>
            </span>
            <span className="block">
              <span className="text-foreground">with </span>
              <span className="text-neon-blue gothic-font animate-pulse">Blood Cloud</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the ultimate in{" "}
            <span className="text-blood-400 font-semibold">high-performance</span> Minecraft server hosting.
            Unleash your world with lightning-fast SSD storage, DDoS protection, and our{" "}
            <span className="text-neon-blue font-semibold">blood-infused</span> control panel.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection("pricing")}
              className="btn-blood group flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => scrollToSection("features")}
              className="glass-dark px-8 py-4 rounded-lg text-lg font-semibold text-foreground hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-blood-500/30 hover:border-blood-400/50 group flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Features highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "NVMe SSD storage"
              },
              {
                icon: "🛡️",
                title: "DDoS Protected",
                description: "Enterprise-grade security"
              },
              {
                icon: "🎮",
                title: "1-Click Setup",
                description: "Deploy in seconds"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`glass-dark p-6 rounded-xl border border-blood-500/20 hover:border-blood-400/40 transition-all duration-500 hover:scale-105 hover-glow ${
                  isVisible ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blood-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blood-500 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
