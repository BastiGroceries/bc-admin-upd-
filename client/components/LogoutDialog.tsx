import { AlertTriangle, LogOut, X } from "lucide-react";

interface LogoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoggingOut: boolean;
}

export default function LogoutDialog({ isOpen, onClose, onConfirm, isLoggingOut }: LogoutDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative card-blood p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Confirm Logout</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted/20 rounded transition-colors"
            disabled={isLoggingOut}
          >
            <X className="w-5 h-5 text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-foreground/80 leading-relaxed">
            Are you sure you want to logout from the Blood Cloud admin panel? 
            You'll need to enter your credentials again to access the admin area.
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isLoggingOut}
            className="flex-1 px-4 py-2 glass-dark border border-blood-500/30 text-foreground rounded-lg hover:bg-blood-500/10 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoggingOut}
            className="flex-1 btn-blood flex items-center justify-center space-x-2"
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
