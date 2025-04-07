import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, Save, X, Tag, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { 
  getAllBlogPosts, 
  getBlogPostById, 
  addBlogPost, 
  updateBlogPost, 
  deleteBlogPost 
} from "@/services/blogService";
import { BlogPost } from "@/lib/models/BlogPost";
import { initializeFirestore } from "@/scripts/initializeFirestore";

const BlogAdmin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isInitializing, setIsInitializing] = useState(false);
  
  // שדות עבור פוסט חדש/עריכה
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editIsPublished, setEditIsPublished] = useState(true);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const postsData = await getAllBlogPosts();
      setPosts(postsData);
    } catch (err) {
      console.error("שגיאה בטעינת פוסטים:", err);
      setError("לא ניתן לטעון את הפוסטים. אנא נסה שוב מאוחר יותר.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInitializeFirestore = async () => {
    try {
      setIsInitializing(true);
      const postId = await initializeFirestore();
      toast({
        title: "אתחול בוצע בהצלחה",
        description: `פוסט ראשון נוצר עם מזהה: ${postId}`,
      });
      fetchPosts();
    } catch (err) {
      console.error("שגיאה באתחול Firestore:", err);
      toast({
        title: "שגיאה באתחול",
        description: "לא ניתן לאתחל את Firestore. אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post);
    setActiveTab("view");
  };

  const handleCreatePost = () => {
    setEditTitle("");
    setEditContent("");
    setEditSummary("");
    setEditAuthor("שחר גולן"); // ערך ברירת מחדל
    setEditImageUrl("");
    setEditTags([]);
    setEditIsPublished(true);
    setIsCreating(true);
    setActiveTab("edit");
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setEditTitle(post.title);
    setEditContent(post.content);
    setEditSummary(post.summary);
    setEditAuthor(post.author);
    setEditImageUrl(post.imageUrl || "");
    setEditTags(post.tags || []);
    setEditIsPublished(post.isPublished);
    setIsEditing(true);
    setActiveTab("edit");
  };

  const handleDeletePost = async (postId: string) => {
    if (!postId) return;
    
    try {
      await deleteBlogPost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: "פוסט נמחק בהצלחה",
        description: "הפוסט נמחק מהמערכת",
      });
      setActiveTab("posts");
    } catch (err) {
      console.error("שגיאה במחיקת פוסט:", err);
      toast({
        title: "שגיאה במחיקת פוסט",
        description: "לא ניתן למחוק את הפוסט. אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    }
  };

  const handleSavePost = async () => {
    const postData = {
      title: editTitle,
      content: editContent,
      summary: editSummary,
      author: editAuthor,
      imageUrl: editImageUrl,
      tags: editTags,
      isPublished: editIsPublished,
      publishDate: new Date()
    };
    
    try {
      if (isEditing && selectedPost?.id) {
        await updateBlogPost(selectedPost.id, postData);
        setPosts(posts.map(post => 
          post.id === selectedPost.id 
            ? { ...post, ...postData, id: selectedPost.id } 
            : post
        ));
        toast({
          title: "פוסט עודכן בהצלחה",
          description: "השינויים נשמרו בהצלחה",
        });
      } else {
        const newPostId = await addBlogPost(postData);
        setPosts([...posts, { ...postData, id: newPostId }]);
        toast({
          title: "פוסט חדש נוצר בהצלחה",
          description: "הפוסט נוסף למערכת",
        });
      }
      setActiveTab("posts");
      setIsEditing(false);
      setIsCreating(false);
    } catch (err) {
      console.error("שגיאה בשמירת פוסט:", err);
      toast({
        title: "שגיאה בשמירת פוסט",
        description: "לא ניתן לשמור את הפוסט. אנא נסה שוב מאוחר יותר.",
        variant: "destructive",
      });
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editTags.includes(newTag.trim())) {
      setEditTags([...editTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditTags(editTags.filter(tag => tag !== tagToRemove));
  };

  const formatDate = (date: Date | string) => {
    if (!date) return "";
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div dir="rtl">
      <section className="pt-20 pb-10 md:pt-28 md:pb-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ניהול בלוג</h1>
            <p className="text-xl text-muted-foreground">
              הוספה, עריכה וניהול פוסטים בבלוג
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="posts">כל הפוסטים</TabsTrigger>
                {selectedPost && <TabsTrigger value="view">צפייה בפוסט</TabsTrigger>}
                {(isEditing || isCreating) && <TabsTrigger value="edit">{isCreating ? "פוסט חדש" : "עריכת פוסט"}</TabsTrigger>}
              </TabsList>
              
              <div className="flex gap-2">
                {activeTab === "posts" && (
                  <>
                    <Button onClick={handleCreatePost} className="flex items-center gap-1">
                      <Plus size={16} />
                      פוסט חדש
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleInitializeFirestore} 
                      disabled={isInitializing}
                    >
                      {isInitializing ? "מאתחל..." : "אתחל Firestore"}
                    </Button>
                  </>
                )}
                {activeTab === "view" && selectedPost && (
                  <Button onClick={() => handleEditPost(selectedPost)} className="flex items-center gap-1">
                    <Pencil size={16} />
                    ערוך פוסט
                  </Button>
                )}
                {activeTab === "edit" && (
                  <Button onClick={handleSavePost} className="flex items-center gap-1">
                    <Save size={16} />
                    שמור
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="posts" className="mt-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-32 w-full mb-4" />
                        <div className="flex gap-2">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : error ? (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>שגיאה</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      {post.imageUrl && (
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                          {!post.isPublished && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                              טיוטה
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-muted-foreground line-clamp-3 mb-4">{post.summary}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.tags && post.tags.map(tag => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishDate)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewPost(post)}
                        >
                          צפייה
                        </Button>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditPost(post)}
                          >
                            <Pencil size={16} />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>מחיקת פוסט</DialogTitle>
                                <DialogDescription>
                                  האם אתה בטוח שברצונך למחוק את הפוסט "{post.title}"? פעולה זו אינה ניתנת לביטול.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => {}}>ביטול</Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => post.id && handleDeletePost(post.id)}
                                >
                                  מחק
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground mb-6">אין פוסטים במערכת</p>
                  <Button onClick={handleInitializeFirestore} disabled={isInitializing}>
                    {isInitializing ? "מאתחל..." : "אתחל Firestore עם פוסט לדוגמה"}
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="view" className="mt-6">
              {selectedPost && (
                <div className="max-w-4xl mx-auto">
                  {selectedPost.imageUrl && (
                    <div className="h-80 overflow-hidden rounded-lg mb-8">
                      <img 
                        src={selectedPost.imageUrl} 
                        alt={selectedPost.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">{selectedPost.title}</h1>
                    {!selectedPost.isPublished && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        טיוטה
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 mb-8 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span>{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(selectedPost.publishDate)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedPost.tags && selectedPost.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-xl font-medium text-muted-foreground mb-8">
                      {selectedPost.summary}
                    </p>
                    
                    <div className="whitespace-pre-wrap">
                      {selectedPost.content}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-12">
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("posts")}
                    >
                      חזרה לרשימה
                    </Button>
                    <Button 
                      onClick={() => handleEditPost(selectedPost)}
                      className="flex items-center gap-1"
                    >
                      <Pencil size={16} />
                      ערוך פוסט
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="edit" className="mt-6">
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-6">
                  <div>
                    <Label htmlFor="title">כותרת</Label>
                    <Input 
                      id="title" 
                      value={editTitle} 
                      onChange={(e) => setEditTitle(e.target.value)} 
                      placeholder="הזן כותרת לפוסט"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="summary">תקציר</Label>
                    <Textarea 
                      id="summary" 
                      value={editSummary} 
                      onChange={(e) => setEditSummary(e.target.value)} 
                      placeholder="הזן תקציר קצר לפוסט"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">תוכן</Label>
                    <Textarea 
                      id="content" 
                      value={editContent} 
                      onChange={(e) => setEditContent(e.target.value)} 
                      placeholder="הזן את תוכן הפוסט"
                      rows={15}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author">מחבר</Label>
                    <Input 
                      id="author" 
                      value={editAuthor} 
                      onChange={(e) => setEditAuthor(e.target.value)} 
                      placeholder="הזן את שם המחבר"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="imageUrl">קישור לתמונה</Label>
                    <Input 
                      id="imageUrl" 
                      value={editImageUrl} 
                      onChange={(e) => setEditImageUrl(e.target.value)} 
                      placeholder="הזן קישור לתמונה (אופציונלי)"
                    />
                    {editImageUrl && (
                      <div className="mt-2 h-40 overflow-hidden rounded-md">
                        <img 
                          src={editImageUrl} 
                          alt="תצוגה מקדימה" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400?text=תמונה+לא+זמינה";
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label>תגיות</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {editTags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <button 
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        value={newTag} 
                        onChange={(e) => setNewTag(e.target.value)} 
                        placeholder="הוסף תגית חדשה"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        onClick={handleAddTag}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Tag size={16} />
                        הוסף
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch 
                      id="isPublished" 
                      checked={editIsPublished} 
                      onCheckedChange={setEditIsPublished}
                    />
                    <Label htmlFor="isPublished" className="flex items-center gap-2">
                      {editIsPublished ? (
                        <>
                          <Eye size={16} />
                          פוסט מפורסם
                        </>
                      ) : (
                        <>
                          <EyeOff size={16} />
                          טיוטה
                        </>
                      )}
                    </Label>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setActiveTab("posts");
                        setIsEditing(false);
                        setIsCreating(false);
                      }}
                    >
                      ביטול
                    </Button>
                    <Button 
                      onClick={handleSavePost}
                      className="flex items-center gap-1"
                    >
                      <Save size={16} />
                      שמור
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default BlogAdmin;
