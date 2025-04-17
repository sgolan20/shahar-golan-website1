import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/lib/models/Course";
import { Lesson } from "@/lib/models/Lesson";

// Get all published courses
export const getPublishedCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching published courses:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Exception in getPublishedCourses:", error);
    return [];
  }
};

// Get a specific course by slug
export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      console.error("Error fetching course:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in getCourseBySlug:", error);
    return null;
  }
};

// Get a specific course by ID
export const getCourseById = async (id: string): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching course by ID:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in getCourseById:", error);
    return null;
  }
};

// Get all courses (admin)
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching all courses:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Exception in getAllCourses:", error);
    return [];
  }
};

// Get lessons for a course
export const getLessonsForCourse = async (courseId: string): Promise<Lesson[]> => {
  try {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("course_id", courseId)
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching lessons:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Exception in getLessonsForCourse:", error);
    return [];
  }
};

// Create a course
export const createCourse = async (course: Omit<Course, "id" | "created_at" | "updated_at">): Promise<Course | null> => {
  try {
    const { data, error } = await supabase
      .from("courses")
      .insert(course)
      .select()
      .single();

    if (error) {
      console.error("Error creating course:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in createCourse:", error);
    return null;
  }
};

// Update a course
export const updateCourse = async (id: string, course: Partial<Omit<Course, "id" | "created_at" | "updated_at">>): Promise<Course | null> => {
  try {
    const formattedCourse = {
      ...course,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("courses")
      .update(formattedCourse)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating course:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in updateCourse:", error);
    return null;
  }
};

// Delete a course
export const deleteCourse = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting course:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Exception in deleteCourse:", error);
    return false;
  }
};

// Get a specific lesson
export const getLessonById = async (id: string): Promise<Lesson | null> => {
  try {
    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching lesson:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in getLessonById:", error);
    return null;
  }
};

// Create a lesson
export const createLesson = async (lesson: Omit<Lesson, "id" | "created_at" | "updated_at">): Promise<Lesson | null> => {
  try {
    const { data, error } = await supabase
      .from("lessons")
      .insert(lesson)
      .select()
      .single();

    if (error) {
      console.error("Error creating lesson:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in createLesson:", error);
    return null;
  }
};

// Update a lesson
export const updateLesson = async (id: string, lesson: Partial<Omit<Lesson, "id" | "created_at" | "updated_at">>): Promise<Lesson | null> => {
  try {
    const formattedLesson = {
      ...lesson,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("lessons")
      .update(formattedLesson)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating lesson:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Exception in updateLesson:", error);
    return null;
  }
};

// Delete a lesson
export const deleteLesson = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("lessons")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting lesson:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Exception in deleteLesson:", error);
    return false;
  }
};
