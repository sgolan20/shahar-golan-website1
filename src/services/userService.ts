
import { supabase } from "@/integrations/supabase/client";
import { UserProfile, UserRole } from "@/lib/models/User";

// Get current user profile - using maybeSingle to avoid single() error
export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return null;
    }
    
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in getCurrentUserProfile:", error);
    return null;
  }
};

// Check if user has a specific role
export const hasRole = async (role: UserRole): Promise<boolean> => {
  const profile = await getCurrentUserProfile();
  
  if (!profile) {
    return false;
  }
  
  return profile.role === role || (role === 'paid' && profile.role === 'admin');
};

// Sign up with email and password
export const signUp = async (email: string, password: string, fullName?: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Check your email for the confirmation link" };
  } catch (error: any) {
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Successfully signed in" };
  } catch (error: any) {
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
};

// Sign out
export const signOut = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Successfully signed out" };
  } catch (error: any) {
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
};

// Update user profile
export const updateUserProfile = async (updates: Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">>): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return { success: false, message: "Not authenticated" };
    }
    
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq("id", session.user.id)
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: "Profile updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
};

// Set user role (admin only)
export const setUserRole = async (userId: string, role: UserRole): Promise<{ success: boolean; message: string }> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        role,
        updated_at: new Date().toISOString()
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: `User role updated to ${role}` };
  } catch (error: any) {
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
};

// Get all users (admin only)
export const getAllUsers = async (): Promise<UserProfile[]> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch all users");
    }

    return data || [];
  } catch (error) {
    console.error("Exception in getAllUsers:", error);
    return [];
  }
};
