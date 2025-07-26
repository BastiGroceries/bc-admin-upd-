import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const sessionToken = localStorage.getItem("bc_admin_session");
    
    if (!sessionToken) {
      setIsAuthenticated(false);
      navigate("/bc-admin/login");
      return;
    }

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("bc_admin_session");
        setIsAuthenticated(false);
        navigate("/bc-admin/login");
      }
    } catch (error) {
      localStorage.removeItem("bc_admin_session");
      setIsAuthenticated(false);
      navigate("/bc-admin/login");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blood-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
