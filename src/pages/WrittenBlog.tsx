import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, ChevronLeft, Calendar, User, Tag, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPublishedBlogPosts, getBlogPostsByTag } from "@/services/blogService";
import { BlogPost } from "@/lib/models/BlogPost";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 6;

const WrittenBlog = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let postsData: BlogPost[];
        
        if (selectedTag) {
          postsData = await getBlogPostsByTag(selectedTag);
        } else {
          postsData = await getPublishedBlogPosts();
        }
        
        setPosts(postsData);
        
        // חילוץ כל התגיות הייחודיות מהפוסטים
        const tagsSet = new Set<string>();
        postsData.forEach(post => {
          if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => tagsSet.add(tag));
          }
        });
        
        setAllTags(Array.from(tagsSet));
      } catch (err) {
        console.error("שגיאה בטעינת פוסטים:", err);
        setError("לא ניתן לטעון את הפוסטים. אנא נסה שוב מאוחר יותר.");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [selectedTag]);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">בלוג</h1>
            <p className="text-xl text-muted-foreground">
              מאמרים, טיפים ותובנות בנושא בינה מלאכותית
            </p>
            {isAdmin && (
              <Button 
                asChild 
                variant="outline" 
                className="mt-4 gap-2"
              >
                <Link to="/blog-admin">
                  <Settings className="h-4 w-4" />
                  ניהול מאמרים
                </Link>
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="w-full md:w-auto relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="חיפוש מאמרים..."
                className="pr-10 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Badge 
                variant={selectedTag === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(null)}
              >
                הכל
              </Badge>
              {allTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

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
            <div className="text-center py-12">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          ) : currentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    {post.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image_url} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">{post.summary}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar size={14} />
                        <span>{formatDate(post.publish_date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2 pt-0">
                      {post.tags && post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => setSelectedTag(tag)}>
                          {tag}
                        </Badge>
                      ))}
                    </CardFooter>
                    <CardFooter className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.location.href = `/blog/${post.id}`}
                      >
                        קרא עוד
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">לא נמצאו מאמרים התואמים לחיפוש שלך</p>
            </div>
          )}

          {!isLoading && filteredPosts.length > POSTS_PER_PAGE && (
            <div className="flex justify-center items-center mt-12 gap-2">
              <Button 
                variant="outline" 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronRight size={16} />
                הקודם
              </Button>
              
              <div className="mx-4 text-sm">
                עמוד {currentPage} מתוך {totalPages}
              </div>
              
              <Button 
                variant="outline" 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                הבא
                <ChevronLeft size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WrittenBlog;
