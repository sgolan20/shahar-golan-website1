
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { getRecentBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "@/services/blogService";
import { BlogPost } from "@/lib/models/BlogPost";
import Layout from "@/components/layout/Layout";
import BlogPostForm from "@/components/blog/BlogPostForm";
import BlogPostsList from "@/components/blog/BlogPostsList";
import BlogFilters from "@/components/blog/BlogFilters";

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  const emptyFormData = {
    title: "",
    content: "",
    summary: "",
    author: "שחר גולן",
    image_url: "",
    is_published: false,
    publish_date: new Date().toISOString().split('T')[0],
    tags: [],
    newTag: ""
  };

  const [formData, setFormData] = useState(emptyFormData);
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await getRecentBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("שגיאה בטעינת הפוסטים");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreatePost = async (formData: any) => {
    try {
      const { newTag, ...postData } = formData;
      
      const newPost = await createBlogPost({
        ...postData,
        publish_date: new Date(formData.publish_date).toISOString()
      });
      
      setPosts([newPost, ...posts]);
      resetForm();
      setIsCreatingPost(false);
      toast.success("הפוסט נוצר בהצלחה");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("שגיאה ביצירת הפוסט");
    }
  };
  
  const handleUpdatePost = async (formData: any) => {
    if (!editingPostId) return;
    
    try {
      const { newTag, ...postData } = formData;
      
      const updatedPost = await updateBlogPost(editingPostId, {
        ...postData,
        publish_date: new Date(formData.publish_date).toISOString()
      });
      
      setPosts(posts.map(post => post.id === editingPostId ? updatedPost : post));
      resetForm();
      setIsEditing(false);
      setEditingPostId(null);
      toast.success("הפוסט עודכן בהצלחה");
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("שגיאה בעדכון הפוסט");
    }
  };
  
  const handleDeletePost = async (id: string) => {
    if (!confirm("האם אתה בטוח שברצונך למחוק את הפוסט הזה?")) return;
    
    try {
      await deleteBlogPost(id);
      setPosts(posts.filter(post => post.id !== id));
      toast.success("הפוסט נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("שגיאה במחיקת הפוסט");
    }
  };
  
  const startEditing = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      summary: post.summary,
      author: post.author,
      image_url: post.image_url || "",
      is_published: post.is_published,
      publish_date: new Date(post.publish_date).toISOString().split('T')[0],
      tags: post.tags || [],
      newTag: ""
    });
    setIsEditing(true);
    setEditingPostId(post.id);
  };
  
  const resetForm = () => {
    setFormData(emptyFormData);
    setIsEditing(false);
    setEditingPostId(null);
    setIsCreatingPost(false);
  };
  
  const formatDate = (date: string | Date) => {
    if (!date) return "";
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = activeTab === "all" 
    ? posts 
    : activeTab === "published" 
      ? posts.filter(post => post.is_published) 
      : posts.filter(post => !post.is_published);

  const handleFormSubmit = (formData: any) => {
    if (isEditing) {
      handleUpdatePost(formData);
    } else {
      handleCreatePost(formData);
    }
  };

  return (
    <Layout title="ניהול בלוג - שחר גולן">
      <div className="py-12" dir="rtl">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">ניהול בלוג</h1>
            <p className="text-muted-foreground">צור, ערוך ונהל את פוסטי הבלוג שלך</p>
          </motion.div>
          
          <BlogFilters 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onCreatePost={() => setIsCreatingPost(true)}
            posts={posts}
          />
          
          {(isCreatingPost || isEditing) && (
            <BlogPostForm 
              isEditing={isEditing}
              initialData={formData}
              onSubmit={handleFormSubmit}
              onCancel={resetForm}
            />
          )}
          
          <BlogPostsList 
            posts={filteredPosts}
            isLoading={isLoading}
            onEdit={startEditing}
            onDelete={handleDeletePost}
            formatDate={formatDate}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BlogAdmin;
