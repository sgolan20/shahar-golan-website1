import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPostById } from "@/services/blogService";
import { BlogPost as BlogPostType } from "@/lib/models/BlogPost";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);
        const postData = await getBlogPostById(id);
        setPost(postData);
      } catch (err) {
        console.error("שגיאה בטעינת המאמר:", err);
        setError("לא ניתן לטעון את המאמר. אנא נסה שוב מאוחר יותר.");
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

  // מיקום מחדש של תגיות HTML בתוכן המאמר
  const createMarkup = (content: string) => {
    return { __html: content };
  };

  return (
    <div dir="rtl">
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="max-w-3xl mx-auto">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-2/4 mb-10" />
              <Skeleton className="h-[400px] w-full mb-6" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          ) : error ? (
            <div className="max-w-3xl mx-auto text-center py-12">
              <p className="text-xl text-red-500 mb-6">{error}</p>
              <Button asChild variant="outline">
                <Link to="/written-blog" className="flex items-center gap-2">
                  <ArrowRight size={16} />
                  חזרה לבלוג
                </Link>
              </Button>
            </div>
          ) : post ? (
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                asChild 
                variant="outline" 
                size="sm" 
                className="mb-6"
              >
                <Link to="/written-blog" className="flex items-center gap-2">
                  <ArrowRight size={16} />
                  חזרה לבלוג
                </Link>
              </Button>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(post.publish_date)}</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>

              {post.image_url && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div 
                className="prose prose-lg max-w-none mb-8" 
                dangerouslySetInnerHTML={createMarkup(post.content)}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-4 border-t">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Tag size={14} />
                    תגיות:
                  </span>
                  {post.tags.map(tag => (
                    <Link key={tag} to={`/written-blog?tag=${tag}`}>
                      <Badge variant="secondary">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="max-w-3xl mx-auto text-center py-12">
              <p className="text-xl text-muted-foreground mb-6">המאמר לא נמצא</p>
              <Button asChild variant="outline">
                <Link to="/written-blog" className="flex items-center gap-2">
                  <ArrowRight size={16} />
                  חזרה לבלוג
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
