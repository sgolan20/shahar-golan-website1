
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/lib/models/User";
import { supabase } from "@/integrations/supabase/client";
import { getCurrentUserProfile } from "@/services/userService";

interface AuthContextProps {
  user: UserProfile | null;
  isLoading: boolean;
  checkingSession: boolean;
  isAdmin: boolean;
  isPaidUser: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
  checkingSession: true,
  isAdmin: false,
  isPaidUser: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // First, set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setCheckingSession(true);
        
        if (session) {
          // Use setTimeout to break potential circular calls
          setTimeout(() => {
            fetchUserProfile();
          }, 0);
        } else {
          setUser(null);
          setCheckingSession(false);
        }
      }
    );

    // Check for existing session
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await getCurrentUserProfile();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
        setCheckingSession(false);
      }
    };

    fetchUserProfile();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = user?.role === 'admin';
  const isPaidUser = user?.role === 'paid' || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        checkingSession,
        isAdmin,
        isPaidUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
