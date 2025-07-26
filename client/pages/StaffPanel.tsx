import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Mail, Users, Activity, ArrowRight, LogOut, Eye, Settings } from "lucide-react";
import LogoutDialog from "../components/LogoutDialog";

interface Stats {
  totalMessages: number;
  unreadMessages: number;
  totalSubscribers: number;
  todayMessages: number;
}

export default function StaffPanel() {
  const [stats, setStats] = useState<Stats>({
    totalMessages: 0,
    unreadMessages: 0,
    totalSubscribers: 0,
    todayMessages: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [staffUsername, setStaffUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    // Get staff username from session verification
    verifyStaffSession();
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

  const fetchStats = async () => {
    try {
      const [messagesRes, subscribersRes] = await Promise.all([
        fetch("/api/admin/messages"),
        fetch("/api/admin/newsletter")
      ]);

      const messagesData = await messagesRes.json();
      const subscribersData = await subscribersRes.json();

      const messages = messagesData.messages || [];
      const subscribers = subscribersData.subscriptions || [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setStats({
        totalMessages: messages.length,
        unreadMessages: messages.filter((msg: any) => !msg.read).length,
        totalSubscribers: subscribers.length,
        todayMessages: messages.filter((msg: any) => 
          new Date(msg.timestamp) >= today
        ).length
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Loading staff panel...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Messages",
      value: stats.totalMessages,
      icon: MessageSquare,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      title: "Unread Messages", 
      value: stats.unreadMessages,
      icon: Mail,
      color: "text-blood-400",
      bgColor: "bg-blood-400/10"
    },
    {
      title: "Newsletter Subscribers",
      value: stats.totalSubscribers,
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      title: "Today's Messages",
      value: stats.todayMessages,
      icon: Activity,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-dark border-b border-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="text-neon-blue gothic-font">Blood Cloud</span>
                <span className="text-foreground ml-2">Staff Panel</span>
              </h1>
              <p className="text-foreground/70 mt-2">
                Welcome back, <span className="text-neon-blue font-semibold">{staffUsername}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="glass-dark px-4 py-2 rounded-lg border border-neon-blue/30 text-foreground hover:bg-neon-blue/10 transition-colors flex items-center space-x-2"
              >
                <span>Back to Site</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="card-blood p-6 border-neon-blue/20">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-foreground/70">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Staff features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            to="/bc-admin/messages/admin/show"
            className="card-blood p-8 hover-lift group block border-neon-blue/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blood-500/20 rounded-xl border border-blood-500/30 group-hover:border-blood-400/50 transition-colors">
                <Eye className="w-8 h-8 text-blood-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blood-300 transition-colors">
                  View Messages
                </h3>
                <p className="text-foreground/70 group-hover:text-foreground/90 transition-colors">
                  Read-only access to contact form submissions
                </p>
              </div>
            </div>
          </Link>

          <div className="card-blood p-8 border-neon-blue/20">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                <Users className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Newsletter Analytics
                </h3>
                <p className="text-foreground/70">
                  View subscription statistics and growth
                </p>
              </div>
            </div>
          </div>

          <div className="card-blood p-8 border-neon-blue/20">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <Settings className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Staff Tools
                </h3>
                <p className="text-foreground/70">
                  Limited administrative tools for staff
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Staff permissions notice */}
        <div className="mt-8 glass-dark p-6 rounded-lg border border-neon-blue/20">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-neon-blue/20 rounded-lg">
              <Settings className="w-5 h-5 text-neon-blue" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-2">Staff Access Level</h4>
              <p className="text-foreground/70 leading-relaxed">
                As a staff member, you have read-only access to contact messages and analytics. 
                For full administrative privileges, please contact your administrator.
              </p>
            </div>
          </div>
        </div>
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
