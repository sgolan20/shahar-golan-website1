
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, X, Tag, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { toast } from "sonner";
import { getRecentBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from "@/services/blogService";
import { BlogPost } from "@/lib/models/BlogPost";
import Layout from "@/components/layout/Layout";

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    summary: string;
    author: string;
    image_url?: string;
    is_published: boolean;
    publish_date: string;
    tags: string[];
    newTag: string;
  }>({
    title: "",
    content: "",
    summary: "",
    author: "שחר גולן",
    image_url: "",
    is_published: false,
    publish_date: new Date().toISOString().split('T')[0],
    tags: [],
    newTag: ""
  });
  
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
  
  const handleCreatePost = async () => {
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
  
  const handleUpdatePost = async () => {
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
    setFormData({
      title: "",
      content: "",
      summary: "",
      author: "שחר גולן",
      image_url: "",
      is_published: false,
      publish_date: new Date().toISOString().split('T')[0],
      tags: [],
      newTag: ""
    });
    setIsEditing(false);
    setEditingPostId(null);
    setIsCreatingPost(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_published: checked }));
  };
  
  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ""
      }));
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  const filteredPosts = activeTab === "all" 
    ? posts 
    : activeTab === "published" 
      ? posts.filter(post => post.is_published) 
      : posts.filter(post => !post.is_published);
  
  const formatDate = (date: string | Date) => {
    if (!date) return "";
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          
          <div className="flex justify-between items-center mb-8">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">הכל ({posts.length})</TabsTrigger>
                <TabsTrigger value="published">
                  פורסמו ({posts.filter(post => post.is_published).length})
                </TabsTrigger>
                <TabsTrigger value="draft">
                  טיוטות ({posts.filter(post => !post.is_published).length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button 
              onClick={() => setIsCreatingPost(true)} 
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              פוסט חדש
            </Button>
          </div>
          
          {isCreatingPost || isEditing ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{isEditing ? "עריכת פוסט" : "יצירת פוסט חדש"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">כותרת</label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="הכנס כותרת..."
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="summary" className="block text-sm font-medium mb-1">תקציר</label>
                      <Textarea
                        id="summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        placeholder="הכנס תקציר קצר..."
                        rows={2}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium mb-1">תוכן</label>
                      <Textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="הכנס את תוכן הפוסט..."
                        rows={10}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="image_url" className="block text-sm font-medium mb-1">קישור לתמונה</label>
                      <Input
                        id="image_url"
                        name="image_url"
                        value={formData.image_url || ""}
                        onChange={handleChange}
                        placeholder="הכנס קישור לתמונה..."
                      />
                      {formData.image_url && (
                        <div className="mt-2 w-40 h-40 rounded-md overflow-hidden">
                          <img 
                            src={formData.image_url} 
                            alt="תצוגה מקדימה" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=תמונה+לא+נמצאה";
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium mb-1">תגיות</label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="newTag"
                          name="newTag"
                          value={formData.newTag}
                          onChange={handleChange}
                          onKeyDown={handleTagKeyDown}
                          placeholder="הוסף תגית..."
                          className="flex-grow"
                        />
                        <Button type="button" onClick={addTag} variant="outline">הוסף</Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map(tag => (
                            <Badge key={tag} className="flex items-center gap-1">
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-destructive"
                              >
                                <X size={14} />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="publish_date" className="block text-sm font-medium mb-1">תאריך פרסום</label>
                      <Input
                        id="publish_date"
                        name="publish_date"
                        type="date"
                        value={formData.publish_date}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="is_published"
                        checked={formData.is_published}
                        onCheckedChange={handleSwitchChange}
                      />
                      <label 
                        htmlFor="is_published" 
                        className="text-sm font-medium cursor-pointer"
                      >
                        {formData.is_published ? "פורסם" : "טיוטה"}
                      </label>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end gap-3">
                <Button variant="outline" onClick={resetForm}>
                  ביטול
                </Button>
                <Button onClick={isEditing ? handleUpdatePost : handleCreatePost}>
                  {isEditing ? "עדכן פוסט" : "צור פוסט"}
                </Button>
              </CardFooter>
            </Card>
          ) : null}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="h-full flex flex-col relative">
                {post.image_url && (
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=תמונה+לא+נמצאה";
                      }}
                    />
                  </div>
                )}
                <Badge 
                  variant={post.is_published ? "default" : "outline"}
                  className="absolute top-2 right-2"
                >
                  {post.is_published ? "פורסם" : "טיוטה"}
                </Badge>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="line-clamp-3 text-muted-foreground mb-4">{post.summary}</p>
                  <Collapsible className="space-y-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags && post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{formatDate(post.publish_date)}</span>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full mt-2">
                        פרטים נוספים
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 pt-2 border-t">
                      <div className="prose prose-sm max-w-none line-clamp-3 mb-2">
                        {post.content}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => startEditing(post)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <a href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer">
                        {post.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}

            {filteredPosts.length === 0 && !isLoading && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">אין פוסטים להצגה</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogAdmin;
