
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Calendar, User, Tag, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPostById } from "@/services/blogService";
import { BlogPost as BlogPostType } from "@/lib/models/BlogPost";
import { useAuth } from "@/contexts/AuthContext";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error("מזהה הפוסט חסר");
        }
        
        const postData = await getBlogPostById(id);
        
        if (!postData) {
          throw new Error("הפוסט לא נמצא");
        }
        
        setPost(postData);
      } catch (err) {
        console.error("שגיאה בטעינת הפוסט:", err);
        setError("לא ניתן לטעון את הפוסט המבוקש. אנא נסה שוב מאוחר יותר.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (date: Date | string) => {
    if (!date) return "";
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">שגיאה בטעינת הפוסט</h2>
          <p className="text-muted-foreground mb-8">{error || "הפוסט המבוקש אינו זמין."}</p>
          <Button asChild>
            <Link to="/written-blog">חזרה לבלוג</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <Link 
              to="/written-blog" 
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              חזרה לבלוג
            </Link>
            
            {isAdmin && (
              <Button 
                asChild 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <Link to="/blog-admin" state={{ editPostId: post.id }}>
                  <Settings className="h-4 w-4" />
                  ערוך מאמר
                </Link>
              </Button>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{formatDate(post.publish_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
        
        {post.image_url && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none mb-8 rtl" dir="rtl">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <>
            <Separator className="my-8" />
            
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium ml-2">תגיות:</span>
              {post.tags.map(tag => (
                <Link to={`/written-blog?tag=${tag}`} key={tag}>
                  <Badge variant="secondary" className="cursor-pointer">
                    <Tag className="ml-1 h-3 w-3" />
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
