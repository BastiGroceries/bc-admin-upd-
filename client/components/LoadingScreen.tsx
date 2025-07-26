import { useEffect, useState } from "react";

interface BloodDropProps {
  delay: number;
  left: string;
  size: number;
}

const BloodDrop = ({ delay, left, size }: BloodDropProps) => (
  <div
    className="absolute"
    style={{
      left,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
    }}
  >
    <div
      className="bg-gradient-to-b from-blood-400 to-blood-600 rounded-full animate-blood-drop opacity-80"
      style={{
        width: `${size}px`,
        height: `${size * 1.5}px`,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        filter: "drop-shadow(0 0 10px hsl(var(--blood-500)))",
      }}
    />
  </div>
);

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [loadingText, setLoadingText] = useState("Awakening the Blood Cloud");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const textInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const bloodDrops = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    left: `${Math.random() * 100}%`,
    size: 8 + Math.random() * 12,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Fog background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/90 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,69,19,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,20,60,0.05)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(75,0,130,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Blood drops container */}
      <div className="absolute inset-0 overflow-hidden">
        {bloodDrops.map((drop) => (
          <BloodDrop
            key={drop.id}
            delay={drop.delay}
            left={drop.left}
            size={drop.size}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blood-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Blood Cloud logo */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl horror-font text-shadow-lg mb-4">
            <span className="blood-text animate-pulse">Blood</span>
            <span className="text-neon-blue ml-4 animate-pulse" style={{ animationDelay: "0.5s" }}>
              Cloud
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blood-500 to-neon-blue mx-auto rounded-full opacity-80" />
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl text-foreground/80 font-medium">
            {loadingText}{dots}
          </p>
          
          {/* Loading bar */}
          <div className="w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blood-500 to-neon-blue rounded-full animate-pulse" 
                 style={{ width: "100%", animation: "pulse 2s ease-in-out infinite" }} />
          </div>
        </div>

        {/* Mystical symbols */}
        <div className="mt-12 flex justify-center space-x-8 opacity-60">
          <div className="w-6 h-6 border-2 border-blood-500 rotate-45 animate-spin" style={{ animationDuration: "4s" }} />
          <div className="w-6 h-6 border-2 border-neon-blue rounded-full animate-ping" style={{ animationDelay: "1s" }} />
          <div className="w-6 h-6 border-2 border-blood-500 rotate-45 animate-spin" style={{ animationDuration: "4s", animationDelay: "2s" }} />
        </div>
      </div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blood-900/5 to-transparent animate-pulse" />
    </div>
  );
}
