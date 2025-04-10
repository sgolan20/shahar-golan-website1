
import { supabase } from "@/integrations/supabase/client";
import { Course } from "@/lib/models/Course";
import { Lesson } from "@/lib/models/Lesson";

// Get all published courses
export const getPublishedCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published courses:", error);
    throw new Error("Failed to fetch published courses");
  }

  return data || [];
};

// Get a specific course by slug
export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No results found
    }
    console.error("Error fetching course:", error);
    throw new Error("Failed to fetch course");
  }

  return data;
};

// Get all courses (admin)
export const getAllCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all courses:", error);
    throw new Error("Failed to fetch all courses");
  }

  return data || [];
};

// Create a course
export const createCourse = async (course: Omit<Course, "id" | "created_at" | "updated_at">): Promise<Course> => {
  const { data, error } = await supabase
    .from("courses")
    .insert(course)
    .select()
    .single();

  if (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }

  return data;
};

// Update a course
export const updateCourse = async (id: string, course: Partial<Omit<Course, "id" | "created_at" | "updated_at">>): Promise<Course> => {
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
    throw new Error("Failed to update course");
  }

  return data;
};

// Delete a course
export const deleteCourse = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting course:", error);
    throw new Error("Failed to delete course");
  }
};

// Get lessons for a course
export const getLessonsForCourse = async (courseId: string): Promise<Lesson[]> => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("position", { ascending: true });

  if (error) {
    console.error("Error fetching lessons:", error);
    throw new Error("Failed to fetch lessons");
  }

  return data || [];
};

// Get a specific lesson
export const getLessonById = async (id: string): Promise<Lesson | null> => {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // No results found
    }
    console.error("Error fetching lesson:", error);
    throw new Error("Failed to fetch lesson");
  }

  return data;
};

// Create a lesson
export const createLesson = async (lesson: Omit<Lesson, "id" | "created_at" | "updated_at">): Promise<Lesson> => {
  const { data, error } = await supabase
    .from("lessons")
    .insert(lesson)
    .select()
    .single();

  if (error) {
    console.error("Error creating lesson:", error);
    throw new Error("Failed to create lesson");
  }

  return data;
};

// Update a lesson
export const updateLesson = async (id: string, lesson: Partial<Omit<Lesson, "id" | "created_at" | "updated_at">>): Promise<Lesson> => {
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
    throw new Error("Failed to update lesson");
  }

  return data;
};

// Delete a lesson
export const deleteLesson = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("lessons")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting lesson:", error);
    throw new Error("Failed to delete lesson");
  }
};
