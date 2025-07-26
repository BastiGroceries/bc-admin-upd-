import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageSquare, Mail, Clock, User, LogOut, RefreshCw } from "lucide-react";
import LogoutDialog from "../components/LogoutDialog";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  timestamp: string;
  read: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();

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

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const sessionToken = localStorage.getItem("bc_admin_session");

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
      localStorage.removeItem("bc_admin_session");
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
      navigate("/bc-admin/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blood-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-dark border-b border-blood-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/bc-admin"
                className="p-2 hover:bg-blood-500/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
                <p className="text-foreground/70 mt-1">
                  {messages.length} total messages • {messages.filter(m => !m.read).length} unread
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-blood-400" />
                <span className="text-lg font-semibold text-foreground">{messages.length}</span>
              </div>
              <button
                onClick={() => setShowLogoutDialog(true)}
                className="btn-blood flex items-center space-x-2 px-4 py-2"
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
                className={`card-blood p-6 hover-lift cursor-pointer transition-all duration-300 ${
                  !message.read ? "border-blood-400/50 bg-blood-500/5" : ""
                }`}
                onClick={() => openMessage(message.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${
                      !message.read 
                        ? "bg-blood-500/20 border border-blood-500/30" 
                        : "bg-muted/20 border border-muted/30"
                    }`}>
                      <User className={`w-5 h-5 ${
                        !message.read ? "text-blood-400" : "text-foreground/50"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {message.name}
                        </h3>
                        {!message.read && (
                          <span className="px-2 py-1 bg-blood-500 text-white text-xs font-bold rounded-full">
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
                    <button className="btn-blood px-4 py-2 text-sm">
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
