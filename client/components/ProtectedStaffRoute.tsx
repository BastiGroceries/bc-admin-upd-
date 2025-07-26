import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedStaffRouteProps {
  children: React.ReactNode;
}

export default function ProtectedStaffRoute({ children }: ProtectedStaffRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const sessionToken = localStorage.getItem("bc_staff_session");
    
    if (!sessionToken) {
      setIsAuthenticated(false);
      navigate("/bc-sp=login");
      return;
    }

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionToken }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.userType === 'staff') {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("bc_staff_session");
          setIsAuthenticated(false);
          navigate("/bc-sp=login");
        }
      } else {
        localStorage.removeItem("bc_staff_session");
        setIsAuthenticated(false);
        navigate("/bc-sp=login");
      }
    } catch (error) {
      localStorage.removeItem("bc_staff_session");
      setIsAuthenticated(false);
      navigate("/bc-sp=login");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/70">Verifying staff access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}
