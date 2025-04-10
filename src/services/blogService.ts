import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/lib/models/BlogPost";

// Get all published blog posts
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching published blog posts:", error);
    throw new Error("Failed to fetch published blog posts");
  }

  return data || [];
};

// Get a specific blog post
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
};

// Get all blog posts (admin)
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all blog posts:", error);
    throw new Error("Failed to fetch all blog posts");
  }

  return data || [];
};

// Create a blog post
export const createBlogPost = async (blogPost: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert(blogPost)
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Failed to create blog post");
  }

  return data;
};

// Update blog post
export const updateBlogPost = async (id: string, updates: Partial<Omit<BlogPost, "id" | "created_at" | "updated_at">>): Promise<BlogPost> => {
  // Format dates to ISO strings if they are Date objects
  const formattedUpdates = {
    ...updates,
    updated_at: new Date().toISOString(),
    publish_date: updates.publish_date ? 
      (updates.publish_date instanceof Date ? 
        updates.publish_date.toISOString() : 
        updates.publish_date) : 
      undefined
  };
  
  const { data, error } = await supabase
    .from("blog_posts")
    .update(formattedUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    throw new Error(`Failed to update blog post: ${error.message}`);
  }

  return data;
};

// Delete a blog post
export const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    throw new Error("Failed to delete blog post");
  }
};
