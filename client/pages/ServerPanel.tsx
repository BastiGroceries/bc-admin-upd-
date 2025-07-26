import { useEffect, useState, useRef } from "react";
import { 
  Play, 
  Square, 
  RotateCcw, 
  Terminal, 
  Activity, 
  HardDrive, 
  Cpu, 
  Users,
  Wifi,
  Send,
  Download,
  Upload,
  Settings,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface ServerStats {
  status: 'online' | 'offline' | 'starting' | 'stopping';
  uptime: string;
  cpu: number;
  memory: { used: number; total: number };
  disk: { used: number; total: number };
  players: { online: number; max: number };
  tps: number;
}

interface ConsoleMessage {
  id: number;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
}

export default function ServerPanel() {
  const [serverStats, setServerStats] = useState<ServerStats>({
    status: 'online',
    uptime: '2d 14h 32m',
    cpu: 23.5,
    memory: { used: 2.4, total: 8.0 },
    disk: { used: 45.2, total: 100.0 },
    players: { online: 12, max: 50 },
    tps: 19.8
  });

  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([
    { id: 1, timestamp: '14:32:45', level: 'info', message: '[Server thread/INFO]: Server started successfully' },
    { id: 2, timestamp: '14:32:46', level: 'info', message: '[Server thread/INFO]: Blood Cloud server is now online' },
    { id: 3, timestamp: '14:33:12', level: 'info', message: '[User Authenticator #1/INFO]: Player_123 joined the game' },
    { id: 4, timestamp: '14:33:45', level: 'info', message: '[Server thread/INFO]: BloodMoon event triggered' },
    { id: 5, timestamp: '14:34:01', level: 'warn', message: '[Server thread/WARN]: Memory usage reaching 75%' },
    { id: 6, timestamp: '14:34:23', level: 'info', message: '[User Authenticator #2/INFO]: DarkKnight joined the game' },
    { id: 7, timestamp: '14:34:56', level: 'info', message: '[Server thread/INFO]: Backup completed successfully' },
    { id: 8, timestamp: '14:35:12', level: 'debug', message: '[Server thread/DEBUG]: Tick rate: 19.8 TPS' },
  ]);

  const [consoleInput, setConsoleInput] = useState('');
  const [isConsoleLoading, setIsConsoleLoading] = useState(false);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll console to bottom
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleMessages]);

  useEffect(() => {
    // Simulate live console updates
    const interval = setInterval(() => {
      const randomMessages = [
        { level: 'info', message: '[Server thread/INFO]: Automatic save completed' },
        { level: 'info', message: '[Server thread/INFO]: Player activities synchronized' },
        { level: 'debug', message: '[Server thread/DEBUG]: Garbage collection completed' },
        { level: 'info', message: '[Blood Cloud/INFO]: Server health check passed' },
      ];

      if (Math.random() < 0.3) { // 30% chance every 5 seconds
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        const newMessage: ConsoleMessage = {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          level: randomMessage.level as any,
          message: randomMessage.message
        };

        setConsoleMessages(prev => [...prev.slice(-50), newMessage]); // Keep last 50 messages
      }

      // Update stats slightly
      setServerStats(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(80, prev.cpu + (Math.random() - 0.5) * 5)),
        memory: {
          ...prev.memory,
          used: Math.max(1, Math.min(7, prev.memory.used + (Math.random() - 0.5) * 0.2))
        },
        tps: Math.max(15, Math.min(20, prev.tps + (Math.random() - 0.5) * 0.5))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleConsoleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consoleInput.trim()) return;

    const command = consoleInput.trim();
    setConsoleInput('');
    setIsConsoleLoading(true);

    // Add command to console
    const commandMessage: ConsoleMessage = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      level: 'info',
      message: `> ${command}`
    };

    setConsoleMessages(prev => [...prev, commandMessage]);

    // Simulate command response
    setTimeout(() => {
      const responseMessage: ConsoleMessage = {
        id: Date.now() + 1,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: 'info',
        message: `[Server thread/INFO]: Command executed: ${command}`
      };

      setConsoleMessages(prev => [...prev, responseMessage]);
      setIsConsoleLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      case 'starting': return 'text-yellow-400';
      case 'stopping': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'offline': return <XCircle className="w-4 h-4" />;
      case 'starting': return <Clock className="w-4 h-4" />;
      case 'stopping': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getMessageColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'debug': return 'text-blue-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-dark border-b border-blood-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blood-500 to-blood-700 rounded-lg flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="blood-text gothic-font">BloodCraft</span>
                    <span className="text-foreground ml-2">SMP</span>
                  </h1>
                  <div className={`flex items-center space-x-2 ${getStatusColor(serverStats.status)}`}>
                    {getStatusIcon(serverStats.status)}
                    <span className="text-sm font-medium capitalize">{serverStats.status}</span>
                    <span className="text-foreground/50">•</span>
                    <span className="text-foreground/70 text-sm">{serverStats.uptime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Server controls */}
            <div className="flex items-center space-x-2">
              <button className="p-2 glass-dark border border-green-500/30 rounded-lg hover:border-green-400/50 transition-colors group">
                <Play className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2 glass-dark border border-red-500/30 rounded-lg hover:border-red-400/50 transition-colors group">
                <Square className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2 glass-dark border border-yellow-500/30 rounded-lg hover:border-yellow-400/50 transition-colors group">
                <RotateCcw className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
              </button>
              <button className="p-2 glass-dark border border-blood-500/30 rounded-lg hover:border-blood-400/50 transition-colors group">
                <Settings className="w-5 h-5 text-blood-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Stats sidebar */}
          <div className="space-y-6">
            {/* Server stats */}
            <div className="card-blood p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blood-400" />
                <span>Server Stats</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-foreground/70">CPU</span>
                  </div>
                  <span className="text-sm font-medium">{serverStats.cpu.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${serverStats.cpu}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-foreground/70">Memory</span>
                  </div>
                  <span className="text-sm font-medium">
                    {serverStats.memory.used.toFixed(1)}GB / {serverStats.memory.total.toFixed(1)}GB
                  </span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(serverStats.memory.used / serverStats.memory.total) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-foreground/70">Players</span>
                  </div>
                  <span className="text-sm font-medium">
                    {serverStats.players.online} / {serverStats.players.max}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-foreground/70">TPS</span>
                  </div>
                  <span className={`text-sm font-medium ${serverStats.tps > 18 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {serverStats.tps.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Network stats */}
            <div className="card-blood p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-blood-400" />
                <span>Network</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-foreground/70">Upload</span>
                  </div>
                  <span className="text-sm font-medium">24.3 KB/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-foreground/70">Download</span>
                  </div>
                  <span className="text-sm font-medium">12.8 KB/s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Console */}
          <div className="lg:col-span-3">
            <div className="card-blood p-6 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                  <Terminal className="w-5 h-5 text-blood-400" />
                  <span>Server Console</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm text-foreground/70">Live</span>
                </div>
              </div>

              {/* Console output */}
              <div className="flex-1 bg-black/80 rounded-lg p-4 overflow-y-auto font-mono text-sm border border-blood-500/20">
                <div className="space-y-1">
                  {consoleMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <span className="text-foreground/50 text-xs min-w-[60px]">
                        {msg.timestamp}
                      </span>
                      <span className={`${getMessageColor(msg.level)} leading-relaxed`}>
                        {msg.message}
                      </span>
                    </div>
                  ))}
                  {isConsoleLoading && (
                    <div className="flex items-center space-x-2 text-yellow-400">
                      <span className="text-foreground/50 text-xs min-w-[60px]">
                        {new Date().toLocaleTimeString('en-US', { hour12: false })}
                      </span>
                      <span>Executing command...</span>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <div ref={consoleEndRef} />
              </div>

              {/* Console input */}
              <form onSubmit={handleConsoleCommand} className="mt-4">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blood-400 font-mono">
                      &gt;
                    </span>
                    <input
                      type="text"
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder="Enter server command..."
                      className="w-full pl-8 pr-4 py-3 bg-black/60 border border-blood-500/30 rounded-lg text-foreground placeholder-foreground/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blood-500/50 hover:border-blood-400/50 transition-colors"
                      disabled={isConsoleLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isConsoleLoading || !consoleInput.trim()}
                    className="btn-blood px-4 py-3 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
