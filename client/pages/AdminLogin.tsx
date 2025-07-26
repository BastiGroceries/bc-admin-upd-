import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in
    const sessionToken = localStorage.getItem("bc_admin_session");
    if (sessionToken) {
      verifySession(sessionToken);
    }
  }, []);

  const verifySession = async (token: string) => {
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken: token }),
      });

      if (response.ok) {
        navigate("/bc-admin");
      } else {
        localStorage.removeItem("bc_admin_session");
      }
    } catch (error) {
      localStorage.removeItem("bc_admin_session");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Store session token
        localStorage.setItem("bc_admin_session", data.sessionToken);
        navigate("/bc-admin");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof credentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blood-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blood-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blood-500 to-blood-700 rounded-lg flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-sm transform rotate-45 opacity-90" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blood-400 to-blood-600 rounded-lg blur-sm opacity-50" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="blood-text gothic-font">Blood Cloud</span>
            <span className="text-foreground ml-2">Admin</span>
          </h1>
          <p className="text-foreground/70">Enter your credentials to access the control panel</p>
        </div>

        {/* Login form */}
        <div className="card-blood p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={`w-full px-4 py-3 bg-input border rounded-lg text-foreground placeholder-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2 ${
                  error 
                    ? "border-destructive focus:ring-destructive/50" 
                    : "border-border focus:ring-blood-500/50 hover:border-blood-400/50"
                }`}
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 pr-12 bg-input border rounded-lg text-foreground placeholder-foreground/50 transition-all duration-300 focus:outline-none focus:ring-2 ${
                    error 
                      ? "border-destructive focus:ring-destructive/50" 
                      : "border-border focus:ring-blood-500/50 hover:border-blood-400/50"
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-blood w-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{isLoading ? "Logging in..." : "Access Panel"}</span>
                <ArrowRight className={`w-5 h-5 transition-transform ${isLoading ? "animate-pulse" : "group-hover:translate-x-1"}`} />
              </span>
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-r from-blood-600 to-neon-blue animate-pulse" />
              )}
            </button>
          </form>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-foreground/60 hover:text-blood-400 text-sm transition-colors"
            >
              ← Back to Blood Cloud
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
