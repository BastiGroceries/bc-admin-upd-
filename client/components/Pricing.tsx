import { useEffect, useRef, useState } from "react";
import { Check, Zap, Crown, Skull } from "lucide-react";

interface PricingCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    badge?: string;
    badgeColor?: string;
    popular?: boolean;
    cta: string;
    icon: React.ReactNode;
  };
  delay: number;
  isVisible: boolean;
}

const PricingCard = ({ plan, delay, isVisible }: PricingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative transition-all duration-700 hover-lift ${
        plan.popular ? "scale-105 z-10" : ""
      } ${
        isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"
      }`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${plan.badgeColor || "bg-gradient-to-r from-blood-500 to-blood-600"}`}>
          {plan.badge}
        </div>
      )}

      {/* Glow effect for popular */}
      {plan.popular && (
        <div className="absolute inset-0 bg-gradient-to-r from-blood-500 via-neon-blue to-blood-500 opacity-20 rounded-2xl blur-xl" />
      )}

      {/* Card */}
      <div className={`card-blood h-full relative group ${
        plan.popular ? "border-blood-400/50" : ""
      } ${isHovered ? "scale-105" : ""} transition-all duration-300`}>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
              plan.popular 
                ? "bg-gradient-to-br from-blood-500/30 to-neon-blue/30 border-blood-400/50" 
                : "bg-gradient-to-br from-blood-500/20 to-neon-blue/20 border-blood-500/30"
            } border transition-colors group-hover:border-blood-400/50`}>
              <div className={`${plan.popular ? "text-blood-300" : "text-blood-400"} group-hover:text-blood-300 transition-colors`}>
                {plan.icon}
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-blood-300 transition-colors">
            {plan.name}
          </h3>
          
          <p className="text-foreground/70 text-sm mb-4">
            {plan.description}
          </p>

          <div className="mb-2">
            <span className="text-4xl font-bold text-foreground">
              {plan.price}
            </span>
            <span className="text-foreground/60 ml-2">
              {plan.period}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <Check className="w-5 h-5 text-blood-400" />
              </div>
              <span className="text-foreground/80 text-sm">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
            plan.popular
              ? "btn-blood text-white"
              : "glass-dark border border-blood-500/30 text-foreground hover:bg-blood-500/10 hover:border-blood-400/50"
          } group-hover:scale-105`}>
            {plan.cta}
          </button>
        </div>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blood-500/10 via-neon-blue/10 to-blood-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isHovered ? "animate-pulse" : ""}`} />
      </div>
    </div>
  );
};

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
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

  const plans = [
    {
      name: "Starter",
      price: billingPeriod === 'monthly' ? "$9.99" : "$99.99",
      period: billingPeriod === 'monthly' ? "/month" : "/year",
      description: "Perfect for small communities",
      features: [
        "4GB RAM",
        "2 CPU Cores",
        "50GB SSD Storage",
        "Unlimited Bandwidth",
        "DDoS Protection",
        "7-Day Free Trial",
        "Basic Support"
      ],
      cta: "Start Free Trial",
      icon: <Zap className="w-8 h-8" />
    },
    {
      name: "Drip Tier",
      price: billingPeriod === 'monthly' ? "$19.99" : "$199.99",
      period: billingPeriod === 'monthly' ? "/month" : "/year",
      description: "Most popular for growing servers",
      features: [
        "8GB RAM",
        "4 CPU Cores",
        "100GB SSD Storage",
        "Unlimited Bandwidth",
        "Advanced DDoS Protection",
        "1-Click Modpack Install",
        "Priority Support",
        "Custom Domain",
        "Automatic Backups"
      ],
      badge: "Best Value",
      badgeColor: "bg-gradient-to-r from-neon-blue to-blood-500",
      popular: true,
      cta: "Get Drip Tier",
      icon: <Crown className="w-8 h-8" />
    },
    {
      name: "Blood Lord",
      price: billingPeriod === 'monthly' ? "$39.99" : "$399.99",
      period: billingPeriod === 'monthly' ? "/month" : "/year",
      description: "Ultimate power for large communities",
      features: [
        "16GB RAM",
        "8 CPU Cores",
        "200GB SSD Storage",
        "Unlimited Everything",
        "Enterprise DDoS Protection",
        "Dedicated IP",
        "24/7 VIP Support",
        "Custom Plugins",
        "Full Root Access",
        "Priority Queue"
      ],
      badge: "Ultimate",
      badgeColor: "bg-gradient-to-r from-blood-600 to-blood-800",
      cta: "Become Blood Lord",
      icon: <Skull className="w-8 h-8" />
    }
  ];

  return (
    <section id="pricing" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/6 w-64 h-64 bg-blood-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-gradient-radial from-blood-500/3 to-transparent rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="text-foreground">Choose Your </span>
            <span className="blood-text">Power Level</span>
          </h2>
          
          <p className={`text-xl text-foreground/80 max-w-3xl mx-auto mb-8 leading-relaxed transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ animationDelay: "0.2s" }}>
            Unlock the full potential of your Minecraft world with our blood-infused hosting plans.
            Every plan includes our signature features and 24/7 support.
          </p>

          {/* Billing toggle */}
          <div className={`flex items-center justify-center space-x-4 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ animationDelay: "0.4s" }}>
            <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-foreground' : 'text-foreground/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                billingPeriod === 'yearly' ? 'bg-blood-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform duration-300 ${
                billingPeriod === 'yearly' ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm font-medium ${billingPeriod === 'yearly' ? 'text-foreground' : 'text-foreground/60'}`}>
              Yearly
            </span>
            {billingPeriod === 'yearly' && (
              <span className="bg-gradient-to-r from-blood-500 to-blood-600 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              delay={index * 0.2}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom info */}
        <div className={`text-center mt-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`} style={{ animationDelay: "1s" }}>
          <p className="text-foreground/70 mb-4">
            All plans include a 7-day free trial and 30-day money-back guarantee
          </p>
          <p className="text-sm text-foreground/60">
            Need a custom solution? Contact our sales team for enterprise pricing
          </p>
        </div>
      </div>
    </section>
  );
}
