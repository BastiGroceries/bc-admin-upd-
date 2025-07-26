import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Mail, MessageSquare, Clock, Copy, CheckCircle } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function MessageView() {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  // Extract the actual ID from blood-{id} format
  const actualId = id?.replace('blood-', '');

  useEffect(() => {
    if (actualId) {
      fetchMessage(actualId);
    }
  }, [actualId]);

  const fetchMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`);
      if (!response.ok) {
        throw new Error('Message not found');
      }
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setError("Message not found or error loading message");
      console.error("Error fetching message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmail = async () => {
    if (message?.email) {
      try {
        await navigator.clipboard.writeText(message.email);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy email:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blood-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Loading message...</p>
        </div>
      </div>
    );
  }

  if (error || !message) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Message Not Found</h1>
          <p className="text-foreground/70 mb-6">{error}</p>
          <Link to="/bc-admin/messages/admin/show" className="btn-blood">
            Back to Messages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-dark border-b border-blood-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/bc-admin/messages/admin/show"
              className="p-2 hover:bg-blood-500/20 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Contact Message</h1>
              <p className="text-foreground/70 text-sm">ID: blood-{message.id}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Message content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card-blood p-8">
          {/* Message header */}
          <div className="border-b border-blood-500/20 pb-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blood-500/20 rounded-xl border border-blood-500/30">
                  <User className="w-8 h-8 text-blood-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{message.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <Mail className="w-4 h-4 text-foreground/50" />
                    <span className="text-foreground/70">{message.email}</span>
                    <button
                      onClick={copyEmail}
                      className="p-1 hover:bg-blood-500/20 rounded transition-colors"
                      title="Copy email"
                    >
                      {emailCopied ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-foreground/50 hover:text-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 text-foreground/60 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{formatDate(message.timestamp)}</span>
                </div>
                {!message.read && (
                  <span className="inline-block mt-2 px-3 py-1 bg-blood-500 text-white text-xs font-bold rounded-full">
                    UNREAD
                  </span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="glass-dark p-4 rounded-lg border border-blood-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <MessageSquare className="w-5 h-5 text-blood-400" />
                <span className="text-sm font-medium text-foreground/70">Subject</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">{message.subject}</h3>
            </div>
          </div>

          {/* Message body */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Message</h4>
            <div className="bg-background/50 rounded-lg p-6 border border-blood-500/10">
              <div className="prose prose-invert max-w-none">
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {message.message}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4 mt-8 pt-6 border-t border-blood-500/20">
            <button
              onClick={() => window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`}
              className="btn-blood flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Reply via Email</span>
            </button>
            
            <Link
              to="/bc-admin/messages/admin/show"
              className="glass-dark px-4 py-2 rounded-lg border border-blood-500/30 text-foreground hover:bg-blood-500/10 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Messages</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
