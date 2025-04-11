
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

    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          fetchUserProfile();
        } else {
          setUser(null);
          setCheckingSession(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
        setCheckingSession(false);
      }
    };

    // Fetch user profile function
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setUser(null);
          return;
        }
        
        // Direct database query to avoid RLS recursion
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching user profile:", error);
          setUser(null);
        } else if (data) {
          setUser(data as UserProfile);
        } else {
          console.error("No profile found for user:", session.user.id);
          setUser(null);
        }
      } catch (error) {
        console.error("Error in fetchUserProfile:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
        setCheckingSession(false);
      }
    };

    checkSession();

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
