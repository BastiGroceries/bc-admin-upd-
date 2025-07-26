import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Mail, Clock, User, LogOut, Eye, RefreshCw } from "lucide-react";
import LogoutDialog from "../components/LogoutDialog";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  timestamp: string;
  read: boolean;
}

export default function StaffMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
    verifyStaffSession();

    // Auto-refresh messages every 10 seconds for real-time sync
    const interval = setInterval(fetchMessages, 10000);

    // Also refresh when window gets focus (user returns to tab)
    const handleFocus = () => fetchMessages();
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const verifyStaffSession = async () => {
    try {
      const sessionToken = localStorage.getItem("bc_staff_session");
      if (!sessionToken) return;

      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setStaffUsername(data.username || "Staff");
      }
    } catch (error) {
      console.error("Error verifying staff session:", error);
    }
  };

  const fetchMessages = async (showRefreshIndicator = false) => {
    if (showRefreshIndicator) setIsRefreshing(true);

    try {
      const response = await fetch("/api/admin/messages");
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
      if (showRefreshIndicator) setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const sessionToken = localStorage.getItem("bc_staff_session");
      
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken }),
      });
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      localStorage.removeItem("bc_staff_session");
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
      navigate("/bc-sp=login");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const openMessage = (id: string) => {
    window.open(`/messages/submitted/blood-${id}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-dark border-b border-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/bc-sp=panel"
                className="p-2 hover:bg-neon-blue/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold">
                  <span className="text-neon-blue gothic-font">Staff</span>
                  <span className="text-foreground ml-2">Contact Messages</span>
                </h1>
                <p className="text-foreground/70 mt-1">
                  {messages.length} total messages • {messages.filter(m => !m.read).length} unread
                  <span className="text-neon-blue ml-2">• {staffUsername}</span>
                  <span className="text-green-400 ml-2">• Auto-synced</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-neon-blue" />
                <span className="text-lg font-semibold text-foreground">{messages.length}</span>
              </div>
              <button
                onClick={() => fetchMessages(true)}
                disabled={isRefreshing}
                className="glass-dark px-3 py-2 rounded-lg border border-neon-blue/30 text-foreground hover:bg-neon-blue/10 transition-colors flex items-center space-x-2 disabled:opacity-50"
                title="Refresh messages"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="px-4 py-2 bg-gradient-to-r from-neon-blue to-blood-500 hover:from-neon-blue/80 hover:to-blood-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/30 flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Staff access notice */}
        <div className="mb-6 glass-dark p-4 rounded-lg border border-neon-blue/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-neon-blue/20 rounded-lg">
              <Eye className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Staff View Mode</h4>
              <p className="text-foreground/70 text-sm">
                You're viewing messages in read-only mode. Click any message to view details in a new tab.
              </p>
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-16">
            <Mail className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No messages yet</h3>
            <p className="text-foreground/70">Contact form submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`card-blood p-6 hover-lift cursor-pointer transition-all duration-300 border-neon-blue/20 ${
                  !message.read ? "border-neon-blue/50 bg-neon-blue/5" : ""
                }`}
                onClick={() => openMessage(message.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      !message.read 
                        ? "bg-neon-blue/20 border border-neon-blue/30" 
                        : "bg-muted/20 border border-muted/30"
                    }`}>
                      <User className={`w-5 h-5 ${
                        !message.read ? "text-neon-blue" : "text-foreground/50"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {message.name}
                        </h3>
                        {!message.read && (
                          <span className="px-2 py-1 bg-neon-blue text-white text-xs font-bold rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-foreground/70 text-sm">{message.email}</p>
                      <p className="text-foreground/90 mt-1 font-medium">{message.subject}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-foreground/60 text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(message.timestamp)}</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-neon-blue to-blood-500 hover:from-neon-blue/80 hover:to-blood-400 text-white font-semibold rounded text-sm transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/30">
                      View Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
}
