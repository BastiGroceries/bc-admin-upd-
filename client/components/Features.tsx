import { useEffect, useRef, useState } from "react";
import { 
  Zap, 
  Shield, 
  MousePointer, 
  HardDrive, 
  Clock, 
  Users, 
  Cpu, 
  Globe,
  Settings,
  Headphones
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  delay: number;
  isVisible: boolean;
}

const FeatureCard = ({ icon, title, description, badge, delay, isVisible }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`card-blood relative group cursor-pointer transition-all duration-700 hover-lift ${
        isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
      }`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Neon border effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blood-500 via-neon-blue to-blood-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm`} />
      
      {/* Badge */}
      {badge && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blood-500 to-blood-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-blood-400/50 shadow-lg">
          {badge}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`mb-4 transition-all duration-300 ${isHovered ? "scale-110" : ""}`}>
          <div className="w-16 h-16 bg-gradient-to-br from-blood-500/20 to-neon-blue/20 rounded-xl flex items-center justify-center border border-blood-500/30 group-hover:border-blood-400/50 transition-colors">
            <div className="text-blood-400 group-hover:text-blood-300 transition-colors">
              {icon}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blood-300 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors">
          {description}
        </p>

        {/* Glitch effect overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blood-500/5 to-neon-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? "animate-pulse" : ""}`} />
      </div>
    </div>
  );
};

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Free Trial",
      description: "Start your journey with a 7-day free trial. No credit card required. Experience the power before you commit.",
      badge: "Popular",
    },
    {
      icon: <HardDrive className="w-8 h-8" />,
      title: "High-Speed SSD",
      description: "Lightning-fast NVMe SSD storage ensures your world loads instantly and runs smoothly without lag.",
    },
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: "1-Click Panel",
      description: "Deploy and manage your Minecraft servers with our intuitive Blood Cloud control panel in just one click.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "DDoS Protection",
      description: "Enterprise-grade DDoS protection keeps your server online 24/7, defending against even the largest attacks.",
      badge: "Pro",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "99.9% Uptime",
      description: "Guaranteed uptime with redundant infrastructure across multiple data centers worldwide.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Unlimited Players",
      description: "Scale your community without limits. Our servers handle any number of concurrent players.",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "High Performance",
      description: "Latest generation Intel Xeon processors with dedicated CPU cores for maximum performance.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Choose from 15+ data center locations worldwide for optimal ping and performance.",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Full Root Access",
      description: "Complete control over your server with full root access and custom mod support.",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our expert support team is available around the clock to help with any issues or questions.",
      badge: "Elite",
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blood-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="text-foreground">Unleash the </span>
            <span className="blood-text">Power</span>
          </h2>
          <p className={`text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ animationDelay: "0.2s" }}>
            Experience hosting features designed for power users who demand the best.
            Our blood-infused infrastructure delivers unmatched performance and reliability.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
              delay={index * 0.1}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ animationDelay: "1s" }}>
          <p className="text-lg text-foreground/70 mb-6">
            Ready to experience the power of Blood Cloud hosting?
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("pricing");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-blood group text-lg px-8 py-4"
          >
            <span>Choose Your Plan</span>
            <Zap className="w-5 h-5 ml-2 group-hover:animate-pulse" />
          </button>
        </div>
      </div>
    </section>
  );
}
