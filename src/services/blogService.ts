
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

// Get recent blog posts (for admin page)
export const getRecentBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recent blog posts:", error);
    throw new Error("Failed to fetch recent blog posts");
  }

  return data || [];
};

// Create a new blog post
export const createBlogPost = async (post: Omit<BlogPost, "id" | "created_at" | "updated_at">): Promise<BlogPost> => {
  // Ensure publish_date is a string when sending to Supabase
  const formattedPost = {
    ...post,
    publish_date: typeof post.publish_date === 'object' 
      ? (post.publish_date as Date).toISOString() 
      : post.publish_date
  };

  const { data, error } = await supabase
    .from("blog_posts")
    .insert(formattedPost)
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Failed to create blog post");
  }

  return data;
};

// Update an existing blog post
export const updateBlogPost = async (id: string, post: Partial<Omit<BlogPost, "id" | "created_at" | "updated_at">>): Promise<BlogPost> => {
  // Ensure publish_date is a string when sending to Supabase
  const formattedPost = {
    ...post,
    publish_date: post.publish_date && typeof post.publish_date === 'object'
      ? (post.publish_date as Date).toISOString()
      : post.publish_date,
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from("blog_posts")
    .update(formattedPost)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    throw new Error("Failed to update blog post");
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

// Get a single blog post by ID
export const getBlogPostById = async (id: string): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    throw new Error("Failed to fetch blog post");
  }

  return data;
};

// Get blog posts by tag
export const getBlogPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .contains("tags", [tag])
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts by tag:", error);
    throw new Error("Failed to fetch blog posts by tag");
  }

  return data || [];
};
