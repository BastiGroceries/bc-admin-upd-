import { useEffect, useRef, useState } from "react";
import { 
  Server, 
  Activity, 
  Users, 
  HardDrive, 
  Cpu, 
  Network, 
  Settings,
  Play,
  Square,
  RotateCcw,
  Terminal,
  FileText,
  Database
} from "lucide-react";

export default function Panel() {
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

  const serverStats = [
    { label: "CPU Usage", value: "23%", color: "text-green-400" },
    { label: "RAM Usage", value: "2.1GB", color: "text-blue-400" },
    { label: "Disk Usage", value: "45GB", color: "text-yellow-400" },
    { label: "Players Online", value: "47/100", color: "text-blood-400" },
  ];

  const quickActions = [
    { icon: Play, label: "Start Server", color: "text-green-400" },
    { icon: Square, label: "Stop Server", color: "text-red-400" },
    { icon: RotateCcw, label: "Restart", color: "text-blue-400" },
    { icon: Terminal, label: "Console", color: "text-purple-400" },
  ];

  const panelFeatures = [
    {
      icon: <Server className="w-6 h-6" />,
      title: "Server Management",
      description: "Full control over your Minecraft server with real-time monitoring"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "File Manager", 
      description: "Upload, edit, and manage your server files directly from the browser"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Access",
      description: "Manage your server databases with our integrated phpMyAdmin"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Configuration",
      description: "Easy-to-use interface for all your server configuration needs"
    }
  ];

  return (
    <section id="panel" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blood-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <span className="text-foreground">Blood Cloud </span>
            <span className="blood-text">Control Panel</span>
          </h2>
          <p className={`text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`} style={{ animationDelay: "0.2s" }}>
            Experience the most powerful and intuitive control panel in the industry. 
            Manage your servers like a true Blood Lord with our dark-themed interface.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main panel mockup */}
          <div className={`lg:col-span-2 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`} style={{ animationDelay: "0.4s" }}>
            <div className="card-blood p-6">
              {/* Panel header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-blood-500/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blood-500 to-blood-700 rounded-lg flex items-center justify-center">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">BloodCraft SMP</h3>
                    <p className="text-sm text-green-400">● Online</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={index}
                        className="p-2 glass-dark border border-blood-500/30 rounded-lg hover:border-blood-400/50 transition-colors group"
                      >
                        <Icon className={`w-4 h-4 ${action.color} group-hover:scale-110 transition-transform`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {serverStats.map((stat, index) => (
                  <div key={index} className="glass-dark p-4 rounded-lg border border-blood-500/20">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blood-400" />
                      <span className="text-sm text-foreground/70">{stat.label}</span>
                    </div>
                    <div className={`text-xl font-bold ${stat.color} mt-2`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Console preview */}
              <div className="glass-dark rounded-lg border border-blood-500/20 p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Terminal className="w-4 h-4 text-blood-400" />
                  <span className="text-sm font-semibold text-foreground">Server Console</span>
                </div>
                <div className="bg-black/50 rounded p-3 font-mono text-sm space-y-1">
                  <div className="text-green-400">[10:23:45] [Server thread/INFO]: Server started</div>
                  <div className="text-blue-400">[10:24:12] [User Authenticator #1/INFO]: Player123 joined the game</div>
                  <div className="text-yellow-400">[10:24:45] [Server thread/WARN]: Blood Moon is rising...</div>
                  <div className="text-blood-400">[10:25:01] [Server thread/INFO]: BloodCraft powers activated</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-white">></span>
                    <div className="w-2 h-4 bg-blood-400 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature list */}
          <div className={`space-y-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`} style={{ animationDelay: "0.6s" }}>
            {panelFeatures.map((feature, index) => (
              <div
                key={index}
                className="card-blood p-6 hover-lift group"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blood-500/20 to-neon-blue/20 rounded-lg flex items-center justify-center border border-blood-500/30 group-hover:border-blood-400/50 transition-colors">
                      <div className="text-blood-400 group-hover:text-blood-300 transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blood-300 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-foreground/70 text-sm leading-relaxed group-hover:text-foreground/90 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA */}
            <div className="text-center pt-4">
              <button
                onClick={() => {
                  const element = document.getElementById("pricing");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-blood w-full group"
              >
                <span>Access Panel</span>
                <Settings className="w-5 h-5 ml-2 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}