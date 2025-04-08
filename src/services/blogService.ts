
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/lib/models/BlogPost";

// Function to get all blog posts (published ones for the public view)
export const getPublishedBlogPosts = async () => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }

  return data as BlogPost[];
};

// Function to get a single blog post by ID
export const getBlogPostById = async (id: string) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching blog post:", error);
    throw error;
  }

  return data as BlogPost | null;
};

// Function to create a new blog post
export const createBlogPost = async (post: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([{ ...post }])
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }

  return data as BlogPost;
};

// Function to update a blog post
export const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .update({ ...post, updated_at: new Date() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }

  return data as BlogPost;
};

// Function to delete a blog post
export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from("blog_posts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }

  return true;
};

// Function to get blog posts by tag
export const getBlogPostsByTag = async (tag: string) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .contains("tags", [tag])
    .eq("is_published", true)
    .order("publish_date", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts by tag:", error);
    throw error;
  }

  return data as BlogPost[];
};
