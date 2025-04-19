
import { supabase } from "@/integrations/supabase/client";
import { UserCourse } from "@/lib/models/UserCourse";

// Get all courses purchased by the current user
export const getUserCourses = async (): Promise<UserCourse[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return [];
    }
    
    const { data, error } = await supabase
      .from("user_courses")
      .select(`
        id,
        user_id,
        course_id,
        granted_at,
        expires_at,
        courses:course_id (
          title,
          slug,
          image_url,
          description
        )
      `)
      .eq("user_id", session.user.id);

    if (error) {
      console.error("Error fetching user courses:", error);
      return [];
    }

    // Transform the data to match UserCourse interface
    const userCourses = data.map(item => ({
      id: item.id,
      user_id: item.user_id,
      course_id: item.course_id,
      course: item.courses,
      granted_at: item.granted_at,
      expires_at: item.expires_at
    }));

    return userCourses;
  } catch (error) {
    console.error("Exception in getUserCourses:", error);
    return [];
  }
};

// Check if user has purchased a specific course
export const hasUserPurchasedCourse = async (courseId: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }
    
    const { data, error } = await supabase
      .from("user_courses")
      .select("id")
      .eq("user_id", session.user.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (error) {
      console.error("Error checking course purchase:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Exception in hasUserPurchasedCourse:", error);
    return false;
  }
};

// Record a course purchase
export const recordCoursePurchase = async (courseId: string, transactionId: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return false;
    }
    
    // Check if already purchased to prevent duplicates
    const alreadyPurchased = await hasUserPurchasedCourse(courseId);
    if (alreadyPurchased) {
      return true; // Already purchased, no need to record again
    }
    
    const { error } = await supabase
      .from("user_courses")
      .insert({
        user_id: session.user.id,
        course_id: courseId,
        granted_at: new Date().toISOString(),
        transaction_id: transactionId
      });

    if (error) {
      console.error("Error recording course purchase:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Exception in recordCoursePurchase:", error);
    return false;
  }
};
