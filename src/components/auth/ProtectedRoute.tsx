
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/models/User";
import { useToast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole = "free" }: ProtectedRouteProps) => {
  const { user, checkingSession, isAdmin, isPaidUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (checkingSession) return;

    if (!user) {
      toast({
        title: "התחברות נדרשת",
        description: "אנא התחבר כדי לגשת לדף זה.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const hasAccess = 
      requiredRole === "admin" ? isAdmin :
      requiredRole === "paid" ? isPaidUser :
      true;

    if (!hasAccess) {
      toast({
        title: "גישה אסורה",
        description: "אין לך הרשאות מתאימות לצפייה בדף זה.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, checkingSession, isAdmin, isPaidUser, requiredRole, navigate, toast]);

  if (checkingSession) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
